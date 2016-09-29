

$(function(){

    if (localStorage['newProfile']==='true'){
        console.log("new profile");
        $("#create_profile_div").css("display","block")
    }

    $('#create_profile_form').submit(function(e){
        var pseudo = $("#create_pseudo_input").val();
        var email = $("#create_email_input").val();
        $.post({
            url:'https://localhost:8000/medias/test_ajax/',
            data:{
                'pseudo': pseudo,
                'email': email,
            },
            success:function(message){
                var m = JSON.parse(message);
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
                console.log('data downloaded');
                store_data(message)
            }
        }).fail(function(e){
            console.log(e)
        });
        return false;
    });


    // CYTOSCAPE.JS
    $('#graph_form').submit(function(e){
        get_data(function cyto(data){

            var entity_name = $('#entity_name')[0].value;
            var entity = data.entitys.name[entity_name];
            console.log(entity_name);

            if (!entity){
                console.log('error in name');
                $('#validation_span').html('Error').css("color", 'red');
                return false;
            }
            $('#validation_span').html('Ok').css("color", 'green');


            display_cyto(data, entity, "#cyto_container", true)
             
        });
        return false;   
    });



});