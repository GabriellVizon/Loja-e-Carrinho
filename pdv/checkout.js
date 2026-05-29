// ── Checkout: valida dados, exibe resumo e gera recibo ──

// Exibe o resumo do pedido na lateral
function renderResumo() {
  const carrinho = getCarrinho();
  const divItens = document.getElementById('itensResumo');
  divItens.innerHTML = '';

  let total = 0;

  carrinho.forEach(item => {
    const prod = PRODUTOS.find(p => p.id === item.id);
    const sub = prod.preco * item.qtd;
    total += sub;

    const linha = document.createElement('div');
    linha.className = 'resumo-linha';
    linha.innerHTML = `
      <span>${prod.emoji} ${prod.nome} ×${item.qtd}</span>
      <span>${formatarMoeda(sub)}</span>
    `;
    divItens.appendChild(linha);
  });

  document.getElementById('totalCheckout').textContent = formatarMoeda(total);
}

let desconto = 0;

const CUPONS = {
  'ETEC10': 0.10, 'M4A1': 0.30, 'FONE': 0.35
}

function aplicarCupom() {
  const codigo =
    document.getElementById('cupomInput').value.trim().toUpperCase();

  const erroCupom = document.getElementById('erroCupom');
  const sucessoCupom = document.getElementById('sucessoCupom');

  erroCupom.style.display = 'none';
  sucessoCupom.style.display = 'none';

  if (!codigo) {
    erroCupom.textContent = 'Digite um cupom!';
    erroCupom.style.display = 'block';
    return;
  }

  if (!CUPONS[codigo]) {
    erroCupom.textContent = 'Cupom invalido.';
    erroCupom.style.display = 'block';
    desconto = 0;
    return;
  }

  desconto = CUPONS[codigo];

  const carrinho = getCarrinho();
  const total = carrinho.reduce((soma, item) => {
    const prod = PRODUTOS.find(p => p.id === item.id);
    return soma + prod.preco * item.qtd;
  }, 0);

  const valorDesc = total * desconto;
  const totalFinal = total - valorDesc;

  document.getElementById('valorDesconto').textContent = '- ' +
    formatarMoeda(valorDesc);
  document.getElementById('totalFinal').textContent =
    formatarMoeda(totalFinal);
  document.getElementById('linhaDesconto').style.display = 'flex';
  document.getElementById('linhaTotalFinal').style.display = 'flex';

  sucessoCupom.textContent = 'cupom aplicado! ' + (desconto * 100) + '% de desconto.';
  sucessoCupom.style.display = 'block';
}

// Valida os campos do formulário antes de confirmar
function validarCampos() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!nome) return 'Por favor, informe o nome completo.';
  if (!email || !email.includes('@')) return 'Por favor, informe um e-mail válido.';
  if (cpf.length < 11) return 'Por favor, informe o CPF completo.';
  if (telefone.length < 10) return 'Por favor, informe o telefone completo.';

  return null; // null = sem erros
}

// Confirma o pedido e exibe o recibo
function finalizarPedido() {
  const erro = validarCampos();
  const divErro = document.getElementById('erroCampos');

  if (erro) {
    divErro.textContent = '⚠️ ' + erro;
    divErro.style.display = 'block';
    return;
  }

  divErro.style.display = 'none';

  const mensagemPagamento = {
    credito: '💳 Pagamento aprovado! Compra processada no cartão de crédito.',
    pix: '🔵 transfira via pix para: ....',
    boleto: '📄 boleto gerado vencimento em 3 dias uteis'
  };



  // Lê os dados do formulário
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const pagamentoSelecionado =
    document.querySelector('input[name="pagamento"]:checked');

  if (!pagamentoSelecionado) {
    divErro.textContent = '⚠️ Selecione uma forma de pagamento.';
    divErro.style.display = 'block';
    return;
  }

  const pagamento = pagamentoSelecionado.value;



  const labels = { credito: 'Cartão de crédito', pix: 'PIX', boleto: 'Boleto bancário' };

  // Preenche o recibo
  const carrinho = getCarrinho();
  let total = 0;
  const divItensRecibo = document.getElementById('reciboItens');
  divItensRecibo.innerHTML = '';

  carrinho.forEach(item => {
    const prod = PRODUTOS.find(p => p.id === item.id);
    const sub = prod.preco * item.qtd;
    total += sub;

    const linha = document.createElement('div');
    linha.className = 'resumo-linha';
    linha.innerHTML = `
      <span>${prod.emoji} ${prod.nome} ×${item.qtd}</span>
      <span>${formatarMoeda(sub)}</span>
    `;
    divItensRecibo.appendChild(linha);
  });

const totalFinal = total - (total * desconto);

document.getElementById('reciboCliente').textContent =
  `Cliente: ${nome} — ${email}`;

document.getElementById('reciboTotal').textContent =
  formatarMoeda(totalFinal);

document.getElementById('reciboPagamento').textContent =
  mensagemPagamento[pagamento];

  // Exibe o recibo e esconde o formulário
  document.querySelector('main').style.display = 'none';
  document.getElementById('recibo').style.display = 'flex';

  // Limpa o carrinho após a compra
  salvarCarrinho([]);
}

// Botão "Nova compra" — volta para a loja
function novaCompra() {
  window.location.href = 'loja.html';
}

// Inicia
renderResumo();
