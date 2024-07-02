import { useState, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/nav/NavBar';
import MyArmies from '../components/armyViewer/MyArmies';
import CreateArmy from '../components/armyCreator/CreateArmy';
import ArmyDetails from '../components/armyViewer/ArmyDetails';
import QuoteRandomizer from '../components/quoteGenerator/QuoteRandomizer';
import DevMode from '../components/devmode/DevMode';  


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('game_user'));
    setCurrentUser(user);
  }, []);

  return (
    <>
      <NavBar />
      <QuoteRandomizer />
      <Routes>
        <Route path="/home" element={<Home currentUser={currentUser} />} />
        <Route path="/myarmies" element={<MyArmies />} />
        <Route path="/createarmy" element={<CreateArmy />} />
        <Route path="/createarmy/:armyId" element={<CreateArmy />} />
        <Route path="/army/:armyId" element={<ArmyDetails />} />
        {currentUser && currentUser.isDev && (
          <Route path="/devmode" element={<DevMode />} />
        )}
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

