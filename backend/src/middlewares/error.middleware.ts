import type {
  ErrorRequestHandler,
} from "express";
import { AppError } from "../utils/app-error.js";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }
  if (
    err?.type === "entity.parse.failed" &&
    err.status === 400
  ) {
    res.status(400).json({
      success: false,
      message: "Request body must contain valid JSON",
    });
    return;
  }

  if (
    err?.type === "entity.too.large" &&
    err.status === 413
  ) {
    res.status(413).json({
      success: false,
      message: "Request body exceeds the 10 KB limit",
    });
    return;
  }

  // Log the full error privately in production.
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};