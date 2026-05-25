import { BACKEND_URL } from "./constants";

export const fetchGraphQL = async (
  query:  string,
  variables = {}
) => {
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
      console.error("GraphQL errors:", result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};