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

    function get_indices(haystack, needle){
        var returns = [];
        var position = 0;
        while(haystack.indexOf(needle, position) > -1){
            var index = haystack.indexOf(needle, position);
            returns.push(index);
            position = index + needle.length;
        }
        return returns;
    }


    function get_domain(url){
        var new_url = url.split('/')[0]
        if (url.substring(0,4) === "http"){
            new_url = url.split('/')[2]
            if (new_url.indexOf('www') >= 0){
                new_url = new_url.substring(4, new_url.length)
            }
        }

        // if (get_indices(new_url, '.').length > 1){
        //     new_url = new_url.
        // }

        return new_url
    }

    function log_tab(onglet){
        localStorage['currentTabUrl'] = onglet.url
        localStorage['currentTabTitle'] = onglet.title
        localStorage['currentTabDomain'] = get_domain(onglet.url)
        localStorage['currentTabIsComplete'] = onglet.status === "complete"
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