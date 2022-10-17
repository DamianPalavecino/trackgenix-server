import Joi from 'joi';
import { now } from 'mongoose';

const validateCreation = (req, res, next) => {
  const timesheetValidation = Joi.object({
    description: Joi.string().min(3).max(50).required(),
    date: Joi.date().max(now().toDateString()).required(),
    task: Joi.string().min(3).max(50).required(),
  });

  const validation = timesheetValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
