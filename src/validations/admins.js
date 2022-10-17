import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminValidations = Joi.object({
    name: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(10).max(30),
  });

  const validation = adminValidations.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Error: ${validation.error.details[0].message}`,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
