export type SignUpFormState =
  | {
      data?: {
        name?: string;
        email?: string;
        password?: string;
      };
      errors: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignInFormState =
  | {
      errors: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CreateCommentFormState =
  | {
      data?: {
        content?: string;
        postId?: number;
      };
      errors?: {
        content?: string[];
      };
      message?: string;
      ok?: boolean;
      open?: boolean;
    }
  | undefined;

export type PostCreateFormState = {
  data?: {
    title?: string;
    tags?: string;
    content?: string;
    isPublished?: string;
    thumbnail?: File | null;
  };
  errors?: {
    title?: string[];
    tags?: string[];
    content?: string[];
    isPublished?: string[];
    thumbnail?: string[];
  };
  message?: string;
  ok?: boolean;
} | undefined;
