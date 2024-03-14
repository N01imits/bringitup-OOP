export interface ISliderSelectors {
	containerSelector: string;
	buttonsSelector?: string;
	nextButtonSelector?: string;
	prevButtonSelector?: string;
	activeClass?: string;
	animate?: boolean;
	autoPlay?: boolean;
}

export class Slider {
	container: HTMLDivElement | null = null;
	slides: HTMLElement[] = [];
	buttons: NodeListOf<HTMLButtonElement> | null = null;
	slideIndex: number = 1;
	autoPopupImage: HTMLElement | null = null;
	nextButton: HTMLButtonElement | null = null;
	prevButton: HTMLButtonElement | null = null;
	activeClass: string | null = null;
	animate: boolean = false;
	autoPlay: boolean = false;

	constructor({
		containerSelector,
		buttonsSelector,
		prevButtonSelector,
		nextButtonSelector,
		activeClass,
		animate = false,
		autoPlay = false,
	}: ISliderSelectors) {
		this.container = document.querySelector(containerSelector);
		if (!this.container) {
			return;
		}
		this.slides = Array.from(this.container.querySelectorAll(':scope > *:not(button)'));
		this.buttons = buttonsSelector ? document.querySelectorAll(buttonsSelector) : null;
		this.nextButton = nextButtonSelector ? document.querySelector(nextButtonSelector) : null;
		this.prevButton = prevButtonSelector ? document.querySelector(prevButtonSelector) : null;
		this.activeClass = activeClass ? activeClass : null;
		this.animate = animate;
		this.autoPlay = autoPlay;
	}
}
