import { Value } from "@sinclair/typebox/value";
import { ValueError } from "@sinclair/typebox/errors";
import { Request, Response, NextFunction } from "express";
import { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// Middleware to validate the input
export const validate = (schema: TSchema) => {
  const check = TypeCompiler.Compile(schema);

  return (req: Request, res: Response, next: NextFunction): void => {
    const result = check.Check(req.body);
    if (!result) {
      const errors = [...Value.Errors(schema, req.body)];

      res.status(400).send({
        error: "Invalid request body",
        details: errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    } else {
      next();
    }
  };
};
