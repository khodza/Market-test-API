// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

exports.createProductJoiSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please provide a name for the product',
      'any.required': 'Please provide a name for the product',
    }),
  description: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please provide a description for the product',
      'any.required': 'Please provide a description for the product',
    }),
  price: Joi.number()
    .required()
    .messages({
      'number.empty': 'Please provide a price for the product',
      'any.required': 'Please provide a price for the product',
    }),
  category: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please provide a category for the product',
      'any.required': 'Please provide a category for the product',
    }),
  quantity: Joi.number()
    .required()
    .messages({
      'number.empty': 'Please provide a quantity for the product',
      'any.required': 'Please provide a quantity for the product',
    }),
});

exports.updateProductJoiSchema = Joi.object({
  name: Joi.string()
    .messages({
      'string.empty': 'Please provide a name for the product',
    }),
  description: Joi.string()
    .messages({
      'string.empty': 'Please provide a description for the product',
    }),
  price: Joi.number()
    .messages({
      'number.empty': 'Please provide a price for the product',
    }),
  category: Joi.string()
    .messages({
      'string.empty': 'Please provide a category for the product',
    }),
  quantity: Joi.number()
    .messages({
      'number.empty': 'Please provide a quantity for the product',
    }),
});