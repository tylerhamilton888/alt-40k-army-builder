import React, { useEffect, useState } from 'react';
import { getArmiesByUserId } from '../../services/armyService';
import { useNavigate } from 'react-router-dom';

const MyArmies = () => {
  const [armies, setArmies] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('game_user'));
    setActiveUser(user);

    const fetchArmies = async () => {
      if (user) {
        const userArmies = await getArmiesByUserId(user.id);
        setArmies(userArmies);
      }
    };

    fetchArmies();
  }, []);

  const handleEdit = (armyId) => {
    navigate(`/createarmy/${armyId}`);
  };

  return (
    <div>
      <h1>My Armies</h1>
      {armies.map(army => (
        <div key={army.id}>
          <h2>{army.armyName}</h2>
          <p>Total Points: {army.totalPoints}</p>
          <button onClick={() => handleEdit(army.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default MyArmies;
