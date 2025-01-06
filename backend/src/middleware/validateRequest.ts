import { Value } from "@sinclair/typebox/value";
import { Request, Response, NextFunction } from "express";

export function validate(
  schema: any,
  source: "body" | "params" | "query" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[source];
    const isValid = Value.Check(schema, dataToValidate);

    if (!isValid) {
      const errors = [...Value.Errors(schema, dataToValidate)];
       res.status(400).json({
        error: "Invalid request",
        details: errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    next();
  };
}
