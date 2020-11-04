//назначим глобальный обработчик событий:
window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //ф-ция, которая скрывает табы:
    function hideTabContent() {
        tabsContent.forEach(item => {
            //можно выполнить через стили item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    //ф-ция, которая показывает табы:
    function showTabContent(i = 0) {
        //можно выполнить через стили tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade'); //добавление анимации, которая прописана в css
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //Click

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

    const deliveryBtn = document.querySelector('.header__link');

    deliveryBtn.addEventListener('click', (event) => {
        const timer = setInterval(function () {
            console.log(event.target)
        }, 1000, 'Set Timeout');
    })

    //Timer

    const deadLine = '2020-10-20';

    //ф-ция, которя определяет разницу между дедлайном и текущим временем:
    function getTimeRemaining(endTime) {
        //в переменной t получаем разницу между датами в миллисекундах
        const t = Date.parse(endTime) - Date.parse(new Date()),
            //сколько в сутках миллисек=(получаем кол-во сек в 1 мин, в одном часе и умножаем на 24часа)
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            //общее кол-во часов которое осталось до таймера:
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    //доп.функционал. ф-ция, которя добавляет в таймере 0 перед датами и часами
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

//Устанавливаем таймер на страничку
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        timeInterval = setInterval(updateClock, 1000) //обновлять таймер через каждую 1 секунду

        updateClock(); //чтобы не видеть разницу данных в верстке при обновлении страницы

        //ф-ция, которая обновляет таймер каждую секунду:
        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //Modal

    //Простой вариант с модалкой, который сработает только для первой кнопки на странице
    // const modalShow = document.querySelector('.btn_white'),
    //     modal = document.querySelector('.modal'),
    //     modalClose = document.querySelector('.modal__close');
    //
    // modalShow.addEventListener('click', () => {
    //     modal.classList.add('show') //показываем модальное окно
    //     modal.classList.remove('hide')
    //     document.body.style.overflow = 'hidden' //добавляем стиль который не позволяет прокручивать таблицу
    // })
    //
    // modalClose.addEventListener('click', () => {
    //     modal.classList.add('hide')
    //     modal.classList.remove('show')
    //     document.body.style.overflow = '' //восстанавливаем скролл после закрытия модалки
    // })

    //Вариант, который сработает через цикл с любм кол-вом кнопок:
    const modalShow = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    modalShow.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });

    //Закрываем модальное окно:
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    //Закрываем модалку при нажатии клавиши Esc:

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
            console.log(e.target);
        }
    });

    //Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 77;
            this.changeToRUB();

        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> р/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        29,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        29,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        29,
        '.menu .container',
        'menu__item',
        'big'
    ).render();
});