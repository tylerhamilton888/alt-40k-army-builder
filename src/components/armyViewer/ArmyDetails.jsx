import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArmyById, deleteArmyById } from '../../services/armyService';
import { getFactions } from '../../services/factionService';

const ArmyDetails = () => {
  const { armyId } = useParams();
  const navigate = useNavigate();
  const [army, setArmy] = useState(null);
  const [factions, setFactions] = useState([]);
  const [visibleStats, setVisibleStats] = useState(null);

  useEffect(() => {
    const fetchArmy = async () => {
      const armyData = await getArmyById(armyId);
      setArmy(armyData);
    };

    const fetchFactions = async () => {
      const factionsData = await getFactions();
      setFactions(factionsData);
    };

    fetchArmy();
    fetchFactions();
  }, [armyId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`CONFIRM: Do you want to delete ${army.armyName}?`);
    if (confirmDelete) {
      await deleteArmyById(armyId);
      navigate('/myarmies');
    }
  };

  const toggleStats = (unitId) => {
    setVisibleStats(visibleStats === unitId ? null : unitId);
  };

  if (!army) {
    return <div>Loading...</div>;
  }

  const factionName = factions.find(faction => faction.id === army.armyFaction)?.factionName || 'Unknown Faction';

  return (
    <div>
      <h1>{army.armyName}</h1>
      <p>Faction: {factionName}</p>
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
