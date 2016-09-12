//alert("Hello Zozor !") ;
$(function(){

    if ("nbOfTime" in localStorage) {
        localStorage['nbOfTime'] = parseInt(localStorage['nbOfTime']) + 1;
        console.log('aaaa')
    }
    else {
        localStorage['nbOfTime'] = 1;
        console.log('bbb')
    }
    var nbOfTime = localStorage['nbOfTime']
    nbOfTime = parseInt(nbOfTime[nbOfTime.length - 1])
    var terminaison = "th"
    if (nbOfTime == 1) {
        terminaison = "st"
    } else if (nbOfTime == 2) {
        terminaison = "nd"
    } else if (nbOfTime == 3) {
        terminaison = "rd"
    }

    document.getElementById('nbOfTime').textContent = localStorage['nbOfTime'] + terminaison



    $("#go_to_options").click(function(){
        console.log("test click");
        chrome.tabs.create({url:"/html/options.html"});
    });

    get_data(function popup(data){
        var entity = check_website(data, localStorage['currentTabUrl'])
        if (entity){
            // the website is known
            $("body").css('width', '500px').css('height', '500px')
            $('#popup_cyto').css('width', '100%').css('height', '80%').css('z-index', '999')
                .css('border', '1px black')
            $("#website_div").html("I see you like " + entity.name + ' (' + localStorage['current_'+entity.name] +')')
            var entity_name = entity.name
            var entity = data.entitys.name[entity_name]
            console.log(entity_name)

            
            var cyto_data = get_cyto_data(data, entity)
            var elements = cyto_data.nodes.concat(cyto_data.edges)
            console.log(elements)
            var cy = cytoscape({
                container: $("#popup_cyto"),
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
        }
    })
    



});

