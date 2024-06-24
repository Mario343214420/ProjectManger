import { createStore } from 'vuex';
import user from "@/store/modules/user.js";
import projects from "@/store/modules/projects.js";
const store = createStore({
    state() {
        return {
            count: 0,
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        }
    },
    modules: {
        user, projects
    }
});

export default store;
