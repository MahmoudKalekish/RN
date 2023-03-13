import React, { useCallback, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
// import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
// import FlagIcon from '@mui/icons-material/Flag';
import Header from '../../components/Header';
// import BarChart from '../../components/BarChart';
// import StatBox from '../../components/StatBox';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import CategoryIcon from '@mui/icons-material/Category';
// import PieChart from '../../components/PieChart';
// import LineChartComponent from '../../components/LineChart';

export const Dashboard = () =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalIncome, setTotaIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  const [numCategories, setNumCategories] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const fetchIncome = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/income');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const totalAmount = data.reduce((acc, { amount }) => acc + parseFloat(amount), 0);
      setTotaIncome(totalAmount); // assuming you have a state variable called "totalIncome"
      setIncomes(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/expense');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const totalAmount = data.reduce((acc, { amount }) => acc + parseFloat(amount), 0);
      setTotalExpense(totalAmount); // assuming you have a state variable called "totalExpense"
      setExpenses(data); // save all expenses data to state
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setNumCategories(data.length); // Set the number of categories in state
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchGoal = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/goal');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  return (
    
    <View style={{ margin: 20 }}>
      {/* HEADER */}
      <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </View>

      {/* GRID & CHARTS */}
      <View style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '140px', gap: 20 }}>
        {/* ROW 1 */}
        <View style={{ gridColumn: 'span 3', backgroundColor: colors.primary[400], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StatBox
            title={`$${totalIncome}`}
            subtitle="Total Income"
            progress="0.75"
            increase="+14%"
            icon={
              <PointOfSaleIcon
                style={{ color: colors.greenAccent[600], fontSize: 26 }}
              />
            }
          />
        </View>
        <View style={{ gridColumn: 'span 3', backgroundColor: colors.primary[400], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StatBox
            title={`$${totalExpense}`}
            subtitle="Total Expense"
            progress="0.50"
            increase="+21%"
            icon={
              <ReceiptIcon
                style={{ color: colors.greenAccent[600], fontSize: 26 }}
              />
            }
          />
        </View>
        <View style={{ gridColumn: 'span 3', backgroundColor: colors.primary[400], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StatBox
            title={`${numCategories}`}
            subtitle="Categories"
            icon={
              <CategoryIcon
                style={{ color: colors.greenAccent[600], fontSize: 26 }}
              />
            }
          />
        </View>
        <View style={{ gridColumn: 'span 3', backgroundColor: colors.primary[400], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StatBox
            title={`$${totalIncome - totalExpense}`}
            subtitle="Profit"
            progress="0.80"
            increase="+43%"
            icon={
              <FlagIcon
                style={{ color: colors.greenAccent[600], fontSize: 26 }}
              />
            }
          />
        </View>
</View>
</View>
  )}