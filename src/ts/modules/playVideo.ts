const YOUTUBE_IFRAME_API_URL = 'https://www.youtube.com/iframe_api';

export interface IVideoPlayer {
	triggersSelector: string;
	overlaySelector: string;
}

export class VideoPlayer {
	buttons: NodeListOf<HTMLElement>;
	overlay: HTMLElement | null;
	closeButton: HTMLElement | null;
	player: YT.Player | null;

	constructor({ triggersSelector, overlaySelector }: IVideoPlayer) {
		this.buttons = document.querySelectorAll(triggersSelector);
		this.overlay = document.querySelector(overlaySelector);
		if (!this.overlay) throw new Error('Overlay not found');
		this.closeButton = this.overlay.querySelector('.video .close');
		this.player = null;
	}

	bindTriggers() {
		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				if (this.overlay && document.querySelector('iframe#frame')) {
					this.overlay.style.display = 'flex';
				} else {
					const url = button.getAttribute('data-url');
					if (url) this.createPlayer(url);
				}
			});
		});
	}

	bindCloseButton() {
		this.closeButton?.addEventListener('click', () => {
			if (this.overlay && this.player) {
				this.overlay.style.display = 'none';
				this.player.stopVideo();
			}
		});
	}
	createPlayer(videoId: string) {
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId,
		});
		if (this.overlay) {
			this.overlay.style.display = 'flex';
		}
	}

	init() {
		const scriptTag = document.createElement('script');
		scriptTag.src = YOUTUBE_IFRAME_API_URL;
		document.head.appendChild(scriptTag);

		this.bindTriggers();
		this.bindCloseButton();
	}
}
