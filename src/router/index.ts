import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';
import { baseRoutes, RouteRecordRawExtra } from '@/router/routes.ts';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

type RouteGuardParamsType = RouteLocationNormalized & RouteRecordRawExtra;

NProgress.configure({ showSpinner: false });

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [...baseRoutes],
});

router.beforeEach(async (to: RouteGuardParamsType, _from: RouteGuardParamsType, next) => {
	document.title = <string>to.meta?.title || 'Demo';

	NProgress.start();

	next();
});

router.afterEach(() => {
	NProgress.done();
});

export { router };
