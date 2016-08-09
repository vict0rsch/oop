$(function(){

    // window.setInterval(function(){
    //     alert('ello pupute');
    //     console.log('jjj')
    // }, 3000)
    console.log('james');

    function get_url_tab(onglet){
        alert(onglet.url + "\n" + localStorage["nbOfTime"]);
        return onglet.url;
    }

    function get_url_window(fenetre){
        chrome.tabs.getSelected(fenetre.id, function(onglet){
            get_url_tab(onglet);
        })
    }

    chrome.windows.getLastFocused(function(fenetre){
        var current_url = get_url_window(fenetre);
    })

    document.addEventListener('visibilitychange', function(){
        alert('change') // change tab text for demo
    })

});