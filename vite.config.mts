import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'@imports': '/src/ts/modules',
			'@styles': '/src/assets/css',
		},
	},
	build: {
		rollupOptions: {
			input: {
				main: '/index.html',
				modules: '/modules.html',
				// Добавьте дополнительные точки входа здесь
			},
		},
	},
});
