export default loginScreen = {
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
							// {
							// 	block: 'figure',
							// 	cls: 'login',
							// 	content: [
							// 		{
							// 			block: 'input',
							// 			cls: ['login', 'login-input'],
							// 			attrs: {
							// 				placeholder: 'Введи свой nikname',
							// 			},
							// 		},
							// 		{
							// 			block: 'button',
							// 			cls: ['login', 'login-button'],
							// 			innerText: 'Войти',
							// 		},
							// 	],
							// },
						],
					},
				],
			},
		],
	},
};
