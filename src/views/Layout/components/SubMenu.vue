<template>
	<template v-for="route in menuList">
		<t-menu-item v-if="!route?.children?.length" :key="route.fullPath" :value="route.fullPath" :to="route.fullPath">
			<template #icon v-if="route?.meta?.icon">
				<t-icon :name="route?.meta?.icon as string" />
			</template>
			<span class="menu-label">{{ route?.meta?.title || '默认菜单名称' }}</span>
		</t-menu-item>

		<t-submenu v-else :value="route.fullPath" :title="route?.meta?.title || '默认菜单名称'">
			<template #icon v-if="route?.meta?.icon">
				<t-icon :name="route?.meta?.icon as string" />
			</template>
			<SubMenu :menu-list="route.children" />
		</t-submenu>
	</template>
</template>

<script setup lang="ts">
import { Icon as tIcon } from 'tdesign-vue-next';

defineProps({
	menuList: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped lang="scss"></style>
