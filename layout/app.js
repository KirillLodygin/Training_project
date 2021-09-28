// import loginScreen from './login_screen';
const app = document.querySelector('.app');
const loginScreen = {
	templateStructure: {
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
								// content: [
								// 	{
								// 		block: 'input',
								// 		cls: ['login', 'login-input'],
								// 		attrs: {
								// 			placeholder: 'Введи свой nikname',
								// 		},
								// 	},
								// 	{
								// 		block: 'button',
								// 		cls: ['login', 'login-button'],
								// 		innerText: 'Войти',
								// 	},
								// ],
							},
						],
					},
				],
			},
		],
	},
};

//отрисовка блоков
const renderLogin = () => {
	const login = document.querySelector('.login');
	const button = document.createElement('button');
	const input = document.createElement('input');
	input.className = 'login login-input';
	input.setAttribute('placeholder', 'Введи свой nikname');
	button.className = 'login login-button';
	button.textContent = 'Войти';
	login.appendChild(input);
	login.appendChild(button);
};

//шаблонизатор
const templateEngine = (block) => {
	if (block === undefined || block === null || block === false) {
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

	element.appendChild(templateEngine(block.content));

	return element;
};

//формирует стартовую страницу
const createTemplate = () => {
	return templateEngine(loginScreen.templateStructure);
};

//формирует облик страницы
const createPage = () => {
	createTemplate;
	app.appendChild(createTemplate());
	renderLogin();
};
document.addEventListener('DOMContentLoaded', createPage);
