$(function(){

    $('#create_link').click(function(e){
       localStorage['newProfile']=true;
        console.log("login click");
        chrome.tabs.create({url:"options.html"});
    });


});