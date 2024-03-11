const $ = (elemento) => document.querySelector(elemento);

$("#entrar").addEventListener("click", (ev) => {
    ev.preventDefault();

    const loginInput = $("#login").value;
    const senhaInput = $("#senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioCadastrado = usuarios.find(usuario => usuario.login === loginInput && usuario.senha === senhaInput);

    if (!usuarioCadastrado) {
        alert("Dados inválidos!");
        return;
    }

    window.location.href = "./notas.html";
});
