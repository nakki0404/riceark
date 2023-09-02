import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './MyComponent.css'; // 스타일 파일을 불러옴
import axios from 'axios';
import { connect } from 'react-redux';
import { addList } from '../actions';
import Select from 'react-select';



import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

//왜 items.items 인가 ...?
const MyComponent = ({items,lists,addList,token}) => {
  const [isButtonDisabled2, setButtonDisabled2] = useState(false);
  const [localStorageKey] = useState('tableDataKey'); // 로컬 저장소 키

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();


  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute reCAPTCHA not yet available');
      return;
    }

    try {
      const token = await executeRecaptcha('yourAction');
      setRecaptchaToken(token); // 토큰을 상태로 저장
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
    }

  }, [executeRecaptcha]);


  // const sendTokenToServer = async (callback) => {
  //   try {
  //     const response = await axios.post(process.env.REACT_APP_BACKEND_URL +'/verify-recaptcha', {
  //       recaptchaToken, // 토큰을 직접 전달합니다.
  //     });
  //     if (response.status === 200) {
  //       const data = response.data;
  //       handleReCaptchaVerify();
  
  //       // 인증이 성공하면 콜백 함수 호출
  //       if (typeof callback === 'function') {
  //         callback();
  //       }
  //     } else {
  //       console.error('reCAPTCHA verification failed');
  //     }
  //   } catch (error) {
  //     console.error('Error sending reCAPTCHA token to server:', error);
  //   }
  // };

  // useEffect(() => {
  //   handleReCaptchaVerify();
  // }, [handleReCaptchaVerify]);

    //   try {
  //     const response = await axios.post('http://localhost:3001/verify-recaptcha', {
  //       recaptchaToken, // 토큰을 직접 전달합니다.
  //     });
  
  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log(data);
  //     } else {
  //       console.error('reCAPTCHA verification failed');
  //     }
  //   } catch (error) {
  //     console.error('Error sending reCAPTCHA token to server:', error);
  //   }
  // };


  useEffect(() => {
    // 로컬 저장소에서 데이터 불러오기
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      setSelectedItems(JSON.parse(savedData));
    }
  }, [localStorageKey]);
  //의존성에 키넣는거 명쾌하게 해결안됨

// title , selectedItems(ㅇ), totalprice(ㅇ) 객체로 저장
const [title, setTitle] = useState('');

const handleTitleChange = (e) => {
  setTitle(e.target.value); // 입력된 값을 title 상태에 저장
}



const handleValueListMake = (title, selectedItems, totalprice,value) => {
  setButtonDisabled2(true);
  setTimeout(() => {
    setButtonDisabled2(false);
  }, 10000); // 3초 후에 버튼을 다시 활성화
if(isButtonDisabled2===false){
  // setValuelist({ Title: title, List: selectedItems, Value: totalprice, Pop:0 });
  //중복 이름 방지 로직 필요
  if( title!==""&&selectedItems.length!==0){
  addList({ Title: title, List: selectedItems, Pop:0 });
  // console.log(valuelist);

  axios.post(process.env.REACT_APP_BACKEND_URL +'/update1', {Item:{ Title: title, List: selectedItems, Pop:0 },Pass: value})
  .then(response => {
    console.log('Data updated successfully:', response.data);
  })
  .catch(error => {
    console.error('Error updating data:', error);
  });
  console.log({ Title: title, List: selectedItems, Pop:0 });
  setSelectedItems([]);
    setTitle('');
    localStorage.removeItem(localStorageKey);
    setForm("");
    touch();

}}}


  const [selectedItems, setSelectedItems] = useState([]);
  
  // const handleDropdownSelect = (selectedItem) => {
  //   setSelectedItems([...selectedItems, { ...selectedItem, Quantity: 0 }]);
  //   localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
  // };
//지우면 안됨 콜백함수로 오답노트? 추가 완전히 반영 후 로컬 저장
 

    // const handleDropdownSelect = (selectedItem) => {
  //   setSelectedItems([...selectedItems, { ...selectedItem, Quantity: 0 }]);
  //   localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
  // };
  

  const handleQuantityChange = (index, quantity) => {
    // const updatedItems = [...selectedItems];
    // updatedItems[index].Quantity = Math.max(0, parseInt(quantity, 10)); // 최소값 0으로 설정
    // setSelectedItems(updatedItems);

    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...selectedItems];
      updatedItems[index].Quantity = Math.max(0, parseInt(quantity, 10)); // 최소값 0으로 설정
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });

  };

  const handleDelete = (index) => {
    // const updatedItems = selectedItems.filter((item, i) => i !== index);
    // setSelectedItems(updatedItems);

    setSelectedItems((prevSelectedItems) => {
      const updatedItems = selectedItems.filter((item, i) => i !== index);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });

  };
  const totalprice = selectedItems.reduce(
    (total, item) => total + item.YDayAvgPrice * item.Quantity / item.BundleCount,
    0
  ).toFixed(0);
  const handleClearTable = () => {
    setSelectedItems([]);
    setTitle('');
    localStorage.removeItem(localStorageKey);
  };
  // const sendTokenToServer = async () => {
  //   try {
  //     // 서버 엔드포인트에 POST 요청을 보냅니다.
  //     const response = await fetch('http://localhost:3001/verify-recaptcha', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ recaptchaToken }),
  //     });

  //     if (response.ok) {
  //       // 서버에서 성공적으로 검증된 경우
  //       const data = await response.json();
  //       console.log(data);
  //     } else {
  //       // 서버에서 검증 실패 또는 오류 발생 시
  //       console.error('reCAPTCHA verification failed');
  //     }
  //   } catch (error) {
  //     console.error('Error sending reCAPTCHA token to server:', error);
  //   }
  // };
  {/* <button onClick={sendTokenToServer}>Send Token to Server</button> */}
const [pass,setPass]=useState("");

  const touch = ()=>{
    axios.get(process.env.REACT_APP_BACKEND_URL +'/touch')
    .then(response => {
      setPass(response.data);
      
    })
    .catch(error => {
      console.error(error);
    });
  }
  useEffect(()=>{
  touch();
},[])  

const [form,setForm]=useState("")

const fillForm=(value)=>{
  setForm(value)
}

// const check= ()=>{
//   const response = await axios.post(process.env.REACT_APP_BACKEND_URL +'/check',{pass})
// //숫자비교는 ===되는데 문자비교는 -만되네?
//   if(response.data='ture'){
   
//         // 인증이 성공하면 콜백 함수 호출
//         if (typeof callback === 'function') {
//           callback();
//         }
//       } else {
//         console.error('failed');
//       }
//     } catch (error) {
//       console.error('Error sending pass token to server:', error);
//     }
//   };
const [data, setData] = useState([]);
const [selectedOption, setSelectedOption] = useState(null);
const list= items.items.map(e=>({label :e.Name,value:e.Name }))
const handleChange = (selected) => {
  setSelectedOption(selected);
};
useEffect(() => {
  if (selectedOption) {
    // 선택한 항목의 value 값을 data로 설정
    const newData = selectedOption.value;
    setData(newData);

    // handleDropdownSelect 호출 이후에 다음 단계를 진행
    handleDropdownSelect(newData, () => {
      // 다음 단계를 이곳에서 진행
      setData(""); // 또는 필요한 다른 작업 수행
    });

    // setData(selectedOption.value)
    // handleDropdownSelect(data)
    // setData("");
  }
}, [selectedOption]);
// useEffect(() => {
//     handleDropdownSelect(data)
// }, [data]);

const handleDropdownSelect = (data) => {
  if(selectedItems.some(item=>item.Name===data)){
    console.log('중복')
  }
  //중복처리 완료
  else{
  setSelectedItems((prevSelectedItems) => {
    const updatedItems = [...prevSelectedItems, { ...items.items.find(e=>e.Name===data), Quantity: 0 }];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
    return updatedItems;
  });}
};
  return (
      <div>
<h1>재화 계산기</h1><br />
<div className="container">
      <Select
        options={list}
        value={selectedOption}
        onChange={handleChange}
        isSearchable={true} // 검색 가능한 드롭다운으로 설정
        placeholder="재화를 선택하세요"
      />
    </div><br />
              {/* <Dropdown className="my-dropdown">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          추가할 재화
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {items.items.map((item) => (
            <Dropdown.Item  onClick={() => handleDropdownSelect(item)}>
              {item.Name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> */}
  
      <Table striped bordered hover>
        <thead>
          <tr>
          <th className="col-quantity">그림</th>      
          <th className="col-name">이름</th>
      <th className="col-quantity">개수</th>
      <th className="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img
        src={item.Icon} // 이미지 파일의 URL을 여기에 입력
      alt=""/></td>
      <td>{item.Name}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.Quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(index)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="price" value={`합계 ${totalprice} G`}
  readOnly />
        </Form.Group>
    </Form>
    <Form>
    <div className="row">
      <div className="col-12 col-md-8 mb-3 mb-md-0">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="컨텐츠이름 ex)#발탄#더보기, #카던#귀속포함"
            onChange={handleTitleChange}
            value={title}
          />
        </Form.Group>
      </div>
      <div className="col-12 col-md-3">
        <Button variant="primary" onClick={() => handleValueListMake(title, selectedItems, totalprice,form)}>저장</Button>
        {/* <Button variant="primary" onClick={() => {
  sendTokenToServer(async () => {
    const isVerified = await check();
    if (isVerified) {
      handleValueListMake(title, selectedItems, totalprice);
    }
  });
}}>저장</Button> */}
      </div>
    </div>
  </Form><br />
          <Form.Group >
          <Form.Control
            placeholder={`${pass}`+"를 입력해주세요 자동입력방지"}
            onChange={e=>fillForm(e.target.value)}
            value={form}
          />
        </Form.Group><br />
      <Button variant="dark" onClick={handleClearTable}>테이블 비우기</Button>
      <div>설명</div>
      <div>1.재화들을 고르세요.</div>
      <div>2.개수를 정하고</div>
      <div>3.컨텐츠 이름을 적어서</div>
      <div>4.저장버튼을 누르세요</div>
      <div>이제 다른 이용자도 볼 수 있습니다!</div>
      <div>공백, 완전히 같은 이름은 등록안됩니다!</div>
    </div>
  );
};

// export default MyComponent;
const mapStateToProps = (state) => ({
  items: state.items,
  lists: state.lists,
  token:state.token,
});
export default connect(mapStateToProps,{addList})(MyComponent);