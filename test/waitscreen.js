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
  url: "http://localhost:3000/",

  token: "",

  gamerName: "Игрок",

  enemyName: "Противник",

  move: "",

  roundStatus: "",

  gameId: "",

  gameStatistic: {
    rounds: "",
    victories: "",
    defeats: "",
  },

  gamerStatistic: {
    games: "",
    victories: "",
    defeats: "",
  },

  enemyStatistic: {
    games: "",
    victories: "",
    defeats: "",
  },

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

  errorMessage: " ",

  errors: {
    error: "Что-то пошло не так",
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

Window.application = {
  blocks: {
    loginInput: {
      block: "input",
      cls: ["login", "login-input"],
      attrs: {
        placeholder: "Введи свой nikname",
      },
      method: {
        eventName: "input",
        methodFunc: () => {
          inputName();
        },
      },
    },

    loginButton: {
      block: "button",
      cls: ["login", "login-button"],
      innerText: "Войти",
      method: {
        eventName: "click",
        methodFunc: () => {
          clickButton();
        },
      },
    },

    rockDiv: {
      block: "div",
      cls: "rock",
    },

    paperDiv: {
      block: "div",
      cls: "paper",
    },

    scissorsDiv: {
      block: "div",
      cls: "scissors",
    },

    errorButton: {
      block: "button",
      cls: "error-button",
      innerText: "Вернуться на страницу регистрации",
      method: {
        eventName: "click",
        methodFunc: () => {
          Window.application.createScreen(
            Window.application.screens.lobbyScreen
          );
        },
      },
    },

    availableGameBlock: {
      block: "div",
      cls: "main_opponent_profile-block",
      content: [
        {
          block: "div",
          cls: "main_opponent_profile-block-header",
          content: [
            {
              block: "img",
              cls: "opponent_profile-avatar",
              attrs: {
                src: "assets/img/avatar.png",
              },
            },
            {
              block: "h3",
              cls: "opponent_profile-name",
              innerText: "Пётр",
            },
          ],
        },
        {
          block: "div",
          cls: "opponent_profile_statistics-block",
          content: [
            {
              block: "h3",
              cls: "statistics-header",
              innerText: "Статистика Противника",
            },
            {
              block: "div",
              cls: "statistic-items",
              content: [
                {
                  block: "p",
                  cls: "win",
                  innerText: "Победы : 0",
                },
                {
                  block: "p",
                  cls: "loose",
                  innerText: "Поражения : 0",
                },
                {
                  block: "p",
                  cls: "draw",
                  innerText: "Ничьи : 0",
                },
              ],
            },
          ],
        },
        {
          block: "div",
          cls: "enterBlock",
          content: [
            {
              block: "button",
              cls: "enterButton",
              innerText: "Войти в игру",
            },
          ],
        },
      ],
    },

    playButton: {
      block: "div",
      cls: "createGame",
      content: [
        {
          block: "button",
          cls: "create",
          innerText: "Создать игру",
        },
      ],
    },
  },

  screens: {
    loginScreen: {
      block: "header",
      cls: "header_login",
      content: [
        {
          block: "div",
          cls: "container",
          content: [
            {
              block: "div",
              cls: "main",
              content: [
                {
                  block: "h1",
                  cls: "title",
                  content: [
                    {
                      block: "span",
                      cls: "rock-text",
                      innerText: "Камень",
                    },
                    {
                      block: "span",
                      cls: "scissors-text",
                      innerText: "Ножницы",
                    },
                    {
                      block: "span",
                      cls: "paper-text",
                      innerText: "Бумага",
                    },
                  ],
                },
                {
                  block: "figure",
                  cls: "title-image",
                  content: [
                    {
                      block: "div",
                      cls: "rock-image",
                    },
                    {
                      block: "div",
                      cls: "scissors-image",
                    },
                    {
                      block: "div",
                      cls: "paper-image",
                    },
                  ],
                },
                {
                  block: "figure",
                  cls: "login",
                },
              ],
            },
          ],
        },
      ],
    },

    lobbyScreen: {
      block: "div",
      cls: "wrapper",
      content: [
        {
          block: "div",
          cls: "header",
          content: [
            {
              block: "h1",
              innerText: "Добро пожаловать в Лобби",
            },
          ],
        },
        {
          block: "div",
          cls: "columnHeaders",
          content: [
            {
              block: "div",
              cls: "columnHeader",
              content: [
                {
                  block: "h2",
                  innerText: "Вы",
                },
              ],
            },
            {
              block: "div",
              cls: "columnHeader2",
              content: [
                {
                  block: "h2",
                  innerText: "Доступные игры",
                },
              ],
            },
          ],
        },
        {
          block: "div",
          cls: "players",
          content: [
            {
              block: "div",
              cls: "main_yourself_profile-block",
              content: [
                {
                  block: "div",
                  cls: "main_yourself_profile-block-header",
                  content: [
                    {
                      block: "img",
                      cls: "yourself_profile-avatar",
                      attrs: {
                        src: "assets/img/avatar.png",
                      },
                    },
                    {
                      block: "h2",
                      cls: "yourself_profile-name",
                      innerText: "UserName",
                    },
                  ],
                },
                {
                  block: "div",
                  cls: "yourself_profile_statistics-block",
                  content: [
                    {
                      block: "h3",
                      cls: "statistics-header",
                      innerText: "Статистика",
                    },
                    {
                      block: "div",
                      cls: "statistic-items",
                      content: [
                        {
                          block: "p",
                          cls: "win",
                          innerText: "Победы : 0",
                        },
                        {
                          block: "p",
                          cls: "loose",
                          innerText: "Поражения : 0 ",
                        },
                        {
                          block: "p",
                          cls: "draw",
                          innerText: "Ничьи : 0",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              block: "div",
              cls: "opponents",
              content: [
                {
                  block: "div",
                  cls: "main_opponent_profile-block",
                  content: [
                    {
                      block: "div",
                      cls: "main_opponent_profile-block-header",
                      content: [
                        {
                          block: "img",
                          cls: "opponent_profile-avatar",
                          attrs: {
                            src: "assets/img/avatar.png",
                          },
                        },
                        {
                          block: "h3",
                          cls: "opponent_profile-name",
                          innerText: "Пётр",
                        },
                      ],
                    },
                    {
                      block: "div",
                      cls: "opponent_profile_statistics-block",
                      content: [
                        {
                          block: "h3",
                          cls: "statistics-header",
                          innerText: "Статистика Противника",
                        },
                        {
                          block: "div",
                          cls: "statistic-items",
                          content: [
                            {
                              block: "p",
                              cls: "win",
                              innerText: "Победы : 0",
                            },
                            {
                              block: "p",
                              cls: "loose",
                              innerText: "Поражения : 0",
                            },
                            {
                              block: "p",
                              cls: "draw",
                              innerText: "Ничьи : 0",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      block: "div",
                      cls: "enterBlock",
                      content: [
                        {
                          block: "button",
                          cls: "enterButton",
                          innerText: "Войти в игру",
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
    waitScreen: {
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
                      createScreen(lobbyscreen);
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
                      cls: [
                        "main-waitscreen__choicescreen-paper",
                        "choice-button",
                      ],
                      method: {
                        eventName: "click",
                        methodFunc: () => {
                          yourSideSpinner.classList.add("hidden");
                          paperImage.classList.remove("hidden");
                          choiceScreen.classList.add("hidden");
                          gameState.move = "paper";
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen
                          );
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
                      cls: [
                        "main-waitscreen__choicescreen-rock",
                        "choice-button",
                      ],
                      method: {
                        eventName: "click",
                        methodFunc: () => {
                          yourSideSpinner.classList.add("hidden");
                          rockImage.classList.remove("hidden");
                          choiceScreen.classList.add("hidden");
                          gameState.move = "rock";
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen
                          );
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
                          gameState.move = "scissors";
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen
                          );
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
                                  innerText: gameState.gamerName,
                                },
                                {
                                  block: "p",
                                  cls: "main-waitscreen__gameprocess-statistic",
                                  content: [
                                    {
                                      block: "span",
                                      cls: "your-wins",
                                      innerText: `Побед: ${gameState.gamerStatistic.victories}`,
                                    },
                                    {
                                      block: "span",
                                      cls: "your-defeats",
                                      innerText: `Поражений: ${gameState.gamerStatistic.defeats}`,
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
                        {
                          block: "div",
                          cls: ["lds-hourglass", "enemy-scroll"],
                        },
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
                                  innerText: gameState.enemyName,
                                },
                                {
                                  block: "p",
                                  cls: "main-waitscreen__gameprocess-statistic",
                                  content: [
                                    {
                                      block: "span",
                                      cls: "enemy-wins",
                                      innerText: `Побед: ${gameState.enemyStatistic.victories}`,
                                    },
                                    {
                                      block: "span",
                                      cls: "enemy-defeats",
                                      innerText: `Поражений: ${gameState.enemyStatistic.defeats}`,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      method: {
                        eventName: "DOMContentLoaded",
                        methodFunc: () => {
                          Window.application.timers.push(setInterval);
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    gameFieldScreen: {
      block: "section",
      cls: "game-field",
      content: [
        {
          block: "div",
          cls: "round-number",
          content: [
            {
              block: "p",
              cls: ["fadeIn", "invisible"],
              innerText: `Раунд ${gameState.gameStatistic.rounds}`,
            },
          ],
        },

        {
          block: "div",
          cls: "gamer1",
          content: [
            {
              block: "div",
              cls: "content-wrapper",
              content: [
                {
                  block: "h2",
                  innerText: `${gameState.gamerName}`,
                },
                {
                  block: "div",
                  cls: "choice-wrapper",
                  content: [
                    {
                      block: "div",
                      cls: "result",
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          block: "div",
          cls: "gamer2",
          content: [
            {
              block: "div",
              cls: "content-wrapper",
              content: [
                {
                  block: "h2",
                  innerText: `${gameState.rivalName}`,
                },
                {
                  block: "div",
                  cls: "choice-wrapper",
                  content: [
                    {
                      block: "div",
                      cls: "result",
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          block: "div",
          cls: ["round-result-field", "display-none"],
          content: [
            {
              block: "div",
              cls: ["round-result-wrapper", "bigEntrance"],
              content: [
                {
                  block: "div",
                  cls: "round-result-window",
                  content: [
                    {
                      block: "div",
                      cls: "result-declaration",
                      content: [
                        {
                          block: "p",
                          cls: "comment",
                        },
                        {
                          block: "p",
                          cls: "statistic",
                          innerText: `Побед: ${
                            gameState.gameStatistic.victories
                          }, поражений: ${
                            gameState.gameStatistic.defeats
                          }, вничью: ${
                            gameState.gameStatistic.rounds -
                            gameState.gameStatistic.victories -
                            gameState.gameStatistic.defeats
                          }`,
                        },
                        {
                          block: "p",
                          cls: "offer",
                          innerText: "Еще раунд?",
                        },
                      ],
                    },
                    {
                      block: "div",
                      cls: "btns-block",
                      content: [
                        {
                          block: "button",
                          cls: "ok-button",
                          innerText: "Ok",
                        },
                        {
                          block: "button",
                          cls: "no-button",
                          innerText: "No!!!",
                          method: {
                            eventName: "click",
                            methodFunc: () => {
                              createScreen(
                                Window.application.screens.loginScreen
                              );
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  block: "div",
                  cls: "round-result-frame",
                },
              ],
            },
          ],
        },
      ],
    },

    errorScreen: {
      block: "section",
      cls: "error-field",
      content: [
        {
          block: "div",
          cls: ["rock", "error-rock"],
        },
        {
          block: "p",
          cls: "error-message",
          innerText: gameState.errors[gameState.errorMessage],
        },
      ],
    },
  },
  timers: [],
};
//
//
//
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

//
//
//
const createScreen = (obj) => {
  while (app.firstChild) {
    app.firstChild.remove();
  }

  app.appendChild(templateEngine(obj));
};
//
//
//
const createBlock = (clear, arrObj, parentNode) => {
  if (clear) {
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
  }

  arrObj.forEach((obj) => parentNode.add(templateEngine(obj)));
};

createScreen(Window.application.screens.waitScreen);

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

const waitingText = document.querySelector(
  ".main-waitscreen__gameprocess-text"
);

const enemyScroll = document.querySelector(".enemy-scroll");

const choiceScreen = document.querySelector(".main-waitscreen__choicescreen");

function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("readystatechange", function (e) {
    if (e.target.readyState !== 4) {
      return;
    }
    if (e.target.status !== 200) {
      gameState.errorMessage = "error";
      return;
    }
    const responseText = e.target.responseText;

    callback(responseText);
  });
  xhr.send();
}
//
//
//
function disassemblyJSON(objJSON) {
  return JSON.parse(objJSON);
}
//
//
//
function switchToGameFieldScreen(jsonString) {
  const serverAnswer = disassemblyJSON(jsonString);
  if (serverAnswer.status === "ok") {
    if (serverAnswer["game-status"].status === "waiting-for-enemy-move") {
      return;
    }
    gameState.gameStatus = serverAnswer["game-status"].status;
    startGameFieldScreen();
    return;
  }
  gameState.errorMessage = serverAnswer.message;
  startErrorScreen();
}
//
//
//
function startGameFieldScreen() {
  Window.application.renderScreen(Window.application.screens.gameFieldScreen);
  Window.application.renderBlock(
    [selectPlayerChoiceBlock(gameState.turn)],
    app.querySelectorAll(".choice-wrapper")[0]
  );
  Window.application.renderBlock(
    [
      selectEnemyChoiceBlock(
        gameState.turn,
        gameState.objFromJSON.game_status.status
      ),
    ],
    app.querySelectorAll(".choice-wrapper")[1]
  );
  setTimeout(
    drawCrossAndCheckMark,
    4300,
    gameState.objFromJSON.game_status.status
  );
  setTimeout(
    showRoundResultWindow,
    5500,
    gameState.objFromJSON.game_status.status,
    gameState.turn
  );
}
//
//
//
function switchWaitScreen(data) {
  const parsedData = JSON.parse(data);
  if (parsedData["game-status"].status === "waiting-for-your-move") {
    waitingText.classList.remove("hidden");
    enemyScroll.classList.add("hidden");
  }
}

setInterval(
  request,
  500,
  `${gameState.url}game-status?token=${gameState.token}&id=${gameState.gameId}`,
  switchWaitScreen
);
// setInterval(() => {
//   const serverAnswer = disassemblyJSON();
//   console.log(serverAnswer);
//   serverAnswer = request(
//     `${gameState.url}play?token=${gameSate.token}&id=${gameState.gameId}`,
//     switchWaitScreen()
//   );
//   if (serverAnswer["game-status"].status !== "waiting-for-your-move") {
//     switchWaitScreen();
//   }
// }, 500);

// когда waiting for your move прекращаем посылать справа запросы и рисуем соперник ожидает ваш ход. в запросе мой токе и айди
//  id `${gameState.url}play?token=${gameSate.token}&id=${gameState.gameId}

// '${gameState.url}{gameSate.token}&move=rock' в момент хода в качестве url

// window.application.timers.push(setInterval);

// когда ты выбрал ход
// setInterval(async () => {
//   const gameStatusJSON = await requ(
//     "/game-status?id=fsdfsdf"
//   );
//   const gameStatus = await gameStatusJSON.json();

//   const currentGameState = gameStatus["game-status"].status;

//   /** */
// }, 1000);

// Ты еще не выбрал ход
