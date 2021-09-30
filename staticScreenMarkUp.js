// JavaScript source code
const app = document.querySelector('.app');

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
    if (app.hasChildNodes()) {
        while (app.firstChild) {
            app.removeChild(app.lastChild);
        }
    }

    app.appendChild(templateEngine(obj));
};

const createBlock = (clear, arrObj, parentNode) => {

    if (clear) {
        while (parentNode.firstChild) {
            parentNode.firstChild.remove();
        }
    }

    arrObj.forEach(obj => parentNode.append(templateEngine(obj)));
};

window.application = {

    blocks: {
        registrationInput: {
            block: 'input',
            cls: ['login', 'login-input'],
            attrs: {
                placeholder: 'Введи свой nikname',
            },
        },

        registrationBtn: {
            block: 'button',
            cls: ['login', 'login-button'],
            innerText: 'Войти',
        },

        rockDiv: {
            block: 'div',
            cls: 'rock',
        },

        paperDiv: {
            block: 'div',
            cls: 'paper',
        },

        scissorsDiv: {
            block: 'div',
            cls: 'scissors',
        },

        errorButton: {
            block: 'button',
            cls: 'error-button',
            innerText: 'Вернуться в лобби',
            method: {
                eventName: 'click',
                methodFunc: () => {
                    createScreen(window.application.screens.loginScreen);
                },
            },
        },
    },

    screens: {
        loginScreen: {
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
                                    content: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

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
};// JavaScript source code
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