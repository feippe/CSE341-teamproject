const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getCast = async (req, res) => {
    //#swagger.tags = ['Cast']
    //#swagger.description = 'Get all cast'
    try {
        const result = await mongodb.getDatabase().db().collection('cast').find();
        result.toArray().then((cast) => res.status(200).json(cast));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getDirector = async (req, res) => {
    /*
    #swagger.tags = ['Cast']
    #swagger.description = 'Get a cast by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    */
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('cast').find({ _id: id });
        result.toArray().then((cast) => res.status(200).json(cast[0]));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createDirector = async (req, res) => {
    /*
    #swagger.tags = ['Cast']
    #swagger.description = 'Create a new cast'
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
        const cast = {
            name: req.body.name,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality
        };
        const response = await mongodb.getDatabase().db().collection('cast').insertOne(cast);
        response.acknowledged ? res.status(201).json(response) : res.status(500).json({ error: 'Insert failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateDirector = async (req, res) => {
    /*
    #swagger.tags = ['Cast']
    #swagger.description = 'Update a cast by ID'
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
        const cast = {
            name: req.body.name,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality
        };
        const response = await mongodb.getDatabase().db().collection('cast').replaceOne({ _id: id }, cast);
        response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json({ error: 'Update failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteDirector = async (req, res) => {
    /*
    #swagger.tags = ['Cast']
    #swagger.description = 'Delete a cast by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    */
    try {
        const id = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('cast').deleteOne({ _id: id });
        response.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ error: 'Delete failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    getCast,
    getDirector,
    createDirector,
    updateDirector,
    deleteDirector
};
