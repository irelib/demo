<template>
	<div>
		<t-button @click="showDialog = true">打开弹窗</t-button>
		<t-dialog
			class="dialog-align-center"
			width="600px"
			v-model:visible="showDialog"
			:close-on-overlay-click="false"
			@close="showDialog = false"
			@confirm="showDialog = false"
		>
			1233123
		</t-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showDialog = ref(false);
</script>

<style scoped lang="scss"></style>
