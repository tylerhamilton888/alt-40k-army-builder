import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFactions } from '../../services/factionService';
import { getUnitsByFaction } from '../../services/unitService';
import { getArmyById, saveArmy, updateArmy } from '../../services/armyService';
import './CreateArmy.css';

const CreateArmy = () => {
  const { armyId } = useParams();
  const navigate = useNavigate();
  const [factions, setFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [units, setUnits] = useState({
    HQ: [],
    Troops: [],
    Elites: [],
    FastAttack: [],
    HeavySupport: [],
    Flyer: [],
    Transport: []
  });
  const [currentArmy, setCurrentArmy] = useState([]);
  const [visibleStats, setVisibleStats] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeUser, setActiveUser] = useState(null);
  const [armyName, setArmyName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchFactions = async () => {
      const factionsData = await getFactions();
      setFactions(factionsData);
    };
    fetchFactions();

    const user = JSON.parse(localStorage.getItem('game_user'));
    setActiveUser(user);

    if (armyId) {
      setIsEditing(true);
      const fetchArmy = async () => {
        const armyData = await getArmyById(armyId);
        setArmyName(armyData.armyName);
        setSelectedFaction(armyData.armyFaction);
        setCurrentArmy(armyData.units);
        const unitsData = await getUnitsByFaction(armyData.armyFaction);
        setUnits({
          HQ: unitsData.filter(unit => unit.unitTypeId === 1),
          Elites: unitsData.filter(unit => unit.unitTypeId === 2),
          Troops: unitsData.filter(unit => unit.unitTypeId === 3),
          FastAttack: unitsData.filter(unit => unit.unitTypeId === 4),
          HeavySupport: unitsData.filter(unit => unit.unitTypeId === 5),
          Flyer: unitsData.filter(unit => unit.unitTypeId === 6),
          Transport: unitsData.filter(unit => unit.unitTypeId === 7)
        });
      };
      fetchArmy();
    }
  }, [armyId]);

  useEffect(() => {
    const points = currentArmy.reduce((total, unit) => total + (unit.points || 0), 0);
    setTotalPoints(points);
  }, [currentArmy]);

  const handleFactionChange = async (event) => {
    const factionId = parseInt(event.target.value);
    setSelectedFaction(factionId);
    setCurrentArmy([]);

    const unitsData = await getUnitsByFaction(factionId);
    setUnits({
      HQ: unitsData.filter(unit => unit.unitTypeId === 1),
      Elites: unitsData.filter(unit => unit.unitTypeId === 2),
      Troops: unitsData.filter(unit => unit.unitTypeId === 3),
      FastAttack: unitsData.filter(unit => unit.unitTypeId === 4),
      HeavySupport: unitsData.filter(unit => unit.unitTypeId === 5),
      Flyer: unitsData.filter(unit => unit.unitTypeId === 6),
      Transport: unitsData.filter(unit => unit.unitTypeId === 7)
    });
  };

  const addUnitToArmy = (unit) => {
    setCurrentArmy([...currentArmy, unit]);
  };

  const removeUnitFromArmy = (index) => {
    const newArmy = [...currentArmy];
    newArmy.splice(index, 1);
    setCurrentArmy(newArmy);
  };

  const handleSaveArmy = async () => {
    if (!activeUser) {
      alert('No active user found');
      return;
    }

    if (!armyName.trim()) {
      alert('Please name your army');
      return;
    }

    const armyData = {
      userId: activeUser.id,
      armyName,
      armyFaction: selectedFaction,
      units: currentArmy.map(unit => ({
        unitTypeId: unit.unitTypeId,
        unitId: unit.id,
        quantity: 1
      })),
      totalPoints
    };

    let response;
    if (isEditing) {
      response = await updateArmy(armyId, armyData);
    } else {
      response = await saveArmy(armyData);
    }

    if (response.ok) {
      alert(`Army ${isEditing ? 'updated' : 'saved'} successfully`);
      navigate('/myarmies');
    } else {
      alert(`Failed to ${isEditing ? 'update' : 'save'} army`);
    }
  };

  const handleCancel = () => {
    navigate('/myarmies');
  };

  const toggleStats = (unitId) => {
    setVisibleStats(visibleStats === unitId ? null : unitId);
  };

  return (
    <div className="create-army-container">
      <div className="create-army-section">
        <h2>{isEditing ? 'Edit Army' : 'Create Army'}</h2>
        <label htmlFor="armyName">Army Name:</label>
        <input
          type="text"
          id="armyName"
          value={armyName}
          onChange={(e) => setArmyName(e.target.value)}
        />
        <label htmlFor="faction">Select Faction:</label>
        <select id="faction" onChange={handleFactionChange} value={selectedFaction}>
          <option value="">--Select Faction--</option>
          {factions.map(faction => (
            <option key={faction.id} value={faction.id}>
              {faction.factionName}
            </option>
          ))}
        </select>
        {selectedFaction && (
          <>
            <h2>Units</h2>
            {Object.keys(units).map((unitType) => (
              <div key={unitType}>
                <h3>{unitType}</h3>
                {units[unitType].map(unit => (
                  <div key={unit.id}>
                    <span>{unit.name}</span>
                    <button onClick={() => addUnitToArmy(unit)}>Add</button>
                    <button onClick={() => toggleStats(unit.id)}>Toggle Stats</button>
                    {visibleStats === unit.id && (
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
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="create-army-section">
        <h2>Current Army</h2>
        <ul className="current-army">
          {currentArmy.map((unit, index) => (
            <li key={index}>
              <span>{unit.name}</span>
              <button onClick={() => toggleStats(unit.id)}>Display Stats</button>
              {visibleStats === unit.id && (
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
              <button onClick={() => removeUnitFromArmy(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total Points: {totalPoints}</p>
        <button onClick={handleSaveArmy}>{isEditing ? 'Save Changes' : 'Save Army'}</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateArmy;
