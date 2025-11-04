// Captura os elementos do formulário
const form = document.getElementById('meuFormulario');
const checkbox = document.getElementById('termos');

// Botões de envio (input e button)
const enviarInput = document.getElementById('enviarInput');
const enviarButton = document.getElementById('enviarButton');

// Botões de cancelar (input e button)
const cancelarInput = document.getElementById('cancelarInput');
const cancelarButton = document.getElementById('cancelarButton');

// Quando o checkbox é marcado/desmarcado
checkbox.addEventListener('change', function() {
    const habilitar = this.checked;
    enviarInput.disabled = !habilitar;
    enviarButton.disabled = !habilitar;
});

// Controle do envio (para ambos os botões Enviar)
form.addEventListener('submit', function(event) {
    if (!checkbox.checked) {
        event.preventDefault();
        alert("Você precisa aceitar os termos e condições antes de enviar!");
        return;
    }
    alert("Formulário enviado com sucesso!");
});