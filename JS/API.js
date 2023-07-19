$('form').on('submit', function(e) {
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
        },
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }   
   }
)
})  
