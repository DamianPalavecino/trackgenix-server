import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const regex = /^[a-zA-Z\s]*$/;
  const superAdminsValidation = Joi.object({
    name: Joi.string().min(2).max(30).pattern(regex)
      .required(),
    lastName: Joi.string().min(2).max(30).pattern(regex)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().min(1).max(30).required(),
  });

  const validation = superAdminsValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      date: undefined,
      error: true,
    });
  }
  return next();
};

const validateEdit = (req, res, next) => {
  const regex = /^[a-zA-Z\s]*$/;
  const superAdminsValidation = Joi.object({
    name: Joi.string().min(2).max(30).pattern(regex),
    lastName: Joi.string().min(2).max(20).pattern(regex),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(5).max(30),
    password: Joi.string().min(8).max(30),
  });

  const validation = superAdminsValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      date: undefined,
      error: true,
    });
  }
  return next();
};
export default {
  validateCreation,
  validateEdit,
};
