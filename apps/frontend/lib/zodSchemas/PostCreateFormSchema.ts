import { z } from "zod";

export const PostCreateSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters")
    .trim(),

  tags: z
    .array(z.string())
    .max(10, "You cannot have more than 10 tags")
    .optional(),

  content: z
    .string()
    .min(20, "Content body must be at least 20 characters long")
    .max(10000, "Content body cannot exceed 10,000 characters"),

  isPublished: z.string().transform((val: string) => val === "on"),

  thumbnail: z.instanceof(File).optional(),
});
