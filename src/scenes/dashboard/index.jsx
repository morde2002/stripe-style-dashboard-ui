import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"; // Ensure your theme has proper colors for light and dark mode
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Assuming tokens have light and dark mode color adjustments
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const [loading, setLoading] = useState(true);
  const totalRevenue = mockTransactions.reduce((acc, txn) => acc + parseFloat(txn.cost), 0);

  useEffect(() => {
    setTimeout(() => {
    setLoading(false);
    }, 2000); // Simulating a 2-second loading delay
    }, []);

    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          position="fixed"
          top={0}
          left={0}
          zIndex={9999}
          bgcolor="rgba(255, 255, 255, 0.8)" // Optional background overlay
        >
          <CircularProgress sx={{ color: colors.greenAccent[500] }} />
        </Box>
      );
    }
    

  return (
    <Box m={isSmallScreen ? "10px" : "20px"}>
      {/* HEADER */}
      <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"} justifyContent="space-between" alignItems="center">
        <Header title="Hello," subtitle="Welcome to your dashboard" />

        <Box mt={isSmallScreen ? "10px" : "0"}>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: isSmallScreen ? "12px" : "14px",
              fontWeight: "bold",
              padding: isSmallScreen ? "8px 16px" : "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "5px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isSmallScreen ? "repeat(2, 1fr)" : "repeat(12, 1fr)"}
        gridAutoRows="140px"
        gap="20px"
        width="100%"
        overflow="hidden"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={isSmallScreen ? "span 6" : "span 3"} // Ensure both boxes take equal width on small screens
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={isSmallScreen ? "10px" : "0"}
          overflow="hidden"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: isSmallScreen ? "20px" : "26px" }}
              />
            }
            progressBarProps={{
              sx: {
                width: "100%", // Ensure progress bar spans the full width available
                height: isSmallScreen ? "6px" : "10px",
              },
            }}
          />
        </Box>

        <Box
          gridColumn={isSmallScreen ? "span 6" : "span 3"} // Ensure both boxes take equal width on small screens
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={isSmallScreen ? "10px" : "0"}
        >
          <StatBox
            title={mockTransactions.length}
            subtitle="Number of Payments"
            progress="0.60"
            increase="+8%"
            icon={
              <MonetizationOnIcon sx={{ color: colors.greenAccent[600], fontSize: isSmallScreen ? "20px" : "26px" }} />
            }
            progressBarProps={{
              sx: {
                width: "100%", // Ensure progress bar spans the full width available
                height: isSmallScreen ? "6px" : "10px",
              },
            }}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3" // Moves it to the second row
          backgroundColor={colors.primary[400]}
          p={isSmallScreen ? "15px" : "0"}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant={isSmallScreen ? "h6" : "h5"}
                fontWeight="600"
                color={colors.grey[100]} // Adjust the color for better visibility in light mode
              >
                Revenue Generated
              </Typography>
              <Typography
                variant={isSmallScreen ? "h4" : "h3"}
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {totalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: isSmallScreen ? "22px" : "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height={isSmallScreen ? "200px" : "250px"} width="100%">
            <LineChart isDashboard={true} isSmallScreen={isSmallScreen} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2" // Moves it to the second row
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              flexDirection={isSmallScreen ? "column" : "row"}
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]} // Consider adjusting for light/dark mode
                  variant={isSmallScreen ? "h6" : "h5"}
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]} mt={isSmallScreen ? "10px" : "0"}>
                {transaction.date}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
