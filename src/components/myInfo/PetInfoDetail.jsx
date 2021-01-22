import React from 'react';
import './petInfoDetail.css';

function PetInfoDetail({ title, petname, thumbnail, description, petsImages, species, sex, missingDate, area, reward, createdAt }) {
    return (
        <div className="petDetail">
            <p className="petDetailTitle">{title}</p>
            <div className="petDetailHeader">
                {
                    petsImages.map((image, idx) => 
                        <img key={idx+1} className= "petsImage" src={image.imagePath} alt={"petImage"+(idx+1)}></img>
                    )
                }
            </div>
            <div className="petDetailBody">
                <p>Species      : {species}</p>
                <p>Sex          : {sex}</p>
                <p>Missing Date : {missingDate}</p>
                <p>Missing Area : {area}</p>
                <p>Descrioption : {description}</p>
                <p>Reward       : {reward}</p>
                <p>Created At   : {createdAt}</p>
            </div>
        </div>
    );
}

export default PetInfoDetail;