import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import styles from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  return (
    <button className={styles.buttonBack} onClick={handleBackButtonClick}>
      <TiArrowBackOutline /> Back
    </button>
  );
};

export default BackButton;
