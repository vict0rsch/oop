if(localStorage['useLocally'] === 'true'|| localStorage['userLoggedIn'] === 'true'){
        window.location.replace('/html/bonjour.html')
    }

$(function(){

    if(localStorage['useLocally'] === 'true'|| localStorage['userLoggedIn'] === 'true'){
        window.location.replace('/html/bonjour.html')
    }

    $('#create_link').click(function(e){
       localStorage['newProfile']=true;
        console.log("login click");
        chrome.tabs.create({url:"/html/options.html"});
    });

    $('#skip_login').click(function(e){
        console.log('skipping login')
        localStorage['useLocally']=true
        chrome.browserAction.setPopup({popup: "/html/bonjour.html"});
    });

});