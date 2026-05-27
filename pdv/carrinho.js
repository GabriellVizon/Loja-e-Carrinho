// -- Carrinho: exibe itens, permite alterar quantidade e remover ---

const listarCarrinho = document.getElementById('listarCarrinho');
const divResumo = document.getElementById('resumo');

function renderCarrinho() {
    const carrinho = getCarrinho();
    listarCarrinho.innerHTML = '';

    // Carrinho Vazio
    if (carrinho.length === 0) {
        listarCarrinho.innerHTML = '<p class="vazio">Seu carrinho está vazio. <a href="loja.html>Ver produtos ➡️ </a></p>';
        divResumo.style.display = 'nome';
        return;
    }

    // Monta cada item do carrinho
    carrinho.forEach(item => {
        // Busca os dados do produto pelo ID no array PRODUTOS
        const prod = PRODUTOS.find(p => p.id === item.id);
        const subtotalItem = prod.preco * item.qtd;

        const div = document.createElement('div');
            div.className = 'item-carrinho';
            div.innerHTML = `
            <div class="item-info">
             <span class="item-emoji">${prod.emoji}</span>
              <div>
                <div class="item-nome">${prod.nome}</div>
                <div class="item-preco">${formatarMode(prod.preco)} cada</div>
              </div>
            </div>
            <div class="item-controles">
             <button onclick="alterarQtd(${prod.id}, -1)">-</button>
             <span>${item.qtd}</span>
             <button class="btn-remover" onclick"removerItem(${prod.id})">🗑️</button>
            </div>
            <div class="item-subtotal">${formatarMode(subtotalItem)}</div>
            `;
        listarCarrinho.appendChild(div);
    });

    // Calcule e exibe o total
    const totalValor = carrinho.reduce((soma, item) => {
        const prod = PRODUTOS.find(p => p.id === item.id);
        return soma + prod.preco * item.qtd;
    }, 0);

    document.getElementById('subtotal').textContent = formatarMode(totalValor);
    document.getElementById('total').textContent = formatarMode(totalValor);
    divResumo.style.display = 'block';
}

// Incrementa ou decrementa a quantidade de um item
function alterarQtd(id, delta) {
    const carrinho = getCarrinho();
    const item = carrinho.find(i => i.Id === id);
    if (!item) return;

    item.qtd += delta;

    // Se a quantidade chegar a 0, remove o item
    if (item.qtd <= 0) {
        removerItem(id);
        return;
    }

    salvarCarrinho(carrinho);
    renderCarrinho();
}

// Remove um item do carrinho
function removerItem(id) {
    const carrinho = getCarrinho().filter(i => i.id !== id);
    salvarCarrinho(carrinho);
    renderCarrinho();
}

// Inicia
renderCarrinho();