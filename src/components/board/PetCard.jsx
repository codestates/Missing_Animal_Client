import React, { useState } from 'react';
import './petCard.css';
import PetDetail from './PetDetail';
// import Comments from '../comments/Comments';

// Modal
import Modal from 'react-modal';
// Pet Detail Modal
const petDetailStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
// Comments Modal
const customStyles = {
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

function PetCard({ title, petname, thumbnail, description, petsImages, species, sex, missingDate, area, reward, username, email, contact, createdAt }) {
    // Pet Detail Modal
    let subtitleDetailModal;
    const [ detailModalIsOpen, setDetailModalIsOpen ] = useState(false);
    function openDetailModal() {
        setDetailModalIsOpen(true);
    }
    function afterOpenDetailModal() {
        subtitleDetailModal.style.color = '#8965E6';
    }
    function closeDetailModal() {
        setDetailModalIsOpen(false);
    }
    // Comments Modal
    // let subtitle;
    // const [ modalIsOpen, setIsOpen ] = useState(false);
    // function openModal() {
    //     setIsOpen(true);
    // }
    // function afterOpenModal() {
    //     subtitle.style.color = '#8965E6';
    // }
    // function closeModal() {
    //     setIsOpen(false);
    // }

    return (
        <div className="petCard">
            <p>Title : { title }</p>
            <img className="petThumbnail" src={ thumbnail } alt="petThumbnail"></img>
            <p>Pet Name : { petname }</p>
            <p>Decription : { description }</p>
            {/* Pet Detail Modal */}
            <div className="modal petDetailModal">
                <button className="openButton" onClick={ openDetailModal }>Pet Detail</button>
                <Modal
                    isOpen={ detailModalIsOpen }
                    onAfterOpen={ afterOpenDetailModal }
                    onRequestClose={ closeDetailModal }
                    style={ petDetailStyles }
                    contentLabel="PetDetailModal"
                >
                    <h2 ref={ _subtitleDetail => (subtitleDetailModal = _subtitleDetail) }>{ petname }</h2>
                    <PetDetail
                        title={title}
                        petname={petname}
                        thumbnail={thumbnail}
                        description={description}
                        petsImages={petsImages}
                        species={species}
                        sex={sex}
                        missingDate={missingDate}
                        area={area}
                        reward={reward}
                        username={username}
                        email={email}
                        contact={contact}
                        createdAt={createdAt}
                    ></PetDetail>
                    <button className="closeButton" onClick={ closeDetailModal }>Close</button>
                </Modal>
            </div>
            {/* Comments Modal */}
            {/* <div className="modal commentsModal">
                <button className="openButton" onClick={ openModal }>Comments</button>
                <Modal
                    isOpen={ modalIsOpen }
                    onAfterOpen={ afterOpenModal }
                    onRequestClose={ closeModal }
                    style={ customStyles }
                    contentLabel="CommentsModal"
                >
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>{ petname }</h2>
                    <Comments></Comments>
                    <button className="closeButton" onClick={ closeModal }>close</button>
                </Modal>
            </div> */}
        </div>
    );
}

export default PetCard; 