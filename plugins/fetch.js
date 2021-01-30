import gql from 'graphql-tag'

export default (context, inject) => {
    //inject('getAllTrackers', getAllTrackers(context));
    inject('getTrackersByDate', args => getTrackersByDate(context, args));
    inject('addTracker', args => addTracker(context, args));
    inject('rmTracker', args => rmTracker(context, args));
}

const addTracker = async(context, { name, startDate, endDate, simpleDate, timer, projects, tags }) => {
    console.log('plugins/fetch.js: addTracker');

    const mutation = gql` mutation ($name: String!, $startDate: String!, $endDate: String!, $simpleDate: String!, $timer: String!, $projects: [String], $tags: [String]) { addTracker(name: $name, startDate: $startDate, endDate: $endDate, simpleDate: $simpleDate, timer: $timer, projects: $projects, tags: $tags){ _id name startDate endDate simpleDate timer projects tags } }`;

    const res = await context.app.apolloProvider.clients.defaultClient.mutate({
        mutation: mutation,
        variables: { name, startDate, endDate, simpleDate, timer, projects, tags },
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};

const getAllTrackers = async(context) => {
    console.log('plugins/fetch.js: getAllTrackers');
    console.log(context);

    const query = gql` { getAllTrackers { _id name startDate endDate simpleDate timer projects tags } }`;

    const res = await context.app.apolloProvider.clients.defaultClient.query({
        query: query,
        variables: {},
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};

const getTrackersByDate = async(context, { simpleDate }) => {
    console.log('plugins/fetch.js: getTrackersByDate');

    const query = gql` query GetTrackersByDate($simpleDate: String!) { getTrackersByDate(simpleDate: $simpleDate) { _id name startDate endDate simpleDate timer projects tags } }`;

    const res = await context.app.apolloProvider.clients.defaultClient.query({
        query: query,
        variables: { simpleDate },
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};

const rmTracker = async(context, { _id }) => {
    console.log('plugins/fetch.js: rmTracker');

    const mutation = gql` mutation RemoveTracker($_id: String!) { removeTracker(_id: $_id) }`;

    const res = await context.app.apolloProvider.clients.defaultClient.mutate({
        mutation: mutation,
        variables: { _id, },
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};
