$(function(){

    console.log('Running Background JS');

    function count_tabs() {
        localStorage['numberTabsOpen'] = 0 
        chrome.windows.getAll({populate:true},function(windows){
            windows.forEach(function(window){
                window.tabs.forEach(function(tab){
                    localStorage['numberTabsOpen'] = parseInt(localStorage['numberTabsOpen']) + 1
                });
            });
        });  
    }

    function get_domain(url){
        var new_url = url
        if (url.substring(0,4) === "http"){
            new_url = new_url.split('.')[1]
        } else {
            new_url = new_url.split('.')[0]
        }

        return new_url
    }

    function log_tab(onglet){
        localStorage['currentTabUrl'] = onglet.url
        localStorage['currentTabTitle'] = onglet.title
        localStorage['currentTabDmain'] = get_domain(onglet.url)
    }

    chrome.tabs.onUpdated.addListener(function(tab) {
        var tabId = tab
        console.log("updated")
        if (!isNaN(tabId)) {
            console.log(tabId);
            chrome.tabs.query({active: true, lastFocusedWindow: true},
                function(array_of_tabs) {
                    var tab = array_of_tabs[0];
                    console.log(tab)
                    if (tab){
                        log_tab(tab)
                        count_tabs()
                    }
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
                log_tab(onglet)
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