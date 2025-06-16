const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMovies = async (req, res) => {
    //#swagger.tags = ['Movies']
    //#swagger.description = 'Retrieve all movies from the database'
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find();
        result.toArray().then((movies) => {
            res.status(200).json(movies);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    //#swagger.description = 'Retrieve a movie by ID'
    //#swagger.parameters['id'] = { description: 'Movie ID', in: 'path', required: true }
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('movies').find({ _id: id });
        result.toArray().then((movie) => {
            res.status(200).json(movie[0]);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createMovie = async (req, res) => {
    /*
    #swagger.tags = ['Movies']
    #swagger.description = 'Create a new movie'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { 
            name: 'Inception',
            director: 'Christopher Nolan',
            year: 2010,
            review: 'A mind-bending thriller that blurs the line between reality and dreams.',
            duration: 148,
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
            genre: 'Science Fiction',
            rating: 8.8,
            category: 'Action',
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
        }
    }
    */
    try {
        const movie = req.body;
        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Movie created', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create movie' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateMovie = async (req, res) => {
    /*
    #swagger.tags = ['Movies']
    #swagger.description = 'Update a movie by ID'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { 
            name: 'Madagascar',
            director: 'Eric Darnell',
            year: 2005,
            review: 'An animated comedy that follows a group of zoo animals who find themselves stranded on the island of Madagascar.',
            duration: 86,
            cast: ['Ben Stiller', 'Chris Rock', 'David Schwimmer'],
            genre: 'Animation',
            rating: 6.9,
            category: 'Comedy',
            description: 'When their ship crashes on the island of Madagascar, a group of zoo animals must learn to survive in the wild.'
        }
    }
    */
    try {
        const id = new ObjectId(req.params.id);
        const movie = req.body;
        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: id }, movie);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Movie not found or not modified' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    //#swagger.description = 'Delete a movie by ID'
    //#swagger.parameters['id'] = { description: 'Movie ID', in: 'path', required: true }
    try {
        const id = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};
