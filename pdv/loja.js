// -- Loja: exibe os produtos e permite adicionar ao carrinho --

const grade = document.getElementById('grade');
const badge = document.getElementById('badge');

// Atualiza o número no badge do carrinho
function atualizarBadge() {
    const carrinho = getCarrinho();
    const total = carrinho.reduce((soma,item) => soma + item.qtd, 0);
    badge.textContent = total;
}

// Cria o card de cada produto
function renderProdutos() {
    grade.innerHTML = '';

    PRODUTOS.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'card-produto';
        card.innerHTML = `
        <div class="produto-emoji">${prod.emoji}</div>
        <div class="produto-nome">${prod.nome}</div>
        <div class="produto-preco">${formatarMode($prod.preco)}</div>
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
        // Produto já está no carrinho - só aumenta a quantidade
        existe.qtd++;
    } else{
        // Produto novo - adiciona com quantidade 1
        carrinho.push({ id, qtd:1 });
    }

    salvarCarrinho(carrinho);
    atualizarBadge();
}

// Inicia a página
renderProdutos();
atualizarBadge();