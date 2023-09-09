//server.js
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const marketList = require("./src/model/market");
const MarketItem = require("./src/model/item");
const User = require("./src/model/user");
const Report = require("./src/model/report");
const trading_data = require("./src/model/trading_data");
const Prevent = require("./src/model/prevent");
const Visitor = require("./src/model/visitor");
const Visited = require("./src/model/visited");

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");
const winston = require("winston");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nunjucks = require("nunjucks");

// var indexRouter = require('./routes/index');
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const update = require("./src/controllers/update");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   const clientIP = req.ip || req.connection.remoteAddress;
//   console.log(`클라이언트 IP 주소: ${clientIP}`);
//   next();
// });

// // 로그 파일 설정
// const logger = winston.createLogger({
//   level: 'info', // 로그 수준 (info, error, debug 등)
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({ filename: 'server.log' }), // 로그 파일에 저장
//   ],
// });
// logger.debug('이것은 에러 로그입니다.');
// app.set('view engine', 'njk');
// app.set('views', path.join(__dirname, 'views'));

// nunjucks.configure('views', {
//   express: app,
//   watch: true,
// });
app.use(cors());
app.use(express.json()); // JSON 데이터 처리를 위한 미들웨어 추가
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const existingUser = await User.findOne({ ID: jwt_payload.ID });

    if (existingUser) {
      return done(null, existingUser);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error("serError updating data:", error);
    res.status(500).json({ error: "serInternal server error" });
  }
});
passport.use(strategy);
app.use(passport.initialize());

function checkAdminRole(req, res, next) {
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  //토큰 공백제거 눈돌아가겠다
  // console.log(jwt.verify(realtoken, 'aaaaa'));
  // console.log(jwt.verify(token, '1'));
  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    jwt.verify(realtoken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        // return console.log(res);;
        //   return res.status(403).json({ message: 'serInvalid token.' });
        // }
        console.error("JWT verification error:", err);
        return res.status(403).json({ message: "Invalid token." });
      }

      if (decoded.Role === "admin") {
        // 사용자 역할이 'admin'인 경우에만 다음 미들웨어 또는 라우트로 이동
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Access denied: Not an admin." });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

app.get("/api/touch", async (req, res) => {
  // 0부터 9999까지의 난수 생성
  const randomNum = Math.floor(Math.random() * 100000);
  const formattedNum = String(randomNum).padStart(5, "0");
  await Prevent.insertMany({ Num: formattedNum });
  // 난수를 4자리 문자열로 변환
  res.send(formattedNum);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/total", async (req, res) => {
  const result = await Visited.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$todayTotal" },
      },
    },
  ]);

  if (result.length > 0) {
    const totalSum = result[0].total;
    res.json(totalSum);
    console.log("전체 날짜의 todayTotal 누적 합:", totalSum);
  } else {
    console.log("데이터가 없습니다.");
  }
});

app.get("/api/howmany", async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표시
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 두 자리로 표시

  const formattedDate = `${year}-${month}-${day}`;
  // console.log(formattedDate);
  const visited = await Visited.find({ Date: formattedDate });
  // console.log(visited);
  res.json(visited);
});

app.post("/api/count", async (req, res) => {
  try {
    const visitors = req.headers.coo;
    const existingVisitor = await Visitor.findOne({ Name: visitors });
    if (!existingVisitor) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표시
      const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 두 자리로 표시
      const formattedDate = `${year}-${month}-${day}`;
      await Visitor.insertMany({ Name: visitors });
      await Visited.updateOne(
        { Date: formattedDate },
        { $inc: { todayTotal: 1 } }
      );
    }

    res.send(req.headers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/data", async (req, res) => {
  const marketLists = await marketList.find({});
  res.json(marketLists);
});

app.get("/api/load", async (req, res) => {
  const MarketItems = await MarketItem.find({});
  res.json(MarketItems);
});
app.get("/api/trade", async (req, res) => {
  const MarketItems = await trading_data.find({});
  res.json(MarketItems);
});

app.get("/api/loadreport", async (req, res) => {
  const Reports = await Report.find({});
  res.json(Reports);
});

app.post("/api/Login", async (req, res) => {
  const { ID, Password } = req.body;
  const user = await User.findOne({ ID: ID, Password: Password });

  if (user) {
    const payload = {
      ID: user.ID,
      Password: user.Password,
      Role: user.Role,
      iat: Math.floor(Date.now() / 1000), // 토큰 발행 시간 (Unix 타임스탬프)
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1시간 후 만료
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ token });
    console.log(token);
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.post("/api/signup", async (req, res) => {
  const user = req.body; // 클라이언트에서 보낸 사용자 데이터
  // if (Prevent.findOne({Num:user.Pass})) {
  const existingpass = Prevent.find({ Num: user.Pass });
  if (existingpass) {
    await Prevent.deleteMany({ Num: user.Pass });
    // if (passNum.includes(String(user.Pass))) {
    try {
      const existingUser = await User.findOne({ ID: user.Item.ID });

      if (!existingUser) {
        // 동일한 아이디를 가진 사용자가 없는 경우
        if (user.Item.ID === "adminim") {
          user.Item.Role = "admin"; // 특별한 아이디에게 "admin" 권한을 부여
        } else {
          user.Item.Role = "user"; // 일반적인 사용자에게는 "user" 권한을 부여
        }

        await User.insertMany(user.Item); // 새로운 데이터 추가

        res.status(201).json({ message: "Data updated successfully" });
      } else {
        // 이미 동일한 아이디를 가진 사용자가 있는 경우
        res.status(409).json({ error: "User with this ID already exists" });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
// passport.authenticate('jwt', { session: false })
app.post("/api/delete1", checkAdminRole, async (req, res) => {
  const { Title } = req.body; // 클라이언트에서 보낸 Title 데이터
  console.log(Title);
  try {
    // MarketItem 컬렉션에서 해당하는 Title 값을 가진 문서 삭제
    const result = await MarketItem.deleteOne({ Title });

    if (result.deletedCount === 1) {
      console.log("Document deleted successfully");
      res.status(200).json("True");
    } else {
      console.log("Document not found");
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/report", async (req, res) => {
  const lists = req.body; // 클라이언트에서 보낸 lists 데이터
  const existingpass = await Prevent.find({ Num: lists.Pass });
  if (existingpass) {
    await Prevent.deleteMany({ Num: lists.Pass });
    // if (Prevent.findOne({ Num: lists.Pass })) {
    // if (passNum.includes(String(lists.Pass))) {
    try {
      console.log(lists.Item);
      // 데이터베이스 업데이트 처리
      // 예시: 데이터 삭제 후 새로운 데이터 추가
      await Report.insertMany(lists.Item); // 새로운 데이터 추가
      //state db구조 손을 봐야할듯...일단은 그냥 고고
      res.status(200).json({ message: "Data updated successfully" });
      console.log(lists);
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
// app.post('/api/resources', checkAdminRole, (req, res) => {
//   // 'admin' 역할을 가진 사용자에게만 허용된 작업 수행
//   // ...
// });

app.post("/api/reportdel", checkAdminRole, async (req, res) => {
  const lists = req.body; // 클라이언트에서 보낸 lists 데이터
  console.log(lists);

  // const query = { Title:lists.Title , Body: lists.Body };

  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await Report.deleteOne({ Title: lists.Title, Body: lists.Body });

    //state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json("True");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update", async (req, res) => {
  const { lists } = req.body; // 클라이언트에서 보낸 lists 데이터

  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await MarketItem.deleteMany(); // 모든 데이터 삭제
    await MarketItem.insertMany(lists.lists.map((item) => item)); // 새로운 데이터 추가
    //state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json({ message: "Data updated successfully" });
    console.log(lists);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update1", async (req, res) => {
  const list = req.body; // 클라이언트에서 보낸 lists 데이터
  const existingpass = await Prevent.find({ Num: list.Pass });
  if (existingpass) {
    await Prevent.deleteMany({ Num: list.Pass });
    // if (passNum.includes(String(list.Pass))) {
    try {
      // 데이터베이스 업데이트 처리
      // 예시: 데이터 삭제 후 새로운 데이터 추가
      await MarketItem.insertMany(list.Item); // 새로운 데이터 추가
      //state db구조 손을 봐야할듯...일단은 그냥 고고
      res.status(200).json({ message: "Data updated successfully" });
      console.log(list);
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.get("/api/dbdel", async (req, res) => {
  try {
    // 'Body' 속성에 "흐음"을 포함하는 모든 문서 삭제
    // const result = await Report.deleteMany({ Body: /으음/ });
    // const result = await Report.deleteMany({ Body: /으음/ });
    const result = await MarketItem.deleteMany({ Title: { $not: /더보기/ } });

    res.json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

function myFunction() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표시
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 두 자리로 표시
  const formattedDate = `${year}-${month}-${day}`;

  // console.log(currentDate);
  // 실행하려는 작업을 이 함수 안에 구현합니다.
  const existingVisited = Visited.findOne({ Date: formattedDate });
  if (!existingVisited) {
    Visited.create({ Date: formattedDate, todayTotal: 0 });
    update.fetchDataAndUpdate();
  }
}
myFunction();
// 함수를 매일 오전 00시에 실행하기 위한 시간 계산
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
tomorrow.setHours(0, 1, 0, 0);

// 다음 실행 시각까지 대기하기 위한 시간 계산
const delay = tomorrow - now;

// 함수를 주기적으로 실행하기 위한 Interval 설정
const interval = 24 * 60 * 60 * 1000; // 24시간

// 처음 실행
setTimeout(myFunction, delay);

// 매일 오전 00시마다 함수를 실행하는 Interval 설정
setInterval(function () {
  myFunction();
}, interval);

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Express server is running on port ${PORT}`);
// });

module.exports = app;
