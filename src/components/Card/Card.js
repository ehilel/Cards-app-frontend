import React, { useState } from 'react';
import styles from './Card.module.css';
import ColorPicker from '../ColorPicker/ColorPicker';

const Card = ({ card, editCard, removeCard }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(card.text);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleEditCard = (updatedCard) => {
        console.log(updatedCard)
        console.log(card.id)
        editCard(card.id, updatedCard)
    };
    
    const handleRemoveCard = () => {
        removeCard(card.id);
    };
    // const editCard = async (updatedCard) => {
    //     try {
    //         const response = await updateCard(card.id, updatedCard);
    //         setCards(cards.map(c => (c.id === card.id ? response.data : c)));
    //     } catch (error) {
    //         console.error('Error updating card:', error);
    //     }
    // };

    const selectColor = (color) => {
        handleEditCard({ ...card, color });
        setShowColorPicker(false);
    };

    return (
        <div className={styles.card} style={{ backgroundColor: card.color }}>
            <div >
                {isEditing ? (
                    <textarea 
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={() => {
                            handleEditCard({ ...card, text });
                            setIsEditing(false);
                        }}
                        autoFocus
                        className={styles.textInput}
                        style={{ '--scrollbar-track-color': card.color }}
                    />
                ) : (
                    <div className={styles.content} style={{ '--scrollbar-track-color': card.color }}
                    onClick={() => setIsEditing(true)}>{card.text}</div>
                )}
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => setShowColorPicker(!showColorPicker)}>🎨</button>
                {showColorPicker && (
                    <ColorPicker
                        selectedColor={card.color}
                        onSelectColor={selectColor}
                    />
                )}
                <button onClick={handleRemoveCard}>🗑️</button>
            </div>
        </div>
    );
};

export default Card;
