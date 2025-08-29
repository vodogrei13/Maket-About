// Массив Картинок
let images = [{
    url: "1.png",
  }, {
    url: "2.png",
  }, {
    url: "3.png",
  }, {
    url: "4.png",
  }];

let currentSlide = 0;

function initSlider(images, options) {
    if(!images || !images.length) return;

    options = options || {
        dots: true,
        autoplay: true,
        interval: 3000
    }

    const sliderWrapper = document.querySelector('.slider');
    const sliderImages = sliderWrapper.querySelector('.slider__images');
    
    initImages();
    
    if (options.dots) {
        initDots();
    }
    
    if (options.autoplay) {
        startAutoplay(options.interval);
    }

    // Функция слайдер-картинок
    function initImages() {
        images.forEach((image, index) => {
            let imageElement = document.createElement("div");
            imageElement.className = `image n${index} ${index === 0 ? "active" : ""}`;
            imageElement.dataset.index = index;
            imageElement.style.backgroundImage = `url(${image.url})`;
            sliderImages.appendChild(imageElement);
        });
    }

    // Функция слайдер-точки
    function initDots() {
        let dotsWrapper = document.createElement("div");
        dotsWrapper.className = "slider__dots"; 
        images.forEach((_, index) => {
            let dot = document.createElement("div");
            dot.className = `slider__dots-item n${index} ${index === 0 ? "active" : ""}`;
            dot.dataset.index = index;
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
            dotsWrapper.appendChild(dot);
        });
        document.querySelector('.block-point').appendChild(dotsWrapper);
    }

    // Функция перемещения слайдера
    function moveSlider(index) {
        currentSlide = parseInt(index);
        
        // Обновляем изображения
        document.querySelectorAll('.slider__images .image').forEach(img => {
            img.classList.remove('active');
        });
        document.querySelector(`.slider__images .image.n${index}`).classList.add('active');
        
        // Обновляем точки
        if (options.dots) {
            document.querySelectorAll('.slider__dots-item').forEach(dot => {
                dot.classList.remove('active');
            });
            document.querySelector(`.slider__dots-item.n${index}`).classList.add('active');
        }
    }

    // Функция автоплея
    function startAutoplay(interval) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % images.length;
            moveSlider(currentSlide);
        }, interval);
    }

    // Добавляем обработчики для стрелок (если нужно)
    const nextBtn = document.createElement('div');
    nextBtn.className = 'slider-next';
    nextBtn.innerHTML = '›';
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % images.length;
        moveSlider(currentSlide);
    });

    const prevBtn = document.createElement('div');
    prevBtn.className = 'slider-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        moveSlider(currentSlide);
    });

    sliderWrapper.appendChild(prevBtn);
    sliderWrapper.appendChild(nextBtn);
}

// Инициализация слайдера при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
    let sliderOptions = {
        dots: true,
        autoplay: true,
        interval: 4000
    };
    initSlider(images, sliderOptions);
});

// Инициализация Fancybox для YouTube видео
document.addEventListener('DOMContentLoaded', function() {
    Fancybox.bind("[data-fancybox]", {
        // Настройки для YouTube
        Youtube: {
            noCookie: false,
            rel: 0,
            showinfo: 0,
            controls: 1
        },
        
        // Увеличиваем размер контента
        contentClick: "close",
        contentDblClick: false,
        
        // Настройки размера
        defaultType: "iframe",
        width: "80vw",
        height: "80vh",
        maxWidth: 1200,
        maxHeight: 800,
        
        // Анимация
        animated: true,
        closeOnBackgroundClick: true,
        autoFocus: false,
        
        // Убираем лишние элементы
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"]
            }
        },
        
        // Обработчик закрытия
        on: {
            closing: (fancybox) => {
                const iframe = fancybox.container.querySelector('iframe');
                if (iframe) {
                    iframe.src = '';
                }
            }
        }
    });
});