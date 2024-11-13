import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
  StatBox,
  LineChart,
  ProgressCircle,
  BarChart,
  GeographyChart,
  PieChart,
  GaugeChart
} from "../../components";
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { mockTransactions, mockDailyCalorie } from "../../data/mockData";


function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Hello, Sana" subtitle="Let's start eating healthy from now on" />
        <select justifyContent="right">
        <option value="Last Week">Last Week</option>
        <option value="Last Month">Last Month</option>
      </select>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="5px"
      >
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="15px"
        >
          <Box height="300px" mt="-150px">
            {/* <Box> */}
          {/* <select value=
          {dateRange} onChange={(e) => setDateRange(e.target.value)}> */}
          {/* <ResponsiveRadialBar
        data={data}
        startAngle={-90}
        endAngle={90}
        margin={{ top: 10, bottom: -200 }}
        cornerRadius={4}
        circularAxisOuter={null}
        enableTracks={true}
        colors={(dat) => dat.data.color}
        maxValue={100}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        innerRadius={0.50}
        enableLabels={true}
        label="value"
        labelsRadiusOffset={0.5}
        tooltip={(x) => {
          return (
            <div style={{ backgroundColor: "white", padding: 8 }}>
              {x.bar.data.tip}: {x.bar.data.y}
            </div>
          );

          return null;
        }}
        layers={["grid", "tracks", "bars", "labels", "legends"]}
      /> */}
      <GaugeChart />
          </Box>
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="15px"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="15px"
          >
            <ProgressCircle size="100" />
          </Box>
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="15px"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="15px"
          >
            <ProgressCircle size="100" />
          </Box>
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="15px"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="15px"
          >
            <ProgressCircle size="100" />
          </Box>
        </Box>
        {/* Line Chart */}
        <Box
          gridColumn={
            isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
          }
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
          {/* <Box
            mt="25px"
            px="30px"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
          </Box> */}
          <Box height="300px" mt="-20px">
          {/* <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}> */}
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Revenue Details */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" textAlign="center">
            Macronutrients Breakdown
          </Typography>
          <PieChart />
        </Box>

        {/* Transaction Data */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Daily Recap
            </Typography>
          </Box>

          {mockTransactions.map((transaction, index) => (
            <Box
              key={`${transaction.txId}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
              </Box>
              <Typography color={colors.gray[100]}>
                {transaction.date}
              </Typography>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Transaction Data */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Daily Calories
            </Typography>
          </Box>

          {mockDailyCalorie.map((transaction, index) => (
            <Box
              key={`${transaction.type}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.type}
                </Typography>
                <Typography color={colors.gray[100]}>
                  {transaction.name}
                </Typography>
              </Box>
              <Box
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.intake}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Statistic Items */}
        {/* <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="11,361"
            subtitle="Email Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <Email
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <Traffic
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ---------------- Row 2 ---------------- */}

        

        {/* Bar Chart */}
        {/* <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="250px"
            mt="-20px"
          >
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}

        {/* Geography Chart */}
        {/* <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography variant="h5" fontWeight="600" mb="15px">
            Geography Based Traffic
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="200px"
          >
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}

export default Dashboard;
