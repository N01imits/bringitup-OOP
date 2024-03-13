const PATH = 'https://postsimpleserver.onrender.com/api/data';

export class Forms {
	forms: NodeListOf<HTMLFormElement>;
	message: {
		loading: string;
		success: string;
		failure: string;
	};
	path: string;

	constructor(formsSelector: string) {
		this.forms = document.querySelectorAll(formsSelector);
		this.message = {
			loading: 'Loading...',
			success: 'Thank you! We will contact you soon',
			failure: 'Something went wrong...',
		};
		this.path = PATH;
	}

	checkMailInputs() {
		const emailInputs = document.querySelectorAll(
			'[type="email"]',
		) as NodeListOf<HTMLInputElement>;

		emailInputs.forEach(input => {
			input.addEventListener('keypress', e => {
				if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
					e.preventDefault();
				}
			});
		});
	}

	initMask() {
		const nonDigitsRegexp = /\D/g;
		const maskSymbolRegexp = /[_\d]/;

		const setCursorPosition = (position: number, element: HTMLInputElement): void => {
			element.focus();
			if (element.setSelectionRange) {
				element.setSelectionRange(position, position);
			}
		};

		const createMask = (event: Event) => {
			if (!(event.target instanceof HTMLInputElement)) return;

			const input = event.target;
			const matrix: string = '+1 (___) ___-____';
			const def: string = matrix.replace(nonDigitsRegexp, '');
			let i: number = 0;
			let value: string = input.value.replace(nonDigitsRegexp, '');

			if (def.length >= value.length) {
				value = def;
			}

			input.value = matrix.replace(/./g, (symbol: string): string => {
				const test = maskSymbolRegexp.test(symbol) && i < value.length;

				return test ? value.charAt(i++) : i >= value.length ? '' : symbol;
			});

			if (event.type === 'blur') {
				if (input.value.length == 2) {
					input.value = ``;
				}
			} else {
				setCursorPosition(input.value.length, input);
			}
		};

		const inputs = document.querySelectorAll(`[name="phone"]`);

		inputs.forEach(input => {
			if (!(input instanceof HTMLInputElement)) return;

			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blur', createMask);
		});
	}

	formDataToJson(formData: FormData) {
		return JSON.stringify(Object.fromEntries(formData));
	}

	async postData(url: string, jsonData: string) {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: jsonData,
		});
		return await res.text();
	}

	init() {
		this.checkMailInputs();
		this.initMask();
		this.forms.forEach(form => {
			form.addEventListener('submit', event => {
				event.preventDefault();

				const statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: grey;
            `;
				form.parentNode?.appendChild(statusMessage);
				statusMessage.textContent = this.message.loading;

				const formData = new FormData(form);
				const jsonData = this.formDataToJson(formData);

				this.postData(this.path, jsonData)
					.then(() => {
						statusMessage.textContent = this.message.success;
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure;
					})
					.finally(() => {
						form.reset();
						setTimeout(() => {
							statusMessage.remove();
						}, 5000);
					});
			});
		});
	}
}
