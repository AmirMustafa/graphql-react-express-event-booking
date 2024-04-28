import axios from "axios";
const backendServer = "http://localhost:8000/graphql";

const bookEvent = async (eventId, token) => {
  try {
    const mutation = `
        mutation {
            bookEvent(eventId: "${eventId}") {
            event {
                title
                creator {
                email
                }
            }
            }
        }
    `;

    const response = await callGraphQLAPI(mutation, token);
    return response.data;
  } catch (err) {
    console.log("Error: bookEvent ", err);
    return err;
  }
};

const callGraphQLAPI = async (queryOrMutation, token) => {
  const response = await axios.post(
    backendServer,
    JSON.stringify({ query: queryOrMutation }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Handle GraphQL errors
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed !");
  }

  // Return the created user data
  return response;
};

export { bookEvent };
