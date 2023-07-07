const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// pivot MoviesGenres
Movie.belongsToMany(Genre, {through: 'MoviesGenres'})
Genre.belongsToMany(Movie, {through: 'MoviesGenres'})

// pivot MoviesActors
Movie.belongsToMany(Actor, {through: 'MoviesActors'})
Actor.belongsToMany(Movie, {through: 'MoviesActors'})

// pivot MoviesDirectors
Movie.belongsToMany(Director, {through: 'MoviesDirectors'})
Director.belongsToMany(Movie, {through: 'MoviesDirectors'})