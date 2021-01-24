export const state = () => ({
    token: null
})

export const mutations = {
    addAuth(state, { token }) {
        // Add data to store..
        state.token = token;
    },
    rmAuth(state){
        state.token = '';
    }
}


export const getters = {
    token (state) {
        return state.token;
    }
}
