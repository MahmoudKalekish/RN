import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatBox from '../components/StatBox';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import Flag from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {
  const [totalIncome,setTotaIncome] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [totalExpense,setTotalExpense] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [numCategories, setNumCategories] = useState('');




  const fetchIncome = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.16.110:8000/api/income');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const totalAmount = data.reduce((acc, { amount }) => acc + parseFloat(amount), 0);
      setTotaIncome(totalAmount); // assuming you have a state variable called "totalIncome"
      setIncomes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.16.110:8000/api/expense');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const totalAmount = data.reduce((acc, { amount }) => acc + parseFloat(amount), 0);
      setTotalExpense(totalAmount); // assuming you have a state variable called "totalExpense"
      setExpenses(data); // save all expenses data to state
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.16.110:8000/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setNumCategories(data.length); // Set the number of categories in state
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchGoal = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.16.110:8000/api/goal');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }, []);


  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text1}>DASHBOARD</Text>
      <Text style={styles.text2}>Welcome to your dashboard</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.box4}>
        <StatBox
          title={`$${totalIncome}`}
          subtitle="Total Income"
          icon={
            <Ionicons
              name="cash-register"
              size={32}
              color="#3da58a"
            />
          }
        />
        </View>
        <View style={styles.box5}>
        <StatBox
          title={`$${totalExpense}`}
          subtitle="Total Expense"
          icon={
            <Ionicons
              name="receipt"
              size={32}
              color="#3da58a"
            />
          }
        />
        </View>
        <View style={styles.box5}>
        <StatBox
          title={`${numCategories}`}
          subtitle="Categories"
          icon={
            <Icon
              name="category"
              size={32}
              color="#3da58a"
            />
          }
        />
        </View>
        <View style={styles.box5}>
        <StatBox
          title={`$${totalIncome - totalExpense}`}
          subtitle="Profit"
          icon={
            <Flag
              name="flag"
              size={32}
              color="#3da58a"
            />
          }
        />
        </View>
        
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#141b2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginTop: 20,
    width: 360,
    height: '100%',
    marginBottom: 20,
    
  },
  text1: {
    color: '#e0e0e0',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 50,
  },
  text2: {
    color: '#70d8bd',
    fontSize: 20,
    marginBottom: 50,
  },
  box4:{
    backgroundColor: '#1f2a40',
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  box5:{
    marginTop: 20,
    backgroundColor: '#1f2a40',
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'

  }
});

export default HomeScreen;