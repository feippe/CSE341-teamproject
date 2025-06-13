const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getDirectors = async (req, res) => {
    //#swagger.tags = ['Directors']
    //#swagger.description = 'Get all directors'
    try {
        const result = await mongodb.getDatabase().db().collection('directors').find();
        result.toArray().then((directors) => res.status(200).json(directors));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getDirector = async (req, res) => {
    /*
    #swagger.tags = ['Directors']
    #swagger.description = 'Get a director by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    */
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('directors').find({ _id: id });
        result.toArray().then((director) => res.status(200).json(director[0]));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createDirector = async (req, res) => {
    /*
    #swagger.tags = ['Directors']
    #swagger.description = 'Create a new director'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Christopher Nolan',
            birthdate: '1970-07-30',
            nationality: 'British-American'
        }
    }
    */
    try {
        const director = {
            name: req.body.name,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality
        };
        const response = await mongodb.getDatabase().db().collection('directors').insertOne(director);
        response.acknowledged ? res.status(201).json(response) : res.status(500).json({ error: 'Insert failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateDirector = async (req, res) => {
    /*
    #swagger.tags = ['Directors']
    #swagger.description = 'Update a director by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Christopher Nolan',
            birthdate: '1970-07-30',
            nationality: 'British-American'
        }
    }
    */
    try {
        const id = new ObjectId(req.params.id);
        const director = {
            name: req.body.name,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality
        };
        const response = await mongodb.getDatabase().db().collection('directors').replaceOne({ _id: id }, director);
        response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json({ error: 'Update failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteDirector = async (req, res) => {
    /*
    #swagger.tags = ['Directors']
    #swagger.description = 'Delete a director by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    */
    try {
        const id = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('directors').deleteOne({ _id: id });
        response.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ error: 'Delete failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    getDirectors,
    getDirector,
    createDirector,
    updateDirector,
    deleteDirector
};
