import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate data fetching
  }, []);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />

      <Box height="75vh" display="flex" justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress size={50} sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />
        ) : (
          <LineChart />
        )}
      </Box>
    </Box>
  );
};

export default Line;
