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

const waitscreen = {
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
        },
      ],
    },
  ],
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
              block: "img",
              cls: ["main-waitscreen__choicescreen-paper ", "choice-image"],
              attrs: {
                src: "assets/images/paper.jpg",
                alt: "paper fighter",
              },
            },
            {
              block: "img",
              cls: ["main-waitscreen__choicescreen-rock", "choice-image"],
              attrs: {
                src: "assets/images/rock.jpg",
                alt: "rock fighter",
              },
            },
            {
              block: "img",
              cls: ["main-waitscreen__choicescreen-scissors ", "choice-image"],
              attrs: {
                src: "assets/images/scissors.jpg",
                alt: "scissors fighter",
              },
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
                  block: "img",
                  cls: "main-waitscreen__gameprocess-choiceimage",
                  attrs: {
                    src: "assets/images/rock.jpg",
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
                          cls: "main-waitscreen__gameprocess-username",
                          innerText: "Олег Иванов",
                        },
                        {
                          block: "p",
                          cls: "main-waitscreen__gameprocess-statistic",
                          content: [
                            {
                              block: "span",
                              innerText: "Побед:",
                            },
                            { block: "span", innerText: "Поражений:" },
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
                          cls: "main-waitscreen__gameprocess-username",
                          innerText: "Олег Иванов",
                        },
                        {
                          block: "p",
                          cls: "main-waitscreen__gameprocess-statistic",
                          content: [
                            {
                              block: "span",
                              innerText: "Побед:",
                            },
                            { block: "span", innerText: "Поражений:" },
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
    .forEach((className) => element.classList.add(className));

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
  const node = app.firstChild;
  node.remove();

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
templateEngine(waitscreen);
