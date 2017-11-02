import Axios from 'axios';
import { getJSON } from 'jquery';
import JSONdata from '../static/data.min.json';
import {formatData} from './formatData';

// Use local json data or fetch from server
var USE_LOCAL_ONLY = true;

function fetchData(component) {
    console.log('Fetching data...');
    // element is the react component

    // whether or not to go fetch the data
    let fetch = false;

    let data;

    if (localStorage.data) {
        try {
            console.log('Loading localStorage data');
            data = JSON.parse(localStorage.data);
            component.props.setData(data);
            component.props.makeDataAvailable();
        } catch (e) {
            console.log('Error loading localStorage data; getting new version...');
            fetch = true;
        }
    } else {
        fetch = true;
    }

    console.log(fetch && USE_LOCAL_ONLY);

    if (fetch && USE_LOCAL_ONLY) {
        console.log('Getting data (Axios)...');
        Axios.get('http://oop-pro.herokuapp.com/data/').then(
            (response) => {
                console.log('Success.');
                data = formatData(response.data);
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