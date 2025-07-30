import { cloneDeep } from "es-toolkit";
import type { RouteRecordRaw } from "vue-router";

export type RouteType = RouteRecordRaw & RouteRecordRawExtra;

export type RouteRecordRawExtra = {
  fullPath?: string;
  meta?: any;
};

const routes: RouteType[] = [
  {
    path: "/system",
    name: "System",
    meta: {
      title: "系统设置",
      icon: "setting",
    },
    children: [
      {
        path: "/menu",
        name: "Menu",
        component: () => import("@/views/System/Menu/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "menu",
        },
      },
    ],
  },
  {
    path: "/empty",
    name: "Empty",
    component: () => import("@/views/Empty.vue"),
    meta: {
      title: "空页面",
      icon: "brackets",
    },
  },
];

const staticRoutes: RouteType[] = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home/index.vue"),
    meta: {
      title: "主页",
      icon: "home",
    },
  },
  ...routes,
];

const baseRoutes: RouteType[] = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: () => import("@/views/Layout/index.vue"),
    children: [...cloneDeep(staticRoutes)],
  },
];

function handleFullPath(routerList: Array<RouteType>, parentPath = "") {
  routerList.forEach((route) => {
    let fullPath: string;
    if (parentPath) {
      fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, "/");
    } else {
      fullPath = route.path;
    }

    route.fullPath = fullPath;

    if (route?.children?.length) {
      handleFullPath(route.children, fullPath);
    }
  });
}

const handlePath = (routerList: RouteType[], isRootLevel = true) => {
  routerList.forEach((item) => {
    if (!isRootLevel && item.path.startsWith("/") && item.path.length > 1) {
      item.path = item.path.slice(1);
    }
    if (item?.children?.length) {
      handlePath(item.children, false);
    }
  });
};

handleFullPath(staticRoutes);
handleFullPath(baseRoutes);
handlePath(baseRoutes);

export { staticRoutes, baseRoutes };
