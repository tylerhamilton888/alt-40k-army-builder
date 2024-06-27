import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateArmy.css";
import { getUnitsByFactionId, getUnitById } from "../../services/unitService";
import { saveArmy, getArmyById, updateArmy } from "../../services/armyService";
import { getFactions } from "../../services/factionService";

const CreateArmy = ({ armyId }) => {
    const [factions, setFactions] = useState([]);
    const [selectedFaction, setSelectedFaction] = useState(null);
    const [units, setUnits] = useState([]);
    const [currentArmy, setCurrentArmy] = useState([]);
    const [armyName, setArmyName] = useState("");
    const [totalPoints, setTotalPoints] = useState(0);
    const [editingArmy, setEditingArmy] = useState(false);
    const [statsVisible, setStatsVisible] = useState([]);
    const [currentArmyStatsVisible, setCurrentArmyStatsVisible] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFactions().then(setFactions);
        if (armyId) {
            getArmyById(armyId).then(army => {
                setArmyName(army.armyName);
                setSelectedFaction(army.armyFaction);
                setCurrentArmy(army.units);
                setTotalPoints(army.totalPoints);
                setEditingArmy(true);
            });
        }
    }, [armyId]);

    useEffect(() => {
        if (selectedFaction) {
            getUnitsByFactionId(selectedFaction).then(setUnits);
        }
    }, [selectedFaction]);

    const handleAddUnit = async (unitId) => {
        const unit = await getUnitById(unitId);
        const updatedCurrentArmy = [...currentArmy, unit];
        const updatedPoints = totalPoints + unit.points;
        setCurrentArmy(updatedCurrentArmy);
        setTotalPoints(updatedPoints);
    };

    const handleToggleStats = (index, isCurrentArmy) => {
        if (isCurrentArmy) {
            setCurrentArmyStatsVisible(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        } else {
            setStatsVisible(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
    };

    const handleSaveArmy = async () => {
        const army = {
            userId: JSON.parse(localStorage.getItem("game_user")).id,
            armyName,
            armyFaction: selectedFaction,
            units: currentArmy,
            totalPoints
        };

        if (editingArmy) {
            await updateArmy(armyId, army);
        } else {
            await saveArmy(army);
        }

        navigate("/myarmies");
    };

    return (
        <div className="create-army-container">
            <div className="create-army-section">
                <h2>Create Army</h2>
                <input
                    type="text"
                    value={armyName}
                    onChange={(e) => setArmyName(e.target.value)}
                    placeholder="Army Name"
                />
                <select
                    value={selectedFaction}
                    onChange={(e) => setSelectedFaction(Number(e.target.value))}
                >
                    <option value="">Select Faction</option>
                    {factions.map((faction) => (
                        <option key={faction.id} value={faction.id}>
                            {faction.factionName}
                        </option>
                    ))}
                </select>

                {units.map((unit, index) => (
                    <div key={unit.id} className="unit-item">
                        {unit.name}
                        <button onClick={() => handleAddUnit(unit.id)}>Add</button>
                        <button onClick={() => handleToggleStats(index, false)}>Toggle Stats</button>
                        {statsVisible[index] && (
                            <div className="unit-stats">
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

            <div className="current-army-section">
                <h2>Current Army</h2>
                <div className="current-army-list">
                    {currentArmy.map((unit, index) => (
                        <div key={index} className="current-army-unit">
                            <p>{unit.name}</p>
                            <button onClick={() => handleToggleStats(index, true)}>Toggle Stats</button>
                            {currentArmyStatsVisible[index] && (
                                <div className="unit-stats">
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
                <h3>Total Points: {totalPoints}</h3>
                <button onClick={handleSaveArmy}>{editingArmy ? "Update Army" : "Save Army"}</button>
            </div>
        </div>
    );
};

export default CreateArmy;
