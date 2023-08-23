  //menu sanduiche

  function clickMenu() {
    var itens = document.getElementById('itens');
    if (itens.style.display == 'block') {
      itens.style.display = 'none';
    } else {
      itens.style.display = 'block';
    }
  }
  
  //login 

  function logar() {
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;
  
    if (usuario.includes('@') && senha.length > 4) {
      window.alert('Você realizou o login com sucesso.');
    } else {
      window.alert('Tente informar um email correto ou informar uma senha com no mínimo 5 dígitos.');
    }
  }
  