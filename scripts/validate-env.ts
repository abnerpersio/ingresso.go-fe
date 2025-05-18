import { z } from "zod";

const schema = z.object({});

const { error } = schema.safeParse(process.env);

if (error?.issues.length) {
  const issues = error.issues
    .map((issue) => `${issue.path}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid ENV:\n${issues}`);
}
