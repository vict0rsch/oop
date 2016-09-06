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
            $("#website_div").html("I see you like " + entity.name + ' (' + localStorage['current_'+entity.name] +')')
        }
    })
    

});

