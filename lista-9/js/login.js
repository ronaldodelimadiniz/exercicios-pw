
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // impede o envio automático do formulário

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();
  const mensagem = document.getElementById("mensagem-erro");

  // limpa mensagem anterior
  mensagem.textContent = "";
  mensagem.style.display = "none";

  // validação simples
  if (email === "" || senha === "") {
    mensagem.textContent = "⚠️ Por favor, preencha todos os campos.";
    mensagem.style.display = "block";
  } 
  else if (email === "admin@craftsy.com" && senha === "1234") {
    // login válido
    mensagem.style.display = "none";
    window.location.href = "dashboard.html"; // ou outra página
  } 
  else {
    mensagem.textContent = "❌ Email ou senha incorretos. Tente novamente.";
    mensagem.style.display = "block";
  }
});