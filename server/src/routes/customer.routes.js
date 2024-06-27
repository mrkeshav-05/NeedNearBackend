import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { registerCustomer } from '../controllers/customer/registerCustomer.controller.js';
import { loginCustomer } from '../controllers/customer/loginCustomer.controller.js';
import { logoutCustomer } from '../controllers/customer/logoutCustomer.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyEmail } from '../controllers/customer/verifyEmail.controller.js';
import { sendVerificationOTP } from '../utils/auth/sendVerificationOTP.js';
import { verifyPhoneNumberOTP } from '../controllers/customer/verifyPhoneNumberOTP.controller.js';

const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    }
  ]),
  registerCustomer
);

router.route('/verify-email/:token').get(verifyEmail);
router.route('/request-otp').post(sendVerificationOTP);
router.route('/verify-otp').post(verifyPhoneNumberOTP);
router.route('/login').post(loginCustomer);
router.route('/logout').post(verifyJWT, logoutCustomer);

export default router;