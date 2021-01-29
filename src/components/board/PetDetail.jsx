import React from 'react';
import './petDetail.css';

function PetDetail({ title, petname, thumbnail, description, petsImages, species, sex, missingDate, area, reward, username, email, contact, createdAt }) {
    return (
        <div className="petDetail">
            {/* <p className="petDetailTitle">{title}</p> */}
            <div className="petDetailHeader">
                {
                    petsImages.map((image, idx) => 
                        <img key={idx+1} className= "petsImage" src={image.imagePath} alt={"petImage"+(idx+1)}></img>
                    )
                }
            </div>
            <div className="petDetailBody">
                <p>종      : {species}</p>
                <p>성별     : {sex}</p>
                <p>실종 날짜 : {missingDate}</p>
                <p>실종 지역 : {area}</p>
                <p>특이 사항 : {description}</p>
                <p>보상사례금 : {reward}</p>
                <p>보호자   : {username}</p>
                <p>이메일   : {email}</p>
                <p>전화연락처 : {contact}</p>
                {/* <p>Created At   : {createdAt}</p> */}
            </div>
        </div>
    );
}

export default PetDetail;