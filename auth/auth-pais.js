// Sistema de Autenticação para Pais e Responsáveis
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        if (value.length > 10) value = value.substring(0, 10) + '-' + value.substring(10, 15);
        e.target.value = value;
    });
}

function validarSenhas(senha, confirmacao) {
    return senha === confirmacao && senha.length >= 6 && senha.length <= 12;
}

// Cadastro para Pais
if (document.getElementById('form-cadastro-pais')) {
    const formCadastro = document.getElementById('form-cadastro-pais');
    const inputTelefone = document.getElementById('telefone-pais');
    
    aplicarMascaraTelefone(inputTelefone);
    
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome-pais').value.trim();
        const email = document.getElementById('email-pais').value.trim();
        const telefone = inputTelefone.value;
        const parentesco = document.getElementById('parentesco').value;
        const senha = document.getElementById('senha-pais').value;
        const confirmarSenha = document.getElementById('confirmar-senha-pais').value;
        
        if (!validarSenhas(senha, confirmarSenha)) {
            alert('As senhas não coincidem ou são muito curtas (mínimo 6 caracteres).');
            return;
        }
        
        const usuarioPais = {
            tipo: 'pais',
            nome: nome,
            email: email,
            telefone: telefone,
            parentesco: parentesco,
            senha: senha,
            dataCadastro: new Date().toISOString(),
            dependentes: []
        };
        
        const usuariosPais = JSON.parse(localStorage.getItem('usuariosPais')) || [];
        const usuarioExistente = usuariosPais.find(u => u.email === email);
        
        if (usuarioExistente) {
            alert('Já existe um usuário com este email. Por favor, use outro email.');
            return;
        }
        
        usuariosPais.push(usuarioPais);
        localStorage.setItem('usuariosPais', JSON.stringify(usuariosPais));
        localStorage.setItem('usuarioLogadoPais', JSON.stringify(usuarioPais));
        
        alert('Cadastro realizado com sucesso!');
        window.location.href = '../pais/pais.html';
    });
}

// Login para Pais
if (document.getElementById('form-login-pais')) {
    const formLogin = document.getElementById('form-login-pais');
    
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email-login').value.trim();
        const senha = document.getElementById('senha-login').value;
        
        const usuariosPais = JSON.parse(localStorage.getItem('usuariosPais')) || [];
        const usuario = usuariosPais.find(u => u.email === email && u.senha === senha);
        
        if (usuario) {
            localStorage.setItem('usuarioLogadoPais', JSON.stringify(usuario));
            window.location.href = '../pais/pais.html';
        } else {
            alert('Email ou senha incorretos.');
        }
    });
}

// Função para verificar e redirecionar login de pais
function verificarLoginPais() {
    const usuarioLogado = localStorage.getItem('usuarioLogadoPais');
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('Página atual:', currentPage);
    console.log('Usuário logado (pais):', usuarioLogado);
    
    // Se está na página de login/cadastro de pais E já está logado → vai para pais
    if (usuarioLogado && (currentPage === 'pais-login.html' || currentPage === 'pais-cadastro.html')) {
        console.log('Usuário pais logado - redirecionando para pais.html');
        window.location.href = '../pais/pais.html';
        return;
    }
    
    // Se está na página de pais E NÃO está logado → vai para login de pais
    if (!usuarioLogado && currentPage === 'pais.html') {
        console.log('Usuário pais não logado - redirecionando para pais-login.html');
        window.location.href = '../auth/pais-login.html';
        return;
    }
}

// Função de logout para pais
function logoutPais() {
    localStorage.removeItem('usuarioLogadoPais');
    window.location.href = '../auth/pais-login.html';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    verificarLoginPais();
});