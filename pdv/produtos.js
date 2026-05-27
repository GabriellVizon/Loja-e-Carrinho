// -- Catalogo de produtos --
// este arquivo é carregado em todas as paginas
// para adicionar produtos, basta incluir novos objetos neste array.

const PRODUTOS = [
    { id: 1, nome:"Notebook UltraSlim", preco: 3499.90, emoji: "💻"},
    { id: 2, nome:"Mouse Gamer RGB", preco: 149.90, emoji: "🖱️"},
    { id: 3, nome:"Teclado Mecânico", preco: 299.90, emoji: "⌨️"},
    { id: 4, nome:"Headset 7.1 Surround", preco: 249.90, emoji: "🎧"},
    { id: 5, nome:"Monitor 24\" Full HD", preco: 890.90, emoji:"🖥️"},
    { id: 6, nome:"Webcam HD 1080p", preco: 189.90, emoji: "📷"},
    { id: 7, nome:"SSD 1TB NVMe", preco: 399.90, emoji:"💾"},
    { id: 8, nome:"Hub USB-C 7 em 1", preco: 159.90, emoji: "🔌"},
];

// -- Helpers de carrinho (usado em várias páginas) --

// Retorna o carrinho salvo no localStorage (ou array vazio)
function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho') || '[]');
}

// Salvar o carrinho no localStorage
function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Formata número como moeda brasileira: 1499.9 "R$ 1.499,90"
function formatarMode(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
}
