import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { GaugeComponent } from 'react-gauge-component';
import PropTypes from 'prop-types';

const GaugeChart = ({ value, min, max }) => {
  return (
    <div style={{ maxWidth: '100%', maxHeight:'100%', margin: '0 auto', textAlign: 'center' }}>
      <GaugeComponent 
        type="semicircle"
        value={value} 
        min={min} 
        max={max} 
        arc={{
          colorArray: ['#66B2FF', '#66D97F', '#FFBF47', '#F5727D'],
          padding: 0.01,
          width: 0.25,
          subArcs:
            [
              { limit: 25, label: 'Low' },
              { limit: 50 },
              { limit: 75 },
              { limit: 100}
            ]
        }}
        pointer={{type: "blob", animationDelay: 0, strokeWidth: 6}}
        labels={{
          valueLabel: {
            style: { fontSize: "40px", fill: "#333" },  // Customize label styles
            formatTextValue: (value) => `${value}`,      // Format the center value
          },
          tickLabels: {
           
            hideMinMax: true  // Optionally hide 0% and 100%
          },
          customArcLabels: [
            { position: 0.2, label: 'Very Low' },   // Custom label for low segment
            { position: 0.5, label: 'Moderate' },    // Custom label for medium segment
            { position: 0.8, label: 'Critical' },    // Custom label for high segment
          ]
        }}
      />
    </div>
  );
};

GaugeChart.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default GaugeChart;
