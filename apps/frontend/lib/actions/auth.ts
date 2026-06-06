"use server";

import { redirect } from "next/navigation";
import { fetchGraphQL } from "../fetchGraphQL";
import { CREATE_USER_MUTATION ,GET_USER_MUTATION} from "../gqlQueries";
import { SignUpFormState } from "../types/formState";
import { SignUpSchema,SignInSchema } from "../zodSchemas/SignUpSchema";
import { print } from "graphql";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

export const signUpAction = async (state: SignUpFormState | undefined,formData: FormData ) : Promise<SignUpFormState> => {
    const validatedFields = SignUpSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            data : Object.fromEntries(formData.entries()),
            errors : validatedFields.error.flatten().fieldErrors
        };
    }

    const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
        input: {...validatedFields.data}
    });

    console.log("data?.errors",data?.errors);
    
    
    if (data?.errors) {
        return {
            data : Object.fromEntries(formData.entries()),
            errors : data.errors
        };
    }
    redirect("/auth/signin");
    

  
}

export const signInAction = async (state: SignUpFormState | undefined,formData: FormData ) : Promise<SignUpFormState> => {
    const validatedFields = SignInSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            data : Object.fromEntries(formData.entries()),
            errors : validatedFields.error.flatten().fieldErrors
        };
    }

    const data = await fetchGraphQL(print(GET_USER_MUTATION), {
        input: {...validatedFields.data}
    });
    
    if (data?.errors) {
        return {
            data : Object.fromEntries(formData.entries()),
            errors : data.errors
        };
    }

    await createSession(
        {
            user : {
                name :  data?.signIn.name,
                email :     data?.signIn.id,
                avatar :    data?.signIn.avatar
            },
            accessToken : data.data?.accessToken
        }
    )
    revalidatePath("/")
    redirect("/");
    

  
}