import gql from 'graphql-tag'

export default (context, inject) => {
    inject('getAllTrackers', getAllTrackers(context));
    inject('addTracker', args => addTracker(context, args));
    inject('rmTracker', args => rmTracker(context, args));
}

const addTracker = async(context, { name, startDate, endDate, timer, projects, tags }) => {
    console.log('plugins/fetch.js: addTracker');

    const mutation = gql` mutation ($name: String!, $startDate: String!, $endDate: String!, $timer: String!, $projects: [String], $tags: [String]) { addTracker(name: $name, startDate: $startDate, endDate: $endDate, timer: $timer, projects: $projects, tags: $tags){ _id name startDate endDate timer projects tags } }`;

    const res = await context.app.apolloProvider.clients.defaultClient.mutate({
        mutation: mutation,
        variables: { name, startDate, endDate, timer, projects, tags },
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};

const getAllTrackers = async(context) => {
    console.log('plugins/fetch.js: getAllTrackers');
    console.log(context);

    const query = gql` { getAllTrackers { _id name startDate endDate timer projects tags } }`;

    const res = await context.app.apolloProvider.clients.defaultClient.query({
        query: query,
        variables: {},
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};

const rmTracker = async(context, {_id}) => {
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
