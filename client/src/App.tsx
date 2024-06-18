import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogOn from './Pages/LogOn';
import ItemList from './Pages/ItemList';

function App() {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null) as any;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/getUserInfo');
      const jsonResult = await result.json();

      setUsers(jsonResult);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogOn users={users} setUserInfo={setUserInfo} />} />
            <Route path="/items" element={<ItemList users={users} userInfo={userInfo} setUserInfo={setUserInfo} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
