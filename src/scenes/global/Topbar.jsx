import { useState, useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { ColorModeContext, tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useMediaQuery } from "@mui/material";


const Topbar = ({ handleSidebarToggle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // Auto-detect screen size

  const [searchQuery, setSearchQuery] = useState("");
  const [openSettings, setOpenSettings] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("Searching for:", event.target.value); // ✅ This logs search queries for now
  };

  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.mode === "dark" 
          ? "rgba(31, 42, 64, 0.7)"  // Keep dark mode styling
          : "rgba(255, 255, 255, 0.8)", // Light mode: Soft white with transparency
        backdropFilter: "blur(10px)", // More blur for a polished effect
        boxShadow: theme.palette.mode === "light" 
          ? "0px 4px 10px rgba(0, 0, 0, 0.1)" // Subtle shadow in light mode
          : "none", // No shadow in dark mode
        zIndex: 1100,
      }}      
    >

      {/* SEARCH BAR */}
      <Box
        display="flex"
        alignItems="center"
        backgroundColor={colors.primary[400]}
        borderRadius="30px"
        p={1}
        sx={{
          width: "180px",
          minWidth: "150px",
          marginLeft: "40px",
          marginRight: "10px",
        }}
      >
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            color: "white",
            padding: "5px",
            width: "100%",
          }}
        />
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>

        {/* SETTINGS DROPDOWN */}
        <Box
          position="relative"
          onMouseEnter={() => setOpenSettings(true)}
          onMouseLeave={() => setOpenSettings(false)}
        >
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          {openSettings && (
            <Box
              position="absolute"
              top="40px"
              right="0"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              boxShadow="0px 0px 10px rgba(0,0,0,0.2)"
              p="10px"
              width="150px"
              zIndex="1000"
            >
              <p
                style={{
                  color: theme.palette.mode === "light" ? colors.primary[100] : "white", // Darker color in light mode
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Account Settings
              </p>
              <p
                style={{
                  color: theme.palette.mode === "light" ? colors.primary[100] : "white", // Darker color in light mode
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Privacy Settings
              </p>
            </Box>
          )}
        </Box>

        {/* PROFILE DROPDOWN */}
        <Box
          position="relative"
          onMouseEnter={() => setOpenProfile(true)}
          onMouseLeave={() => setOpenProfile(false)}
        >
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
          {openProfile && (
            <Box
              position="absolute"
              top="40px"
              right="0"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              boxShadow="0px 0px 10px rgba(0,0,0,0.2)"
              p="10px"
              width="150px"
              zIndex="1000"
            >
              <p
                style={{
                  color: theme.palette.mode === "light" ? colors.primary[100] : "white", // Darker color in light mode
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                View Profile
              </p>
              <p
                style={{
                  color: theme.palette.mode === "light" ? colors.primary[100] : "white", // Darker color in light mode
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </p>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
