const app = document.querySelector('.app');
const gameState = {
	url: 'http://localhost:3000/',
	gamerToken: '',

	gamerName: '',

	enemyName: 'Противник',
	move: '',
	roundStatus: '',
	gameId: '',
	gameStatistic: {
		rounds: '',
		wins: '',
		defeats: '',
	},
	gamerStatistic: {
		games: '',
		wins: '',
		loses: '',
	},
	enemyStatistic: {
		games: '',
		wins: '',
		loses: '',
	},
	obliqueCross: '&#128942;',
	greenTick: '&#10004;',
	loseMessages: {
		rock: 'Противник завернул ваш камушек в бумагу!',
		paper: 'Ножницы разрезают ваш лист бумаги! Не повезло!',
		scissors: 'Вы извлекли ножницы, но противник заготовил камень! Увы!',
	},
	winMessages: {
		rock: 'Камнем по нижницам! Это был удачный ход!',
		paper:
			'Что может камень противника против вашего бумажного листа?! Ничего!',
		scissors: 'Ножницами вы орудуете умело! Лист противника разрезан!',
	},
	drawMessages: {
		rock: 'Противник припас для тебя камешек. Но у тебя был камешек для него. Ничья!',
		paper: 'Бумага против бумаги. Результат очевиден. Ничья!',
		scissors: 'Ты показал ножницы. Противник насупился и показал свои. Ничья!',
	},
	errorMessage: ' ',
	errors: {
		error: 'Что-то пошло не так',
		' ': 'Игрок не зарегистрирован',
		"token doesn't exist": 'Нет игрока или игры с таким токеном',
		'player is already in game':
			'Игрок уже в игре, нельзя начать две игры одновременно',
		'no game id': 'Id игры не передан',
		'wrong game id': 'Id игры некорректный/бой не существует/бой закончен',
		'player is not in this game': 'Игрок не в этой игре',
		'no move': 'Ход не передан',
	},
};
let namePlayer = '';
Window.application = {
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
			method: {
				eventName: 'input',
				methodFunc: () => {
					inputName();
				},
			},
		},
		showedAvailableGame: {
			block: 'div',
			cls: 'main_opponent_profile-block',
			content: [
				{
					block: 'div',
					cls: 'main_opponent_profile-block-header',
					content: [
						{
							block: 'img',
							cls: 'opponent_profile-avatar',
							attrs: {
								src: 'assets/img/avatar.png',
							},
						},
						{
							block: 'h3',
							cls: 'opponent_profile-name',
							innerText: 'Пётр',
						},
					],
				},
				{
					block: 'div',
					cls: 'opponent_profile_statistics-block',
					content: [
						{
							block: 'h3',
							cls: 'statistics-header',
							innerText: 'Статистика Противника',
						},
						{
							block: 'div',
							cls: 'statistic-items',
							content: [
								{
									block: 'p',
									cls: 'win',
									innerText: 'Победы : 0',
								},
								{
									block: 'p',
									cls: 'loose',
									innerText: 'Поражения : 0',
								},
								{
									block: 'p',
									cls: 'draw',
									innerText: 'Ничьи : 0',
								},
							],
						},
					],
				},
				{
					block: 'div',
					cls: 'enterBlock',
					content: [
						{
							block: 'button',
							cls: 'enterButton',
							innerText: 'Войти в игру',
						},
					],
				},
			],
		},
		playButton: {
			block: 'div',
			cls: 'createGame',
			content: [
				{
					block: 'button',
					cls: 'create',
					innerText: 'Создать игру',
					method: {
						eventName: 'click',
						methodFunc: () => {
							clickPlayButton();
						},
					},
				},
			],
		},
		playerInformation: {
			block: 'div',
			cls: 'main_yourself_profile-block',
			content: [
				{
					block: 'div',
					cls: 'main_yourself_profile-block-header',
					content: [
						{
							block: 'img',
							cls: 'yourself_profile-avatar',
							attrs: {
								src: 'assets/img/avatar.png',
							},
						},
						{
							block: 'h2',
							cls: 'yourself_profile-name',
							innerText: `${gameState.gamerName}`,
						},
					],
				},
				{
					block: 'div',
					cls: 'yourself_profile_statistics-block',
					content: [
						{
							block: 'h3',
							cls: 'statistics-header',
							innerText: 'Статистика',
						},
						{
							block: 'div',
							cls: 'statistic-items',
							content: [
								{
									block: 'p',
									cls: 'win',
									innerText: 'Победы : 0',
								},
								{
									block: 'p',
									cls: 'loose',
									innerText: 'Поражения : 0 ',
								},
								{
									block: 'p',
									cls: 'draw',
									innerText: 'Ничьи : 0',
								},
							],
						},
					],
				},
			],
		},
		waitingAnswerServer: {
			block: 'div',
			cls: 'popUpWaitingScreen',
			content: [
				{
					block: 'p',
					cls: 'loadingStatus',
					innertext: 'Получение данных от сервера. Подождите',
				},
				{
					block: 'div',
					cls: 'loader',
					innerText: 'Loading...',
				},
			],
		},
	},
	screen: {
		loginScreen: {
			block: 'header',
			cls: 'header_login',
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
		gameField: {
			block: 'section',
			cls: 'game-field',
			content: [
				{
					block: 'div',
					cls: 'round-number',
					content: [
						{
							block: 'div',
							cls: ['fadeIn', 'invisible'],
							innerText: `Раунд ${gameState.rounds}`,
						},
					],
				},

				{
					block: 'div',
					cls: 'gamer1',
					content: [
						{
							block: 'div',
							cls: 'content-wrapper',
							content: [
								{
									block: 'h2',
									innerText: `${gameState.gamerName}`,
								},
								{
									block: 'div',
									cls: 'choice-wrapper',
									content: [
										{
											block: 'div',
											cls: ['result', 'display-none'],
										},
									],
								},
							],
						},
					],
				},

				{
					block: 'div',
					cls: 'gamer2',
					content: [
						{
							block: 'div',
							cls: 'content-wrapper',
							content: [
								{
									block: 'h2',
									innerText: `${gameState.rivalName}`,
								},
								{
									block: 'div',
									cls: 'choice-wrapper',
									content: [
										{
											block: 'div',
											cls: ['result', 'display-none'],
										},
									],
								},
							],
						},
					],
				},

				{
					block: 'div',
					cls: 'round-result-field',
					content: [
						{
							block: 'div',
							cls: ['round-result-wrapper', 'bigEntrance'],
							content: [
								{
									block: 'div',
									cls: 'round-result-Window',
									content: [
										{
											block: 'div',
											cls: 'result-declaration',
											content: [
												{
													block: 'p',
													cls: 'comment',
												},
												{
													block: 'p',
													cls: 'statistic',
												},
												{
													block: 'p',
													cls: 'offer',
												},
											],
										},
										{
											block: 'div',
											cls: 'btns-block',
											content: [
												{
													block: 'button',
													cls: ['button', 'ok-button'],
													innerText: 'Ok',
												},
												{
													block: 'button',
													cls: ['button', 'no-button'],
													innerText: 'No!!!',
												},
											],
										},
									],
								},
								{
									block: 'div',
									cls: 'round-result-frame',
								},
							],
						},
					],
				},
			],
		},
		lobbyScreen: {
			block: 'div',
			cls: 'wrapper',
			content: [
				{
					block: 'div',
					cls: 'header',
					content: [
						{
							block: 'h1',
							innerText: 'Добро пожаловать в лобби',
						},
					],
				},
				{
					block: 'div',
					cls: 'columnHeaders',
					content: [
						{
							block: 'div',
							cls: 'columnHeader',
							content: [
								{
									block: 'h2',
									innerText: 'Вы',
								},
							],
						},
						{
							block: 'div',
							cls: 'columnHeader2',
							content: [
								{
									block: 'h2',
									innerText: ['Доступные игры'],
								},
								{
									block: 'div',
									cls: 'listGames',
								},
							],
						},
					],
				},
				// {
				// 	block: 'div',
				// 	cls: 'popUpWaitingScreen',
				// 	content: [
				// 		{
				// 			block: 'p',
				// 			cls: 'loadingStatus',
				// 			innertext: 'Получение данных от сервера. Подождите',
				// 		},
				// 		{
				// 			block: 'div',
				// 			cls: 'loader',
				// 			innerText: 'Loading...',
				// 		},
				// 	],
				// },
			],
		},
		standbyScreen: {
			block: 'div',
			cls: '',
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
									block: 'header',
									cls: 'header',
									content: [
										{
											block: 'h1',
											cls: 'header_text',
											innerText: 'Вы создали комнату',
										},
									],
								},
								{
									block: 'div',
									cls: ['main_opponent_profile-block', 'bigEntrance'],
									content: [
										{
											block: 'div',
											cls: 'main_opponent_profile-block-header',
											content: [
												{
													block: 'img',
													cls: 'opponent_profile-avatar',
													attrs: {
														src: './assets/img/avatar.png',
													},
												},
												{
													block: 'h1',
													cls: 'opponent_profile-name',
													innerText: `${gameState.gamerName}`,
												},
											],
										},
										{
											block: 'div',
											cls: 'opponent_profile_statistics-block',
											content: [
												{
													block: 'h2',
													cls: 'statistics-header',
													innerText: 'Ваша Статистика ',
												},
												{
													block: 'div',
													cls: 'statistic-items',
													content: [
														{
															block: 'h3',
															cls: 'win',
															innerText:
																'Победы : ' +
																`${gameState.gamerStatistic.wins}`,
														},
														{
															block: 'h3',
															cls: 'loose',
															innerText:
																'Поражения : ' +
																`${gameState.gamerStatistic.loses}`,
														},
														,
														{
															block: 'h3',
															cls: 'draw',
															innerText: 'Ничьи :  ',
														},
													],
												},
											],
										},
									],
								},
								{
									block: 'div',
									cls: 'undercard',
									content: [
										{
											block: 'h1',
											cls: 'undercard_text',
											innerText: 'Ожидаем подключение соперника...',
										},
										{
											block: 'div',
											cls: 'lds-hourglass',
										},
									],
								},
							],
						},
					],
				},
			],
		},
	},
	renderScreen: function (obj) {
		while (app.firstChild) {
			app.removeChild(app.lastChild);
		}
		app.appendChild(templateEngine(obj));
		for (let i of Window.application.timers) {
			clearInterval(i);
			Window.application.timers = [];
		}
	},
	renderBlock: function (arrObj, parentNode) {
		arrObj.forEach((obj) => parentNode.append(templateEngine(obj)));
	},
	request: function (url, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.addEventListener('readystatechange', function (e) {
			if (e.target.readyState !== 4) {
				return;
			}
			if (e.target.status !== 200) {
				console.log('Ошибка');
				return;
			}
			const responseText = e.target.responseText;

			callback(responseText);
		});
		xhr.send();
	},
	timers: [],
};

function getPlayerStatus(data) {
	const parseStatus = JSON.parse(data);
	if (parseStatus['player-status'].status === 'lobby') {
		createPageLobbyScreen();
	}
	if (parseStatus['player-status'].status === 'game') {
		console.log('вы в игре');
	}
	if (parseStatus['player-status'].status === 'error') {
		createScreen(createPageLoginScreen());
	}
}

//получение токена и статуса
function getTokenGetPlayerStatus(data) {
	const parseToken = JSON.parse(data);
	gameState.gamerToken = parseToken.token;
	gameState.gamerName = namePlayer;
	// debugger;
	Window.application.request(
		`${gameState.url}player-status?token=${gameState.gamerToken}`,
		getPlayerStatus
	);
}

//нажатие на кнопку 'создать игру'
function clickPlayButton() {
	Window.application.renderScreen(Window.application.standbyScreen);
}

//получение информации об игроке
const getStatisticPlayer = (data) => {
	const parseStatisticPlayer = JSON.parse(data);
	let obj = parseStatisticPlayer.list;
	obj.forEach(function (obj) {
		if (Object.keys(obj).includes('you')) {
			Window.application.renderBlock(
				[Window.application.block.playerInformation],
				app.querySelector('.columnHeader')
			);
		}
	});
};

//получение информации об актуальных играх
const getAvailableGame = (data) => {
	while (document.querySelector('.listGames').firstChild) {
		document
			.querySelector('.listGames')
			.removeChild(document.querySelector('.listGames').lastChild);
	}
	const parseStatisticEnemy = JSON.parse(data);
	for (let enemy of parseStatisticEnemy.list) {
		Window.application.renderBlock(
			[Window.application.block.showedAvailableGame],
			document.querySelector('.listGames')
		);
	}
};

//работа кнопки залогиниться
function clickButton() {
	Window.application.request(
		`${gameState.url}login?login=${namePlayer}`,
		getTokenGetPlayerStatus
	);
}

//получение никнэйма
function inputName() {
	namePlayer = document.querySelector('.login-input').value;
}

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

//функция-обертка для логин-страницы
const createPageLoginScreen = () => {
	Window.application.renderScreen(Window.application.screen.loginScreen);
	Window.application.renderBlock(
		[Window.application.block.loginInput, Window.application.block.loginButton],
		app.querySelector('.login')
	);
};

//функция-обертка для лобби-страницы
const createPageLobbyScreen = () => {
	Window.application.renderScreen(Window.application.screen.lobbyScreen);
	Window.application.renderBlock(
		[Window.application.block.playButton],
		app.querySelector('.columnHeader')
	);
	Window.application.request(
		`${gameState.url}player-list?token=${gameState.gamerToken}`,
		getStatisticPlayer
	);
	setInterval(
		Window.application.request,
		1000,
		`${gameState.url}player-list?token=${gameState.gamerToken}`,
		getAvailableGame
	);
	Window.application.timers.push(
		setInterval(
			Window.application.request,
			1000,
			`${gameState.url}player-list?token=${gameState.gamerToken}`,
			getAvailableGame
		)
	);
	console.log(Window.application.timers);
};
document.addEventListener('DOMContentLoaded', createPageLoginScreen);
