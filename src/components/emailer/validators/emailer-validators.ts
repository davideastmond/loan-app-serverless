import { body }  from 'express-validator';
import { validationGuard } from '../../../middleware/validation-guard';

export const recoveryEmailValidator = [
  body('recipient').exists().isEmail(),
  body('adminEmail').exists().isEmail(),
  body('name').exists(),
  body('recoveryURL').exists().isString(),
  validationGuard,
]

export const passwordChangedEmailValidator = [
  body('recipient').exists().isEmail(),
  body('adminEmail').exists().isEmail(),
  body('name').exists(),
  validationGuard,
]

export const welcomeEmailValidator = [
  body('recipient').exists().isEmail(),
  body('adminEmail').exists().isEmail(),
  body('name').exists(),
  body('applicationId').exists(),
  validationGuard
]

export const verificationCodeEmailValidator = [
  body('recipient').exists().isEmail(),
  body('code').exists(),
  validationGuard
]
