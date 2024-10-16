import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const CalorieRow = ({ label, value }) => {
  return (
    <Row className="py-2">
      <Col md={6}><strong>{label}</strong></Col>
      <Col md={6}>{value} kcal</Col>
    </Row>
  );
};

CalorieRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CalorieRow;