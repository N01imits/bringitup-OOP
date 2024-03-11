import { MainSlider, VideoPlayer, MiniSlider } from './modules';

document.addEventListener('DOMContentLoaded', () => {
	const mainSlider = new MainSlider({
		containerSelector: '.page',
		buttonsSelector: '.next',
	});
	mainSlider.init();

	const showUpSlider = new MiniSlider({
		containerSelector: '.showup__content-slider',
		nextButtonSelector: '.showup__next',
		prevButtonSelector: '.showup__prev',
		activeClass: 'card-active',
		animate: true,
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		containerSelector: '.modules__content-slider',
		nextButtonSelector: '.modules__info-btns .slick-next',
		prevButtonSelector: '.modules__info-btns .slick-prev',
		activeClass: 'card-active',
		animate: true,
		autoPlay: true,
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		containerSelector: '.feed__slider',
		nextButtonSelector: '.feed__slider .slick-next',
		prevButtonSelector: '.feed__slider .slick-prev',
		activeClass: 'feed__item-active',
	});
	feedSlider.init();

	const videoPlayer = new VideoPlayer({
		triggersSelector: '.showup .play',
		overlaySelector: '.overlay',
	});
	videoPlayer.init();
});
