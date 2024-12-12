/* eslint-disable react/prop-types */
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { mockLineData as data } from "../data/mockData";

const LineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 40, bottom: 60, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            // stacked: false,
            // reverse: false
        }}
        // yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Calorie consumed',
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        
        lineWidth={2}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-15}
        enableTouchCrosshair={true}
        useMesh={true}
    />
  );
};

export default LineChart;
