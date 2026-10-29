import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login),
);
router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register),
);

router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: {
      userId: res.locals.userId,
    },
  });
});

export default router;