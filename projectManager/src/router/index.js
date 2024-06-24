import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './routes.js';
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRoutes]
})
export default router;
