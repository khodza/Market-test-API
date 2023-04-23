// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const createCategoryJoiSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Category name must be a string',
      'string.empty': 'Category name cannot be empty',
      'any.required': 'Category name is required',
    }),

  description: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Category description must be a string',
      'string.empty': 'Category description cannot be empty',
      'any.required': 'Category description is required',
    }),
});

module.exports = {createCategoryJoiSchema};