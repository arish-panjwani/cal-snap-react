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
        maxValue={100}
        margin={{ top: 10, bottom: -200}}
        colors={{ scheme: 'nivo' }}
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
        //         anchor: 'right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 80,
        //         translateY: 0,
        //         itemsSpacing: 6,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 100,
        //         itemHeight: 18,
        //         itemTextColor: '#999',
        //         symbolSize: 18,
        //         symbolShape: 'square',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
  );
};

export default GaugeChart;
