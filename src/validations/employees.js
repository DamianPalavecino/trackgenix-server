import Joi from 'joi';

const validateEdition = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    phone: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateEdition;
