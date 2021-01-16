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
    addName(state, { name }){
        // Add data to store..
        state.trackerEntry.name = name;
    }
}
