import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockGaugeData as data } from "../data/mockData";

const GaugeChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveRadialBar
      
        data={data}
        valueFormat=" >-.2f"
        startAngle={-90}
        endAngle={90}
        innerRadius={0.4}
        padding={0.3}
        cornerRadius={4}
        maxValue={5000}
        margin={{bottom: -1925}}
        // colors={['#007BFF', '#28A745','#FFA500','#DC3545']}
        colors={({ value }) => {
          // Color based on value (this can be customized)
          if (value <= 1925) return '#66B2FF';    // Blue
          if (value <= 2425) return '#66D97F ';    // Green
          if (value <= 3750) return '#FFBF47';    // Orange
          return '#F5727D';  // Red
        }}
        theme={{
          // Customize text, labels, etc.
          labels: {
            text: { fontSize: 12, fill: '#333' }
          }
        }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1
                ]
            ]
        }}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        // circularAxisInner={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        circularAxisInner={null}
        circularAxisOuter={null}
        enableLabels={true}
        label="value"
        labelsRadiusOffset={0.5}
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 30,
        //         translateY: -100,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 18,
        //         itemTextColor: '#999',
        //         symbolSize: 18,
        //         symbolShape: 'circle',
        //         data: [
        //           { id: 'Low', label: 'Low', color: '#66B2FF' },
        //           { id: 'Medium', label: 'Medium', color: '#66D97F' },
        //           { id: 'High', label: 'High', color: '#FFBF47' },
        //           { id: 'Critical', label: 'Critical', color: '#F5727D' },
        //         ]
        //     }
        // ]}
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'row',
        //     justify: false,
        //     translateY: 30,
        //     itemsSpacing: 0,
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemDirection: 'left-to-right',
        //     symbolSize: 20,
        //     symbolShape: 'circle',
        //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     // Mapping of legend items to colors
        //     data: [
        //       { id: 'Low', label: 'Low', color: '#66B2FF' },
        //       { id: 'Medium', label: 'Medium', color: '#66D97F' },
        //       { id: 'High', label: 'High', color: '#FFBF47' },
        //       { id: 'Critical', label: 'Critical', color: '#F5727D' },
        //     ]
        //   }
        // ]}
    />
  );
};

export default GaugeChart;
