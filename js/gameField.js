export const gameField = {
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
          innerText: `Раунд ${GameState.rounds}`
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
              innerText: `${GameState.gamerName}`
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
              innerText: `${GameState.rivalName}`
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
