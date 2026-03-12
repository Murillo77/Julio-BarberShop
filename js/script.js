const headerBar = document.querySelector('.barra-nav');

// SCROLL SUAVE PARA QUALQUER LINK âncora
const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// NAV: BACKGROUND APENAS APÓS SCROLL
function updateHeaderBackground() {
    if (!headerBar) return;
    const threshold = 40;
    if (window.scrollY > threshold) {
        headerBar.classList.add('scrolled');
    } else {
        headerBar.classList.remove('scrolled');
    }
}

updateHeaderBackground();
window.addEventListener('scroll', updateHeaderBackground);

// ANIMAÇÕES DE SCROLL (REVEAL)
const revealElements = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    revealElements.forEach((el) => observer.observe(el));
} else {
    // fallback simples
    revealElements.forEach((el) => el.classList.add('is-visible'));
}

const carousel = document.querySelector('.carousel-track');
if (carousel) {
    const imgs = Array.from(carousel.children);
    const imgWidth = 320;
    const gap = 15;

    // duplicar todas as imagens para efeito contínuo
    imgs.forEach(img => {
        carousel.appendChild(img.cloneNode(true));
    });

    let scrollPosition = 0;
    const totalWidth = (imgWidth + gap) * imgs.length;

    function animate() {
        scrollPosition += 0.5; // velocidade do carrossel, mais lenta
        if (scrollPosition >= totalWidth) {
            scrollPosition = 0; // volta pro início de forma contínua
        }
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(animate);
    }

    // inicia a animação contínua
    animate();
}

// FORMULÁRIO DE AGENDAMENTO - ENVIO PARA WHATSAPP
const formAgendamento = document.getElementById('form-agendamento');
const mensagemRetorno = document.getElementById('mensagem-retorno');

if (formAgendamento) {
    formAgendamento.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        const servico = document.getElementById('servico').value;
        const observacoes = document.getElementById('observacoes').value.trim();

        if (!nome || !telefone || !data || !horario || !servico) {
            if (mensagemRetorno) {
                mensagemRetorno.textContent = 'Preencha todos os campos obrigatórios para continuar.';
                mensagemRetorno.classList.remove('sucesso');
                mensagemRetorno.classList.add('erro');
            }
            return;
        }

        const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        let texto = `Ol%C3%A1%2C%20Julio!%20Quero%20agendar%20um%20hor%C3%A1rio.%0A%0A`;
        texto += `Nome%3A%20${encodeURIComponent(nome)}%0A`;
        texto += `WhatsApp%3A%20${encodeURIComponent(telefone)}%0A`;
        texto += `Servi%C3%A7o%3A%20${encodeURIComponent(servico)}%0A`;
        texto += `Data%3A%20${encodeURIComponent(dataFormatada)}%0A`;
        texto += `Hor%C3%A1rio%3A%20${encodeURIComponent(horario)}%0A`;
        if (observacoes) {
            texto += `%0AObserva%C3%A7%C3%B5es%3A%20${encodeURIComponent(observacoes)}`;
        }

        // Substitua "seunumerowhatsapp" pelo número real da barbearia no mesmo formato usado nas outras âncoras
        const numeroBarbearia = 'seunumerowhatsapp';
        const url = `https://wa.me/${numeroBarbearia}?text=${texto}`;

        if (mensagemRetorno) {
            mensagemRetorno.textContent = 'Redirecionando para o WhatsApp para finalizar seu agendamento...';
            mensagemRetorno.classList.remove('erro');
            mensagemRetorno.classList.add('sucesso');
        }

        window.open(url, '_blank');
    });
}

