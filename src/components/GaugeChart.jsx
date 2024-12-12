import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { GaugeComponent } from 'react-gauge-component';
import PropTypes from 'prop-types';

const GaugeChart = ({ value, min, max, maintain, lose, gain, user }) => {
  const standardizedValue = standardizeValue(value, min, max);
  let thresholds = [];
  thresholds.push(lose);
  if(user < maintain){
    thresholds.push(user)
    thresholds.push(maintain)
  }
  else {
    thresholds.push(maintain);
    thresholds.push(user)
  }
  thresholds.push(gain)
  const calculatedSubArcs = calculateSubArcLimits(min, max, thresholds);
  return (
    <div style={{ maxWidth: '100%', maxHeight:'100%', margin: '0 auto', textAlign: 'center' }}>
      <GaugeComponent 
        type="semicircle"
        value={standardizedValue} 
        min={min} 
        max={max} 
        arc={{
          colorArray: ['#66B2FF', '#66D97F', '#FFBF47', '#F5727D'],
          padding: 0.01,
          width: 0.25,
          subArcs: calculatedSubArcs
            // [
            //   { limit: parseInt((2164.06-2000)/4000 * 100), label: 'Lose' }, // Calculate percentage for 'Lose'
            //   { limit: parseInt((2400-2000)/4000 * 100), label: 'Lose' }, // Calculate percentage for 'Lose'
            //   { limit: parseInt((2664.06-2000)/4000 * 100), label: 'Maintain' }, // Calculate percentage for 'Maintain'
            //   { limit: parseInt((3164.06-2000)/4000 * 100), label: 'Gain' }
            // ]
        }}
        pointer={{type: "blob", animationDelay: 0, strokeWidth: 6}}
        labels={{
          valueLabel: {
            style: { fontSize: "40px", fill: "#333" },  // Customize label styles
            formatTextValue: (value) => `${Math.round((value/100) * 4000 + 2000)}`,      // Format the center value
          },
          tickLabels: {
           
            hideMinMax: true  // Optionally hide 0% and 100%
          },
          ticks: [
            { value: 13 },
            { value: 22.5 },
            { value: 32 }
          ],
        }}
        // labels={{
        //   valueLabel: { formatTextValue: value => value },
        //   tickLabels: {
        //     type: 'outer',
        //     defaultTickValueConfig: { 
        //       formatTextValue: (value) => value ,
        //       style: {fontSize: 10}
        //   },
        //     ticks: [
        //       { value: 2000 },
        //       { value: 2200 },
        //       { value: 3200 }
        //     ],
        //   }
        // }}
      />
    </div>
  );
};

GaugeChart.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default GaugeChart;


function standardizeValue(value, min, max) {
  // Calculate the range of the input values
  const range = max - min;

  // Calculate the standardized value between 0 and 100
  const standardizedValue = ((value - min) / range) * 100;

  return standardizedValue;
}

function calculateSubArcLimits(min, max, thresholds) {
  const totalRange = max - min;
  const totalPercentage = thresholds.reduce((sum, threshold) => sum + (threshold - min) / totalRange * 100, 0);
  const scalingFactor = 100 / totalPercentage; 

  let cumulativePercentage = 0;
  const subArcs = thresholds.map((threshold) => {
    const percentage = (threshold - min) / totalRange * 100 * scalingFactor;
    cumulativePercentage += percentage;
    return { limit: cumulativePercentage }; 
  });

  // Round the last subArc's limit to 100
  subArcs[subArcs.length - 1].limit = 100; 

  return subArcs;
}