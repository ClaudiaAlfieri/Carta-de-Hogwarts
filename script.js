// Variáveis
const video = document.getElementById('video');
const playButton = document.getElementById('magic');
const play = document.getElementById('music');
const message = document.getElementById('message');
const resizeButton = document.getElementById('letter');
const imageContainer = document.getElementById('image-container');


// Músicas
const backgroundMusic = new Audio("harry_potter.mp3"); // Música de fundo
const fireworksMusic = new Audio("fireworks1.mp3"); // Música da carta

const messageText = `ESCOLA DE MAGIA E BRUXARIA DE HOGWARTS\n\nDiretor: Alvo Dumbledore\n(Ordem de Merlin, Primeira Classe, Grande Feiticeiro,\nBruxo Chefe, Mandatário Supremo, Confederação Internacional de Bruxos).\n\nPrezado Sr. Potter,\n\nTemos o prazer de informar que V.Sa. tem uma vaga na\nEscola de Magia e Bruxaria de Hogwarts. Estamos anexando uma\nlista dos livros e equipamentos necessários.\n O ano letivo começa em\n1º de setembro. Aguardamos sua coruja até 31 de julho, no mais\ntardar.\n\nAtenciosamente,\nMinerva McConagall.\nDiretora Substituta.\n`;

// Play da música de fundo
play.addEventListener('click', () => {
    play.style.display = 'none'; // Oculta o botão
    backgroundMusic.play()
}); 

// Configurar vídeo
video.src = "corte_hp.mp4"; // Confirme o caminho correto
video.preload = 'auto';


// Play do vídeo
playButton.addEventListener('click', () => {
    playButton.style.display = 'none'; // Oculta o botão
    video.style.display = 'block'; 
    video.play(); // Play do vídeo
    
});

// Quando o vídeo termina
video.addEventListener('ended', () => {
    video.style.display = 'none'; // Oculta o vídeo
    message.innerHTML = messageText.replace(/\n/g, '<br>');
    message.style.display = 'block'; // Mostra a mensagem
    resizeButton.style.display = 'inline-block'; // Mostra o botão "Open the letter"

});

// Aumenta o texto, começa a música dos fogos e aparece o gif
resizeButton.addEventListener('click', () => {
    message.classList.toggle('enlarged');
    if (message.classList.contains('enlarged')) {
        fireworksMusic.play()
        };
    
    const img = document.createElement('img');
    img.src = "hp.gif";

    // Parar música de fundo
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Aparece a imagem
    imageContainer.appendChild(img);
    imageContainer.style.display = 'block';

    // Oculta o botão
    resizeButton.style.display = 'none'; 
});


// Criar varinha mágica
const varinha = document.createElement("div");
varinha.classList.add("varinha");
document.body.appendChild(varinha);

// Movimento da varinha e partículas
document.addEventListener("mousemove", (event) => {
    const [x, y] = [event.clientX, event.clientY];

    // Ponta da varinha no cursor
    varinha.style.left = `${x}px`;
    varinha.style.top = `${y}px`;

    createParticles(x, y);
});

function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const offsetX = Math.random() * 30 - 15, offsetY = Math.random() * 30 - 15;
        particle.style.cssText = `position: absolute; left: ${x + offsetX}px; top: ${y + offsetY}px; width: 10px; height: 10px; background-color: rgba(255, 215, 0, 0.8); border-radius: 50%; pointer-events: none; animation: fadeOut 1s forwards;`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

