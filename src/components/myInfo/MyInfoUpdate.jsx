import React, { useState } from "react";
import './myInfoUpdate.css';
import axios from 'axios';

function MyInfoUpdate({ handleToModifyMyInfo, isLogged, token, userId, username, email, mobile }) {
    /* 렌더링 조건 설명 : 로그인한 상태(isLogged 값이 true, token이 props로 전달된 상태)일때 myInfo 페이지가 읽기 가능함 */
    // 임시 토큰 설정
    axios.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjaGFybGllQGNvZGVzdGF0ZXMuY29tIiwidXNlcm5hbWUiOiJDaGFybGllIiwiaWF0IjoxNjEwOTU1Njk3LCJleHAiOjE2MTE1NjA0OTd9.mdQ3_zFrWK6l5CBxTaH6Li6gJQtscVTlVeTmeRE6x0w";
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    const [ state, setState ] = useState({
        isLogged:true,
        userId,
        username,
        email,
        mobile,
        oldpassword: '',
        newpassword: '',
    });

    const modifyMyInfo = async () => {
        const res = await axios.put(
            // `https://missinganimals.ml/users/edit/${userId}`,
            `http://localhost:8080/users/edit/${userId}`, 
            { 
                username: state.username, 
                email: state.email, 
                mobile: state.mobile, 
                oldpassword: state.oldpassword,
                newpassword: state.newpassword, 
            }, 
            { withCredentials: true }
        );
        // console.log(res.data);
        console.log(res.status, res.statusText);
    };

    if (!state.isLogged) {
        return (
            <div className="myInfoModify"> My Info를 수정하려면 로그인이 필요합니다.</div>
        )
    }

    return (
        <div className="myInfo">
            <label>User Name : </label>
            <input type='text' placeholder='User Name' value={ state.username }
                onChange={(event) => setState((prevState) => ({
                    ...prevState,
                    username: event.target.value
                }))}
            ></input><br />
            <label>Email : </label>
            <input type='text' placeholder='Email' value={ state.email }
                onChange={(event) => setState((prevState) => ({
                    ...prevState,
                    email: event.target.value
                }))}
            ></input><br />
            <label>Mobile : </label>
            <input type='text' placeholder='Email' value={ state.mobile }
                onChange={(event) => setState((prevState) => ({
                    ...prevState,
                    mobile: event.target.value
                }))}
            ></input><br />
            <label>Old Password : </label>
            <input type='password' placeholder='Old Password' value={ state.oldpassword }
                onChange={(event) => setState((prevState) => ({
                    ...prevState,
                    oldpassword: event.target.value
                }))}
            ></input><br />
            <label> New Password : </label>
            <input type='password' placeholder='New Password' value={ state.newpassword }
                onChange={(event) => setState((prevState) => ({
                    ...prevState,
                    newpassword: event.target.value
                }))}
            ></input><br />
            <button className="requestModifyMyInfoButton"
                onClick={(event) => {
                    event.preventDefault();
                    modifyMyInfo();
                    handleToModifyMyInfo({ 
                        username: state.username, 
                        email: state.email,
                        mobile: state.mobile
                    });
                }}
            >Modify</button>
        </div>
    );
}
export default MyInfoUpdate;