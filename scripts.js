document.addEventListener('DOMContentLoaded', () => {

    // Yumuşak Kaydırma (Smooth Scrolling)
    const smoothScrollTo = (targetElement) => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (headerHeight / 2);

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });

    // AJAX Form Gönderimi
    const submitForm = (form) => {
        const formData = new FormData(form);
        fetch('submit_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayNotification('Mesajınız gönderildi: ' + data.message, 'success');
            form.reset();
        })
        .catch(error => {
            displayNotification('Form gönderimi başarısız: ' + error.message, 'error');
        });
    };

    const form = document.querySelector('#contact form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitForm(this);
    });

    // Küçük ekranlar için menü açma/kapatma
    const toggleNavigation = () => {
        const navigation = document.querySelector('header nav');
        navigation.classList.toggle('is-open');
    };

    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', toggleNavigation);

    // Scroll Animasyonları
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
            observer.observe(elem);
        });
    };

    animateOnScroll();

    // Tema değiştirici
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.body.classList.toggle('dark-theme');
            const theme = currentTheme ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateThemeToggleText(themeToggleButton, theme);
            displayNotification(`Tema ${theme} moduna geçirildi`, 'info');
        });
    }


    // Tema tuşu metni güncelleme
    const updateThemeToggleText = (button, theme) => {
        button.textContent = theme === 'dark' ? '' : '';
    };

    // Başlangıçta tema yükleme
    const loadInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            if (themeToggleButton) {
                updateThemeToggleText(themeToggleButton, savedTheme);
            }
        }
    };

    loadInitialTheme();

});
