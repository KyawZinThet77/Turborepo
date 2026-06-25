import {z} from "zod";

export const CommentFormSchema = z.object({
    postId: z.coerce.number(),
    content: z.string().min(1, "Content is required"),

});