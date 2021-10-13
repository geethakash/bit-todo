import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		darktheme:true
	}
});

export default app;