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

rockButton.addEventListener("click", () => {
  yourSideSpinner.classList.add("hidden");
  rockImage.classList.remove("hidden");
  choiceScreen.classList.add("hidden");
  gameState.turn = "rock";
  gameState.gameStatistic.rounds += 1;
});

paperButton.addEventListener("click", () => {
  yourSideSpinner.classList.add("hidden");
  paperImage.classList.remove("hidden");
  choiceScreen.classList.add("hidden");
  gameState.turn = "paper";
  gameState.gameStatistic.rounds += 1;
});
scissorsButton.addEventListener("click", () => {
  yourSideSpinner.classList.add("hidden");
  scissorsImage.classList.remove("hidden");
  choiceScreen.classList.add("hidden");
  gameState.turn = "scissors";
  gameState.gameStatistic.rounds += 1;
});

function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url + "namePlayer");
  xhr.addEventListener("readystatechange", function (e) {
    if (e.target.readyState !== 4) {
      return;
    }
    if (e.target.status !== 200) {
      console.log("Ошибка");
      return;
    }
    const responseText = e.target.responseText;
    callback(responseText);
  });
  xhr.send();
}
