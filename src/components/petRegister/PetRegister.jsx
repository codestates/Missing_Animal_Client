import React from 'react';
import './petRegister.css';
// 이미지 업로드 관련 스터디 요망: multer, multer-s3

function PetRegister() {
    return (
        <div className='petRegister'>
            <div>Pet Register</div>
            <div className='petRegisterHeader'>
                <label>Title : </label>
                <input type='text' placeHolder='Title'></input><br />
                <label>Pet Name : </label>
                <input placeHolder='Pet Name'></input><br />
            </div>
            <div className='petRegisterBody'>
                <label>Species : </label>
                <input placeHolder='Species'></input><br />
                <label>Sex : </label>
                <input placeHolder='Sex'></input><br />
                <label>Missing Area : </label>
                <input placeHolder='Missing Area'></input><br />
                <label>Missing Date : </label>
                <input placeHolder='Missing Date'></input><br />
                <label>Description : </label>
                <input placeHolder='Description'></input><br />
                <label>Reward : </label>
                <input placeHolder='Reward'></input><br />
            </div>
            <div className='petRegisterImages'>
                <input type="file" placeHolder="petImage1"></input><br />
                <input type="file" placeHolder="petImage2"></input><br />
                <input type="file" placeHolder="petImage3"></input><br />
            </div>
            <button type='submit'>Register Pet</button>
        </div>
    );
}

export default PetRegister;  