import {getUserList, getWorkList, loginIn} from "@/api/index.js";
import {ElMessage} from "element-plus";

const state = {
    user: {}
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    }
};

const actions = {
    async login({ commit }, user) {
        try {
            const result = await loginIn(user);
            const { data } = result
            commit('SET_USER', data.user);
        } catch (e) {
            ElMessage.error(`错误信息：${e}`)
        }
    },
    async getAllUsers({commit}) {
        const result = await getUserList();
        // console.log(result);
    },
    async getAllWorks({commit}) {
        const { name } = state.user;
        const result = await getWorkList({workerName: name});
        console.log(result);
    }
};

const getters = {
    getUser: (state) => state.user
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
