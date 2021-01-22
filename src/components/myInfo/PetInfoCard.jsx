import React, { useState } from 'react';
import './petInfoCard.css';
import axios from 'axios';
import PetInfoDetail from './PetInfoDetail';
import PetInfoUpdate from './PetInfoUpdate';

// Modal
import Modal from 'react-modal';
// Pet Info Detail Modal
const petInfoStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

function PetInfoCard({ handleToModifyPetInfo, isLogged, token, id, title, petname, thumbnail, description, species, sex, missingDate, area, reward, createdAt, petsImages }) {
    // Pet Info Detail Modal
    let subtitlePetInfoModal;
    const [ petInfoModalIsOpen, setPetInfoModalIsOpen ] = useState(false);
    function openPetInfoModal() {
        setPetInfoModalIsOpen(true);
    }
    function afterOpenPetInfoModal() {
        subtitlePetInfoModal.style.color = '#8965E6';
    }
    function closePetInfoModal() {
        setPetInfoModalIsOpen(false);
    }

    /* 렌더링 조건 설명 : 로그인한 상태(isLogged 값이 true, token이 props로 전달된 상태)일때 myInfo 페이지가 읽기 가능함 */
    // 임시 토큰 설정
    axios.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjaGFybGllQGNvZGVzdGF0ZXMuY29tIiwidXNlcm5hbWUiOiJDaGFybGllIiwiaWF0IjoxNjEwOTU1Njk3LCJleHAiOjE2MTE1NjA0OTd9.mdQ3_zFrWK6l5CBxTaH6Li6gJQtscVTlVeTmeRE6x0w";
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    const [ state, setState ] = useState({
        isLogged: true,
        // isLogged,
        toModifyPetInfo: false,
    });

    if (state.toModifyPetInfo) {
        return (
            <PetInfoUpdate
                isLogged={isLogged}
                token={token}
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
                toggleToModifyPetInfo={() => {
                    setState((prevState) => ({
                        ...prevState,
                        toModifyPetInfo: !prevState.toModifyPetInfo
                    }));
                }}
            ></PetInfoUpdate>
        );
    }

    return (
        <div className="petCard">
            <p>{title}</p>
            <img className="petThumbnail" src={thumbnail} alt="petThumbnail"></img>
            <p>{petname}</p>
            <p>{description}</p>
            {/* Pet Info Detail Modal */}
            <div className="modal petModal">
                <button className="openButton" onClick={ openPetInfoModal }>Pet Info</button>
                <button className="modifyPetInfoButton" 
                    onClick={() => setState((prevState) => ({
                        ...prevState,
                        toModifyPetInfo: !prevState.toModifyPetInfo,
                    }))}
                >Modify Pet Info</button>
                <Modal
                    isOpen={ petInfoModalIsOpen }
                    onAfterOpen={ afterOpenPetInfoModal }
                    onRequestClose={ closePetInfoModal }
                    style={ petInfoStyles }
                    contentLabel="PetInfoModal"
                >
                    <h2 ref={ _subtitleDetail => (subtitlePetInfoModal = _subtitleDetail) }>{petname}</h2>
                    <PetInfoDetail
                        title={title}
                        petname={petname}
                        thumbnail={thumbnail}
                        description={description}
                        species={species}
                        sex={sex}
                        missingDate={missingDate}
                        area={area}
                        reward={reward}
                        createdAt={createdAt}
                        petsImages={petsImages}
                    ></PetInfoDetail>
                    <button className="closeButton" onClick={ closePetInfoModal }>Close</button>
                </Modal>
            </div>
        </div>
    );
}

export default PetInfoCard; 