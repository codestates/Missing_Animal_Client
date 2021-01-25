import React, { useState } from 'react';
import './petInfoDetail.css';
import PetInfoUpdate from "./PetInfoUpdate";

function PetInfoDetail({ handleToModifyPetInfo, id, title, petname, description, species, sex, missingDate, area, reward, createdAt, petsImages }) {
    
    const [ state, setState ] = useState({
        toModifyPetInfo: false,
    });

    return (
        state.toModifyPetInfo ? (
            <PetInfoUpdate
                id={id}
                title={title}
                petname={petname}
                description={description}
                species={species}
                sex={sex}
                missingDate={missingDate}
                area={area}
                reward={reward}
                createdAt={createdAt}
                petsImages={petsImages}
                handleToModifyPetInfo={handleToModifyPetInfo}
            ></PetInfoUpdate>
        ) : (
        <div className="petInfoDetail">
            <p className="petInfoDetailTitle">{title}</p>
            <div className="petInfoDetailHeader">
                {
                    petsImages.map((image, idx) => 
                        <img key={idx+1} className= "petsImage" src={image.imagePath} alt={"petImage"+(idx+1)}></img>
                    )
                }
            </div>
            <div className="petInfoDetailBody">
                <p>Pet Name     : {petname}</p>
                <p>Species      : {species}</p>
                <p>Sex          : {sex}</p>
                <p>Missing Date : {missingDate}</p>
                <p>Missing Area : {area}</p>
                <p>Descrioption : {description}</p>
                <p>Reward       : {reward}</p>
                <p>Created At   : {createdAt}</p>
                <button className="modifyPetInfoButton" 
                    onClick={(event) => {
                        event.preventDefault();
                        setState((prevState) => ({
                            ...prevState,
                            toModifyPetInfo: !prevState.toModifyPetInfo,
                        }));
                    }}
                >Modify Pet Info</button>
            </div>
        </div>)
    );
}

export default PetInfoDetail;