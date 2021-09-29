const app = document.querySelector('.app');
function clickButton() {
	console.log('click');
}

const application = {
	block: {
		loginButton: {
			block: 'button',
			cls: ['login', 'login-button'],
			innerText: 'Войти',
			method: {
				eventName: 'click',
				methodFunc: () => {
					clickButton();
				},
			},
		},
		loginInput: {
			block: 'input',
			cls: ['login', 'login-input'],
			attrs: {
				placeholder: 'Введи свой nikname',
			},
		},
	},
	screen: {
		loginScreen: {
			block: 'header',
			cls: 'header',
			content: [
				{
					block: 'div',
					cls: 'container',
					content: [
						{
							block: 'div',
							cls: 'main',
							content: [
								{
									block: 'h1',
									cls: 'title',
									content: [
										{
											block: 'span',
											cls: 'rock-text',
											innerText: 'Камень',
										},
										{
											block: 'span',
											cls: 'scissors-text',
											innerText: 'Ножницы',
										},
										{
											block: 'span',
											cls: 'paper-text',
											innerText: 'Бумага',
										},
									],
								},
								{
									block: 'figure',
									cls: 'title-image',
									content: [
										{
											block: 'div',
											cls: 'rock-image',
										},
										{
											block: 'div',
											cls: 'scissors-image',
										},
										{
											block: 'div',
											cls: 'paper-image',
										},
									],
								},
								{
									block: 'figure',
									cls: 'login',
								},
							],
						},
					],
				},
			],
		},
	},
};

//шаблонизатор
const templateEngine = (block) => {
	if (!block) {
		return document.createTextNode('');
	}

	if (
		typeof block === 'string' ||
		typeof block === 'number' ||
		block === true
	) {
		return document.createTextNode(String(block));
	}

	if (Array.isArray(block)) {
		const fragment = document.createDocumentFragment();

		block.forEach((contentItem) => {
			const el = templateEngine(contentItem);

			fragment.appendChild(el);
		});

		return fragment;
	}

	const element = document.createElement(block.block);

	[]
		.concat(block.cls)
		.filter(Boolean)
		.forEach((className) => element.classList.add(className));

	if (block.attrs) {
		Object.keys(block.attrs).forEach((key) => {
			element.setAttribute(key, block.attrs[key]);
		});
	}

	if (block.innerText) element.innerText = block.innerText;

	if (block.method)
		element.addEventListener(block.method.eventName, block.method.methodFunc);

	element.appendChild(templateEngine(block.content));

	return element;
};

//вставка блоков
const createBlock = (arrObj, parentNode) => {
	parentNode.appendChild(templateEngine(arrObj));
};

//формирует стартовую страницу
const createScreen = (obj) => {
	while (app.firstChild) {
		app.firstChild.remove();
	}
	app.appendChild(templateEngine(obj));
};

//формирует облик страницы
const createPage = () => {
	createScreen(application.screen.loginScreen);
};
// document.addEventListener('DOMContentLoaded', createPage);

createPage();
createBlock(application.block.loginInput, document.querySelector('.login'));
createBlock(application.block.loginButton, app.querySelector('.login'));
