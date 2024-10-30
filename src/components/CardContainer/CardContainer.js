import React, { useState, useEffect } from 'react';
import styles from './CardContainer.module.css';
import {getCards, createCard} from '../../service/card';
import Card from '../Card/Card';

const CardContainer = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await getCards();
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
console.log(cards);
  const addCard = async () => {
    const newCard = { text: 'New Card', color: 'green' };
    try {
      const response = await createCard(newCard);
      setCards([...cards, response.data]);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
    <div className={styles.cardContainer}>
      {cards.map(card => (
        <Card key={card.id} card={card} setCards={setCards} cards={cards} />
      ))}
      <button onClick={addCard}>+</button>
    </div>
  );
};

export default CardContainer;
