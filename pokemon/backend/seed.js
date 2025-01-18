const { Pool } = require('pg');
const axios = require('axios');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pokemon_db',
    password: 'jk',
    port: 5432,
});

// Function to fetch Pokémon data from PokeAPI
const fetchPokemonData = async (id) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = response.data;

        return {
            id: data.id,
            name: data.name,
            image_url: data.sprites.front_default,
            type: data.types.map((t) => t.type.name).join(', '),
            height: data.height,
            weight: data.weight,
            hp: data.stats.find((s) => s.stat.name === 'hp').base_stat,
            attack: data.stats.find((s) => s.stat.name === 'attack').base_stat,
            defense: data.stats.find((s) => s.stat.name === 'defense').base_stat,
            special_attack: data.stats.find((s) => s.stat.name === 'special-attack').base_stat,
            special_defense: data.stats.find((s) => s.stat.name === 'special-defense').base_stat,
        };
    } catch (error) {
        console.error(`Failed to fetch Pokémon with ID ${id}:`, error.message);
        return null;
    }
};

// Seed the database with Pokémon data
const seedDatabase = async () => {
    try {
        for (let id = 1; id <= 300; id++) { // Fetch data for the first 300 Pokémon
            const pokemon = await fetchPokemonData(id);
            if (pokemon) {
                const query = `
                    INSERT INTO pokemon (
                        id, name, image_url, type, height, weight, 
                        hp, attack, defense, special_attack, special_defense
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, 
                        $7, $8, $9, $10, $11
                    ) ON CONFLICT (id) DO NOTHING
                `;
                await pool.query(query, [
                    pokemon.id,
                    pokemon.name,
                    pokemon.image_url,
                    pokemon.type,
                    pokemon.height,
                    pokemon.weight,
                    pokemon.hp,
                    pokemon.attack,
                    pokemon.defense,
                    pokemon.special_attack,
                    pokemon.special_defense,
                ]);
                console.log(`Inserted Pokémon: ${pokemon.name}`);
            }
        }
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Failed to seed the database:', error.message);
    } finally {
        pool.end();
    }
};

seedDatabase();
