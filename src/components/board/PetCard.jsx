import React, { useState } from 'react';
import './petCard.css';

// Modal
import Modal from 'react-modal';
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

function PetCard({ title, petname, thumbnail, description }) {
    // Modal
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#8965E6';
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="petCard">
            <p>{ title }</p>
            <img className="petThumbnail" src={ thumbnail } alt="petThumbnail"></img>
            <p>{ petname }</p>
            <p>{ description }</p>
            {/* Modal */}
            <div className="petDetail">
                <button onClick={openModal}>Pet Detail</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Pet Detail Modal"
                >
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>{ petname }</h2>
                    <p className="petDetailTitle">Title</p>
                    <div className="petDetailHeader">
                        <img src="" alt="petImage1"></img>
                        <img src="" alt="petImage2"></img>
                        <img src="" alt="petImage3"></img>
                    </div>
                    <div className="petDetailBody">
                        <p>species</p>
                        <p>sex</p>
                        <p>missingArea</p>
                        <p>missingDate</p>
                        <p>description</p>
                        <p>reward</p>
                        <p>owner's contact</p>
                    </div>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            </div>
        </div>
    );
}

export default PetCard; 