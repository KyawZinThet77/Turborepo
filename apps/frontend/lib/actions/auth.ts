"use server";

import { SignUpFormState } from "../types/formState";
import { SignUpSchema } from "../zodSchemas/SignUpSchema";


export const signUpAction = async (formData: FormData, state: SignUpFormState) : Promise<SignUpFormState> => {

    const validatedFields = SignUpSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors : validatedFields.error.flatten().fieldErrors
        };
    }
    
    return ;
}