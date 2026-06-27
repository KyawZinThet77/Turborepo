import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export const fetchGraphQL = async (query: string, variables = {}) => {
  try {
    const response = await fetch(`${BACKEND_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    });

    const result = await response.json();
    if (result.errors) {
      return {
        errors: result.errors,
      };
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authFetchQl = async (query: string, variables = {}) => {
  const session = await getSession();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  console.log('session?.accessToken',session);
  

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    });

    const result = await response.json();
    if (result.errors) {
      return {
        errors: result.errors,
      };
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
