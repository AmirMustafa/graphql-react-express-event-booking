import axios from 'axios';
const backendServer = 'http://localhost:8000/graphql';

const createEvent = async ({ title, price, description, date }, token) => {
    try {
        const mutation = `
            mutation {
                createEvent(eventInput: { title: "${title}", price: ${price}, description: "${description}", date: "${date}" }) {
                    _id
                    title
                    description
                    date
                    creator {
                        _id
                        email
                    }
                }
            }
        `;

        const response = await callGraphQLAPI(mutation, token);
        return response.data;

    } catch (err) {
        console.log('Error: createEvent ', err);
        return err;
    }

}

const fetchEvents = async (token) => {
    try {
        const query = `
            query {
                events {
                    _id
                    title
                    description
                    date
                    price
                }
            }
        `;

        const response = await callGraphQLAPI(query, token);
        return response.data.data;

    } catch (err) {
        console.log('Error: createEvent ', err);
        return err;
    }

}

const callGraphQLAPI = async (queryOrMutation, token) => {
    const response = await axios.post(backendServer, JSON.stringify({ query: queryOrMutation }), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
    createEvent,
    fetchEvents
}