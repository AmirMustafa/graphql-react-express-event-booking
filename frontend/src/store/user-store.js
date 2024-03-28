import axios from 'axios';
const backendServer = 'http://localhost:8000/graphql';

// TO DO: IN FUTURE CONNECT WITH STORE - CURRENTLY ALL APIS HIT FROM HERE

const createUser = async (email, password) => {
    try {
        const mutation = `
            mutation {
                createUser(userInput: { email: "${email}", password: "${password}" }) {
                    _id
                    email
                }
            }
        `;

        const response = await callGraphQLAPI(mutation);
        return response.data.data.createUser;

    } catch (err) {
        console.error('createUser', err);
        throw err;
    }
}

const callGraphQLAPI = async (queryOrMutation) => {
    const response = await axios.post(backendServer, JSON.stringify({ query: queryOrMutation }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Handle GraphQL errors
    if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
    }

    if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed !');
    }

    // Return the created user data
    return response;
}

export {
    createUser
}