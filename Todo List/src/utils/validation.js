const Joi = require('joi');

const schemas = {
  // Auth validation schemas
  register: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  // Todo validation schemas
  createTodo: Joi.object({
    content: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': 'Todo content is required',
        'string.empty': 'Todo content cannot be empty'
      })
  }),

  updateTodo: Joi.object({
    content: Joi.string()
      .trim()
      .messages({
        'string.empty': 'Todo content cannot be empty'
      }),
    completed: Joi.boolean()
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  })
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        message: detail.message,
        field: detail.path[0]
      }));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: errors
        }
      });
    }

    next();
  };
};

module.exports = {
  schemas,
  validate
}; 