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
    //#swagger.tags = ['Movies']
    //#swagger.description = 'Create a new movie'
    /*
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        director: { type: "string" },
                        year: { type: "number" },
                        duration: { type: "number" },
                        description: { type: "string" },
                        cast: {
                            type: "array",
                            items: { type: "string" },
                            example: ["Actor 1", "Actor 2", "Actor 3"]
                        },
                        category: { type: "string" }
                    },
                    required: ["name", "director", "year", "duration", "description", "cast", "category"]
                }
            }
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
    //#swagger.tags = ['Movies']
    //#swagger.description = 'Update an existing movie'
    //#swagger.parameters['id'] = { description: 'Movie ID', in: 'path', required: true }
    /*
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        director: { type: "string" },
                        year: { type: "number" },
                        duration: { type: "number" },
                        description: { type: "string" },
                        cast: {
                            type: "array",
                            items: { type: "string" }
                        },
                        category: { type: "string" }
                    },
                    required: ["name", "director", "year", "duration", "description", "cast", "category"]
                }
            }
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
