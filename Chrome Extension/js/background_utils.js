function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function get_data(next) {
    var data;
    while(!data){
        data = JSON.parse(localStorage.getItem('data'));
        if (!data){
            sleep(1000);
        }
    }
    next(data);
}

function check_website(data, url) {
    var e;
    for (var entity in data.entities.ids) {
        e = data.entities.ids[entity];
        if (e.website) {
            var website = parse_url(e.website);
            if (url.indexOf(website) !== -1) {
                console.log('Found ' + website + ' in ' + url + ' leading to entity : ' + e.name);
                return e
            }
        }
    }
    return false
}


function count_tabs() {
    localStorage['numberTabsOpen'] = 0;
    window.chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                localStorage['numberTabsOpen'] = parseInt(localStorage['numberTabsOpen']) + 1
            });
        });
    });
}

function log_tab(onglet) {
    localStorage['currentTabUrl'] = onglet.url;
    localStorage['currentTabTitle'] = onglet.title;
    localStorage['currentTabDomain'] = parse_url(onglet.url);
    localStorage['currentTabIsComplete'] = onglet.status === "complete";

    notifyMe()
}


function notification(entity) {
    var content = "";
    content = content + entity.name;
    var notification = new Notification(
        'Notification title', {
            icon: 'http://www.monde-diplomatique.fr/IMG/png/ppa-1-4.png',
            body: content,
            //console.log(notification)
            // notification.onclick = function () {
            //   window.open("http://stackoverflow.com/a/13328397/1269037");      
            // };
        }
    );
}


function notifyMe() {

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        // browser allows notifications
        get_data(function (data) {

            var entity = check_website(data, localStorage['currentTabUrl']);

            var current_name = 'current_' + entity.name;
            var current_session = sessionStorage[current_name];
            var current_local = localStorage[current_name];


            if (entity) {
                // the website is known

                if (current_session && current_local) {
                    sessionStorage[current_name] = parseInt(current_session) + 1;
                    localStorage[current_name] = parseInt(current_local) + 1
                }
                else if (current_session && !current_local) {
                    sessionStorage[current_name] = parseInt(current_session) + 1;
                    localStorage[current_name] = sessionStorage[current_name]
                }
                else if (!current_session && current_local) {
                    sessionStorage[current_name] = 1;
                    localStorage[current_name] = parseInt(current_local) + 1;
                    notification(entity)
                }
                else if (!current_session && !current_local) {
                    sessionStorage['current_' + entity.name] = 1;
                    localStorage['current_' + entity.name] = 1;
                    notification(entity)
                }
            }


        })
    }
}


function parse_url(url) {
    var parser = document.createElement('a');
    parser.href = url;
    var new_url = parser.hostname;
    if (new_url.indexOf("www.") === 0) {
        new_url = new_url.substring(4, new_url.length)
    }
    return new_url
}
