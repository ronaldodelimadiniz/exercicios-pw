// === REFERÊNCIAS DO VISOR ===
const upper = document.getElementById("screen-upper");
const lower = document.getElementById("screen-lower");

// === VARIÁVEIS GLOBAIS ===
let expr = '';           // expressão em exibição
let ans = 0;             // último resultado (Ans)
let justEvaluated = false; // flag de pós-cálculo

// === FUNÇÃO PARA ATUALIZAR VISOR ===
function updateDisplay() {
  upper.textContent = expr === '' ? '' : expr;
  if (!justEvaluated && expr === '') lower.textContent = '0';
}

// === FUNÇÕES AUXILIARES EM GRAUS ===
function sinDeg(x) { return Math.sin((x * Math.PI) / 180); }
function cosDeg(x) { return Math.cos((x * Math.PI) / 180); }
function tanDeg(x) { return Math.tan((x * Math.PI) / 180); }
function log10(x)  { return Math.log(x) / Math.LN10; }

// === CONVERSÃO DA EXPRESSÃO VISUAL PARA JAVASCRIPT ===
function toJSExpression(humanExpr) {
  let js = humanExpr;

  // Notação científica
  js = js.replace(/×10\^/g, '*10**');

  // Funções
  js = js.replace(/√\(/g, 'Math.sqrt(');
  js = js.replace(/sin\(/g, 'sinDeg(');
  js = js.replace(/cos\(/g, 'cosDeg(');
  js = js.replace(/tan\(/g, 'tanDeg(');
  js = js.replace(/log\(/g, 'log10(');
  js = js.replace(/ln\(/g, 'Math.log(');

  // Operadores
  js = js.replace(/×/g, '*');
  js = js.replace(/÷/g, '/');
  js = js.replace(/\^/g, '**');

  return js;
}

// === PROCESSA O CLIQUE DE UM BOTÃO ===
function handleButton(label) {
  label = label.trim();

  // Após resultado, iniciar nova expressão
  if (justEvaluated && /^[0-9.]$/.test(label)) {
    expr = '';
    justEvaluated = false;
  }

  // Dígitos
  if (/^[0-9]$/.test(label)) {
    expr += label;
    updateDisplay();
    return;
  }

  switch (label) {
    case '.':
      expr += '.';
      break;

    case '+':
    case '-':
    case '×':
    case '÷':
    case '^':
    case '(':
    case ')':
      expr += label;
      justEvaluated = false;
      break;

    case 'AC':
      expr = '';
      upper.textContent = '';
      lower.textContent = '0';
      justEvaluated = false;
      break;

    case 'DEL':
      expr = expr.slice(0, -1);
      justEvaluated = false;
      break;

    case 'Ans':
      expr += ans.toString();
      justEvaluated = false;
      break;

    // Funções científicas
    case 'x²':
      expr += '^2';
      justEvaluated = false;
      break;

    case 'x³':
      expr += '^3';
      justEvaluated = false;
      break;

    case 'x⁻¹':
      expr += '^-1';
      justEvaluated = false;
      break;

    case '√':
      expr += '√(';
      justEvaluated = false;
      break;

    case 'sin':
      expr += 'sin(';
      justEvaluated = false;
      break;

    case 'cos':
      expr += 'cos(';
      justEvaluated = false;
      break;

    case 'tan':
      expr += 'tan(';
      justEvaluated = false;
      break;

    case 'log':
      expr += 'log(';
      justEvaluated = false;
      break;

    case 'ln':
      expr += 'ln(';
      justEvaluated = false;
      break;

    case '×10ˣ':
      expr += '×10^';
      justEvaluated = false;
      break;

    case '(-)':
      // troca de sinal simples
      if (expr === '') expr = '-';
      else expr += '-';
      justEvaluated = false;
      break;

    // === CÁLCULO ===
    case '=':
      if (!expr) return;
      try {
        const jsExpr = toJSExpression(expr);
        const result = eval(jsExpr);
        if (typeof result === 'number' && isFinite(result)) {
          ans = result;
          upper.textContent = expr;      // expressão vai para a linha de cima
          lower.textContent = result;    // resultado na linha de baixo
          expr = '';
          justEvaluated = true;
        } else {
          lower.textContent = 'Erro';
          justEvaluated = true;
        }
      } catch (e) {
        lower.textContent = 'Erro';
        justEvaluated = true;
      }
      break;

    default:
      // Botões não programados (ENG, hyp, etc.)
      break;
  }

  updateDisplay();
}

// === EVENTO DE CLIQUE GERAL ===
document.querySelector('.calc').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  handleButton(btn.textContent);
});

// === INICIALIZAÇÃO ===
updateDisplay();

