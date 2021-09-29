const standbyScreen = {
  templateStructure: {
    block: 'div',
    cls: 'container',
    content: [
      {
        block: 'header',
        cls: 'header',
        content: [
          {
            block: 'h1',
            cls: 'header_text',
            innerText: 'Вы отправили вызов игроку',
            content: [
              {
                block: 'span',
                cls: 'gamer2',
                innerText: 'Пётр',
              },
            ],
          },
        ],
      },
      {
        block: 'div',
        cls: 'main',
        content: [
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
                      src: './assets/img/avatar.svg',
                    },
                  },
                  {
                    block: 'h2',
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
                    block: 'h2',
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
                      ,
                      {
                        block: 'p',
                        cls: 'draw',
                        innerText: 'Ничьи : 0 ',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            block: 'div',
            cls: 'blink_text',
            content: [
              {
                block: 'p',
                innerText: 'Ожидаем подключение соперника...',
              },
            ],
          },
          {
            block: 'div',
            cls: ['canceled', 'draw', 'hidden'],
            content: [
              {
                block: 'h2',
                innerText:
                  'Противник отклонил заявку :( <br> Выбери другого соперника',
              },
            ],
          },
        ],
      },
    ],
  },
};
