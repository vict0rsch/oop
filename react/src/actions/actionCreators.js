
export function setData(data) {
  return {
    type: 'SET_DATA',
    data,
  };
}

export function makeDataAvailable() {
  return {
    type: 'MAKE_DATA_AVAILABLE',
  };
}

export function displayEntity(entityId) {
  return {
    type: 'DISPLAY_ENTITY_GRAPH',
    entityId,
  };
}

export function updateEntityInfoBox(entityId) {
  return {
    type: 'UPDATE_ENTITY_INFOBOX',
    entityId: parseInt(entityId, 10),
  };
}

export function updateShareInfoBox(share) {
  return {
    type: 'UPDATE_SHARE_INFOBOX',
    share,
  };
}

export function toggleSearchBar(){
  return {
    type: 'TOGGLE_SEARCH_BAR'
  };
}

export function toggleIntent(){
  return {
    type: 'TOGGLE_INTENT'
  };
}

export function toggleContact(){
  return {
    type: 'TOGGLE_CONTACT'
  };
}

export function toggleSettings(){
  return {
    type: 'TOGGLE_SETTINGS'
  };
}

export function setLanguage(language){
  return {
    type: 'SET_LANGUAGE',
    language
  };
}
