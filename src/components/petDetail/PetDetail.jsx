import React from 'react';
import './petDetail.css';

function PetDetail({ title, petname, thumbnail, description, petsImages, species, sex, missingDate, area, reward, username, email, contact, createdAt }) {
    return (
        <div className="petDetail">
            <p className="petDetailTitle">{title}</p>
            <div className="petDetailHeader">
                <img src={petsImages[0]} alt="petImage1"></img>
                <img src={petsImages[1]} alt="petImage2"></img>
                <img src={petsImages[2]} alt="petImage3"></img>
            </div>
            <div className="petDetailBody">
                <p>Species      : {species}</p>
                <p>Sex          : {sex}</p>
                <p>Missing Date : {missingDate}</p>
                <p>Missing Area : {area}</p>
                <p>Descrioption : {description}</p>
                <p>Reward       : {reward}</p>
                <p>Owner's Name : {username}</p>
                <p>Email        : {email}</p>
                <p>Contact      : {contact}</p>
                <p>Created At   : {createdAt}</p>
            </div>
        </div>
    );
}

export default PetDetail;