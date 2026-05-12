import { useState, useEffect } from 'react';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) setTransactions(storedTransactions);
  }, []);

  const addTransaction = () => {
    const newTransaction = { amount: Number(amount), category, description };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const calculateSummary = () => {
    const income = transactions.reduce((acc, t) => acc + (t.amount > 0 ? t.amount : 0), 0);
    const expenses = transactions.reduce((acc, t) => acc + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
    return { income, expenses, balance: income - expenses };
  };

  const { income, expenses, balance } = calculateSummary();

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>Expense Tracker</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Amount: 
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Category: 
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Description: 
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <div>
        <h2>Summary</h2>
        <p>Total Income: {income}</p>
        <p>Total Expenses: {expenses}</p>
        <p>Balance: {balance}</p>
      </div>
      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((t, index) => (
            <li key={index}>
              {t.amount} - {t.category} - {t.description}
              <button onClick={() => deleteTransaction(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}