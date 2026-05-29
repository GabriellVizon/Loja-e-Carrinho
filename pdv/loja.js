// ── Loja: exibe os produtos e permite adicionar ao carrinho ──

const grade = document.getElementById('grade');
const badge = document.getElementById('badge');
const badgeTotal = document.getElementById('badgeTotal');

// Atualiza o número no badge do carrinho
function atualizarBadge() {
  const carrinho = getCarrinho();
  const qtd = carrinho.reduce((soma, item) => soma + item.qtd, 0);
  badge.textContent = qtd; //atualiza o num

  const total = carrinho.reduce((soma, item) => {
  //busca os dados do produto pelo id
const prod = PRODUTOS.find(p => p.id === item.id);
return soma + prod.preco * item.qtd //acumula subtotal
}, 0); //começa do zero

// so mostra o valor se houver 1 item
// formatarmoeda() converte 449.8 arrendonda

badgeTotal.textContent = qtd > 0 ? '  ' + formatarMoeda(total): '';
}

// Cria o card de cada produto
function renderProdutos() {
  grade.innerHTML = '';

  PRODUTOS.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'card-produto';
    card.innerHTML = `
      <div class="prod-emoji">${prod.emoji}</div>
      <div class="prod-nome">${prod.nome}</div>
      <div class="prod-preco">${formatarMoeda(prod.preco)}</div>
      <button onclick="adicionarAoCarrinho(${prod.id})">+ Adicionar</button>
    `;
    grade.appendChild(card);
  });
}

// Adiciona produto ao carrinho ou incrementa a quantidade
function adicionarAoCarrinho(id) {
  const carrinho = getCarrinho();
  const existe = carrinho.find(item => item.id === id);

  if (existe) {
    // Produto já está no carrinho — só aumenta a quantidade
    existe.qtd++;
  } else {
    // Produto novo — adiciona com quantidade 1
    carrinho.push({ id, qtd: 1 });
  }

  salvarCarrinho(carrinho);
  atualizarBadge();
}

// Inicia a página
renderProdutos();
atualizarBadge();
