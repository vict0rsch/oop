export function toggle(value){
    return {
        type: 'TOGGLE_' + value.toUpperCase()
    }
}

export function toggleSearchBar() {
    return {
        type: 'TOGGLE_SEARCH_BAR'
    };
}

export function toggleIntent() {
    return {
        type: 'TOGGLE_INTENT'
    };
}

export function toggleContact() {
    return {
        type: 'TOGGLE_CONTACT'
    };
}

export function toggleSettings() {
    return {
        type: 'TOGGLE_SETTINGS'
    };
}

export function closeAll(){
    return {
        type: 'CLOSE_ALL'
    };
}