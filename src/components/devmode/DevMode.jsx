import { useState, useEffect } from "react";
import { getFactions } from "../../services/factionService";
import { getUnitsByFaction, addUnit, editUnit, deleteUnit } from "../../services/unitService";
import "./DevMode.css";

const unitTypes = [
  { id: 1, typeName: "HQ" },
  { id: 2, typeName: "Elites" },
  { id: 3, typeName: "Troops" },
  { id: 4, typeName: "Fast Attack" },
  { id: 5, typeName: "Heavy Support" },
  { id: 6, typeName: "Flyer" },
  { id: 7, typeName: "Transport" }
];

export const DevMode = () => {
  const [factions, setFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [units, setUnits] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUnitId, setEditUnitId] = useState(null);
  const [newUnit, setNewUnit] = useState({
    name: "",
    factionId: "",
    unitTypeId: "",
    movement: "",
    weaponSkill: "",
    ballisticSkill: "",
    strength: "",
    toughness: "",
    wounds: "",
    initiative: "",
    attacks: "",
    leadership: "",
    armorSave: "",
    points: ""
  });

  useEffect(() => {
    const fetchFactions = async () => {
      const data = await getFactions();
      setFactions(data);
    };
    fetchFactions();
  }, []);

  const handleFactionSelect = async (event) => {
    const factionId = parseInt(event.target.value);
    setSelectedFaction(factionId);
    resetForm(); // Reset the form and edit state when switching factions
    const data = await getUnitsByFaction(factionId);
    setUnits(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUnit({ ...newUnit, [name]: name === 'name' ? value : parseInt(value) });
  };

  const handleAddUnit = async () => {
    const unitToAdd = { ...newUnit, factionId: selectedFaction };
    await addUnit(selectedFaction, unitToAdd);
    const data = await getUnitsByFaction(selectedFaction);
    setUnits(data);
    resetForm();
  };

  const handleEditUnit = (unitId) => {
    const unitToEdit = units.find((unit) => unit.id === unitId);
    if (unitToEdit) {
      setNewUnit(unitToEdit);
      setEditUnitId(unitId);
      setEditMode(true);
    }
  };

  const handleUpdateUnit = async () => {
    const unitToUpdate = { ...newUnit, factionId: selectedFaction };
    await editUnit(selectedFaction, editUnitId, unitToUpdate);
    const data = await getUnitsByFaction(selectedFaction);
    setUnits(data);
    resetForm();
  };

  const handleDeleteUnit = async (unitId) => {
    await deleteUnit(selectedFaction, unitId);
    const data = await getUnitsByFaction(selectedFaction);
    setUnits(data);
  };

  const resetForm = () => {
    setNewUnit({
      name: "",
      factionId: "",
      unitTypeId: "",
      movement: "",
      weaponSkill: "",
      ballisticSkill: "",
      strength: "",
      toughness: "",
      wounds: "",
      initiative: "",
      attacks: "",
      leadership: "",
      armorSave: "",
      points: ""
    });
    setEditMode(false);
    setEditUnitId(null);
  };

  return (
    <div className="devmode-container">
      <h1>Developer Mode</h1>
      <label htmlFor="faction">Select Faction:</label>
      <select id="faction" onChange={handleFactionSelect}>
        <option value="">--Select Faction--</option>
        {factions.map((faction) => (
          <option key={faction.id} value={faction.id}>
            {faction.factionName}
          </option>
        ))}
      </select>

      <div className="top-section">
        <div className="unit-form">
          <h2>{editMode ? "Edit Unit" : "Add Unit"}</h2>
          <input type="text" name="name" placeholder="Name" value={newUnit.name} onChange={handleInputChange} />
          <label htmlFor="unitTypeId">Unit Type:</label>
          <select name="unitTypeId" value={newUnit.unitTypeId} onChange={handleInputChange}>
            <option value="">--Select Unit Type--</option>
            {unitTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.typeName}
              </option>
            ))}
          </select>
          <input type="text" name="movement" placeholder="Movement" value={newUnit.movement} onChange={handleInputChange} />
          <input type="text" name="weaponSkill" placeholder="Weapon Skill" value={newUnit.weaponSkill} onChange={handleInputChange} />
          <input type="text" name="ballisticSkill" placeholder="Ballistic Skill" value={newUnit.ballisticSkill} onChange={handleInputChange} />
          <input type="text" name="strength" placeholder="Strength" value={newUnit.strength} onChange={handleInputChange} />
          <input type="text" name="toughness" placeholder="Toughness" value={newUnit.toughness} onChange={handleInputChange} />
          <input type="text" name="wounds" placeholder="Wounds" value={newUnit.wounds} onChange={handleInputChange} />
          <input type="text" name="initiative" placeholder="Initiative" value={newUnit.initiative} onChange={handleInputChange} />
          <input type="text" name="attacks" placeholder="Attacks" value={newUnit.attacks} onChange={handleInputChange} />
          <input type="text" name="leadership" placeholder="Leadership" value={newUnit.leadership} onChange={handleInputChange} />
          <input type="text" name="armorSave" placeholder="Armor Save" value={newUnit.armorSave} onChange={handleInputChange} />
          <input type="text" name="points" placeholder="Points" value={newUnit.points} onChange={handleInputChange} />
          {editMode ? (
            <>
              <button onClick={handleUpdateUnit}>Update Unit</button>
              <button onClick={resetForm}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAddUnit}>Add Unit</button>
          )}
        </div>

        <div className="unit-list">
          <h2>Units</h2>
          {units.map((unit) => (
            <div key={unit.id} className="unit">
              <p>{unit.name}</p>
              <button onClick={() => handleEditUnit(unit.id)}>Edit</button>
              <button onClick={() => handleDeleteUnit(unit.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevMode;
