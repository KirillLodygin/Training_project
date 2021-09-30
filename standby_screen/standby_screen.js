const standbyScreen = {
  
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
            method: {
              eventName: 'click',
              methodFunc: () => {
                  clickButton();
                  },
              },
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
  
};
const app = document.querySelector(".app");
const templateEngine = block => {
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
      const el = templateEngine(contentItem);

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

  if (block.method) element.addEventListener(block.method.eventName, block.method.methodFunc);

  element.appendChild(templateEngine(block.content));

  return element;
};


const createScreen = (obj) => {
  while (app.firstChild) {
    app.firstChild.remove();
  }

  app.appendChild(templateEngine(obj));
};

const createBlock = (arrObj, parentNode) => {
	parentNode.appendChild(templateEngine(arrObj));
};

createScreen(standbyScreen);
createBlock(standbyScreen.block, document.querySelector('.back_button_box'));

function clickButton() {
	console.log('click');
}