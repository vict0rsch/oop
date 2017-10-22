import Axios from 'axios';
import { getJSON } from 'jquery';
import JSONdata from '../static/data.min.json';
console.log(JSONdata);

// Use local json data or fetch from server
var USE_LOCAL = true;

function fetchData(component) {
    console.log('fetching data...')
    // element is the react component

    // whether or not to go fetch the data
    let fetch = false;

    let data;

    if (localStorage.data) {
        try {
            console.log('Loading local data');
            data = JSON.parse(localStorage.data);
            component.props.setData(data);
            component.props.makeDataAvailable();
        } catch (e) {
            console.log('Error loading local data; fetching new version...');
            fetch = true;
        }
    } else {
        fetch = true;
    }

    if (fetch && USE_LOCAL) {
        Axios.get('./data.min.json').then(
            (response) => {
                console.log('GET SUCCESSFUL!', response);
                data = response.data;
                component.props.setData(data);
                component.props.makeDataAvailable();
                localStorage.data = JSON.stringify(data);
            },
            (error) => {
                console.log('Server Error');
                console.log(error);
                getJSON("/data.min.json", function (data, status, xhr) {
                    console.log('JSON DATA:')
                    console.log(data)
                    component.props.setData(data);
                    component.props.makeDataAvailable();
                    localStorage.data = JSON.stringify(data);
                }).fail(function (e) {
                    console.log('Error getting data from local JSON and Server ; ABORT');
                    console.log(e);
                    component.props.setData(JSONdata);
                    component.props.makeDataAvailable();
                    localStorage.data = JSON.stringify(JSONdata);
                });
            }).catch(
            (error) => {
                console.log('Error parsing JSON');
                console.log(error);
            });
    }
}

export default fetchData;