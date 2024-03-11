document.addEventListener('DOMContentLoaded', function() {
    var enviarInput = document.getElementById('enviar-input');
    var listaNota = document.getElementById('lista-nota');
    var boxNote = document.getElementById('box-note');

    atualizarListaNotas();

    enviarInput.addEventListener('click', function() {
        var notaText = document.getElementById('nota').value;

        adicionarNotaLocalStorage(notaText);
        atualizarListaNotas();
        ajustarAlturaBoxNote(); 

        document.getElementById('nota').value = '';
    });

    function adicionarNotaLocalStorage(nota) {
        var notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    function atualizarListaNotas() {
        listaNota.innerHTML = '';

        var notas = JSON.parse(localStorage.getItem('notas')) || [];

        notas.forEach(function(nota, index) {
            var novaNota = document.createElement('div');
            novaNota.classList.add('box-item');

            var inputNota = document.createElement('input');
            inputNota.type = 'text';
            inputNota.value = nota;
            inputNota.readOnly = true;

            var botaoAlterar = document.createElement('button');
            botaoAlterar.textContent = 'Alterar';
            botaoAlterar.addEventListener('click', function() {
                var inputEditarNota = document.createElement('input');
                inputEditarNota.type = 'text';
                inputEditarNota.value = nota;
                novaNota.replaceChild(inputEditarNota, inputNota);

                novaNota.removeChild(botaoAlterar);
                novaNota.removeChild(botaoExcluir);

                var botaoEnviarEdicao = document.createElement('button');
                botaoEnviarEdicao.textContent = 'Enviar';
                botaoEnviarEdicao.addEventListener('click', function() {
                    atualizarNotaLocalStorage(index, inputEditarNota.value);
                    atualizarListaNotas();
                    ajustarAlturaBoxNote(); 
                });
                novaNota.appendChild(botaoEnviarEdicao);
            });

            var botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.addEventListener('click', function() {
                removerNotaLocalStorage(nota);
                atualizarListaNotas();
                ajustarAlturaBoxNote(); 
            });

            novaNota.appendChild(inputNota);
            novaNota.appendChild(botaoAlterar);
            novaNota.appendChild(botaoExcluir);

            listaNota.appendChild(novaNota);

            novaNota.style.marginBottom = '1rem'; 
        });
    }

    function removerNotaLocalStorage(nota) {
        var notas = JSON.parse(localStorage.getItem('notas')) || [];
        var index = notas.indexOf(nota);
        if (index !== -1) {
            notas.splice(index, 1);
        }
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    function atualizarNotaLocalStorage(index, novoTexto) {
        var notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas[index] = novoTexto;
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    function ajustarAlturaBoxNote() {
        var alturaItem = parseFloat(getComputedStyle(document.querySelector('.box-item')).height);
        var marginItem = parseFloat(getComputedStyle(document.querySelector('.box-item')).marginTop) +
                         parseFloat(getComputedStyle(document.querySelector('.box-item')).marginBottom);
        var alturaNota = parseFloat(getComputedStyle(document.getElementById('lista-nota')).height);
        var novaAltura = alturaNota + alturaItem + marginItem + 4 * parseFloat(getComputedStyle(document.documentElement).fontSize); 

        boxNote.style.height = novaAltura + 'px';
    }

    listaNota.style.marginTop = '1rem';
});
