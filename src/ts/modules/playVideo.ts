const YOUTUBE_IFRAME_API_URL = 'https://www.youtube.com/iframe_api';

export interface IVideoPlayer {
	triggersSelector: string;
	overlaySelector: string;
}

export class VideoPlayer {
	buttons: NodeListOf<HTMLButtonElement>;
	overlay: HTMLElement | null;
	closeButton: HTMLElement | null;
	player: YT.Player | null;
	path: string | null;
	activeButton: HTMLButtonElement | null;

	constructor({ triggersSelector, overlaySelector }: IVideoPlayer) {
		this.buttons = document.querySelectorAll(triggersSelector);
		this.overlay = document.querySelector(overlaySelector);
		if (!this.overlay) throw new Error('Overlay not found');
		this.closeButton = this.overlay.querySelector('.video .close');
		this.player = null;
		this.path = null;
		this.activeButton = null;
	}

	bindTriggers() {
		this.buttons.forEach((button, i) => {
			const blockedElement = button.closest('.module__video-item')?.nextElementSibling;
			if (i % 2 === 0) blockedElement?.setAttribute('data-disabled', 'true');

			button.addEventListener('click', () => {
				const isDisabled =
					button.closest('.module__video-item')?.getAttribute('data-disabled') === 'true';
				if (isDisabled) return;

				this.activeButton = button;
				const newPath = button.getAttribute('data-url');
				if (!newPath) return;

				if (this.overlay && document.querySelector('iframe#frame')) {
					this.overlay.style.display = 'flex';
					if (this.path !== newPath) {
						this.path = newPath;
						this.player?.loadVideoById({ videoId: this.path });
					}
				} else {
					this.path = newPath;
					this.createPlayer(this.path);
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
			events: {
				onStateChange: this.onPlayerStateChange,
			},
		});
		if (this.overlay) {
			this.overlay.style.display = 'flex';
		}
	}

	onPlayerStateChange = (state: YT.OnStateChangeEvent) => {
		const blockedElement =
			this.activeButton?.closest('.module__video-item')?.nextElementSibling;
		if (state.data === 0 && blockedElement && blockedElement instanceof HTMLElement) {
			const playButton = this.activeButton?.querySelector('svg')?.cloneNode(true);
			if (playButton) {
				blockedElement.querySelector('svg')?.remove();
				blockedElement.querySelector('.play__circle')?.appendChild(playButton);
			}
			const playText = blockedElement.querySelector('.play__text');
			if (playText) {
				playText.textContent = 'play video';
				playText.classList.remove('attention');
			}
			blockedElement.style.opacity = '1';
			blockedElement.style.filter = 'none';
			blockedElement.dataset['disabled'] = 'false';
		}
	};
	init() {
		const scriptTag = document.createElement('script');
		scriptTag.src = YOUTUBE_IFRAME_API_URL;
		document.head.appendChild(scriptTag);

		this.bindTriggers();
		this.bindCloseButton();
	}
}
