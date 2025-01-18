const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pokemon_db',
    password: 'jk',
    port: 5432,
});

// Fetch paginated Pokémon list
app.get('/pokemon', async (req, res) => {
    const { search, type, sort, page = 1 } = req.query;
    const offset = (page - 1) * 10;
    const conditions = [];
    if (search) conditions.push(`name ILIKE '%${search}%'`);
    if (type) conditions.push(`type = '${type}'`);
    const orderBy = sort ? `ORDER BY name ${sort}` : '';
    const query = `
        SELECT * FROM pokemon 
        ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''} 
        ${orderBy} 
        LIMIT 10 OFFSET ${offset}`;
    const { rows } = await pool.query(query);
    res.json(rows);
});

// Fetch Pokémon details
app.get('/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM pokemon WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    res.json(rows[0]);
});

// Fetch similar Pokémon
app.get('/pokemon/:id/similar', async (req, res) => {
    const { id } = req.params;
    const typeResult = await pool.query('SELECT type FROM pokemon WHERE id = $1', [id]);
    const type = typeResult.rows[0]?.type;

    if (type) {
        const query = `SELECT * FROM pokemon WHERE type = $1 AND id != $2 LIMIT 10`;
        const result = await pool.query(query, [type, id]);
        res.json(result.rows);
    } else {
        res.json([]);
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
