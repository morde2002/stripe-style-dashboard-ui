import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";

const LineChart = ({ isCustomLineColors = false, isDashboard = false, isSmallScreen = false }) => {  // ✅ Accept isSmallScreen prop
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100], fontSize: isSmallScreen ? 10 : 12 }, // ✅ Reduce font size on small screens
          },
        },
        legends: { text: { fill: colors.grey[100], fontSize: isSmallScreen ? 10 : 12 } }, // ✅ Adjust legend size
        tooltip: { container: { color: colors.primary[500] } },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{
        top: isSmallScreen ? 30 : 50,   // ✅ Reduce margin on small screens
        right: isSmallScreen ? 50 : 110,
        bottom: isSmallScreen ? 30 : 50,
        left: isSmallScreen ? 40 : 60,
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: isSmallScreen ? 3 : 5,
        tickRotation: isSmallScreen ? -30 : -45, // ✅ Rotate text on small screens to fit better
        tickValues: isSmallScreen ? "every 2" : "every 4", // ✅ Reduce tick density
        legend: isDashboard ? undefined : "transportation",
        legendOffset: isSmallScreen ? 20 : 36, // ✅ Move legend up for small screens
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: isSmallScreen ? 3 : 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: isSmallScreen ? -30 : -40, // ✅ Adjust position on small screens
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={isSmallScreen ? 6 : 8} // ✅ Smaller points on small screens
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: isSmallScreen ? "row" : "column", // ✅ Make legend horizontal on small screens
          justify: false,
          translateX: isSmallScreen ? 0 : 100,
          translateY: isSmallScreen ? 30 : 0,
          itemsSpacing: isSmallScreen ? 5 : 0,
          itemDirection: "left-to-right",
          itemWidth: isSmallScreen ? 60 : 80, // ✅ Smaller legend items on small screens
          itemHeight: 15,
          itemOpacity: 0.75,
          symbolSize: isSmallScreen ? 8 : 12, // ✅ Reduce symbol size on small screens
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 },
            },
          ],
        },
      ]}
    />
  );
};


export default LineChart;
