const { body, validationResult } = require('express-validator');

const movieValidation = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('review').notEmpty().withMessage('Review is required'),
        body('year').isInt({ min: 1800, max: 2100 }).withMessage('Year must be a valid number'),
        body('director').notEmpty().withMessage('Director is required'),
        body('rating').notEmpty().withMessage('Rating is required'),
        body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
        body('imdbrating').optional().isFloat({ min: 0, max: 10 }).withMessage('IMDb rating must be between 0 and 10'),
        body('cast').isArray({ min: 1 }).withMessage('Cast must be an array with at least one actor'),
        body('category').notEmpty().withMessage('Category is required')
    ];
};

const directorValidation = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('birthdate').isISO8601().withMessage('Birthdate must be a valid date (YYYY-MM-DD)'),
        body('nationality').notEmpty().withMessage('Nationality is required')
    ];
};

const categoryValidation = () => {
    return [
        body('name').notEmpty().withMessage('Category name is required')
    ];
};

const castValidation = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('birthdate').isISO8601().withMessage('Birthdate must be a valid date (YYYY-MM-DD)'),
        body('nationality').notEmpty().withMessage('Nationality is required')
    ];
};

const validate = (req, res, next) => {
   const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.array().map(err => ({
        field: err.param,
        message: err.msg
    }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    movieValidation,
    directorValidation,
    categoryValidation,
    castValidation,
    validate
};