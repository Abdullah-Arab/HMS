import { Value } from "@sinclair/typebox/value";
import { ValueError } from "@sinclair/typebox/errors";
import { Request, Response, NextFunction } from "express";

// Middleware to validate the input
function validate(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const isValid = Value.Check(schema, req.body);

    if (!isValid) {
      const errors = [...Value.Errors(schema, req.body)];
      return res.status(400).json({
        error: "Validation failed",
        details: errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    next(); 
  };
}
