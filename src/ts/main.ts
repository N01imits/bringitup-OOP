import { Slider } from './modules';

document.addEventListener('DOMContentLoaded', () => {
	const slider = new Slider({
		pageSelector: '.page',
		buttonsSelector: '.next',
	});
	slider.render();
});
