import React from 'react';
import { Container, Image } from 'react-bootstrap';
import CalorieRow from './CalorieRow';

const ImageDisplay = () => {
  const imageUrl = 'https://i.pinimg.com/originals/d2/e2/e6/d2e2e62bc22bead43c8e20aeac029593.jpg';

  const calorieData = [
    { label: 'Protein', value: 0.26},
    { label: 'Carbohydrates', value: 25 },
    { label: 'Fats', value: 0.17 },
    { label: 'Sugars', value: 19 }
  ];

  return (
    <Container className="my-4">
      <Image src={imageUrl} fluid className="mb-4" />
      {calorieData.map((calorie, index) => (
        <CalorieRow key={index} label={calorie.label} value={calorie.value} />
      ))}
    </Container>
  );
};

export default ImageDisplay;