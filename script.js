const gameState = {
  gamerName: '',

  statistic: {
    games: 0,
    victories: 0,
    defeats: 0
  },

  rivalName: '',

  rounds: 0,
  victories: 0,
  defeats: 0,

  colorMap: [
    ['#D5E052', '#D3E03D', '#69E0DB', '#983DE0', '#E07D48'],
    ['#E0B353', '#E0AC3D', '#6CE069', '#2D6FE0', '#E04899'],
    ['#E07053', '#E05E3D', '#E0D869', '#39E0AA', '#7548E0'],
    ['#E05364', '#E03D50', '#E0C469', '#3BE05E', '#485FE0'],
    ['#536FE0', '#3D5DE0', '#E06982', '#E0B63A', '#79E08B']
  ],
  invitationsToGame: [],
  comments: [],
};

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
                content: [
                  {
                    block: 'input',
                    cls: ['login', 'login-input'],
                    attrs: {
                      placeholder: 'Введи свой nikname',
                    },
                  },
                  {
                    block: 'button',
                    cls: ['login', 'login-button'],
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

const gameField = {
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
          innerText: `Раунд ${gameState.rounds}`
        }
      ]
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
              innerText: `${gameState.gamerName}`
            },
            {
              block: 'div',
              cls: 'choice-wrapper',
              content: [
                {
                  block: 'div',
                  cls: ['result', 'display-none']
                }
              ]
            }
          ]
        }
      ]
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
              innerText: `${gameState.rivalName}`
            },
            {
              block: 'div',
              cls: 'choice-wrapper',
              content: [
                {
                  block: 'div',
                  cls: ['result', 'display-none']
                }
              ]
            }
          ]
        }
      ]
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
              cls: 'round-result-window',
              content: [
                {
                  block: 'div',
                  cls: 'result-declaration',
                  content: [
                    {
                      block: 'p',
                      cls: 'comment'
                    },
                    {
                      block: 'p',
                      cls: 'statistic'
                    },
                    {
                      block: 'p',
                      cls: 'offer'
                    }
                  ]
                },
                {
                  block: 'div',
                  cls: 'btns-block',
                  content: [
                    {
                      block: 'button',
                      cls: 'ok-button',
                      innerText: 'Ok'
                    },
                    {
                      block: 'button',
                      cls: 'no-button',
                      innerText: 'No!!!'
                    }
                  ]
                }
              ]
            },
            {
              block: 'div',
              cls: 'round-result-frame'
            }
          ]
        }
      ]
    }
  ]
};

const app = document.querySelector('.app');

const startTemplateEngine = block => {
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

    block.forEach(contentItem => {
      const el = startTemplateEngine(contentItem);

      fragment.appendChild(el);
    });

    return fragment;
  }

  const element = document.createElement(block.block);

  []
    .concat(block.cls)
    .filter(Boolean)
    .forEach(className => element.classList.add(className));

  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  if (block.innerText) element.innerText = block.innerText;

  element.appendChild(startTemplateEngine(block.content));

  return element;
};

gameState.gamerName = 'A';
gameState.rivalName = 'B'

const createTemplate = (templateStructure) => {
  return startTemplateEngine(templateStructure);
};

app.appendChild(createTemplate(loginScreen));
