import { useState, useEffect } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate data fetching
  }, []);

  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {loading ? (
          <CircularProgress size={50} sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />
        ) : (
          <GeographyChart />
        )}
      </Box>
    </Box>
  );
};

export default Geography;
