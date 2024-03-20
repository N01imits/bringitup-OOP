import {
	MainSlider,
	VideoPlayer,
	MiniSlider,
	CardDisplayManager,
	Forms,
	Download,
	ShowInfo,
} from './modules';

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

	const mainPageFeedSlider = new MiniSlider({
		containerSelector: '.feed__slider',
		nextButtonSelector: '.feed__slider .slick-next',
		prevButtonSelector: '.feed__slider .slick-prev',
		activeClass: 'feed__item-active',
	});
	mainPageFeedSlider.init();

	const videoPlayer = new VideoPlayer({
		triggersSelector: '.showup .play',
		overlaySelector: '.overlay',
	});
	videoPlayer.init();

	const videoPlayerSecondPage = new VideoPlayer({
		triggersSelector: '.module__video-item .play',
		overlaySelector: '.overlay',
	});
	videoPlayerSecondPage.init();

	const oldOfficer = new CardDisplayManager({
		containerSelector: '.officerold',
		cardsSelector: '.officer__card-item',
	});
	oldOfficer.init();

	const newOfficer = new CardDisplayManager({
		containerSelector: '.officernew',
		cardsSelector: '.officer__card-item',
	});
	newOfficer.init();

	const forms = new Forms('.form');
	forms.init();

	const secondPageMainSlider = new MainSlider({
		containerSelector: '.moduleapp',
		buttonsSelector: '.next',
		nextButtonSelector: '.nextmodule',
		prevButtonSelector: '.prevmodule',
	});
	secondPageMainSlider.init();

	new Download('.download').init();
	new ShowInfo('.plus__content').init();
});
