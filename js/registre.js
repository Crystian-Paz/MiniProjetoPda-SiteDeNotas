const $ = (elemento) => document.querySelector(elemento);
$("#cadastro").addEventListener("click", (ev) => {
    ev.preventDefault();


  const nome = $("#nome").value;
  const sobrenome = $("#sobrenome").value;
  const login = $("#login").value;
  const email = $("#email").value;
  const nascimento = $("#nascimento").value;
  const senha = $("#senha").value;
  const confirmaSenha = $("#confirma-senha").value;

  const senhaConfirmada = senha === confirmaSenha;

  if (!senhaConfirmada) {
      alert("Sua confirmação de senha não confere.\nPor favor verifique.");
      return;
  }

  const tudoPreenchido =
      nome.length !== 0 &&
      sobrenome.length  !== 0 &&
      login.length !== 0 &&
      email.length !== 0 &&
      nascimento.length !== 0 &&
      senhaConfirmada.length !== 0 &&
      senha.length !== 0;

  if (tudoPreenchido === false) {
      alert("Preencha todos os campos antes de enviar.");
      return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const novoUsuario = {
      nome,
      sobrenome,
      login,
      email,
      nascimento,
      senha,
      confirmaSenha,
      notas: []
  };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  localStorage.setItem('username', nome);
  alert("Cadastro realizado com sucesso!");
  window.location.href = "./login.html";
});

document.getElementById("limpar").addEventListener("click", () => {
  document.getElementById("nome").value = "";
  document.getElementById("sobrenome").value = "";
  document.getElementById("login").value = "";
  document.getElementById("email").value = "";
  document.getElementById("nascimento").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("confirma-senha").value = "";
});