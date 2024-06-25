import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArmiesByUserId,  deleteArmyById } from '../../services/armyService';

const MyArmies = () => {
  const [armies, setArmies] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('game_user'));
    if (user) {
      setUserId(user.id);
      fetchArmies(user.id);
    }
  }, []);

  const fetchArmies = async (userId) => {
    const data = await getArmiesByUserId(userId);
    setArmies(data);
  };

  const handleDelete = async (armyId, armyName) => {
    if (window.confirm(`CONFIRM: Do you want to delete ${armyName}?`)) {
      const response = await deleteArmyById(armyId);
      if (response.ok) {
        fetchArmies(userId);
      } else {
        alert('Failed to delete army');
      }
    }
  };

  return (
    <div>
      <h1>My Armies</h1>
      {armies.length > 0 ? (
        armies.map((army) => (
          <div key={army.id}>
            <Link to={`/army/${army.id}`}>{army.armyName}</Link>
            <button onClick={() => handleDelete(army.id, army.armyName)}>Delete</button>
            <Link to={`/createarmy/${army.id}`}>Edit</Link>
          </div>
        ))
      ) : (
        <p>You have no armies.</p>
      )}
    </div>
  );
};

export default MyArmies;
