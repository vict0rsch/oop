//alert("Hello Zozor !") ;
if (window.localStorage) {
    //console.log('fzefzefez')
    localStorage['bite'] = 2;

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

}