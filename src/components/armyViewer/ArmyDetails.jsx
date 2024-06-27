import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArmyById } from '../../services/armyService';
import { getFactionById } from '../../services/factionService';
import './ArmyDetails.css';

const ArmyDetails = () => {
  const { armyId } = useParams();
  const [army, setArmy] = useState(null);
  const [faction, setFaction] = useState('');
  const [visibleStats, setVisibleStats] = useState(null);

  useEffect(() => {
    const fetchArmy = async () => {
      try {
        const armyData = await getArmyById(armyId);
        setArmy(armyData);

        const factionData = await getFactionById(armyData.armyFaction);
        setFaction(factionData.factionName);
      } catch (error) {
        console.error('Failed to fetch army details:', error);
      }
    };

    fetchArmy();
  }, [armyId]);

  const toggleStats = (unitId) => {
    setVisibleStats(visibleStats === unitId ? null : unitId);
  };

  if (!army) {
    return <p>Loading army details...</p>;
  }

  return (
    <div className="army-details">
      <h1>{army.armyName}</h1>
      <h2>Faction: {faction}</h2>
      <h3>Total Points: {army.totalPoints}</h3>
      <div className="units-container">
        {army.units.map((unit, index) => (
          <div key={index} className="unit">
            <span>{unit.name}</span>
            <button onClick={() => toggleStats(unit.id)}>Toggle Stats</button>
            {visibleStats === unit.id && (
              <div className="unit-stats">
                <div className="stat">Movement: {unit.movement}</div>
                <div className="stat">Weapon Skill: {unit.weaponSkill}</div>
                <div className="stat">Ballistic Skill: {unit.ballisticSkill}</div>
                <div className="stat">Strength: {unit.strength}</div>
                <div className="stat">Toughness: {unit.toughness}</div>
                <div className="stat">Wounds: {unit.wounds}</div>
                <div className="stat">Initiative: {unit.initiative}</div>
                <div className="stat">Attacks: {unit.attacks}</div>
                <div className="stat">Leadership: {unit.leadership}</div>
                <div className="stat">Armor Save: {unit.armorSave}</div>
                <div className="stat">Points: {unit.points}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmyDetails;
