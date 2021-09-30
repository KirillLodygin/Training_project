// JavaScript source code
const lobbyScreen = {
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
            {
              block: 'div',
              cls: 'columnHeader2',
              content: {
                block: 'h2',
                innerText: 'Доступные игры',
              },

            },
            {
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
          ],
        },
      ],
    },
  ],
};
