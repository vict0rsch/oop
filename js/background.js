$(function(){

    // window.setInterval(function(){
    //     alert('ello pupute');
    //     console.log('jjj')
    // }, 3000)
    console.log('james');

    //listen for new tab to be activated
    // chrome.tabs.onActivated.addListener(function(tab) {
    //     var tabId = parseInt(tab.tabId)
    //     console.log("activated")
    //     if (!isNaN(tabId)){
    //         console.log(tabId);
    //         chrome.tabs.get(tabId, function(onglet){
    //             console.log(onglet.url);
    //             localStorage['currentTab'] = onglet.url
    //         });
    //     };
    // });

    //listen for current tab to be changed
    chrome.tabs.onUpdated.addListener(function(tab) {
        var tabId = tab
        console.log("updated")
        if (!isNaN(tabId)) {
            console.log(tabId);
            chrome.tabs.get(tabId, function(onglet){
                console.log(onglet.url);
                localStorage['currentTab'] = onglet.url
            });
        };
    });

    chrome.tabs.onHighlighted.addListener(function(tab) {
        var tabId = tab.tabIds[0]
        console.log("highlighted")
        if (!isNaN(tabId)) {
            console.log(tabId);
            chrome.tabs.get(tabId, function(onglet){
                console.log(onglet.url);
                localStorage['currentTab'] = onglet.url
            });
        };
    });

    // listen for new tab created
    // chrome.tabs.onCreated.addListener(function(tab){
    //     var tabId = parseInt(tab.tabId)
    //     console.log('created')
    //     console.log(tabId)
    //     if (!isNaN(tabId)) {
    //         console.log(tabId);
    //         chrome.tabs.get(tabId, function(onglet){
    //             console.log(onglet.url);
    //         });
    //     };
    //     console.log('end created')
    // });

});