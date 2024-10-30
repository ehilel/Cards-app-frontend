import React from 'react';
import styles from './ColorPicker.module.css';

const colors = ['orange', 'green', 'blue', 'purple'];

const ColorPicker = ({ selectedColor, onSelectColor }) => {
  return (
    <div className={styles.colorPicker}>
      {colors.map(color => (
        <span
          key={color}
          style={{
            backgroundColor: color,
            border: color === selectedColor ? '2px solid #000' : 'none',
          }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
