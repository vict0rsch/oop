$(function(){

    if (localStorage['newProfile']==='true'){
        console.log("new profile")
        $("#create_profile_div").css("display","block")
    }

    $('#create_profile_form').submit(function(e){
        var pseudo = $("#create_pseudo_input").val()
        var email = $("#create_email_input").val()
        $.post({
            url:'https://localhost:8000/medias/test_ajax/',
            data:{
                'pseudo': pseudo,
                'email': email,
            },
            success:function(message){
                m = JSON.parse(message)
                console.log(m)
            }
        }).fail(function(e){
            console.log(e)
        });
        return false;
    });

    $('#get_data_button').click(function(e){
        $.post({
            url:'https://localhost:8000/medias/get_data/',
            success:function(message){
                console.log(message['shares'])
            }
        }).fail(function(e){
            console.log(e)
        });
        return false;
    });


});