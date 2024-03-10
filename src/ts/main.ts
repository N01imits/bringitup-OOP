import { MainSlider, VideoPlayer } from './modules';

document.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({
		containerSelector: '.page',
		buttonsSelector: '.next',
	});
	slider.render();

	const player = new VideoPlayer({
		triggersSelector: '.showup .play',
		overlaySelector: '.overlay',
	});
	player.init();
});
