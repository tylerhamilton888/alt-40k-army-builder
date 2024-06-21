import { useState, useEffect } from 'react';
import { getFactions } from '../../services/factionService';
import { getUnitsByFaction } from '../../services/unitService';
import { saveArmy } from '../../services/armyService'; 

const CreateArmy = () => {
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

  useEffect(() => {
    const fetchFactions = async () => {
      const factionsData = await getFactions();
      setFactions(factionsData);
    };
    fetchFactions();
  }, []);

  useEffect(() => {
    
    const points = currentArmy.reduce((total, unit) => total + unit.points, 0);
    setTotalPoints(points);
  }, [currentArmy]);

  const handleFactionChange = async (event) => {
    const factionId = parseInt(event.target.value);
    const faction = factions.find(faction => faction.id === factionId);
    setSelectedFaction(faction);

    // Clear the current army when faction changes
    setCurrentArmy([]);

    const unitsData = await getUnitsByFaction(faction.factionName);
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
    const updatedArmy = [...currentArmy];
    updatedArmy.splice(index, 1); 
    setCurrentArmy(updatedArmy);
  };

  const handleSaveArmy = async () => {
    const armyData = {
      armyFaction: selectedFaction.id,
      units: currentArmy.map(unit => ({
        unitTypeId: unit.unitTypeId,
        unitId: unit.id,
        quantity: 1 
      })),
      totalPoints
    };

    const response = await saveArmy(armyData);
    if (response.ok) {
      alert('Army saved successfully');
      setCurrentArmy([]); 
    } else {
      alert('Failed to save army');
    }
  };

  const toggleStats = (unitId) => {
    setVisibleStats(visibleStats === unitId ? null : unitId);
  };

  return (
    <div>
      <h1>Create Army</h1>
      <label htmlFor="faction">Select Faction:</label>
      <select id="faction" onChange={handleFactionChange}>
        <option value="">--Select Faction--</option>
        {factions.map(faction => (
          <option key={faction.id} value={faction.id}>
            {faction.factionName}
          </option>
        ))}
      </select>

      {selectedFaction && (
        <>
          <h2>HQ</h2>
          {units.HQ.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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

          <h2>Troops</h2>
          {units.Troops.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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

          <h2>Elites</h2>
          {units.Elites.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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

          <h2>Heavy Support</h2>
          {units.HeavySupport.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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

          <h2>Fast Attack</h2>
          {units.FastAttack.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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

          <h2>Flyers</h2>
          {units.Flyer.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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

          <h2>Transports</h2>
          {units.Transport.map(unit => (
            <div key={unit.id}>
              <span>{unit.name}</span>
              <button onClick={() => addUnitToArmy(unit)}>Add</button>
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
        </>
      )}

      <div>
        <h2>Current Army</h2>
        <p>Total Points: {totalPoints}</p> 
        {currentArmy.map((unit, index) => (
          <div key={index}>
            <span>{unit.name}</span>
            <button onClick={() => toggleStats(unit.id)}>Display Stats</button>
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
            <button onClick={() => removeUnitFromArmy(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleSaveArmy}>Save Army</button>
      </div>
    </div>
  );
};

export default CreateArmy;
