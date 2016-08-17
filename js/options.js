$(function(){

    if (localStorage['newProfile']==='true'){
        console.log("new profile")
        $("#create_profile_div").css("display","block")
    }

    $('#create_profile_form').submit(function(e){
        var pseudo = $("#create_pseudo_input").val()
        var email = $("#create_email_input").val()
        console.log(pseudo)
        $.post({
            url:'https://localhost:8000/medias/test_ajax/',
            data:{
                'pseudo': pseudo,
                'email': email,
            },
            success:function(message){
                alert(message)
            }
        }).fail(function(){
            alert('ERROR')
        });
        return false;
    });


});