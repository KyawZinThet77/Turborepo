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
    Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE3ODIyMjkyMDQsImV4cCI6MTc4MjMxNTYwNH0.KJ12Gqg9Zez9U3k0C5806NAO_G1CvX78zm6OEfdDifA`,
  };

  // if (session?.accessToken) {
  //   headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE3ODIyMjkyMDQsImV4cCI6MTc4MjMxNTYwNH0.KJ12Gqg9Zez9U3k0C5806NAO_G1CvX78zm6OEfdDifA`;
  // }
console.log("headers",headers);

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
