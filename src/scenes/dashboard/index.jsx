import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme, CircularProgress, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const [loading, setLoading] = useState(true);
  const totalRevenue = mockTransactions.reduce((acc, txn) => acc + parseFloat(txn.cost), 0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px" >
        <CircularProgress sx={{ color: theme.palette.mode === "light" ? "#333" : "#ddd" }} />
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
      <Box display="grid" gridTemplateColumns={isSmallScreen ? "repeat(2, 1fr)" : "repeat(12, 1fr)"} gridAutoRows="140px" gap="20px" width="100%" overflow="hidden">
        {/* ROW 1 */}
        <Box gridColumn={isSmallScreen ? "span 6" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="1,325,134" subtitle="Traffic Received" progress="0.80" increase="+43%" icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: isSmallScreen ? "20px" : "26px" }} />} />
        </Box>

        <Box gridColumn={isSmallScreen ? "span 6" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title={mockTransactions.length} subtitle="Number of Payments" progress="0.60" increase="+8%" icon={<MonetizationOnIcon sx={{ color: colors.greenAccent[600], fontSize: isSmallScreen ? "20px" : "26px" }} />} />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]} p={isSmallScreen ? "15px" : "0"}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant={isSmallScreen ? "h6" : "h5"} fontWeight="600" color={colors.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography variant={isSmallScreen ? "h4" : "h3"} fontWeight="bold" color={colors.greenAccent[500]}>
                {totalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: isSmallScreen ? "22px" : "26px", color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height={isSmallScreen ? "200px" : "250px"} width="100%">
            <LineChart isDashboard={true} isSmallScreen={isSmallScreen} />
          </Box>
        </Box>

        {/* RECENT TRANSACTIONS */}
        <Box gridColumn="span 6" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box key={`${transaction.txId}-${i}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px" flexDirection={isSmallScreen ? "column" : "row"}>
              <Box>
                <Typography color={colors.greenAccent[500]} variant={isSmallScreen ? "h6" : "h5"} fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>{transaction.user}</Typography>
              </Box>
              <Box color={colors.grey[100]} mt={isSmallScreen ? "10px" : "0"}>
                {transaction.date}
              </Box>
              <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
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
