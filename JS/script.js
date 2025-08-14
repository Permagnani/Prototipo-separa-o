function revisarPedido() {
    const nome = document.getElementById("nome").value.trim();
    const lojaSelect = document.getElementById("loja");
    const loja = lojaSelect.options[lojaSelect.selectedIndex].value;

    if (!nome) {
        alert("Por favor, preencha seu nome.");
        return null;
    }

    if (!loja) {
        alert("Por favor, selecione a loja.");
        return null;
    }

    const formulario = document.getElementById("formulario");
    const categorias = formulario.querySelectorAll("h2");
    let pedido = { nome, loja, categorias: [] };
    let temPedido = false;

    categorias.forEach((categoria) => {
        let elementos = [];
        let el = categoria.nextElementSibling;

        while (el && el.tagName !== "H2") {
            if (el.classList.contains("item")) {
                elementos.push(el);
            }
            el = el.nextElementSibling;
        }

        let itensCategoria = [];

        elementos.forEach((itemDiv) => {
            const input = itemDiv.querySelector("input[type='number']");
            const quantidade = parseInt(input.value);
            if (quantidade > 0) {
                let label = itemDiv.querySelector("label").innerText.replace(/ℹ️/g, "").trim();
                itensCategoria.push({ label, quantidade });
                temPedido = true;
            }
        });

        if (itensCategoria.length > 0) {
            pedido.categorias.push({ nome: categoria.innerText, itens: itensCategoria });
        }
    });

    if (!temPedido) {
        alert("Por favor, insira a quantidade de pelo menos um item.");
        return null;
    }

    return pedido;
}

function gerarLinkConfirmacao() {
    const pedido = revisarPedido();
    if (pedido) {
        // Codifica o pedido em JSON e depois em Base64 para URL
        const pedidoJSON = JSON.stringify(pedido);
        const pedidoBase64 = btoa(pedidoJSON);
        const link = `${window.location.origin}/confirmacao.html?pedido=${encodeURIComponent(pedidoBase64)}`;

        // Exibe o link
        document.getElementById('link-input').value = link;
        document.getElementById('formulario').classList.add('hidden');
        document.getElementById('link-gerado').classList.remove('hidden');
    }
}

function copiarLink() {
    const linkInput = document.getElementById('link-input');
    linkInput.select();
    document.execCommand('copy');
    alert('Link copiado para a área de transferência!');
}