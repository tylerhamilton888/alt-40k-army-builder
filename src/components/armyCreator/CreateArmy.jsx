import { useState, useEffect } from 'react';
import { getFactions } from '../../services/factionService';
import { getUnitsByFaction } from '../../services/unitService';

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

  useEffect(() => {
    const fetchFactions = async () => {
      const factionsData = await getFactions();
      setFactions(factionsData);
    };
    fetchFactions();
  }, []);

  const handleFactionChange = async (event) => {
    const factionId = parseInt(event.target.value);
    const faction = factions.find(faction => faction.id === factionId);
    setSelectedFaction(faction);

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
          <h2>HQ </h2>
          <select>
            {units.HQ.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>

          <h2>Troops</h2>
          <select>
            {units.Troops.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>

          <h2>Elites</h2>
          <select>
            {units.Elites.map(unit => (
                <option key={unit.id} value={unit.id}>
                    {unit.name}
                </option>
            ))}
          </select>

          <h2>Heavy Support</h2>
          <select>
            {units.HeavySupport.map(unit => (
                <option key={unit.id} value={unit.id}>
                    {unit.name}
                </option>
            ))}
          </select>

          <h2>Fast Attack</h2>
          <select>
            {units.FastAttack.map(unit => (
                <option key={unit.id} value={unit.id}>
                    {unit.name}
                </option>
            ))}
          </select>

          <h2>Flyers</h2>
          <select>
            {units.Flyer.map(unit => (
                <option key={unit.id} value={unit.id}>
                    {unit.name}
                </option>
            ))}
          </select>

          <h2>Transports</h2>
          <select>
            {units.Transport.map(unit => (
                <option key={unit.id} value={unit.id}>
                    {unit.name}
                </option>
            ))}
          </select>

    
        </>
      )}
    </div>
  );
};

export default CreateArmy;
