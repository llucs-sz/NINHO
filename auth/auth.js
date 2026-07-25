// Sistema de Autenticação
function aplicarMascaraData(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2);
        if (value.length > 5) value = value.substring(0, 5) + '/' + value.substring(5, 9);
        e.target.value = value;
    });
}

function validarData(data) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(data)) return false;
    const [, dia, mes, ano] = data.match(regex);
    const date = new Date(ano, mes - 1, dia);
    return date.getDate() == dia && date.getMonth() == mes - 1 && date.getFullYear() == ano;
}

function validarSenhas(senha, confirmacao) {
    return senha === confirmacao && senha.length >= 6 && senha.length <= 12;
}

// Cadastro
if (document.getElementById('form-cadastro')) {
    const formCadastro = document.getElementById('form-cadastro');
    const inputNascimento = document.getElementById('nascimento');
    
    aplicarMascaraData(inputNascimento);
    
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const nascimento = inputNascimento.value;
        const registro = document.getElementById('registro').value.trim();
        const especialidade = document.getElementById('especialidade').value;
        const instituicao = document.getElementById('instituicao').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        
        if (!validarData(nascimento)) {
            alert('Por favor, insira uma data de nascimento válida.');
            return;
        }
        
        if (!validarSenhas(senha, confirmarSenha)) {
            alert('As senhas não coincidem ou são muito curtas (mínimo 6 caracteres).');
            return;
        }
        
        const usuario = {
            nome: nome,
            nascimento: nascimento,
            registro: registro,
            especialidade: especialidade,
            instituicao: instituicao,
            senha: senha,
            dataCadastro: new Date().toISOString()
        };
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuarios.find(u => u.nome === nome);
        
        if (usuarioExistente) {
            alert('Já existe um usuário com este nome. Por favor, escolha outro.');
            return;
        }
        
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        
        alert('Cadastro realizado com sucesso!');
        window.location.href = '../psicologia/psicologia.html';
    });
}

// Login
if (document.getElementById('form-login')) {
    const formLogin = document.getElementById('form-login');
    
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome-login').value.trim();
        const senha = document.getElementById('senha-login').value;
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
        
        if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            window.location.href = '../psicologia/psicologia.html';
        } else {
            alert('Nome de usuário ou senha incorretos.');
        }
    });
}

// Função para verificar e redirecionar login
function verificarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('Página atual:', currentPage);
    console.log('Usuário logado:', usuarioLogado);
    
    // Se está na página de login/cadastro E já está logado → vai para psicologia
    if (usuarioLogado && (currentPage === 'login.html' || currentPage === 'cadastro.html')) {
        console.log('Usuário logado tentando acessar login - redirecionando para psicologia');
        window.location.href = '../psicologia/psicologia.html';
        return;
    }
    
    // Se está na página da psicologia E NÃO está logado → vai para login
    if (!usuarioLogado && currentPage === 'psicologia.html') {
        console.log('Usuário não logado tentando acessar psicologia - redirecionando para login');
        window.location.href = '../auth/login.html';
        return;
    }
    
    // Se está na página de responsáveis E NÃO está logado → vai para login
    if (!usuarioLogado && currentPage === 'responsaveis.html') {
        console.log('Usuário não logado tentando acessar responsáveis - redirecionando para login');
        window.location.href = '../auth/login.html';
        return;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    verificarLogin();
});

// Função de logout (para adicionar depois na página da psicologia)
function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '../auth/login.html';
}