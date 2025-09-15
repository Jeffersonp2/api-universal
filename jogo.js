#!/usr/bin/env node

const readline = require('readline');

// Configurar interface de leitura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Variáveis do jogo
let score = 0;
let level = 1;
let maxNumber = 10;
let attempts = 3;

// Função para limpar a tela
function clearScreen() {
  console.clear();
}

// Função para mostrar título
function showTitle() {
  console.log(`${colors.cyan}${colors.bright}`);
  console.log('╔══════════════════════════════════════╗');
  console.log('║        🎮 JOGO DE ADIVINHAÇÃO        ║');
  console.log('║         API Universal Edition        ║');
  console.log('╚══════════════════════════════════════╝');
  console.log(`${colors.reset}`);
}

// Função para mostrar status
function showStatus() {
  console.log(`${colors.yellow}📊 Status: Nível ${level} | Pontos: ${score} | Tentativas: ${attempts}${colors.reset}`);
  console.log(`${colors.blue}🎯 Adivinhe um número entre 1 e ${maxNumber}${colors.reset}`);
  console.log('');
}

// Função para gerar número aleatório
function generateRandomNumber() {
  return Math.floor(Math.random() * maxNumber) + 1;
}

// Função para fazer pergunta
function askQuestion() {
  return new Promise((resolve) => {
    rl.question(`${colors.green}Digite seu palpite: ${colors.reset}`, (answer) => {
      resolve(parseInt(answer));
    });
  });
}

// Função para verificar resposta
function checkAnswer(userAnswer, correctAnswer) {
  if (isNaN(userAnswer)) {
    return { result: 'invalid', message: '❌ Por favor, digite um número válido!' };
  }
  
  if (userAnswer < 1 || userAnswer > maxNumber) {
    return { result: 'invalid', message: `❌ Digite um número entre 1 e ${maxNumber}!` };
  }
  
  if (userAnswer === correctAnswer) {
    return { result: 'correct', message: '🎉 Parabéns! Você acertou!' };
  } else if (userAnswer < correctAnswer) {
    return { result: 'low', message: '📈 Muito baixo! Tente um número maior.' };
  } else {
    return { result: 'high', message: '📉 Muito alto! Tente um número menor.' };
  }
}

// Função para calcular pontos
function calculatePoints(attemptsUsed) {
  const basePoints = level * 10;
  const bonusPoints = (4 - attemptsUsed) * 5;
  return basePoints + bonusPoints;
}

// Função para subir de nível
function levelUp() {
  level++;
  maxNumber += 5;
  attempts = 3;
  console.log(`${colors.magenta}🚀 PARABÉNS! Você subiu para o nível ${level}!${colors.reset}`);
  console.log(`${colors.cyan}🎯 Agora você precisa adivinhar números entre 1 e ${maxNumber}${colors.reset}`);
  console.log('');
}

// Função para mostrar resultado final
function showFinalResult() {
  clearScreen();
  showTitle();
  
  console.log(`${colors.green}${colors.bright}`);
  console.log('╔══════════════════════════════════════╗');
  console.log('║            🏆 GAME OVER!             ║');
  console.log('╚══════════════════════════════════════╝');
  console.log(`${colors.reset}`);
  
  console.log(`${colors.yellow}📊 Resultado Final:${colors.reset}`);
  console.log(`🎯 Nível alcançado: ${level}`);
  console.log(`⭐ Pontos totais: ${score}`);
  console.log('');
  
  if (score >= 100) {
    console.log(`${colors.green}🏆 LENDA! Você é um mestre da adivinhação!${colors.reset}`);
  } else if (score >= 50) {
    console.log(`${colors.blue}🥇 EXCELENTE! Você é muito bom nisso!${colors.reset}`);
  } else if (score >= 20) {
    console.log(`${colors.yellow}🥈 BOM! Continue praticando!${colors.reset}`);
  } else {
    console.log(`${colors.red}🥉 Tente novamente! Você pode melhorar!${colors.reset}`);
  }
  
  console.log('');
  console.log(`${colors.cyan}Obrigado por jogar! 🎮${colors.reset}`);
}

// Função principal do jogo
async function playGame() {
  clearScreen();
  showTitle();
  showStatus();
  
  const correctAnswer = generateRandomNumber();
  let attemptsUsed = 0;
  
  while (attemptsUsed < attempts) {
    attemptsUsed++;
    
    const userAnswer = await askQuestion();
    const result = checkAnswer(userAnswer, correctAnswer);
    
    console.log(result.message);
    
    if (result.result === 'correct') {
      const points = calculatePoints(attemptsUsed);
      score += points;
      
      console.log(`${colors.green}⭐ Você ganhou ${points} pontos!${colors.reset}`);
      console.log('');
      
      // Perguntar se quer continuar
      const continueAnswer = await new Promise((resolve) => {
        rl.question(`${colors.cyan}Quer continuar para o próximo nível? (s/n): ${colors.reset}`, (answer) => {
          resolve(answer.toLowerCase());
        });
      });
      
      if (continueAnswer === 's' || continueAnswer === 'sim') {
        levelUp();
        await playGame(); // Recursão para próximo nível
        return;
      } else {
        showFinalResult();
        rl.close();
        return;
      }
    } else if (result.result === 'invalid') {
      attemptsUsed--; // Não conta tentativa inválida
    } else {
      console.log(`${colors.red}Tentativas restantes: ${attempts - attemptsUsed}${colors.reset}`);
      console.log('');
    }
  }
  
  // Se chegou aqui, perdeu
  console.log(`${colors.red}💀 Game Over! O número correto era ${correctAnswer}${colors.reset}`);
  console.log('');
  
  const playAgain = await new Promise((resolve) => {
    rl.question(`${colors.cyan}Quer jogar novamente? (s/n): ${colors.reset}`, (answer) => {
      resolve(answer.toLowerCase());
    });
  });
  
  if (playAgain === 's' || playAgain === 'sim') {
    score = 0;
    level = 1;
    maxNumber = 10;
    attempts = 3;
    await playGame();
  } else {
    showFinalResult();
    rl.close();
  }
}

// Função para mostrar instruções
function showInstructions() {
  console.log(`${colors.yellow}📖 INSTRUÇÕES:${colors.reset}`);
  console.log('🎯 Adivinhe o número secreto gerado pelo computador');
  console.log('📊 Você tem 3 tentativas por nível');
  console.log('⭐ Ganhe pontos baseados no nível e tentativas usadas');
  console.log('🚀 Suba de nível para números maiores e mais pontos');
  console.log('🏆 Tente alcançar o máximo de pontos possível!');
  console.log('');
}

// Iniciar o jogo
async function startGame() {
  clearScreen();
  showTitle();
  showInstructions();
  
  const startAnswer = await new Promise((resolve) => {
    rl.question(`${colors.green}Pressione Enter para começar... ${colors.reset}`, (answer) => {
      resolve(answer);
    });
  });
  
  await playGame();
}

// Tratar erro de leitura
rl.on('error', (error) => {
  console.log(`${colors.red}Erro: ${error.message}${colors.reset}`);
  process.exit(1);
});

// Iniciar o jogo
startGame().catch((error) => {
  console.log(`${colors.red}Erro inesperado: ${error.message}${colors.reset}`);
  process.exit(1);
});
