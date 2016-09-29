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
    var nbOfTime = localStorage['nbOfTime'];
    nbOfTime = parseInt(nbOfTime[nbOfTime.length - 1]);
    var terminaison = "th";
    if (nbOfTime == 1) {
        terminaison = "st"
    } else if (nbOfTime == 2) {
        terminaison = "nd"
    } else if (nbOfTime == 3) {
        terminaison = "rd"
    }

    document.getElementById('nbOfTime').textContent = localStorage['nbOfTime'] + terminaison;



    $("#go_to_options").click(function(){
        console.log("test click");
        chrome.tabs.create({url:"/html/options.html"});
    });

    get_data(function popup(data){
        var entity = check_website(data, localStorage['currentTabUrl']);
        if (entity){
            // the website is known

            $('#popup_buttons').css('display', 'block');
            
            $('#popup_cyto').css('width', '100%').css('height', '80%').css('z-index', '999')
                .css('border', '1px black');
            $("#website_div").html("I see you like " + entity.name + ' (' + localStorage['current_'+entity.name] +')');
            var entity_name = entity.name;
            var entity = data.entitys.name[entity_name];
            console.log(entity_name);

            
            
            display_cyto(data, entity, "#popup_cyto", true);

            $('#popup_zoom').click(function(){
                var size = parseInt(localStorage['popup_size']) + 25;
                localStorage['popup_size'] = size;
                var history = JSON.parse(sessionStorage['history']);
                var name = history[history.length - 1];
                console.log(name);
                display_cyto(data, data.entitys.name[name], "#popup_cyto", true);
                if(size >= 800) {
                    $('#popup_zoom').prop( "disabled", true )
                }
                if(size >= 275) {
                    $('#popup_reduce').prop( "disabled", false )
                }
            });

            $('#popup_reduce').click(function(){
                var size = parseInt(localStorage['popup_size']) - 25;
                localStorage['popup_size'] = size;
                var history = JSON.parse(sessionStorage['history']);
                var name = history[history.length - 1];
                display_cyto(data, data.entitys.name[name], "#popup_cyto", true);
                if(size <= 775){
                    $('#popup_zoom').prop( "disabled", false )
                }
                if(size <= 250) {
                    $('#popup_reduce').prop( "disabled", true )
                }
            });

            $('#popup_reset').click(function(){
                localStorage['popup_size'] = 500;
                $('#popup_zoom').prop( "disabled", false );
                $('#popup_reduce').prop( "disabled", false );
                var history = JSON.parse(sessionStorage['history']);
                var name = history[history.length - 1];
                display_cyto(data, data.entitys.name[name], "#popup_cyto", true)
            })
        }
    })
    



});

