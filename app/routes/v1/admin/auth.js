import { Router } from 'express';
import StaffController from '../../../controllers/admin/auth';
import { AuthMiddleware, RoleMiddleware } from '../../../middleware/auth';

const router = Router();
const { StaffLoginEmailValidator, validateLoginSchema, checkIfStaffExist, validateCreateStaffProfile, authenticate, generatePassword } = AuthMiddleware;
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
  createStaff);

export default router;
