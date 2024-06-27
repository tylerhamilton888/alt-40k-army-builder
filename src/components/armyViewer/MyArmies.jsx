import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArmiesByUserId, deleteArmyById } from '../../services/armyService';
import './MyArmies.css';

const MyArmies = () => {
    const [armies, setArmies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('game_user')).id;
        const fetchArmies = async () => {
            try {
                const fetchedArmies = await getArmiesByUserId(userId);
                setArmies(fetchedArmies);
            } catch (error) {
                console.error('Error fetching armies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArmies();
    }, []);

    const handleDelete = async (armyId) => {
        if (window.confirm('Are you sure you want to delete this army?')) {
            try {
                await deleteArmyById(armyId);
                setArmies(armies.filter((army) => army.id !== armyId));
            } catch (error) {
                console.error('Error deleting army:', error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-armies-container">
            <h2>My Armies</h2>
            <ul className="army-list">
                {armies.map((army) => (
                    <li key={army.id} className="army-item">
                        <Link to={`/army/${army.id}`}>{army.armyName}</Link>
                        <button onClick={() => handleDelete(army.id)}>Delete</button>
                        <Link to={`/createarmy/${army.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyArmies;
