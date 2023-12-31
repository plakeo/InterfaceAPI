$('#login').on('submit', function(e) {
    e.preventDefault();

    const query1= $("#username").val();
    const query2= $("#password").val();
    const query = {
        'username': query1,
        'password': query2
    }

    $.ajax({
        method: "POST",
        url: "https://livraria-app.herokuapp.com/api/token/",
        contentType: "application/json",
        data: JSON.stringify(query),
        success: function(result) {
             console.log(result);
             guardainfo(result);
             window.location.href ="página1.html";
        },
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }   
   })  
   function guardainfo(result){
    const jsonString =  a = (result['access']);
    localStorage.clear();
    window.localStorage.setItem("json_data", jsonString);
    window.localStorage.setItem("busca",null);
}

})


$("#Teste").on("click", function(e){

    token = window.localStorage.getItem("json_data")
    teste = token.toString();
    console.log(teste)
    $.ajax({
        type: "GET",
        url: "https://livraria-app.herokuapp.com/api/livros/?search=ma",
        headers:{
            "Authorization" : "Bearer " + teste},
        success: function(result) {
             console.log(result);
        },
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }   
   })  

})

function comecabusca(){
    const pesquisa = $("#abusca").val();
    if ($("#Editoras").prop("checked") || $("#Autores").prop("checked") || $("#Categorias").prop("checked")) {
        if ($("#Editoras").prop("checked")) {
            $("#tabela-editoras tbody").empty();
        }
        if ($("#Autores").prop("checked")) { 
            $("#tabela-autores tbody").empty();
        }
        if ($("#Categorais").prop("checked")) {
            $("#tabela-categorias tbody").empty();
        }
        window.localStorage.setItem("busca",pesquisa);
        construirTabela();
        console.log(pesquisa);

    } 
    else {
        window.localStorage.setItem("busca",null);
        construirTabela()
}}

function construirTabela() {
    if ($("#Editoras").prop("checked")) {
        construirTabelaEditoras();} 
    else {
    $("#tabela-editoras tbody").empty();}
    if ($("#Autores").prop("checked")) {
        construirTabelaAutores();} 
    else {
    $("#tabela-autores tbody").empty();}
    if ($("#Categorias").prop("checked")) {
        construirTabelaCategorias();} 
    else {
    $("#tabela-categorias tbody").empty();}
}
function construirTabelaEditoras() {
    
    var busca = window.localStorage.getItem("busca");
    if(busca == null) {
    var apiUrl = "https://livraria-app.herokuapp.com/api/editoras/" ;
    }
    else{
    var apiUrl = "https://livraria-app.herokuapp.com/api/editoras/?search="+ busca;
    }
    var token = window.localStorage.getItem("json_data");
    $.ajax({
      url: apiUrl,
      type: "GET",
      headers: {
        "Authorization": "Bearer " + token
      },
      success: function(data) {
        $("#tabela-editoras tbody").empty();
        data.forEach(function(editora) {
          var row =
            " <tr>"+
            "<th>ID</th>"+
            "<th>Nome da Editora</th>"+
            "<th>Site</th>"+
            "</tr>"+
            "<tr>" +
            "<td>" + editora.id + "</td>" +
            "<td>" + editora.nome + "</td>" +
            "<td><a href=" + editora.site + "> Clique aqui para acessar</a></td>" +
            "</tr>";
        
          $("#tabela-editoras tbody").append(row);
        });
      },
      error: function(error) {
        console.log("Erro na requisição:", error);
      }
    });
    
    
}
  
function construirTabelaAutores() {
  var busca = window.localStorage.getItem("busca");
  if(busca == null) {
  var apiUrl = "https://livraria-app.herokuapp.com/api/autores/" ;
  }
  else{
  var apiUrl = "https://livraria-app.herokuapp.com/api/autores/?search="+ busca;
  }
  var token = window.localStorage.getItem("json_data");

  $.ajax({
    url: apiUrl,
    type: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(data) {
      $("#tabela-autores tbody").empty();

      // Preenche a tabela com os dados do JSON
      data.forEach(function(autor) {
        var row = 
            "<tr>"+
            "<th> ID </th>" +
            "<th> Nome </th>" +
            "<tr>" +
            "<td>" + autor.id + "</td>" +
            "<td>" + autor.nome + "</td>" +
            "</tr>";
        $("#tabela-autores tbody").append(row);
      });
    },
    error: function(error) {
      console.log("Erro na requisição:", error);
    }
  });
}
function construirTabelaCategorias() {
    var busca = window.localStorage.getItem("busca");
    if(busca == null) {
    var apiUrl = "https://livraria-app.herokuapp.com/api/categorias/" ;
    }
    else{
    var apiUrl = "https://livraria-app.herokuapp.com/api/categorias/?search="+ busca;
    }
  var token = window.localStorage.getItem("json_data");
  $.ajax({
    url: apiUrl,
    type: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(data) {
      $("#tabela-categorias tbody").empty();
      data.forEach(function(categoria) {
        var row = 
        "<tr>"+
        "<th> ID </th>"+
        "<th> Descrição </th>"+
        "</tr>"+
            "<tr>" +
            "<td>" + categoria.id + "</td>" +
            "<td>" + categoria.descricao + "</td>" +
            "</tr>";
        $("#tabela-categorias tbody").append(row);
      });
    },
    error: function(error) {
      console.log("Erro na requisição:", error);
    }
  });
}
function enviarDados() {
    const titulo = $('input[name="Titulo"]').val();
    const ISBN = $('input[name="ISBN"]').val();
    const quantidade = $('input[name="Quantidade"]').val();
    const preco = $('input[name="Preço"]').val();
    const categoria = $('input[name="Categoria"]').val();
    const editora = $('input[name="Editora"]').val();
    const autoresInput = $('#autoresTextarea').val();
    const autores = autoresInput.split(',').map(author => author.trim());
    const data = {
        "titulo": titulo,
        "ISBN": ISBN,
        "quantidade": quantidade,
        "preco": preco,
        "categoria": categoria,
        "editora": editora,
        "autores": autores
    };
    const token = window.localStorage.getItem("json_data")
    $.ajax({
        type: 'POST',
        url: 'https://livraria-app.herokuapp.com/api/livros/',
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (response) {
            console.log(response);
            window.location.href ="página1.html";
        },
        error: function(error) {
          console.log(error);
        }
    });
}
function DESGRAÇADETABLE() {
  const token = window.localStorage.getItem("json_data")
  $.ajax({
    url: "https://livraria-app.herokuapp.com/api/livros/",
    type: "GET",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(data) {
      faztable(data);
    },
    error: function(error) {
      console.error("Erro ao obter os dados:", error);
    }
  });
}
function editalivro() {
  const token = window.localStorage.getItem("json_data")
  const id = $('input[name="ID"]').val();
  const titulo = $('input[name="Titulo"]').val() || null;
  const ISBN = $('input[name="ISBN"]').val() || null;
  const quantidade = $('input[name="Quantidade"]').val() || null;
  const preco = $('input[name="Preço"]').val() || null;
  const categoria = $('input[name="Categoria"]').val() || null;
  const editora = $('input[name="Editora"]').val() || null;
  const autoresInput = $('#autoresTextarea').val() || null;
  let autores = null;
  if (autoresInput !== null) {
    autores = autoresInput.split(',').map(author => author.trim());
  }
  const data = {
      "titulo": titulo,
      "ISBN": ISBN,
      "quantidade": quantidade,
      "preco": preco,
      "categoria": categoria,
      "editora": editora,
      "autores": autores
  };
  if(titulo == null||ISBN == null||quantidade == null||preco==null||categoria==null||editora==null||autores==null){
    for (const key in data) {
      if (data[key] === null) {
          delete data[key];
      }
    }
    $.ajax({
      url: "https://livraria-app.herokuapp.com/api/livros/"+id+"/",
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(data),
      headers: {
        "Authorization": "Bearer " + token
      },
      success: function (response) {
        console.log(response);
        window.location.href ="página1.html";
    },error: function(error) {
      console.log(error);
    }
    });
  }
  else{
    $.ajax({
      url: "https://livraria-app.herokuapp.com/api/livros/"+id+"/",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      headers: {
        "Authorization": "Bearer " + token
      },
      success: function (response) {
        console.log(response);
        window.location.href ="página1.html";
    },error: function(error) {
      console.log(error);
    }
    });
  }
}
function faztable(data) {
  const tabe = $("#tabelivro");
  tabe.empty();

  data.forEach(function(livro) {
    var row = 
    "<tr>"+
    "<th> ID </th>"+
    "<th> Titulo </th>"+
    "<th> ISBN </th>"+
    "<th> Quantidade </th>"+
    "<th> Preço </th>"+
    "<th> Categoria </th>"+
    "<th> Editora </th>"+
    "<th> Autores </th>"+
    "</tr>"+
        "<tr>" +
        "<td>" + livro.id + "</td>" +
        "<td>" + livro.titulo + "</td>" +
        "<td>" + livro.ISBN + "</td>" +
        "<td>" + livro.quantidade + "</td>" +
        "<td>" + livro.preco + "</td>" +
        "<td>" + livro.categoria["nome"] + "</td>" +
        "<td>" + livro.editora["nome"] + "</td>" +
        "<td>" + livro.autores[0]["nome"] + "</td>" +
        "</tr>";
    $(tabe).append(row);
  });
}
function removeDados() {
  const id = $('input[name="ID"]').val();
  const token = window.localStorage.getItem("json_data")
  $.ajax({
      type: 'DELETE',
      url: "https://livraria-app.herokuapp.com/api/livros/"+id+"/",
      contentType: 'application/json',
      headers: {
          "Authorization": "Bearer " + token
      },
      success: function (response) {
          console.log(response);
          window.location.href ="página1.html";
      },
      error: function(error) {
        console.log(error);
      }
  });
}