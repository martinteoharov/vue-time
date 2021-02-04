/* 
 * This plugin contains all of the methods needed for fetching/mutating data
 * It can be accessed globally from a component/page with this.$nuxt.$<name-of-injection>
 * 
 */
import gql from 'graphql-tag'

export default (context, inject) => {
    /* Not Used Anywhere, but still available in the API */
    //inject('getAllTrackers', getAllTrackers(context));
    
    /* Trackers */
    inject('getTrackersByDate', args => getTrackersByDate(context, args));
    inject('addTracker', args => addTracker(context, args));
    inject('rmTracker', args => rmTracker(context, args));
    
    /* Projects */
    inject('getAllProjects', getAllProjects(context));
    inject('addProject', args => addProject(context, args));
}

/* --------------------------------- TRACKERS START --------------------------------------------*/
const addTracker = async(context, { name, startDate, endDate, simpleDate, timer, projects, tags }) => {
    console.log('plugins/fetch.js: addTracker');

    // TODO: Get projects & tags and submit them to the server aswell...

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

/* Unused */
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
/* --------------------------------- TRACKERS END --------------------------------------------*/

/* --------------------------------- PROJECTS START --------------------------------------------*/
const getAllProjects = async(context) => {
    console.log('plugins/fetch.js: getAllProjects');

    const query = gql` { getAllProjects { name } }`;

    const res = await context.app.apolloProvider.clients.defaultClient.query({
        query: query,
        variables: {},
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
}

const addProject = async(context, { name }) => {
    console.log('plugins/fetch.js: addProject');

    const mutation = gql` mutation AddProject(name: String!) { addProject(name: $name) }`;

    const res = await context.app.apolloProvider.clients.defaultClient.mutate({
        mutation: mutation,
        variables: { name },
        context: {
            headers: { 'authorization': `Bearer ${ context.store.state.auth.token }`, }
        }
    });
    return res;
};
/* --------------------------------- PROJECTS END --------------------------------------------*/
