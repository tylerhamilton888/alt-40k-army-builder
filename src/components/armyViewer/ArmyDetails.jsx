import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArmyById, deleteArmyById } from '../../services/armyService';

const ArmyDetails = () => {
  const { armyId } = useParams();
  const navigate = useNavigate();
  const [army, setArmy] = useState(null);
  const [visibleStats, setVisibleStats] = useState(null);

  useEffect(() => {
    const fetchArmy = async () => {
      try {
        const armyData = await getArmyById(armyId);
        setArmy(armyData);
      } catch (error) {
        console.error('Failed to fetch army details:', error);
      }
    };

    fetchArmy();
  }, [armyId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`CONFIRM: Do you want to delete ${army.armyName}?`);
    if (confirmDelete) {
      try {
        await deleteArmyById(armyId);
        alert('Army deleted successfully');
        navigate('/myarmies');
      } catch (error) {
        alert('Failed to delete army');
        console.error('Failed to delete army:', error);
      }
    }
  };

  const toggleStats = (unitId) => {
    setVisibleStats(visibleStats === unitId ? null : unitId);
  };

  if (!army) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{army.armyName}</h1>
      <p>Faction: {army.armyFactionName}</p>
      <h2>Units:</h2>
      {army.units.map((unit, index) => (
        <div key={index}>
          <span>{unit.name}</span>
          <button onClick={() => toggleStats(unit.id)}>Toggle Stats</button>
          {visibleStats === unit.id && (
            <div>
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
        </div>
      ))}
      <button onClick={() => navigate(`/createarmy/${armyId}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ArmyDetails;
