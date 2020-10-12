//назначим глобальный обработчик событий:
window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //ф-ция, которая скрывает табы:
    function hideTabContent() {
        tabsContent.forEach(item => {
            //можно выполнить через стили item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    //ф-ция, которая показывает табы:
    function showTabContent(i = 0) {
        //можно выполнить через стили tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show','fade'); //добавление анимации, которая прописана в css
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //обработчик событий клика:
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        const timerID = setTimeout(function (text) {
            console.log(text);
        }, 5000, 'Hello there!'); //задержка появления алерта в 2сек. время всегда указывается в миллисекундах

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const contactUs = document.querySelector('.btn_white');

    contactUs.addEventListener('click', (event) => {
        const timer = setInterval(function () {
                console.log(event.target)
        },1000,'Set Timeout');
    })
});