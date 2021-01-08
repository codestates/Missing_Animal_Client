import React from 'react';
import PetCard from './PetCard';
import './board.css';

function Board() {
    return (
        <div className='board'>
            <div className='boardTitle'>Board - Missing Pets</div>
            <PetCard></PetCard>
            <PetCard></PetCard>
            <PetCard></PetCard>
        </div>
    );
}

export default Board;