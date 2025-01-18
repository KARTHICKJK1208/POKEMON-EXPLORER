import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [similarPokemon, setSimilarPokemon] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/pokemon/${id}`).then((response) => setPokemon(response.data));
        axios.get(`http://localhost:3001/pokemon/${id}/similar`).then((response) => setSimilarPokemon(response.data));
    }, [id]);

    if (!pokemon) return <div className="container"><p>Loading...</p></div>;

    return (
        <div>
            <header>{pokemon.name}</header>
            <div className="container">
                <div className="pokemon-details">
                    <div className="pokemon-details-header">
                        <span className="pokemon-details-id">#{pokemon.id.toString().padStart(3, '0')}</span>
                        <img src={pokemon.image_url} alt={pokemon.name} />
                    </div>

                    <div className="pokemon-info">
                        <div className="info-item">
                            <div className="info-label">Type</div>
                            <div className="info-value">{pokemon.type}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Height</div>
                            <div className="info-value">{pokemon.height}m</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Weight</div>
                            <div className="info-value">{pokemon.weight}kg</div>
                        </div>
                    </div>

                    <h2>Base Stats</h2>
                    <div className="stats">
                        {[
                            { label: 'HP', value: pokemon.hp },
                            { label: 'Attack', value: pokemon.attack },
                            { label: 'Defense', value: pokemon.defense },
                            { label: 'Sp. Attack', value: pokemon.special_attack },
                            { label: 'Sp. Defense', value: pokemon.special_defense },
                        ].map((stat) => (
                            <div className="stat-bar" key={stat.label}>
                                <div className="stat-label">
                                    <span>{stat.label}</span>
                                    <span>{stat.value}</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${(stat.value / 255) * 100}%` }}
                                        data-value={stat.value}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="similar-pokemon-section">
                        <h2>Similar Pokémon</h2>
                        <div className="pokemon-list">
                            {similarPokemon.map((sim) => (
                                <div
                                    className="pokemon-card"
                                    key={sim.id}
                                    onClick={() => navigate(`/pokemon/${sim.id}`)}
                                >
                                    <span className="pokemon-card-id">#{sim.id.toString().padStart(3, '0')}</span>
                                    <img src={sim.image_url} alt={sim.name} />
                                    <h3>{sim.name}</h3>
                                    <p>{sim.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="button-group">
                        <button onClick={() => navigate('/home')}>Back to Home</button>
                    </div>
                </div>
            </div>
            <footer>Pokémon Explorer &copy; 2025</footer>
        </div>
    );
};

export default PokemonDetails;