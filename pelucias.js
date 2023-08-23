const carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco, imagemUrl) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    carrinho[index].quantidade++;
    carrinho[index].subtotal += preco;
  } else {
    carrinho.push({ nome, preco, quantidade: 1, subtotal: preco, imagem: imagemUrl });
  }
  total += preco;
  atualizarCarrinho();
}

function removerDoCarrinho(nome, preco) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    const itemRemovido = carrinho.splice(index, 1)[0];
    total -= itemRemovido.subtotal;
    atualizarCarrinho();
  }
}

function aumentarQuantidadeNoCarrinho(nome, preco) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    carrinho[index].quantidade++;
    carrinho[index].subtotal += preco;
    total += preco;
    atualizarCarrinho();
  }
}

function diminuirQuantidadeNoCarrinho(nome, preco) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1 && carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
    carrinho[index].subtotal -= preco;
    total -= preco;
    atualizarCarrinho();
  } else if (index !== -1 && carrinho[index].quantidade === 1) {
    carrinho.splice(index, 1);
    total -= preco;
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const carrinhoElement = document.getElementById("itens-carrinho");
  carrinhoElement.innerHTML = "";

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.className = "item-lista";

    const imagem = document.createElement("img");
    imagem.src = item.imagem;
    imagem.alt = item.nome;
    imagem.width = 50;
    imagem.height = 50;
    imagem.className = "item-img";
    li.appendChild(imagem);

    const nomePreco = document.createElement("span");
    nomePreco.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    li.appendChild(nomePreco);

    const botaoAumentar = document.createElement("button");
    botaoAumentar.innerText = "+";
    botaoAumentar.className = "botao-aumentar";
    botaoAumentar.onclick = function () {
      aumentarQuantidadeNoCarrinho(item.nome, item.preco);
    };
    li.appendChild(botaoAumentar);

    const quantidadeItem = document.createElement("span");
    quantidadeItem.innerText = item.quantidade;
    li.appendChild(quantidadeItem);

    const botaoDiminuir = document.createElement("button");
    botaoDiminuir.innerText = "-";
    botaoDiminuir.className = "botao-diminuir";
    botaoDiminuir.onclick = function () {
      diminuirQuantidadeNoCarrinho(item.nome, item.preco);
    };
    li.appendChild(botaoDiminuir);

    carrinhoElement.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function finalizarCompra() {
  if (carrinho.length > 0) {
    alert("Compra finalizada! Total: R$ " + total.toFixed(2));
    carrinho.length = 0;
    total = 0;
    atualizarCarrinho();
    toggleCarrinho(); // Fechar o carrinho após finalizar a compra
  } else {
    alert("O carrinho está vazio. Adicione itens antes de finalizar a compra.");
  }
}

function toggleCarrinho() {
  const carrinhoElement = document.getElementById("carrinho");
  carrinhoElement.classList.toggle("aberto");
}