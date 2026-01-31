const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    console.log("Cadastro:", user, email, senha);
  });
}
// OBS: falta implementar o BD e terminar a logica

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    console.log("Login:", email, senha);
  });
}
