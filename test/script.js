// const obj = {
//     block: "" // название тега
//     cls: "hueta" // название класса/массив классов
//     content: [] // Вложенность детей
//     attrs: {
//         src: "hiy"
//     } // Атрибуры блока
//     method: { eventName: "", methodFunc: () =>{}},
//     innerText: "",
// }

const app = document.querySelector(".app");

const gameState = {
  gamerName: "Петр",

  rivalName: "Павел",

  turn: "rock",

  gameStatistic: {
    rounds: 1,
    victories: 0,
    defeats: 0,
  },

  gamerStatistic: {
    games: 1,
    victories: 0,
    defeats: 0,
  },

  rivalStatistic: {
    games: 1,
    victories: 0,
    defeats: 0,
  },

  objFromJSON: null,

  obliqueCross: "&#128942;",
  greenTick: "&#10004;",

  loseMessages: {
    rock: "Противник завернул ваш камушек в бумагу!",
    paper: "Ножницы разрезают ваш лист бумаги! Не повезло!",
    scissors: "Вы извлекли ножницы, но противник заготовил камень! Увы!",
  },

  winMessages: {
    rock: "Камнем по нижницам! Это был удачный ход!",
    paper:
      "Что может камень противника против вашего бумажного листа?! Ничего!",
    scissors: "Ножницами вы орудуете умело! Лист противника разрезан!",
  },

  drawMessages: {
    rock: "Противник припас для тебя камешек. Но у тебя был камешек для него. Ничья!",
    paper: "Бумага против бумаги. Результат очевиден. Ничья!",
    scissors: "Ты показал ножницы. Противник насупился и показал свои. Ничья!",
  },

  errors: {
    " ": "Игрок не зарегистрирован",
    "token doesn't exist": "Нет игрока или игры с таким токеном",
    "player is already in game":
      "Игрок уже в игре, нельзя начать две игры одновременно",
    "no game id": "Id игры не передан",
    "wrong game id": "Id игры некорректный/бой не существует/бой закончен",
    "player is not in this game": "Игрок не в этой игре",
    "no move": "Ход не передан",
  },
};

const waitscreen = {
  block: "div",
  content: [
    {
      block: "header",
      cls: "header-waitscreen",
      content: [
        {
          block: "nav",
          cls: "header-waitscreen__navi",
          content: [
            {
              block: "button",
              cls: "header-waitscreen__navibar-item",
              innerText: "Закончить игру досрочно",
              method: {
                eventName: "click",
                methodFunc: () => {
                  createScreen(
                    window.application.screens.lobbyscreen
                  ); /*дописать название экрана лобби */
                },
              },
            },
          ],
        },
      ],
    },
    {
      block: "main",
      cls: "main-waitscreen",
      content: [
        {
          block: "section",
          cls: "main-waitscreen__choicescreen",
          content: [
            {
              block: "h2",
              cls: "main-waitscreen__choicescreen-title",
              innerText: "Choose your fighter",
            },
            {
              block: "div",
              cls: "main-waitscreen__choicescreen-container",
              content: [
                {
                  block: "button",
                  cls: ["main-waitscreen__choicescreen-paper", "choice-button"],
                  method: {
                    eventName: "click",
                    methodFunc: () => {
                      yourSideSpinner.classList.add("hidden");
                      paperImage.classList.remove("hidden");
                      choiceScreen.classList.add("hidden");
                      gameState.turn = "paper";
                      gameState.gameStatistic.rounds += 1;
                    },
                  },
                  content: [
                    {
                      block: "img",
                      cls: "choice-image",
                      attrs: {
                        src: "assets/images/paper.jpg",
                        alt: "paper fighter",
                      },
                    },
                  ],
                },
                {
                  block: "button",
                  cls: ["main-waitscreen__choicescreen-rock", "choice-button"],
                  method: {
                    eventName: "click",
                    methodFunc: () => {
                      yourSideSpinner.classList.add("hidden");
                      rockImage.classList.remove("hidden");
                      choiceScreen.classList.add("hidden");
                      gameState.turn = "rock";
                      gameState.gameStatistic.rounds += 1;
                    },
                  },
                  content: [
                    {
                      block: "img",
                      cls: "choice-image",
                      attrs: {
                        src: "assets/images/rock.jpg",
                        alt: "rock fighter",
                      },
                    },
                  ],
                },
                {
                  block: "button",
                  cls: [
                    "main-waitscreen__choicescreen-scissors",
                    "choice-button",
                  ],
                  method: {
                    eventName: "click",
                    methodFunc: () => {
                      yourSideSpinner.classList.add("hidden");
                      scissorsImage.classList.remove("hidden");
                      choiceScreen.classList.add("hidden");
                      gameState.turn = "scissors";
                      gameState.gameStatistic.rounds += 1;
                    },
                  },
                  content: [
                    {
                      block: "img",
                      cls: "choice-image",
                      attrs: {
                        src: "assets/images/scissors.jpg",
                        alt: "scissors fighter",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          block: "section",
          cls: "section-waitsceen",
          content: [
            {
              block: "h2",
              cls: "main-waitscreen__title",
              innerText: "Идет великая битва",
            },
            {
              block: "div",
              cls: "main-waitscreen__gameprocess-container",
              content: [
                {
                  block: "div",
                  cls: "main-waitscreen__gameprocess-playerzone",
                  content: [
                    {
                      block: "div",
                      cls: ["lds-hourglass", "your-side-spinner"],
                    },
                    {
                      block: "img",
                      cls: [
                        "main-waitscreen__gameprocess-choiceimage-rock",
                        "hidden",
                      ],
                      attrs: {
                        src: "assets/images/rock.jpg",
                        alt: "choice",
                      },
                    },
                    {
                      block: "img",
                      cls: [
                        "main-waitscreen__gameprocess-choiceimage-paper",
                        "hidden",
                      ],
                      attrs: {
                        src: "assets/images/paper.jpg",
                        alt: "choice",
                      },
                    },
                    {
                      block: "img",
                      cls: [
                        "main-waitscreen__gameprocess-choiceimage-scissors",
                        "hidden",
                      ],
                      attrs: {
                        src: "assets/images/scissors.jpg",
                        alt: "choice",
                      },
                    },
                    {
                      block: "div",
                      cls: "main-waitscreen__gameprocess-userinfo",
                      content: [
                        {
                          block: "img",
                          cls: "main-waitscreen__gameprocess-avatar",
                          attrs: {
                            src: "./assets/images/userimage.jpg",
                            alt: "feedback",
                          },
                        },
                        {
                          block: "div",
                          content: [
                            {
                              block: "p",
                              cls: [
                                "main-waitscreen__gameprocess-username",
                                "your-name",
                              ],
                              innerText: "Олег Иванов",
                            },
                            {
                              block: "p",
                              cls: "main-waitscreen__gameprocess-statistic",
                              content: [
                                {
                                  block: "span",
                                  cls: "your-wins",
                                  innerText: "Побед:",
                                },
                                {
                                  block: "span",
                                  cls: "your-defeats",
                                  innerText: "Поражений:",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  block: "img",
                  cls: "main-waitscreen__versus-image",
                  attrs: {
                    src: "assets/images/versus.png",
                    alt: "vsimage",
                  },
                },
                {
                  block: "div",
                  cls: "main-waitscreen__gameprocess-waiting-another-player",
                  content: [
                    { block: "div", cls: "lds-hourglass" },
                    {
                      block: "p",
                      cls: ["main-waitscreen__gameprocess-text", "hidden"],
                      innerText: "Противник ожидает ваш ход",
                    },
                    {
                      block: "div",
                      cls: "main-waitscreen__gameprocess-userinfo",
                      content: [
                        {
                          block: "img",
                          cls: "main-waitscreen__gameprocess-avatar",
                          attrs: {
                            src: "./assets/images/userimage.jpg",
                            alt: "feedback",
                          },
                        },
                        {
                          block: "div",
                          cls: "",
                          content: [
                            {
                              block: "p",
                              cls: [
                                "main-waitscreen__gameprocess-username",
                                "enemy-name",
                              ],
                              innerText: "Олег Иванов",
                              method: {
                                // вот здесь не работает. остальное все работает. с бекендом еще не общался
                          
                                eventName: "onload",
                                methodFunc: () => {
                                  let text =
                                    document.querySelector(".enemy-name");

                                  text.innerHTML = gameState.rivalName;
                                },
                              },
                            },
                            {
                              block: "p",
                              cls: "main-waitscreen__gameprocess-statistic",
                              content: [
                                {
                                  block: "span",
                                  cls: "enemy-wins",
                                  innerText: "Побед:",
                                },
                                {
                                  block: "span",
                                  cls: "enemy-defeats",
                                  innerText: "Поражений:",
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
            },
          ],
        },
      ],
    },
  ],
};

const templateEngine = (block) => {
  if (!block) {
    return document.createTextNode("");
  }

  if (
    typeof block === "string" ||
    typeof block === "number" ||
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
    .forEach((className) => element.classList.add(className.trim()));

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

const createScreen = (obj) => {
  while (app.firstChild) {
    app.firstChild.remove();
  }

  app.appendChild(templateEngine(obj));
};

const createBlock = (clear, arrObj, parentNode) => {
  if (clear) {
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
  }

  arrObj.forEach((obj) => parentNode.add(templateEngine(obj)));
};

createScreen(waitscreen);

const rockButton = document.querySelector(
  ".main-waitscreen__choicescreen-rock"
);
const paperButton = document.querySelector(
  ".main-waitscreen__choicescreen-paper"
);
const scissorsButton = document.querySelector(
  ".main-waitscreen__choicescreen-scissors"
);

const yourSideSpinner = document.querySelector(".your-side-spinner");

const rockImage = document.querySelector(
  ".main-waitscreen__gameprocess-choiceimage-rock"
);
const paperImage = document.querySelector(
  ".main-waitscreen__gameprocess-choiceimage-paper"
);
const scissorsImage = document.querySelector(
  ".main-waitscreen__gameprocess-choiceimage-scissors"
);

const choiceScreen = document.querySelector(".main-waitscreen__choicescreen");

// window.application.timers.push();

// когда ты выбрал ход
// setInterval(async () => {
//   const gameStatusJSON = await fetch(
//     "/game-status?token=gberibgitehbgie&id=gnetrbgthi"
//   );
//   const gameStatus = await gameStatusJSON.json();

//   const currentGameState = gameStatus["game-status"].status;

//   /** */
// }, 1000);

// Ты еще не выбрал ход
