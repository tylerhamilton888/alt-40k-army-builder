import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArmyById } from '../../services/armyService';
import './ArmyDetails.css';

const ArmyDetails = () => {
  const { armyId } = useParams();
  const [army, setArmy] = useState(null);
  const [visibleStats, setVisibleStats] = useState(null);

  useEffect(() => {
    const fetchArmy = async () => {
      const armyData = await getArmyById(armyId);
      setArmy(armyData);
    };
    fetchArmy();
  }, [armyId]);

  const toggleStats = (unitId) => {
    setVisibleStats(visibleStats === unitId ? null : unitId);
  };

  if (!army) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="army-details">
      <h2>{army.armyName}</h2>
      <p>Faction: {army.factionName}</p>
      <h3>Units:</h3>
      {army.units.map(unit => (
        <div key={unit.id} className="unit">
          <span>{unit.name}</span>
          <button onClick={() => toggleStats(unit.id)}>Toggle Stats</button>
          {visibleStats === unit.id && (
            <div className="unit-stats">
              <div>
                <strong>Movement:</strong> {unit.movement}
              </div>
              <div>
                <strong>Weapon Skill:</strong> {unit.weaponSkill}
              </div>
              <div>
                <strong>Ballistic Skill:</strong> {unit.ballisticSkill}
              </div>
              <div>
                <strong>Strength:</strong> {unit.strength}
              </div>
              <div>
                <strong>Toughness:</strong> {unit.toughness}
              </div>
              <div>
                <strong>Wounds:</strong> {unit.wounds}
              </div>
              <div>
                <strong>Initiative:</strong> {unit.initiative}
              </div>
              <div>
                <strong>Attacks:</strong> {unit.attacks}
              </div>
              <div>
                <strong>Leadership:</strong> {unit.leadership}
              </div>
              <div>
                <strong>Armor Save:</strong> {unit.armorSave}
              </div>
              <div>
                <strong>Points:</strong> {unit.points}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArmyDetails;
