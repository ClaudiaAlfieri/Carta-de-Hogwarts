// Variáveis
const video = document.getElementById('video');
const playButton = document.getElementById('magic');
const play = document.getElementById('music');
const message = document.getElementById('message');
const resizeButton = document.getElementById('letter');
const imageContainer = document.getElementById('image-container');

// Músicas
const backgroundMusic = new Audio("harry_potter.mp3");
const fireworksMusic = new Audio("fireworks1.mp3");

// Configurar volume baseado no dispositivo
const isMobile = window.innerWidth <= 768;
backgroundMusic.volume = isMobile ? 0.6 : 0.8;
fireworksMusic.volume = isMobile ? 0.6 : 0.8;

const messageText = `ESCOLA DE MAGIA E BRUXARIA DE HOGWARTS\n\nDiretor: Alvo Dumbledore\n(Ordem de Merlin, Primeira Classe, Grande Feiticeiro,\nBruxo Chefe, Mandatário Supremo, Confederação Internacional de Bruxos).\n\nPrezado Sr. Potter,\n\nTemos o prazer de informar que V.Sa. tem uma vaga na\nEscola de Magia e Bruxaria de Hogwarts. Estamos anexando uma\nlista dos livros e equipamentos necessários.\n O ano letivo começa em\n1º de setembro. Aguardamos sua coruja até 31 de julho, no mais\ntardar.\n\nAtenciosamente,\nMinerva McConagall.\nDiretora Substituta.\n`;

// Gerenciamento de áudio
function handleAudio(audioElement, action) {
    try {
        if (action === 'play') {
            audioElement.play().catch(error => {
                console.log('Erro ao reproduzir áudio:', error);
            });
        } else if (action === 'stop') {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    } catch (error) {
        console.log('Erro no gerenciamento de áudio:', error);
    }
}

// Play da música de fundo
play.addEventListener('click', () => {
    play.style.display = 'none';
    handleAudio(backgroundMusic, 'play');
});

// Configurar vídeo
video.src = "corte_hp.mp4";
video.preload = 'auto';

// Ajustar tamanho do vídeo baseado na tela
function adjustVideoSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        video.style.width = '100%';
    } else {
        video.style.width = '900px';
    }
}

// Chamar ajuste inicial e adicionar listener para redimensionamento
adjustVideoSize();
window.addEventListener('resize', adjustVideoSize);

// Play do vídeo
playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    video.style.display = 'block';
    video.play().catch(error => {
        console.log('Erro ao reproduzir vídeo:', error);
    });
});

// Quando o vídeo termina
video.addEventListener('ended', () => {
    video.style.display = 'none';
    message.innerHTML = messageText.replace(/\n/g, '<br>');
    message.style.display = 'block';
    resizeButton.style.display = 'inline-block';
});

// Aumenta o texto e gerencia efeitos
resizeButton.addEventListener('click', () => {
    message.classList.toggle('enlarged');
    if (message.classList.contains('enlarged')) {
        handleAudio(fireworksMusic, 'play');
    }
    
    const img = document.createElement('img');
    img.src = "hp.gif";
    img.style.maxWidth = '100%';
    img.style.height = 'auto';

    handleAudio(backgroundMusic, 'stop');

    imageContainer.appendChild(img);
    imageContainer.style.display = 'block';
    resizeButton.style.display = 'none';
});

// Criar varinha mágica
const varinha = document.createElement("div");
varinha.classList.add("varinha");
document.body.appendChild(varinha);

// Detectar tipo de dispositivo
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Função para criar partículas com desempenho otimizado
function createParticles(x, y) {
    // Reduzir número de partículas em dispositivos móveis
    const particleCount = isMobile ? 3 : 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        const offsetX = Math.random() * 20 - 10;
        const offsetY = Math.random() * 20 - 10;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x + offsetX}px;
            top: ${y + offsetY}px;
            width: ${isMobile ? '8px' : '10px'};
            height: ${isMobile ? '8px' : '10px'};
            background-color: rgba(255, 215, 0, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: fadeOut 1s forwards;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Gerenciar movimento da varinha
if (isTouchDevice) {
    // Suporte a touch
    document.addEventListener("touchmove", (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        const [x, y] = [touch.clientX, touch.clientY];
        
        varinha.style.left = `${x}px`;
        varinha.style.top = `${y}px`;
        
        // Reduzir frequência de criação de partículas em dispositivos touch
        if (Math.random() < 0.5) {
            createParticles(x, y);
        }
    }, { passive: false });
} else {
    // Suporte a mouse
    document.addEventListener("mousemove", (event) => {
        const [x, y] = [event.clientX, event.clientY];
        
        varinha.style.left = `${x}px`;
        varinha.style.top = `${y}px`;
        
        createParticles(x, y);
    });
}

// Limpar recursos quando a página for fechada
window.addEventListener('beforeunload', () => {
    handleAudio(backgroundMusic, 'stop');
    handleAudio(fireworksMusic, 'stop');
});