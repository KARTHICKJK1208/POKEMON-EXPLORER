# Pokemon Explorer

The Pokemon Explorer is a full-stack web application that fetches Pokémon data from a PostgreSQL database and displays it in a user-friendly interface. It provides features such as Pokémon listing, pagination, and detailed Pokémon information.

## Features

- **Pokemon Listing**: Browse a paginated list of Pokémon with their images and names.
- **Search Pokemon**: View detailed information, including stats, types, height, and weight.
- **Responsive Design**: Optimized for desktops and mobile devices.
- **Backend API**: RESTful API built with Express.js for efficient data management.
- **Database**: PostgreSQL database to store Pokémon details and stats.

## Tech Stack

### Frontend:
- React.js
- Axios
- React Router DOM

### Backend:
- Node.js
- Express.js
- PostgreSQL

## Installation

-  Clone the Repository
git clone https://github.com/KARTHICKJK1208/POKEMON-EXPLORER.git
cd pokemon

## Backend Setup
- Navigate to the backend folder
cd backend

-  Install dependencies
npm install

  ## Configure PostgreSQL
 - Create a PostgreSQL database named 'pokemon_db'

-  Update the 'server.js' file with your database credentials
- Seed the database
node seed.js

-  Start the backend server
node server.js

  ## Frontend Setup
- Navigate to the frontend folder
cd pokemon

-  Install dependencies
npm install

- Start the development server
npm start


pokemon-app/
├── backend/                   # Backend code
│   ├── db/                    # Database-related files
│   │   ├── schema.sql         # SQL schema for creating tables
│   │   ├── seed.js            # Script to populate database with data
│   ├── routes/                # API route handlers
│   │   ├── pokemon.js         # Route handlers for Pokémon API
│   ├── server.js              # Main server file for Express
│   ├── package.json           # Node.js dependencies for backend
│   ├── package-lock.json      # Lockfile for backend dependencies
│   └── .env                   # Environment variables (database credentials, etc.)
├── frontend/                  # Frontend code
│   ├── public/                # Static files
│   │   ├── index.html         # Main HTML file for React
│   │   ├── favicon.ico        # Favicon for the app
│   ├── src/                   # Source files
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.js      # Top navigation bar (if needed)
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js        # Home page with Pokémon list
│   │   │   ├── PokemonDetails.js # Pokémon details page
│   │   ├── styles.css         # Global CSS styles
│   │   ├── App.js             # Main React component
│   │   ├── index.js           # Entry point for React app
│   ├── package.json           # Node.js dependencies for frontend
│   ├── package-lock.json      # Lockfile for frontend dependencies
├── README.md                  # Project documentation
└── .gitignore                 # Files and folders to exclude from version control

