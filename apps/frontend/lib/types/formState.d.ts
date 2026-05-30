export type SignUpFormState = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
  }
  message?: string;
} | undefined;

export type SignInFormState = {
  errors: {
    email?: string[];
    password?: string[];
  }
  message?: string;
} | undefined;