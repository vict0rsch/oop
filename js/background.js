$(function(){
    localStorage["newProfile"]=false;
    console.log('Running Background JS');

    chrome.tabs.onUpdated.addListener(function(tab) {
        var tabId = tab
        console.log("updated")
        if (!isNaN(tabId)) {
            chrome.tabs.query({active: true, lastFocusedWindow: true},
                function(array_of_tabs) {
                    var tab = array_of_tabs[0];
                    if (tab){
                        log_tab(tab, 'u')
                        count_tabs()
                    }
                }); 
            
        };
    });

    chrome.tabs.onHighlighted.addListener(function(tab) {
        var tabId = tab.tabIds[0]
        if (!isNaN(tabId)) {
            chrome.tabs.get(tabId, function(onglet){
                log_tab(onglet, 'h')
                count_tabs()
            });
        };
    });

    chrome.tabs.onRemoved.addListener(function(tab){
        count_tabs()
        if (localStorage['numberTabsOpen'] === "0"){
            localStorage['currentTabUrl'] = ""
            localStorage['currentTabTitle'] = ""
        }
    });




});