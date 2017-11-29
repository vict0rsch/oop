import Axios from 'axios';
import formatData from './formatData';
import formatUpdateData from './formatUpdateData';

function updateData(component) {
    // When updating this function, be sure to update its background counterpart

    var ts2 = Math.round((new Date()).getTime() / 1000);
    // element is the react component
    if (localStorage.dataTime) {
        var ts = parseInt(localStorage.dataTime, 10);
        var checkEvery = 20;//3600 * 24; // 1 day
    }
    if ((!localStorage.dataTime || ts2 - ts > checkEvery) && localStorage.fetchingData !== 'true') {
        console.log('Looking for DB Update... (App)');
        // if (localStorage.updateFromLocal && localStorage.updateFromLocal === 'true') {
        //     const data = formatData(JSON.parse(localStorage.data));
        //     component.props.setData(data);
        //     component.props.makeDataAvailable();
        //     localStorage.dataTime = Math.round((new Date()).getTime() / 1000) + '';
        //     localStorage.updateFromLocal = 'false';
        // } else {
        Axios.get('https://oop-pro.herokuapp.com/update/' + 1511890466).then(
            (response) => {
                console.log('Success (updating data app)');
                const updatedServerData = formatUpdateData(component.props.data, response.data);
                const updatedData = formatData(updatedServerData);
                component.props.setData(updatedData);
                component.props.makeDataAvailable();
                localStorage.data = JSON.stringify(updatedData);
                localStorage.dataTime = Math.round((new Date()).getTime() / 1000);
            },
            (error) => {
                console.log('Server Error (updating data app)');
                console.log(error);

            }).catch(
            (error) => {
                console.log('Catching JS Error (updating data app)');
                console.log(error);
            });
        // }
    }
}

export default updateData;