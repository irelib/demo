import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import SvgLoader from 'vite-svg-loader';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
	plugins: [
		vue(),
		nodePolyfills(),
		SvgLoader({
			// 所有svg文件默认为url导入
			defaultImport: 'url',
			svgoConfig: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								// 关闭移除viewBox功能
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
		legacy({
			targets: ['defaults', 'not IE 11'],
		}),
		AutoImport({
			// imports: ['vue', 'vue-router', 'pinia'],
			// dts: './auto-imports.d.ts',
			resolvers: [
				TDesignResolver({
					library: 'vue-next',
				}),
			],
		}),
		Components({
			resolvers: [
				TDesignResolver({
					library: 'vue-next',
				}),
			],
		}),
	],
	envPrefix: 'APP_',
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@com': resolve(__dirname, 'src/components'),
		},
	},
	// 仓库名
	base: '/demo/',
	server: {
		port: 1085,
	},
	build: {
		outDir: 'docs', // 输出目录为 docs
	},
});
