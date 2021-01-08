import React from 'react';
import './petCard.css';

function PetCard() {
    return (
        <div className='petCard'>
            <p>Pet Card - petname</p>
            <img alt='petThumbnail'></img>
            <p>species</p>
            <p>reward</p>
        </div>
    );
}

export default PetCard; 