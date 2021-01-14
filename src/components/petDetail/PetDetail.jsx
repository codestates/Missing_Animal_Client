import React from 'react';
import './petDetail.css';

function PetDetail({ title, description, species, sex, missingDate, area, reward, createdAt, petsImages, contact }) {
    return (
        <div className="petDetail">
            <p className="petDetailTitle">{title}</p>
            <div className="petDetailHeader">
                <img src={petsImages[0]} alt="petImage1"></img>
                <img src={petsImages[1]} alt="petImage2"></img>
                <img src={petsImages[2]} alt="petImage3"></img>
            </div>
            <div className="petDetailBody">
                <p>{species}</p>
                <p>{sex}</p>
                <p>{missingDate}</p>
                <p>{area}</p>
                <p>{description}</p>
                <p>{reward}</p>
                <p>{contact}</p>
                <p>{createdAt}</p>
            </div>
        </div>
    );
}

export default PetDetail;