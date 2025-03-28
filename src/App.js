import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaFileExport, FaTrash } from 'react-icons/fa';

const TransactionTracker = () => {
  // Authentication State
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');

  // Transaction State
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Other'];

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(savedUser);
      loadTransactions(savedUser);
    }
  }, []);

  const loadTransactions = (user) => {
    const storedData = JSON.parse(localStorage.getItem(`transactions_${user}`)) || [];
    setTransactions(storedData);
  };

  // Authentication Functions
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]?.password === password) {
      localStorage.setItem('currentUser', username);
      setUser(username);
      loadTransactions(username);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials');
    }
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      setAuthError('Username already exists');
      return;
    }
    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    setAuthError('');
    setIsRegistering(false);
    alert('Registration successful! Please login.');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setTransactions([]);
  };

  // Transaction Functions
  const addTransaction = () => {
    if (!amount) return;
    const newTransaction = { amount, category, type, date };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user}`, JSON.stringify(updatedTransactions));
    setAmount('');
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user}`, JSON.stringify(updatedTransactions));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        {!user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isRegistering ? 'Register' : 'Login'}
            </h2>
            {authError && <p className="text-red-600">{authError}</p>}
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border rounded mb-2" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" />
            <button onClick={isRegistering ? handleRegister : handleLogin} className="w-full bg-blue-500 text-white py-2 rounded mb-2">
              {isRegistering ? 'Register' : 'Login'}
            </button>
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 text-sm">
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Transaction Tracker</h2>
            <button onClick={handleLogout} className="bg-red-500 text-white py-1 px-3 rounded mb-2">Logout</button>
            <div className="mb-4">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" className="w-full p-2 border rounded mb-2" />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded mb-2">
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded mb-2">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full p-2 border rounded mb-2" />
              <button onClick={addTransaction} className="w-full bg-green-500 text-white py-2 rounded">Add Transaction</button>
            </div>
            <h3 className="text-lg font-semibold">Transactions</h3>
            <ul>
              {transactions.map((t, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                  {t.date} - {t.category} - {t.type} - ₹{t.amount}
                  <FaTrash onClick={() => deleteTransaction(index)} className="text-red-500 cursor-pointer" />
                </li>
              ))}
            </ul>
            <button onClick={exportToExcel} className="mt-4 bg-blue-500 text-white py-2 rounded flex items-center">
              <FaFileExport className="mr-2" /> Export to Excel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTracker;
