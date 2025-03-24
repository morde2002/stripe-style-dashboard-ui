import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TablePagination,
  CircularProgress, // ✅ Import CircularProgress
} from "@mui/material";
import Header from "../../components/Header"; // Import header component

// Mock Payment Data
const mockPayments = [
  { id: "txn_001", date: "2024-03-01", customer: "Alice Smith", amount: 12500, status: "succeeded" },
  { id: "txn_002", date: "2024-03-02", customer: "Bob Johnson", amount: 8500, status: "failed" },
  { id: "txn_003", date: "2024-03-03", customer: "Charlie Brown", amount: 4500, status: "succeeded" },
  { id: "txn_004", date: "2024-03-04", customer: "David Wilson", amount: 9500, status: "failed" },
  { id: "txn_005", date: "2024-03-05", customer: "Eva Davis", amount: 7300, status: "succeeded" },
];

const Payments = () => {
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // ✅ Hide spinner after 2 seconds
    }, 2000);
  }, []);

  // Filter payments based on status
  const filteredPayments = statusFilter === "all" ? mockPayments : mockPayments.filter((p) => p.status === statusFilter);

  // Handle pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box m="20px">
      <Header title="Payments" subtitle="Manage and track customer transactions" />

      {/* Status Filter Dropdown */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="succeeded">Succeeded</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
        </Select>
      </Box>

      {/* Show Spinner When Loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: "#151632" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Customer</strong></TableCell>
                <TableCell><strong>Amount ($)</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell style={{ color: payment.status === "succeeded" ? "green" : "red" }}>
                    {payment.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={filteredPayments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default Payments;
