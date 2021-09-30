const enterGame = document.querySelector('.enterButton')

const goToStandByScreen = function () {
    enterGame.addEventListener('click', () => {
        createScreen(application.screen.standByScreen);
    })
};

const popUpWaitingScreen = {
    block: 'div',
    cls: 'popUpWaitingScreen',
    content: [
        {
            block: 'p',
            cls: 'loadingStatus',
            innerText='Получение данных от сервера. Подождите'
        },
        {
            block='div',
            cls='loader',
            innerText='Loading'
        }]
}