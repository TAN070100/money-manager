import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      router.push("/login"); // Redirect if not logged in
    } else {
      setUser(savedUser);
      loadTransactions(savedUser);
    }
  }, []);

  const loadTransactions = (user) => {
    const storedData = JSON.parse(localStorage.getItem(`transactions_${user}`)) || [];
    setTransactions(storedData);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user}`, JSON.stringify(updatedTransactions));
  };

  return (
    <div className="p-6 max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction Tracker</h2>
      <TransactionForm setTransactions={setTransactions} transactions={transactions} user={user} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
    </div>
  );
};

export default Dashboard;
