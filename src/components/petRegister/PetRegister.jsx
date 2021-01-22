// import React, { useState } from 'react';
// import './petRegister.css';
// import FormData from 'form-data';
// import axios from 'axios';
 
// function PetRegister({ isLogged, token }) {
//     /* 렌더링 조건 설명 : 로그인한 상태(isLogged 값이 true, token이 props로 전달된 상태)일때 펫 등록이 가능함 */
//     // 임시 토큰 설정
//     axios.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjaGFybGllQGNvZGVzdGF0ZXMuY29tIiwidXNlcm5hbWUiOiJDaGFybGllIiwiaWF0IjoxNjEwOTU1Njk3LCJleHAiOjE2MTE1NjA0OTd9.mdQ3_zFrWK6l5CBxTaH6Li6gJQtscVTlVeTmeRE6x0w";
//     // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//     axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//     const [ state, setState ] = useState ({
//         isLogged: true,
//         // isLogged: isLogged,
//         title: '',
//         petname: '',
//         species: '',
//         sex: '',
//         area: '',
//         description: '',
//         reward: '',
//         img: [],
//         missingDate: '',
//     })

//     const registerPet = async () => {
//         const { 
//             title, 
//             petname, 
//             species, 
//             sex, 
//             area, 
//             description, 
//             reward,
//             img,
//             missingDate,
//         } = state;
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('petname', petname);
//         formData.append('species', species);
//         formData.append('sex', sex);
//         formData.append('area', area);
//         formData.append('description', description);
//         formData.append('reward', reward);
//         img.forEach(ele => {
//             formData.append('img', ele);
//         });
//         /* 현재기준 실종 날짜 설정 */
//         // const newDate = new Date(new Date().getTime()+32400000).toISOString();
//         // const newFormatDate = newDate.split('.')[0].replace('T', ' ');
//         // formData.append('missingDate', newFormatDate);
//         /* 사용자입력 실종 날짜 */
//         formData.append('missingDate', missingDate);
//         // const res = await axios.post('https://missinganimals.ml/pets/register', formData, { withCredentials: true });
//         const res = await axios.post('http://localhost:8080/pets/register', formData, { withCredentials: true });
//         if (res.status === 201) {
//             console.log(res.status, res.statusText);
//             setState((prevState) => ({
//                 ...prevState, 
//                 title: '',
//                 petname: '',
//                 species: '',
//                 sex: '',
//                 area: '',
//                 description: '',
//                 reward: '',
//                 img: [],
//                 missingDate: '',
//             }));
//         } else {
//             console.log(res.status, res.statusText);
//         }
//     }

//     if (!state.isLogged) {
//         return (
//             <div className='petRegister'>펫을 등록하려면 로그인이 필요합니다.</div>
//         )
//     }

//     return (
//         <div className='petRegister'>
//             <div>Pet Register</div>
//             <div className='petRegisterHeader'>
//                 <label>Title : </label>
//                 <input type='text' placeholder='Title' value={state.title}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         title: event.target.value
//                     }))}
//                 ></input><br />
//                 <label>Pet Name : </label>
//                 <input type='text' placeholder='Pet Name' value={state.petname}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         petname: event.target.value
//                     }))}
//                 ></input><br />
//             </div>
//             <div className='petRegisterBody'>
//                 <label>Species : </label>
//                 <input type='text' placeholder='Species' value={state.species}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         species: event.target.value
//                     }))}
//                 ></input><br />
//                 <label>Sex : </label>
//                 <input type='text' placeholder='Sex' value={state.sex}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         sex: event.target.value
//                     }))}
//                 ></input><br />
//                 <label>Missing Area : </label>
//                 <input type='text' placeholder='Missing Area' value={state.area}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         area: event.target.value
//                     }))}
//                 ></input><br />
//                 <label>Missing Date : </label>
//                 <input type='text' placeholder='Missing Date' value={state.missingDate}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         missingDate: event.target.value
//                     }))}
//                 ></input><br />
//                 <label>Description : </label>
//                 <input type='text' placeholder='Description' value={state.description}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         description: event.target.value
//                     }))}
//                 ></input><br />
//                 <label>Reward : </label>
//                 <input type='text' placeholder='Reward' value={state.reward}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         reward: event.target.value
//                     }))}
//                 ></input><br />
//             </div>
//             <div className='petRegisterImages'>
//                 <input type="file" multiple
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         img: [ ...event.target.files ]
//                     }))}
//                 ></input><br />
//             </div>
//             <button type='submit' 
//                 onClick={(event) => {
//                     event.preventDefault();
//                     registerPet();
//                 }}
//             >Register</button>
//         </div>
//     );
// }

// export default PetRegister;  