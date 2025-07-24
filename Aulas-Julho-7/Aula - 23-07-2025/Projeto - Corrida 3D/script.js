
//COLOCAR IMAGEM NO "const"

// Importa o Three.js
import * as THREE from 'three';

// 1. Configuração da Cena, Câmera e Renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.
innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cor de fundo da cena
scene.background = new THREE.Color(0x0c7ae8); // Azul claro, como o céu

// 2. Adicionar Iluminação
const ambientLight = new THREE.AmbientLight(0x709fcf); // Luz ambiente suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Luz direcional (sol)
directionalLight.position.set(0, 10, 5); // Posição da luz
scene.add(directionalLight);

// 3. Criar o Terreno (Plano simples por enquanto)
const planeGeometry = new THREE.PlaneGeometry(50, 1000); // Largura, Profundidade
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ac72e }); // Verde grama
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y.set(0, 0.5, 0); // Ajusta a posição para ficar ligeiramente abaixo do centro
scene.add(player);

// 4. Criar o Jogador (Um cubo simples por enquanto)
const playerGeometry = new THREE.BoxGeometry(1, 1, 1); // Largura, Altura, Profundidade
const playerMaterial = new THREE.MeshLambertMaterial({ color: 0xFF5733 }); // Laranja
const player = new THREE.Mesh(playerGeometry, playerMaterial);

player.position.set(0, 0.5, 0); // Posição inicial do jogador (no centro do "caminho")
scene.add(player);

// 5. Posicionar a Câmera
camera.position.set(0, 5, 10); // Posição inicial da câmera (atrás e acima do jogador)
camera.lookAt(player.position); // Faz a câmera olhar para o jogador

// Variáveis para controle do jogo
let gameSpeed = 0.1; // Velocidade de avanço do jogo
let playerSpeed = 0.1; // Velocidade de movimento lateral e longitudinal do jogador
let moveLeft = false;
let moveRight = false;
let moveForward = false;
let moveBackward = false;

// 6. Obstáculos Dinâmicos
const obstacles = [];
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);    // REVISAR IMPACTO DO OBSTACULO
const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x333 }); // Cinza escuro

const obstacleSpawnInterval = 10; // frames entre cada obstáculo
let obstacleSpawnCounter = 0;

// 7. Loop de Animação (Game Loop)
function animate() {
    requestAnimationFrame(animate); // Chama a função novamente no próximo frame

    // Movimento lateral e longitudinal do jogador com colisão nas paredes e limites
    const pistaLimiteX = 25 / 2 - 0.5; // metade da largura do plano menos metade do jogador
    const pistaLimiteFrente = 1000 / 2 - 0.5; // metade do comprimento do plano menos metade do jogador
    const pistaLimiteTras = -1000 / 2 + 0.5;

    // Movimento lateral
    if (moveLeft && player.position.x > -pistaLimiteX) {
        player.position.x -= playerSpeed;
        if (player.position.x < -pistaLimiteX) player.position.x = -pistaLimiteX;
    }
    if (moveRight && player.position.x < pistaLimiteX) {
        player.position.x += playerSpeed;
        if (player.position.x > pistaLimiteX) player.position.x = pistaLimiteX;
    }

    // Movimento frente/trás
    if (moveForward && player.position.z > pistaLimiteTras) {
        player.position.z -= playerSpeed;
        if (player.position.z < pistaLimiteTras) player.position.z = pistaLimiteTras;
    }
    if (moveBackward && player.position.z < pistaLimiteFrente) {
        player.position.z += playerSpeed;
        if (player.position.z > pistaLimiteFrente) player.position.z = pistaLimiteFrente;
    }

    // Avanço automático dos obstáculos (exemplo de endless runner)
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.position.z += gameSpeed;

        // Checar colisão simples (AABB)
        if (
            Math.abs(obs.position.x - player.position.x) < 1 &&
            Math.abs(obs.position.z - player.position.z) < 1
        ) {
            alert('Game Over!');
            window.location.reload();
            return;
        }

        // Remover obstáculos que passaram pelo jogador
        if (obs.position.z > camera.position.z + 5) {
            scene.remove(obs);
            obstacles.splice(i, 5);
        }
    }

    // Gerar novos obstáculos
    obstacleSpawnCounter++;
    if (obstacleSpawnCounter >= obstacleSpawnInterval) {
        obstacleSpawnCounter = 0;
        const obs = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        obs.position.set(
            (Math.random() - 0.5) * 24, // dentro da largura da pista
            0.5,
            player.position.z - 100 // sempre à frente do jogador
        );
        scene.add(obs);
        obstacles.push(obs);
    }

    // Atualizar a câmera para seguir o jogador (opcional)
    camera.position.z = player.position.z + 10;
    camera.lookAt(player.position);

    renderer.render(scene, camera); // Renderiza a cena
}

// Laterais da pista (paredes)
const wallThickness = 0.2;
const wallHeight = 3.7;
const wallLength = 210;
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x693631 }); // Cinza claro

// Parede esquerda
const leftWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
leftWall.position.set(-25/2, wallHeight/2, 0); // -25/2 = metade da largura do plano
scene.add(leftWall);

// Parede direita
const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
rightWall.position.set(25/2, wallHeight/2, 0); // 25/2 = metade da largura do plano
scene.add(rightWall);

// 8. Controles do Teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
            moveLeft = true;
            break;
        case 'ArrowRight':
        case 'd':
            moveRight = true;
            break;
        case 'ArrowUp':
        case 'w':
            moveForward = true;
            break;
        case 'ArrowDown':
        case 's':
            moveBackward = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
            moveLeft = false;
            break;
        case 'ArrowRight':
        case 'd':
            moveRight = false;
            break;
        case 'ArrowUp':
        case 'w':
            moveForward = false;
            break;
        case 'ArrowDown':
        case 's':
            moveBackward = false;
            break;
    }
});

// Iniciar o loop de animação
animate();
Math