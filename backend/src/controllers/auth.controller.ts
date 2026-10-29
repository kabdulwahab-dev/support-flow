import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";

export const authController = {
  async login(req: Request, res: Response) {
    const input = req.body as LoginInput;

    const result = await authService.login(input);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  },
  async register(req: Request, res: Response){
    const input = req.body as RegisterInput;
    
    const result = await authService.register(input);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  }
};