/// MENU MOBILE - slide da direita
const menuIcon = document.querySelector('.menu-icon');
const links = document.querySelector('.links');

menuIcon.addEventListener('click', () => {
    links.classList.toggle('active');
});

// FECHAR MENU AO CLICAR EM UM LINK
const linksA = document.querySelectorAll('.links a');
linksA.forEach(link => {
    link.addEventListener('click', () => {
        links.classList.remove('active');
    });
});

// SCROLL SUAVE
linksA.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100, // ajusta altura do header
                behavior: 'smooth'
            });
        }
    });
});

// ANIMAÇÃO SEÇÃO SOBRE NÓS
const aboutSection = document.querySelector('.about');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight;
    if (scrollPos > aboutSection.offsetTop + 100) {
        aboutSection.classList.add('show');
    }
});
