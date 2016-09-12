

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
    $('#graph_button').click(function(e){
        get_data(function cyto(data){

            var entity_name = $('#entity_name')[0].value
            var entity = data.entitys.name[entity_name]
            console.log(entity_name)

            if (!entity){
                console.log('error in name');
                $('#validation_span').html('Error').css("color", 'red')
                return false;
            }
            $('#validation_span').html('Ok').css("color", 'green')


            var cyto_data = get_cyto_data(data, entity)
            var elements = cyto_data.nodes.concat(cyto_data.edges)
            console.log(elements)
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
                      selector: 'node[category = "c"]',
                      style: {
                        'background-color': '#F5A45D',
                        'label': 'data(name)',
                        'shape': 'octagon',
                        'font-weight': 100,
                        'width': 'data(width)',
                        'text-valign': "center",
                      }
                    },

                    {
                      selector: 'node[category = "m"]',
                      style: {
                        'background-color': '#75f075',
                        'label': 'data(name)',
                        'font-weight': 'bolder',
                        'text-valign': 'bottom',
                        'shape': 'rectangle',
                        'height': '5px',
                        'width': 'data(width)',
                        'text-margin-y': '4px',
                      }
                    },

                    {
                      selector: 'node[category = "i"]',
                      style: {
                        'background-color': 'black',
                        'label': 'data(name)',
                        'shape': 'rectangle',
                        'width': 'data(width)',
                        'height': '5px',
                        'font-weight': 'bolder',
                      }
                    },

                    {
                      selector: 'node[category = "s"]',
                      style: {
                        'background-color': '#cccccc',
                        'label': 'data(name)',
                        'shape': 'rectangle',
                        'width': '80px',
                        'color': 'white',
                        'font-weight': 150,
                        'text-valign': "center",
                        'text-outline-width': 2,
                        'text-outline-color': '#888',
                        'border-width' : 0,
                        'border-color': '#8c8c8c'
                      }
                    },

                    {
                        selector: 'edge',
                        style: {
                            'width': 10,
                            'target-arrow-shape': 'triangle',
                            'line-color': '#9dbaea',
                            'target-arrow-color': '#9dbaea',
                            'curve-style': 'bezier',
                            'label' : 'data(label)'
                        }
                    }
                  ],

                layout: {
                name: 'breadthfirst',
                directed: true,
                spacingFactor: 1,
                }
            });

            console.log('CY')

        });    
    });



});