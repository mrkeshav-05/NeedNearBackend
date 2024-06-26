import { Router } from "express";
// import { registerServiceProvider } from "../controllers/serviceProvider/serviceProvider.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { registerServiceProvider } from "../controllers/serviceProvider/registerServiceProvider.controller.js";

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