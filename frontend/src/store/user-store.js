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

        const response = await axios.post(backendServer, JSON.stringify({ query: mutation }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle GraphQL errors
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }

        console.log('Status Code:', { status: response.status });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Failed !');
        }

        // Return the created user data
        return response.data.data.createUser;


    } catch (err) {
        console.error('createUser', err);
        throw err;
    }
}

export {
    createUser
}