import {getProjectsList} from "@/api/index.js";

const state = {
    projects: []
};

const mutations = {
    SET_PROJECTS(state, projects) {
        state.projects = projects;
    }
};

const actions = {
    async getAllProjects({commit}) {
        const result = await getProjectsList();
        const { data } = result
        commit('SET_PROJECTS', data.projects);
    }
};

const getters = {
    getProjects: (state) => state.projects
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
