const state = {
    progress: 1
};

const mutations = {
    SET_PROGRESS(state, progress) {
        // console.log(progress)
        state.progress = progress;
    }
};

const actions = {
    updateProgress({ commit }, progress) {
        commit('SET_PROGRESS', progress);
    }
};

const getters = {
    getName: (state) => state.progress
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
