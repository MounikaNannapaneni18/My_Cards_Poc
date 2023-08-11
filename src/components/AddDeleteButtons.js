import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

import './AddDeleteButtons.css'

const AddDeleteButtons = ({ handleCreateCard, handleDeleteCard }) => {
    return (
        <div className='addDeleteButtonsContainer'>
            <button onClick={handleCreateCard}>
                <AddIcon />
            </button>
            <button onClick={handleDeleteCard}>
                <DeleteOutlineIcon />
            </button>
        </div>
    );
}

export default AddDeleteButtons;