const standbyScreen = {
  templateStructure: {
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
                    innerText: 'Ваша Статистика ',
                  },
                  {
                    block: 'div',
                    cls: 'statistic-items',
                    content: [
                      {
                        block: 'h3',
                        cls: 'win',
                        innerText: 'Победы : 0',
                      },
                      {
                        block: 'h3',
                        cls: 'loose',
                        innerText: 'Поражения : 0',
                      },
                      ,
                      {
                        block: 'h3',
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
          {
            block: 'div',
            cls: 'back_button_box',
            content: [
              {
                block: 'button',
                cls: 'back_button_box-button',
                content:[{
                  
                    block: 'img',
                    cls: 'arrow',
                    attrs: {
                      src: './assets/img/back_arrow.png',
                    },
                  },
                  {
                    block: 'h3',
                    innerText: 'Вернуться в лобби',
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
