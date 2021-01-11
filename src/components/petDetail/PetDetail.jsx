import React from 'react';
import './petDetail.css';

function PetDetail() {
    return (
        <div className='petDetail'>
            <div>Pet Detail</div>
            <p className='petDetailTitle'>Title</p>
            <div className='petDetailHeader'>
                <p>petname</p>
                <img src={ } alt='petImage1'></img>
                <img src={ } alt='petImage2'></img>
                <img src={ } alt='petImage3'></img>
            </div>
            <div className='petDetailBody'>
                <p>species</p>
                <p>sex</p>
                <p>missingArea</p>
                <p>missingDate</p>
                <p>description</p>
                <p>reward</p>
                <p>owner's contact</p>
            </div>
        </div>
    );
}

export default PetDetail;