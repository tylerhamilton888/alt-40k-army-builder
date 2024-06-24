// src/components/armyViewer/ArmyDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArmyById } from '../../services/armyService';

const ArmyDetails = () => {
  const { armyId } = useParams();
  const [army, setArmy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArmy = async () => {
      try {
        const armyData = await getArmyById(armyId);
        setArmy(armyData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchArmy();
  }, [armyId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!army) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{army.armyName}</h1>
      <p>Faction: {army.armyFaction === 1 ? 'Adeptus Custodes' : 'Grey Knights'}</p>
      <p>Total Points: {army.totalPoints}</p>
      <h2>Units</h2>
      {army.units.map((unit, index) => (
        <div key={index}>
          <h3>{unit.name} (x{unit.quantity})</h3>
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
      ))}
    </div>
  );
};

export default ArmyDetails;
