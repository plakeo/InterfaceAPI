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
             guardafunc(result);
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

}

})


$("#Teste").on("click", function(e){

    token = window.localStorage.getItem("json_data")
    teste = token.toString();
    $.ajax({
        method: "GET",
        url: "https://livraria-app.herokuapp.com/api/livros/",
        contentType: "application/json",
        Authorization : "bearer " + teste,
        
        success: function(result) {
             console.log(result);
        },
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }   
   })  

})



