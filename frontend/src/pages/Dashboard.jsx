import { Balance } from "../components/Balance";
import { Navbar } from "../components/Navbar";
import { Inputbox } from "../components/Inputbox";
import { User } from "../components/User";
import { useEffect, useState } from "react";
import axios from "axios";


export function Dashboard() {



  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // store initial data
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState(0);

  // Fetch all users on mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk", {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setUsers(res.data.user);
      setAllUsers(res.data.user);
    }).catch(err => console.error(err));
  }, []);


  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setBalance(res.data.balance)
    }).catch(err => console.error(err));
  }, []);



  // Debounced filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!filter.trim()) {
        // if filter is empty → restore all users
        setUsers(allUsers);
        return;
      }

      axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      }).then(res => {
        setUsers(res.data.user);
      }).catch(err => {
        console.error(err);
        setUsers([]); // no results
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [filter, allUsers]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center py-6">
      {/* Card Container */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Balance */}
        <Balance balance={balance} />

        {/* Users Section */}
        <div className="px-6 pb-6">
          <h2 className="font-bold text-lg mb-4 text-gray-800">Users</h2>

          {/* Search */}
          <Inputbox type="text"
            placeholder="Search users..." onChange={(e) => setFilter(e.currentTarget.value)} />

          {/* User List */}
          <div className="space-y-4">
            <User users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}
