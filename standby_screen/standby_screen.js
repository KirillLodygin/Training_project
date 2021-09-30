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
          
          
        ],
      },
    ],
  
};
const backToLobbyButton ={
  block: 'div',
  cls: 'back_button_box',
  method: {
    eventName: 'click',
    methodFunc: () => {
      backToLobby();
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
};


const lobby =  {
  block: 'div',
  cls: 'wrapper',
  content: [
      {
          block: 'div',
          cls: 'header',
          content: [
              {
                  block: 'h1',
                  innerText: 'Добро пожаловать в Лобби',
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
                          innerText: 'Доступные игры',
                      },
                  ],
              },
          ],
      },
      {
          block: 'div',
          cls: 'players',
          content: [
              {
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
                                  innerText: 'UserName',
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
              {
                  block: 'div',
                  cls: 'opponents',
                  content: [
                      {
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
const gameStatus = "http://localhost:3000/game-status"
 
function createPageStandByScreen() {
createScreen(standbyScreen);
createBlock(backToLobbyButton, document.querySelector(".undercard"))

let timer = setInterval(checkOpponentConnection, 2000);

};

function test (data){
  alert(data)
}
//переход на экран лобби

function backToLobby() {
createScreen(lobby)  
clearTimeout  (timer)
}
//переход на экран игры
function toGame(){
  createScreen(gameScreen)
}


function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url );
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
}
//Будет вызывать get player list и парсить его
function getUserInfo(){}

//Запрос данных с сервера
 function checkOpponentConnection(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:3000/game-status" );
  xhr.addEventListener('readystatechange', function (e) {
      if (e.target.readyState !== 4) {
          return;
      }
      if (e.target.status !== 200) {
          console.log('Ошибка');
          return;
      }
      const responseText = e.target.responseText;
      test(responseText);
  });
  xhr.send();
}
document.addEventListener("DOMContentLoaded", createPageStandByScreen)