const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getCategories = async (req, res) => {
    //#swagger.tags = ['Categories']
    //#swagger.description = 'Get all categories'
    try {
        const result = await mongodb.getDatabase().db().collection('categories').find();
        result.toArray().then((categories) => res.status(200).json(categories));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getCategory = async (req, res) => {
    /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Get a category by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    */
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('categories').find({ _id: id });
        result.toArray().then((category) => res.status(200).json(category[0]));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createCategory = async (req, res) => {
    /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Create a new category'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { name: 'Action' }
    }
    */
    try {
        const category = { name: req.body.name };
        const response = await mongodb.getDatabase().db().collection('categories').insertOne(category);
        response.acknowledged ? res.status(201).json(response) : res.status(500).json({ error: 'Insert failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateCategory = async (req, res) => {
    /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Update a category by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { name: 'Adventure' }
    }
    */
    try {
        const id = new ObjectId(req.params.id);
        const category = { name: req.body.name };
        const response = await mongodb.getDatabase().db().collection('categories').replaceOne({ _id: id }, category);
        response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json({ error: 'Update failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteCategory = async (req, res) => {
    /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Delete a category by ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    */
    try {
        const id = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('categories').deleteOne({ _id: id });
        response.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ error: 'Delete failed' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
