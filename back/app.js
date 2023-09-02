//server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const marketList = require('./src/model/market');
const MarketItem = require('./src/model/item')
const User = require('./src/model/user')
const Report = require('./src/model/report')
const trading_data = require('./src/model/trading_data');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const winston = require('winston');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');


// var indexRouter = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
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
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
    


    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    };

    const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const existingUser = await User.findOne({ID:jwt_payload.ID});
    
        if (existingUser) {
          return done(null, existingUser);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error('serError updating data:', error);
        res.status(500).json({ error: 'serInternal server error' });
      }
    });
    passport.use(strategy);
    app.use(passport.initialize());

    function checkAdminRole(req, res, next) {
      const token = req.headers.authorization;
      const realtoken=(token.split(' ')[1])
      //토큰 공백제거 눈돌아가겠다
      // console.log(jwt.verify(realtoken, 'aaaaa'));
      // console.log(jwt.verify(token, '1'));
      try {
      if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
      }
    
      jwt.verify(realtoken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          // return console.log(res);;
        //   return res.status(403).json({ message: 'serInvalid token.' });
        // }
        console.error('JWT verification error:', err);
    return res.status(403).json({ message: 'Invalid token.' });
  }
    
        if (decoded.Role === 'admin') {
          // 사용자 역할이 'admin'인 경우에만 다음 미들웨어 또는 라우트로 이동
          next();
        } else {
          return res.status(403).json({ message: 'Access denied: Not an admin.' });
        }
      });
    
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    };}

// try {
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   };
// app.post('/api/verify-recaptcha', async (req, res) => {
//   const { recaptchaToken } = req.body;
//   try {
//     // Google reCAPTCHA 검증
//     const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
//       params: {
//         secret: '6Lft39snAAAAAAmwIyQ_AsaUGEgv2_S8y-PRppl3', // 구글 reCAPTCHA 대시보드에서 생성한 비밀 키
//         response: recaptchaToken,
//       },
//     });
// console.log(response.data)
//     if (response.data.success) {
//       // reCAPTCHA 검증 성공
//       res.status(200).json({ success: true });
//     } else {
//       // reCAPTCHA 검증 실패
//       res.status(400).json({ success: false, message: 'reCAPTCHA 검증 실패' });
//     }
//   } catch (error) {
//     console.error('reCAPTCHA 검증 오류:', error);
//     res.status(500).json({ success: false, message: '서버 오류' });
//   }
// });


let passNum=[];
app.get('/api/touch', async (req, res) => {
    // 0부터 9999까지의 난수 생성
    const randomNum = Math.floor(Math.random() * 100000);
const formattedNum = String(randomNum).padStart(5, '0');
    passNum.push(formattedNum)
console.log(formattedNum);
    // 난수를 4자리 문자열로 변환
    res.send(formattedNum);
});

// app.post('/api/check', async (req, res) => {
//   const { pass } = req.body;
//   console.log(pass)
//   console.log(passNum);
//   if(passNum.includes(String(pass))){
//   const index=passNum.indexOf(String(pass));
//   passNum.splice(index,1)
//     console.log(passNum);// 0부터 9999까지의 난수 생성
//   res.json(true);
//   }
//   else res.json(false);
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use('/users', usersRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.get('/', (req, res) => {
   res.send('hi')
});


app.get('/api/data', async (req, res) => {
  const marketLists = await marketList.find({});
  res.json(marketLists);
});

app.get('/api/load', async (req, res) => {
  const MarketItems = await MarketItem.find({});
  res.json(MarketItems);
});
app.get('/api/trade', async (req, res) => {
  const MarketItems = await trading_data.find({});
  res.json(MarketItems);
});

app.get('/api/loadreport', async (req, res) => {
  const Reports = await Report.find({});
  res.json(Reports);
});

app.post('/api/Login', async (req, res) => {
  const { ID, Password } = req.body;
  // const user = await User.find(u => u.ID === ID && u.Password === Password);
  const user = await User.findOne({ID:ID,Password:Password});
  
  if (user) {
    const payload = { ID: user.ID ,Password: user.Password,
      Role: user.Role,
      iat: Math.floor(Date.now() / 1000), // 토큰 발행 시간 (Unix 타임스탬프)
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1시간 후 만료
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ token });
    console.log(token);
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.post('/api/popup', async (req, res) => {
  const selectedListItem = req.body; // 클라이언트에서 보낸 사용자 데이터
  console.log(selectedListItem)

  try {
    const filter = { Title: selectedListItem.Title }; // 필터 조건
    const update = { $inc: { Pop: 1 } }; // 수정할 필드 및 값
  
    const result = await MarketItem.updateOne(filter, update);
    console.log(result.modifiedCount, 'document(s) updated');
    
    res.status(200).json({ message: 'Pop count updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }});

  
app.post('/api/popdown', async (req, res) => {
  const selectedListItem = req.body; // 클라이언트에서 보낸 사용자 데이터
  console.log(selectedListItem)

  try {
    const filter = { Title: selectedListItem.Title }; // 필터 조건
    const update = { $inc: { Pop: -1 } }; // 수정할 필드 및 값
  
    const result = await MarketItem.updateOne(filter, update);
    console.log(result.modifiedCount, 'document(s) updated');
    
    res.status(200).json({ message: 'Pop count updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }});

app.post('/api/signup', async (req, res) => {
  const user = req.body; // 클라이언트에서 보낸 사용자 데이터
  if(passNum.includes(String(user.Pass))){
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

      res.status(201).json({ message: 'Data updated successfully' });
    } else {
      // 이미 동일한 아이디를 가진 사용자가 있는 경우
      res.status(409).json({ error: 'User with this ID already exists' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }}
});
// passport.authenticate('jwt', { session: false })
app.post('/api/delete1',checkAdminRole, async (req, res) => {
  const { Title}  = req.body; // 클라이언트에서 보낸 Title 데이터
console.log(Title)
  try {
    // MarketItem 컬렉션에서 해당하는 Title 값을 가진 문서 삭제
    const result = await MarketItem.deleteOne({ Title });
    
    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
      res.status(200).json('True');
    } else {
      console.log('Document not found');
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/report', async (req, res) => {
  const  lists  = req.body; // 클라이언트에서 보낸 lists 데이터
  if(passNum.includes(String(lists.Pass))){
  try {
    console.log(lists.Item)
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await Report.insertMany(lists.Item); // 새로운 데이터 추가
//state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json({ message: 'Data updated successfully' });
    console.log(lists)
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }}
});

// app.post('/api/resources', checkAdminRole, (req, res) => {
//   // 'admin' 역할을 가진 사용자에게만 허용된 작업 수행
//   // ...
// });

app.post('/api/reportdel', checkAdminRole,async (req, res) => {
  const  lists  = req.body; // 클라이언트에서 보낸 lists 데이터
  console.log(lists);

  // const query = { Title:lists.Title , Body: lists.Body };

  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await Report.deleteOne({ Title:lists.Title, Body: lists.Body });

//state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json('True');
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/update', async (req, res) => {
  const { lists } = req.body; // 클라이언트에서 보낸 lists 데이터

  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await MarketItem.deleteMany(); // 모든 데이터 삭제
    await MarketItem.insertMany(lists.lists.map(item=>item)); // 새로운 데이터 추가
//state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json({ message: 'Data updated successfully' });
    console.log(lists)
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/update1', async (req, res) => {
  const list  = req.body; // 클라이언트에서 보낸 lists 데이터
  if(passNum.includes(String(list.Pass))){
  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await MarketItem.insertMany(list.Item); // 새로운 데이터 추가
    //state db구조 손을 봐야할듯...일단은 그냥 고고
        res.status(200).json({ message: 'Data updated successfully' });
        console.log(list)
      } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }}
    });

    app.get('/api/dbdel', async (req, res) => {
      try {
        // 'Body' 속성에 "흐음"을 포함하는 모든 문서 삭제
        // const result = await Report.deleteMany({ Body: /으음/ });
        // const result = await Report.deleteMany({ Body: /으음/ });
        const result = await MarketItem.deleteMany({ Title: { $not: /더보기/ } });

        res.json({ message: `${result.deletedCount} documents deleted` });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
    });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

const update =require('./src/controllers/update')
    const interval = setInterval(update.fetchDataAndUpdate, 86400000);
    interval;

    // process.on('SIGINT', () => {
    //   clearInterval(interval);
    //   console.log('서버가 종료되었습니다.');
    //   process.exit();
    // });


    module.exports = app;