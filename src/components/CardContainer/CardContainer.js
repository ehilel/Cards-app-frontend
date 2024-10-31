import React, { useState, useEffect } from 'react';
import styles from './CardContainer.module.css';
import {getCards, createCard, updateCard, deleteCard} from '../../service/card';
import Card from '../Card/Card';

const CardContainer = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getCards();
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  const addCard = async () => {
    const newCard = { text: 'New Card', color: 'green' };
    try {
      const response = await createCard(newCard);
      setCards([...cards, response.data]);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const editCard = async (id, updatedCard) => {
    console.log(updatedCard)
    console.log(id)
    try {
        const response = await updateCard(id, updatedCard);
        console.log(response.data)
        setCards(cards.map(c => (c.id === id ? response.data : c)));
    } catch (error) {
        console.error('Error updating card:', error);
    }
};

const removeCard = async (id) => {
    try {
      await deleteCard(id);
        setCards(cards.filter(c => c.id !== id));
    } catch (error) {
        console.error('Error deleting card:', error);
    }
};

  return (
    <div className={styles.cardContainer}>
      {cards.map(card => (
        <Card key={card.id} card={card} editCard={editCard} removeCard={removeCard} />
      ))}
      <button onClick={addCard}>+</button>
    </div>
  );
};

export default CardContainer;
