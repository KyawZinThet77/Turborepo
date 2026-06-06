import { BACKEND_URL } from "./constants";

export const fetchGraphQL = async (
  query:  string,
  variables = {}
) => {
  console.log("fetching data with query:", query, "and variables:", variables);
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