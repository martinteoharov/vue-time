export const getters = {
    // Auth status
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    // Info about logged user
    loggedInUser(state) {
        return state.auth.user
    }
}
