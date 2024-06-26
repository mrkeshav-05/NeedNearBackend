import { Router } from "express";
import { registerServiceProvider } from "../controllers/serviceProvider.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    }
  ]),
  registerServiceProvider
);

export default router;