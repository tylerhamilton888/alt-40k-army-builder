import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArmyById } from '../../services/armyService';
import '../../App.css';

const ArmyDetails = () => {
  const { armyId } = useParams();
  const navigate = useNavigate();
  const [army, setArmy] = useState(null);
  const [showAllStats, setShowAllStats] = useState(false);

  useEffect(() => {
    const fetchArmy = async () => {
      const armyData = await getArmyById(armyId);
      setArmy(armyData);
    };
    fetchArmy();
  }, [armyId]);

  const toggleAllStats = () => {
    setShowAllStats((prevShowAllStats) => !prevShowAllStats);
  };

  if (!army) {
    return <p>Loading...</p>;
  }

  return (
    <div className="army-details-container">
      <h1>{army.armyName}</h1>
      <h2>Faction: {army.armyFaction}</h2>
      <h3>Total Points: {army.totalPoints}</h3>
      <button onClick={toggleAllStats}>
        {showAllStats ? 'Hide All Stats' : 'Display Unit Stats'}
      </button>
      <ul className="army-units">
        {army.units.map((unit, index) => (
          <li key={index}>
            <span>{unit.name}</span>
            {showAllStats && (
              <div className="stats">
                <p>Movement: {unit.movement}</p>
                <p>Weapon Skill: {unit.weaponSkill}</p>
                <p>Ballistic Skill: {unit.ballisticSkill}</p>
                <p>Strength: {unit.strength}</p>
                <p>Toughness: {unit.toughness}</p>
                <p>Wounds: {unit.wounds}</p>
                <p>Initiative: {unit.initiative}</p>
                <p>Attacks: {unit.attacks}</p>
                <p>Leadership: {unit.leadership}</p>
                <p>Armor Save: {unit.armorSave}</p>
                <p>Points: {unit.points}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/myarmies')}>Back to My Armies</button>
    </div>
  );
};

export default ArmyDetails;
