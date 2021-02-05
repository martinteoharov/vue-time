export const state = () => ({
    trackerEntry: {}
})

export const mutations = {
    addTimer(state, { startDate, endDate, timer }) {
        // Add data to store..
        state.trackerEntry.startDate = startDate;
        state.trackerEntry.endDate   = endDate;
        state.trackerEntry.timer     = timer;
    },
    addTracker(state, { name, projects, tags }){
        // Add data to store..
        state.trackerEntry.name = name;
        state.trackerEntry.projects = projects;
        state.trackerEntry.tags = tags;
    },
}
