import { body }  from 'express-validator';
import { validationGuard } from '../../../middleware/validation-guard';

export const recoveryEmailValidator = [
  body('recipient').exists().isEmail(),
  body('name').exists(),
  body('recoveryURL').exists().isString(),
  validationGuard,
]
