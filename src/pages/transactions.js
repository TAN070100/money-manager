import { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import { useRouter } from "next/router";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();
  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const storedTransactions = JSON.parse(localStorage.getItem(`transactions_${user}`)) || [];
      setTransactions(storedTransactions);
    }
  }, []);

  return (
    <div className="p-6 max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction History</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
