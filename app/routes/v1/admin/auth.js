import { Router } from 'express';
import StaffController from '../../../controllers/auth';
import { StaffMiddleware, RoleMiddleware } from '../../../middleware/auth';
import AuthMiddleware from '../../../middleware/auth/basic';

const { generatePassword } = StaffMiddleware;
const { authenticate } = AuthMiddleware;

const router = Router();
const { StaffLoginEmailValidator, validateLoginSchema, checkIfStaffExist, validateCreateStaffProfile } = StaffMiddleware;
const { roleValidator } = RoleMiddleware;

const { login, createStaff } = StaffController;

router.post(
  '/login',
  validateLoginSchema,
  StaffLoginEmailValidator,
  login
);
router.post('/signup',
  authenticate,
  roleValidator,
  validateCreateStaffProfile,
  checkIfStaffExist,
  generatePassword,
  createStaff
);

export default router;
