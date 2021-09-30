// const app = document.querySelector('.app');
function clickButton() {
	console.log('click');
}

const application =  
{
      block: 'div',
      cls: 'back_button_box',
      content: [
        {
          block: 'button',
          cls: 'back_button_box-button',
          method: {
            eventName: 'click',
            methodFunc: () => {
                clickButton();
                },
            },
          content:[
              {            
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

/*     const templateEngine = (block) => {
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
 */    
    //вставка блоков
    const createBlock = (arrObj, parentNode) => {
        parentNode.appendChild(templateEngine(arrObj));
    };
    
    //формирует стартовую страницу
    // const createScreen = (obj) => {
    //     while (app.firstChild) {
    //         app.firstChild.remove();
    //     }
    //     app.appendChild(templateEngine(obj));
    // };
    
    //формирует облик страницы
    // const createPage = () => {
    //     createScreen(application.screen.loginScreen);
    // };
    // document.addEventListener('DOMContentLoaded', createPage);
    
    // createPage();
    createBlock(application.block, document.querySelector('.back_button_box'));