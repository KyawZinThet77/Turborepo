import { z } from "zod";

export const PostCreateSchema = z.object({
  postId: z
    .string()
    .transform((value) => parseInt(value))
    .optional(),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters")
    .trim(),

  tags: z
    .string()

    .refine(
      (value) => value.split(",").every((tag) => tag.trim() !== ""),
      "Invalid tags: remove extra commas or blank tags",
    )
    .transform((value) => value.split(",").map((tag) => tag.trim())),

  content: z
    .string()
    .min(20, "Content body must be at least 20 characters long")
    .max(10000, "Content body cannot exceed 10,000 characters"),

  thumbnail: z.instanceof(File).optional(),
  published: z
    .string()
    .optional()
    .transform((value) => value === "on"),
});
