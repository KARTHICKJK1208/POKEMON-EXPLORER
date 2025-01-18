import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3001/pokemon', { params: { search, type, page } })
            .then((response) => setPokemonList(response.data));
    }, [search, type, page]);

    return (
        <div>
            <header>Pokémon Explorer</header>
            <div className="container">
                <input
                    type="text"
                    placeholder="Search by name"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={(e) => setType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="ghost">Ghost</option>
                    <option value="poison">Poison</option>
                    <option value="ice">Ice</option>
                    <option value="rock">Rock</option>
                    <option value="ground">Ground</option>
                    <option value="fighting">Fighting</option>
                    <option value="normal">Normal</option>
                </select>
                <div className="pokemon-list">
                    {pokemonList.map((pokemon) => (
                        <div
                            className="pokemon-card"
                            key={pokemon.id}
                            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                        >
                            <span className="pokemon-card-id">ID: {pokemon.id}</span>
                            <img src={pokemon.image_url} alt={pokemon.name} />
                            <h3>{pokemon.name}</h3>
                            <p> {pokemon.type}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Previous</button>
                    <button onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
            </div>
            <footer>Pokémon Explorer &copy; 2025</footer>
        </div>
    );
};

export default Home;
