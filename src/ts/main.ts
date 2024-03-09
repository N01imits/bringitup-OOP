import { Slider, VideoPlayer } from './modules';

document.addEventListener('DOMContentLoaded', () => {
	const slider = new Slider({
		pageSelector: '.page',
		buttonsSelector: '.next',
	});
	slider.render();

	const player = new VideoPlayer({
		triggersSelector: '.showup .play',
		overlaySelector: '.overlay',
	});
	player.init();
});
