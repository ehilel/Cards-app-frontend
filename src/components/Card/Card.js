import React, { useState } from 'react';
import styles from './Card.module.css';
import { updateCard, deleteCard } from '../../service/card';
import ColorPicker from '../ColorPicker/ColorPicker';

const Card = ({ card, setCards, cards }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(card.text);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const editCard = async (updatedCard) => {
        try {
            const response = await updateCard(card.id, updatedCard);
            setCards(cards.map(c => (c.id === card.id ? response.data : c)));
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    const removeCard = async () => {
        try {
            await deleteCard(card.id);
            console.log(card.id);
            setCards(cards.filter(c => c.id !== card.id));
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    return (
        <div className={styles.card} style={{ backgroundColor: card.color }}>
            <div class={styles.content} style={{ '--scrollbar-track-color': card.color }}>
                {isEditing ? (
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={() => {
                            editCard({ ...card, text });
                            setIsEditing(false);
                        }}
                        autoFocus
                        className={styles.textInput}
                    />
                ) : (
                    <div onClick={() => setIsEditing(true)}>{card.text}</div>
                )}
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => setShowColorPicker(!showColorPicker)}>🎨</button>
                {showColorPicker && (
                    <ColorPicker
                        selectedColor={card.color}
                        onSelectColor={(color) => {
                            editCard({ ...card, color });
                            setShowColorPicker(false);
                        }}
                    />
                )}
                <button onClick={removeCard}>🗑️</button>
            </div>
        </div>
    );
};

export default Card;
