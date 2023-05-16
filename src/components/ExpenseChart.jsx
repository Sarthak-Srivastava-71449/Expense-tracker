import React, { useState } from "react";
import { registerables } from "chart.js";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./tracker.css";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [addExpense, setaddExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [editExpense, setEditExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const remainingAmount = totalAmount - expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  const handleInputChange = (e) => {
    setaddExpense({
      ...addExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = () => {
    if (addExpense.description.trim() === '' || addExpense.amount.trim() === '' || addExpense.date.trim() === '') {
      alert("Please fill all the fields")
      return; 
    }
    setExpenses([...expenses, addExpense]);
    setaddExpense({
      description: "",
      amount: "",
      date: "",
    });
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index) => {
    setEditExpense(index);
    setIsModalOpen(true);
  };

  const handleSaveEditExpense = () => {
    setExpenses(
      expenses.map((expense, index) =>
        index === editExpense ? { ...addExpense } : expense
      )
    );
    setIsModalOpen(false);
    setEditExpense(null);
    setaddExpense({
      description: "",
      amount: "",
      date: "",
    });
  };

  const chartData = {
    labels: ["Remaining Amount", ...expenses.map((expense) => expense.description)],
    datasets: [
      {
        label: "Expenses",
        data: [remainingAmount, ...expenses.map((expense) => expense.amount)],
        backgroundColor: ["#F78C37", "#0677BA", "#6A32A5", "#FFD827", "#D42A34"],
      },
    ],
  };
  


  return (
    <div>
      <Box mb={3} className="heading">
        <Typography variant="h3">Track Your Expenses</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        className="task_description"
      >
        <Box className="task_fields">
        <TextField
            name="date"
            label="Date"
            type="date"
            value={addExpense.date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="totalAmount"
            label="Total Amount"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
          />
          
         
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={addExpense.amount}
            onChange={handleInputChange}
          />
           <TextField
            name="description"
            label="Where did you spend?"
            value={addExpense.description}
            onChange={handleInputChange}
          />


          <Button variant="contained" onClick={handleAddExpense} style={{ background: "orange" }}>
            Add Expense
          </Button>
        </Box>

        <Box width="40%" height="" className="chart">
          <Pie data={chartData} />
        </Box>


      </Box>
      <Box mt={3} className="table_div">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Where did you spend?</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <EditIcon onClick={() => handleEditExpense(index)}>
                      Edit
                    </EditIcon>
                    <DeleteIcon onClick={() => handleDeleteExpense(index)}>
                      Delete
                    </DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>



      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5">Edit Expense</Typography>
          <TextField
            name="description"
            label="Description"
            value={addExpense.description}
            onChange={handleInputChange}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={addExpense.amount}
            onChange={handleInputChange}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={addExpense.date}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSaveEditExpense}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;