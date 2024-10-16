import React from 'react';
import { Container } from 'react-bootstrap';
import ImageDisplay from './components/ImageDisplay';

function App() {
  return (
    <Container>
      <h1 className="text-center my-4">Image & Calorie Display</h1>
      <ImageDisplay />
    </Container>
  );
}

export default App;
