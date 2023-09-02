import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { connect } from 'react-redux';
import { deleteReport } from './actions';

import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

function Report ({reports,deleteReport}){

  // const [recaptchaToken, setRecaptchaToken] = useState('');
  // const { executeRecaptcha } = useGoogleReCaptcha();

  // const handleReCaptchaVerify = useCallback(async () => {
  //   if (!executeRecaptcha) {
  //     console.log('Execute reCAPTCHA not yet available');
  //     return;
  //   }

  //   try {
  //     const token = await executeRecaptcha('yourAction');
  //     setRecaptchaToken(token); // 토큰을 상태로 저장
  //   } catch (error) {
  //     console.error('reCAPTCHA execution error:', error);
  //   }

  // }, [executeRecaptcha]);


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


  const [List,setList] =useState([]);  
  const [Writing,setWriting] =useState({
    // Title: '',
    // Opt: '',
    // Body: ''
  });

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    //너무복잡했다
    // // List 값이 변경될 때마다 LocalStorage에 저장
    setList([...reports.reports]);
    // console.log([...reports])
  }, [reports]);

  
    // const [Title,setTitle]=useState('');
    // const [Opt,setOpt]=useState('');
    // const [Body,setBody]=useState('');
    // const [activeKey, setActiveKey] = useState(null);
    const [localStorageKey3] = useState('tableDataKey3'); // 로컬 저장소 키
    useEffect(() => {
      // 로컬 저장소에서 데이터 불러오기
      const savedData = localStorage.getItem(localStorageKey3);
      if (savedData) {

        const parsedData = JSON.parse(savedData);
        setWriting(parsedData); // 전체 데이터를 Writing 객체에 입력
        //세이브데이터 어떻게 불러오지 ??? 로컬까진 받는데 불러오기가안됨
  //       const parsedData = JSON.parse(savedData);
  //   setWriting({ Opt: `${parsedData.Opt}`});
  // }
  // JSON.parse(savedData)
        // setWriting({
        //   Title:JSON.parse(savedData).Title ,
        //   Opt:JSON.parse(savedData).Opt ,
        //   Body:JSON.parse(savedData).Body 
        // });
      // 
      }
    }, [localStorageKey3]);
   
    useEffect(() => {
      // List 값이 변경될 때마다 LocalStorage에 저장
      localStorage.setItem(localStorageKey3, JSON.stringify(Writing));
    }, [Writing]);

//복잡한 구조에대한 로컬 저장소 적용
    // useEffect(() => {
    //   // List 값이 변경될 때마다 LocalStorage에 저장
    //   localStorage.setItem(localStorageKey3, JSON.stringify(Writing));
    // }, [Writing.Title,Writing.Opt,Writing.Body,]);
 
//개별 소성을 모니터링해야함
    
    // useEffect(() => {
    //   // 새로운 요소가 추가될 때마다 아코디언 닫힌 상태로 설정
    //   setActiveKey(null);
    // }, [List]);

      const handleTitleChange = (e) => {
        const updatedWriting ={ ...Writing, Title:e.target.value}; // 입력된 값을 title 상태에 저장
        setWriting(updatedWriting);
      }
      const handleOptChange = (e) => {
        const updatedWriting ={ ...Writing, Opt:e.target.value};
        // setOpt(e.target.value); // 입력된 값을 title 상태에 저장
        setWriting(updatedWriting);
      }
      const handleBodyChange = (e) => {
        const updatedWriting ={ ...Writing, Body:e.target.value};
        // setBody(e.target.value); // 입력된 값을 title 상태에 저장
        setWriting(updatedWriting);
      }
      const handleLogin = (value)=>{

        setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 60000); // 3초 후에 버튼을 다시 활성화
  if(isButtonDisabled===false){
        if(Writing.Title===''||Writing.Body===''){
          console.log('빈글등록안됨')
        }
        else{
          //조건문 무시하는거 같은데 이유 모르겠음 일단 출력에서 다시 검증하는걸로
          if(Writing.Opt===''){
            setWriting( ...Writing, {Opt:'익명의모험가'});}
            setList([...List, Writing]);
console.log(Writing)
            axios.post(process.env.REACT_APP_BACKEND_URL +'/report', 
            {Item: Writing,Pass: value}  )
      .then(response => response.data
        )
            setWriting({
      Title: '',
      Opt: '',
      Body: ''
    });
    setForm("");
    touch();
            // const newReport ={"Title":Title,"Opt":Opt,"Body":Body}
            // setList([...List,newReport] );
            
            //  setBody('');
            //  setOpt('');
            //  setTitle('');}
      }}}
      const handleDelete = (index) => {
        // const updatedItems = selectedItems.filter((item, i) => i !== index);
        // setSelectedItems(updatedItems);
        // const toDeleteReport = List[index]; // 해당 index의 report 가져오기
        // deleteReport(toDeleteReport); // Redux action 호출하여 상태 업데이트
        // axios.post(process.env.REACT_APP_BACKEND_URL +'/reportdel',  toDeleteReport )
        // .then(response => response.data
        //   )
        const token = localStorage.getItem('token');
        const toDeleteReport = List[index];
        axios.post(process.env.REACT_APP_BACKEND_URL +'/reportdel', toDeleteReport, {
          headers: { Authorization: `Bearer ${token}` }})
          .then(response => {
            // const userRole = response.data.Role; // 서버에서 받아온 사용자 역할 정보
            // console.log(response.data);
            if (response.data === 'True') {
              // 사용자 역할이 'admin'인 경우에만 실행
              deleteReport(toDeleteReport); // Redux action 호출하여 상태 업데이트
            } else {
              console.log('Access denied: Not an admin.');
              // 권한이 없는 경우에 대한 처리
            }
          })
          .catch(error => {
            console.error('Error checking user role:', error);
            // 오류 처리
          });
         // Redux action 호출하여 상태 업데이트

      };
        

    
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


    return(
      <div className="row mb-3">
    <div className="col-1"></div> {/* 좌측 공백 */}
    <div className="col-10"><br/><br/>
 <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control type="text" placeholder="에러 발생시 알려주세요"onChange={handleTitleChange} value={Writing.Title || ''} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="삭제는 관리자만 가능합니다."onChange={handleBodyChange} value={Writing.Body || ''} />
      </Form.Group></Form>
      <div className="text-center"> {/* 버튼 중앙 정렬 */}
<Button variant="warning" onClick={() => 
  handleLogin(form)}
>제출</Button>
        {/* <Button variant="warning" onClick={() => {
  sendTokenToServer(() => {
    handleLogin();
  });
}}>제출</Button> */}
      </div>
      <br/>
      <Form.Group >
          <Form.Control
            placeholder={`${pass}`+"를 입력해주세요 자동입력방지"}
            onChange={e=>fillForm(e.target.value)}
            value={form}
          />
        </Form.Group><br/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
          {List.map((item,index)=>(
            <tr key={index}>
          <td>{index+1}</td>
          <td><Accordion >
          <Accordion.Item eventKey="0">
            <Accordion.Header>{item.Title}</Accordion.Header>
            <Accordion.Body>{item.Body}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion></td>
          <td>
                <Button variant="danger" onClick={() => handleDelete(index)}>삭제</Button>
              </td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
    <div className="col-1"></div> {/* 우측 공백 */}
  </div>
    )


}

// export default Report;
const mapStateToProps = (state) => ({
  reports: state.reports,
});
export default connect(mapStateToProps,{deleteReport})(Report);