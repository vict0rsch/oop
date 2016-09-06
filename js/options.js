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
                console.log('data downloaded')
                store_data(message)
            }
        }).fail(function(e){
            console.log(e)
        });
        return false;
    });


    // CYTOSCAPE.JS

    get_data(function cyto(data){

        //get_branch_from_media(data, data.entitys[0])

        var share = data.shares.id[2]
        var entitys = get_entitys(data, [share.parent, share.child])
        console.log(entitys)
        var elements = []
        for (ent in entitys){
            elements.push({
                data: entitys[ent]
            })
        }
        console.log(elements)

        elements.push({
            data: {id: share.id, source: share.parent, target: share.child, label:share.share}
        })

        var cy = cytoscape({
            container: $("#cyto_container"),
            elements: elements,
            // elements: [ // list of graph elements to start with
            //     { // node a
            //       data: { id: 1 }
            //     },
            //     { // node b
            //       data: { id: 12 }
            //     },
            //     { // edge ab
            //       data: { id: 'ab', source: 1, target: 12, label:'cool' }
            //     }
            // ],

            style: [ // the stylesheet for the graph
                {
                  selector: 'node',
                  style: {
                    'background-color': '#666',
                    'label': 'data(name)'
                  }
                },

                {
                  selector: 'edge',
                  style: {
                    'width': 6,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'label': 'data(label)'
                  }
                }
              ],

            layout: {
            name: 'grid',
            rows: 1
            }
        });

        console.log('CY')

    });    



});