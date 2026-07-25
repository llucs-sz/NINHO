    // Validação de senha
    document.querySelector('.cadastro-form').addEventListener('submit', function(e) {
      const senha = document.getElementById('senha').value;
      const confirmarSenha = document.getElementById('confirmar-senha').value;
     
      if (senha !== confirmarSenha) {
        e.preventDefault();
        alert('As senhas não coincidem. Por favor, verifique.');
        return false;
      }
     
      if (senha.length < 6) {
        e.preventDefault();
        alert('A senha deve ter pelo menos 6 caracteres.');
        return false;
      }
     
      alert('Cadastro enviado com sucesso! Em breve entraremos em contato.');
    });


    // Formatação do telefone
    document.getElementById('telefone').addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.substring(0, 11);
     
      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})/, '($1');
      }
     
      e.target.value = value;
    });
