<template>
  <t-layout class="layout">
    <t-header>
      <t-head-menu value="item1" height="120px"> 123 </t-head-menu>
    </t-header>

    <t-layout class="layout-main">
      <t-aside style="border-top: 1px solid var(--td-border-level-1-color)">
        <t-menu theme="light" v-model:expanded="expandMenuList" :value="activeMenu" :expand-mutex="true" @change="activeMenu = $event">
          <SubMenu :menu-list="staticRoutes" />

          <template #operations>
            <t-button variant="text" title="获取Token">
              <t-icon name="secured" />
            </t-button>
          </template>
        </t-menu>
      </t-aside>

      <t-layout class="layout-main-content">
        <OverlayScrollbarsComponent ref="ScrollbarRef" class="common-scrollbar" defer :options="bodyScrollbarOptions">
          <div class="layout-main-content-view">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </OverlayScrollbarsComponent>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouteLocationNormalizedLoadedGeneric, useRoute } from "vue-router";
import { RouteRecordRawExtra, staticRoutes } from "@/router/routes.ts";
import { OverlayScrollbars, ClickScrollPlugin } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import SubMenu from "@/views/Layout/components/SubMenu.vue";
OverlayScrollbars.plugin(ClickScrollPlugin);

const route: RouteLocationNormalizedLoadedGeneric & RouteRecordRawExtra = useRoute();
const activeMenu = ref(route.fullPath || "/home");
const expandMenuList = ref<string[]>([]);

const ScrollbarRef = ref();
const bodyScrollbarOptions = ref<any>({
  scrollbars: {
    // 主题
    theme: "os-theme-light",
    // 点击滚动
    clickScroll: true,
  },
});

const findTreeNodes = (
  tree: any,
  target: any,
  mode: "target" | "parent" | "lineage" | "ancestors" = "target",
  nodeKey = "id",
  childrenKey = "children",
): any => {
  // 如果 target 中不存在 nodeKey 字段，抛出错误
  if (!(nodeKey in target)) {
    throw new Error("target 对象中不存在指定的 nodeKey 字段");
  }

  // 用于存储从根节点到目标节点的路径
  const path: any = [];

  /**
   * 递归遍历节点数组以查找目标节点，并构建路径
   * @param nodes 当前节点数组
   * @returns 是否找到目标节点
   */
  const findNode = (nodes: any): boolean => {
    for (const node of nodes) {
      // 将当前节点加入路径
      path.push(node);
      // 找到目标节点，结束查找
      if (node[nodeKey] === target[nodeKey]) {
        return true;
      }
      // 若存在子节点，则递归查找
      if (Array.isArray(node[childrenKey])) {
        if (findNode(node[childrenKey])) {
          return true;
        }
      }
      // 未找到目标节点，回溯移除当前节点
      path.pop();
    }
    // 遍历完成未找到目标节点
    return false;
  };

  // 从根节点开始查找目标节点
  if (!findNode(tree)) {
    return null;
  }

  switch (mode) {
    // 返回目标节点本身（路径中最后一个）
    case "target":
      return path[path.length - 1] || null;
    // 返回目标节点的父节点（路径中倒数第二个）
    case "parent":
      return path.length >= 2 ? path[path.length - 2] : null;
    // 返回完整路径（含自身）
    case "lineage":
      return path;
    // 返回所有祖先节点（不含自身）
    case "ancestors":
      return path.slice(0, -1);
    // 兜底
    default:
      return null;
  }
};

// 切换页面时隐藏回到顶部按钮并滚动到顶部
watch(
  () => route.fullPath,
  (newValue) => {
    activeMenu.value = newValue;
    // 查找需要展开的菜单
    expandMenuList.value = findTreeNodes(staticRoutes, { fullPath: activeMenu.value }, "ancestors", "fullPath")?.map((item: any) => item.fullPath);
  },
  {
    deep: true,
    immediate: true,
  },
);

onMounted(() => {});
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;

  & > :deep(.t-layout__header) {
    .t-menu__logo {
      position: relative;
      margin-right: var(--td-comp-margin-s);
      justify-content: space-between;
      transition: width 0.28s cubic-bezier(0.645, 0.045, 0.355, 1);

      img {
        height: 32px;
        cursor: pointer;
      }

      .t-button {
        position: absolute;
        right: 0;
        margin: 0;
      }
    }

    &.menuCollapsed .t-menu__logo {
      width: 68px !important;

      img {
        opacity: 1;
        transform: translate(-3px, -2px);
      }

      .t-button {
        z-index: -1;
        opacity: 0;
      }
    }

    .t-head-menu__inner {
      .t-menu {
        overflow: hidden;
        position: relative;

        &:before {
          content: "";
          position: absolute;
          top: 12px;
          right: 0;
          z-index: 1;
          width: 50px;
          height: 32px;
          background: linear-gradient(to left, var(--td-bg-color-container), transparent);
          pointer-events: none;
        }
      }

      .t-menu__operations {
        margin-left: var(--td-comp-margin-xxxxl);

        .radio-group {
          .t-radio-button__label {
            display: flex;
          }
        }
      }

      .layout-head-menu-content {
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 35px;

        * {
          flex-shrink: 0;
        }
      }
    }
  }

  .layout-main {
    flex: 1;
    height: 0;
    z-index: 1;

    :deep(.t-layout__sider) {
      width: fit-content;
      transition: all 0.28s cubic-bezier(0.645, 0.045, 0.355, 1);

      .t-default-menu {
        transition: all 0.28s cubic-bezier(0.645, 0.045, 0.355, 1);

        .t-default-menu__inner {
          overflow: hidden;

          .t-menu__item {
            height: 40px;
          }

          .t-menu__operations {
            padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-s);
          }
        }

        &.t-is-collapsed {
          width: 68px !important;
        }
      }
    }

    .layout-main-content {
      overflow: hidden;

      .layout-main-content-view {
        height: 100%;
        box-sizing: border-box;
      }

      .t-back-top {
        opacity: 0;
        filter: blur(8px);
        transform: translateY(10px) scale(0.9);
        pointer-events: none;
        transition: all 0.3s;

        &.show {
          opacity: 1;
          filter: blur(0px);
          transform: translateY(0px) scale(1);
          pointer-events: auto;
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }

    & .menuCollapsedToHide .t-default-menu.t-is-collapsed {
      width: 0 !important;
    }
  }
}
</style>

<style lang="scss">
.t-menu__popup .t-menu__item {
  height: var(--td-comp-size-m);
  line-height: var(--td-comp-size-m);

  .t-icon {
    margin-right: var(--td-comp-margin-s);
  }
}

.t-menu__popup .t-menu__item:not(:first-child),
.t-menu__popup .t-submenu:not(:first-child) {
  margin-top: var(--td-comp-margin-xs);
}

.user-dropdown-item .t-dropdown__item-text span {
  vertical-align: middle;
  margin-left: var(--td-comp-margin-s);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: translate(0, 0);
}

.fade-leave-to {
  opacity: 0;
  filter: blur(5px);
  transform: translate(20px, 0);
}

.fade-enter-from {
  opacity: 0;
  filter: blur(5px);
  transform: translate(-20px, 0);
}

.fade-enter-to {
  opacity: 1;
  filter: blur(0);
  transform: translate(0, 0);
}
</style>
