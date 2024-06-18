import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/nav/NavBar.jsx';
import { useState, useEffect } from 'react';

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('game_user'));
    setCurrentUser(user);
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home currentUser={currentUser} />} />
        <Route path="/myarmies" element={<MyArmies />} />
        <Route path="/createarmy" element={<CreateArmy />} />
        {/* Add more routes here as needed */}
      </Routes>
      <Outlet />
    </>
  );
};

const Home = ({ currentUser }) => {
  if (!currentUser) {
    return <h1>Loading...</h1>;
  }
  return <h1>Welcome, {currentUser.username}</h1>;
};

const MyArmies = () => {
  return <h1>My Armies</h1>;
};

const CreateArmy = () => {
  return <h1>Create Army</h1>;
};
