import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataCustomers } from "../../data/mockData";
import Header from "../../components/Header";
import { CircularProgress } from "@mui/material";

const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setTimeout(() => {
  setLoading(false);
  }, 2000);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "totalSpent",
      headerName: "Total Spent ($)",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
  ];

  const handleRowClick = (params) => {
    setSelectedCustomer(params.row);
    setOpen(true);
  };

  const filteredCustomers = mockDataCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px" >
          <CircularProgress sx={{ color: theme.palette.mode === "light" ? "#333" : "#ddd" }} />
        </Box>
      );
    }
  return (
    <Box m="20px">
      <Header title="CUSTOMERS" subtitle="List of customers and their spending" />

      {/* Search Box */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
            backgroundColor: "#151632",
            color: "white",
          }}
        />
      </Box>

      {/* Customers Table */}
      <Box height="75vh">
        <DataGrid
          checkboxSelection
          rows={filteredCustomers}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Box>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Customer Profile</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedCustomer.name}</Typography>
            <Typography>Email: {selectedCustomer.email}</Typography>
            <Typography>Total Spent: ${selectedCustomer.totalSpent.toLocaleString()}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Customers;
