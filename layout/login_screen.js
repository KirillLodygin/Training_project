export const loginScreen = {
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
										block: 'img',
										cls: 'rock-image',
										attrs: [
											{
												src: '/layout/assets/img/rock.jpg',
											},
										],
									},
									{
										block: 'img',
										cls: 'scissors-image',
										attrs: [
											{
												src: '/layout/assets/img/scissors.jpg',
											},
										],
									},
									{
										block: 'img',
										cls: 'paper-image',
										attrs: [
											{
												src: '/layout/assets/img/paper.jpg',
											},
										],
									},
								],
							},
							{
								block: 'figure',
								cls: 'login',
								content: [
									{
										block: 'input',
										cls: ['login', 'login login-input'],
										attrs: [
											{
												placeholder: 'Введите свой nickname',
											},
										],
									},
									{
										block: 'button',
										cls: ['login', 'login login-button'],
										innerText: 'Войти',
									},
								],
							},
						],
					},
				],
			},
		],
	},
};
