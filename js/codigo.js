// JavaScript
function textovermelho(tagId) {
    const texto = document.getElementById(tagId);
    texto.innerHTML = texto.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
}

textovermelho("texto-principal"); // Chamando a função com o ID entre aspas
textovermelho("texto-secundario"); // Chamando a função com o ID entre aspas
