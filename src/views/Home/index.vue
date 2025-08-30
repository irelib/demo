<template>
	<div class="Home">
		<div class="pdf-page flex-center" v-for="page in pages" :key="page">
			<VuePDF annotation-layer :pdf="pdf" :page="page" @annotation="onAnnotation" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import file from '@/assets/test.pdf';

const { pdf, pages } = usePDF(file);

const onAnnotation = (event: { data: any; type: string }) => {
	console.log(event.data);
};
</script>

<style scoped lang="scss">
.pdf-page {
	:deep(.annotationLayer) {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		section {
			position: absolute;
			cursor: pointer;
			opacity: 0.6;
			transition: opacity 0.3s;

			&:hover {
				opacity: 0.3;
				background-color: #ffff00;
			}
		}
	}
}

:deep(.pdf-page > div) {
	width: fit-content;
}
</style>
