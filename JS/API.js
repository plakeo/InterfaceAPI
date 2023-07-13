$('#Login').on('click', function(e) {
    query1= $("#username").val();
    query2= $("#password").val();
    query = {
        'username': query1,
        'password': query2
    }
    var formData = new FormData();
    formData.append('username',query1);
    formData.append('password',query2);
    $.ajax({
        method: "POST",
        url: "https://livraria-app.herokuapp.com/api/token/",
        data: formData,
        enctype: 'multipart/form-data',
        function(result) {
             console.log(result);
       },
    //     error: function ajaxError(jqXHR) {
    //         console.error('Error: ', jqXHR.responseText);
    //     }
         
   }
)
})