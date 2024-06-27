import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getArmiesByUserId, deleteArmyById } from '../../services/armyService';
import './MyArmies.css';

const MyArmies = () => {
  const [armies, setArmies] = useState([]);
  const userId = JSON.parse(localStorage.getItem('game_user')).id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArmies = async () => {
      const userArmies = await getArmiesByUserId(userId);
      setArmies(userArmies);
    };

    fetchArmies();
  }, [userId]);

  const handleDelete = async (armyId) => {
    const confirmDelete = window.confirm('CONFIRM: Do you want to delete this army?');
    if (confirmDelete) {
      await deleteArmyById(armyId);
      setArmies(armies.filter((army) => army.id !== armyId));
    }
  };

  return (
    <div className="army-list">
      <h1>My Armies</h1>
      {armies.map((army) => (
        <div key={army.id} className="army-list-item">
          <Link to={`/army/${army.id}`}>{army.armyName}</Link>
          <button onClick={() => navigate(`/createarmy/${army.id}`)}>Edit</button>
          <button onClick={() => handleDelete(army.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyArmies;
