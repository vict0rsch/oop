import Axios from 'axios';
import { getJSON } from 'jquery';
import JSONdata from '../static/data.min.json';
import {formatData} from './formatData';

// Use local json data or fetch from server
var USE_LOCAL_ONLY = true;

function fetchData(component) {
    // console.log('Fetching data...');
    // element is the react component

    // whether or not to go fetch the data
    let fetch = false;

    let data;

    if (localStorage.data) {
        try {
            // console.log('Loading localStorage data');
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

    if (fetch && USE_LOCAL_ONLY) {
        console.log('Getting data (Axios)...');
        Axios.get('http://oop-pro.herokuapp.com/data/').then(
            (response) => {
                console.log('Success (getting data)');
                data = formatData(response.data);
                component.props.setData(data);
                component.props.makeDataAvailable();
                localStorage.data = JSON.stringify(data);
            },
            (error) => {
                console.log('Server Error  (getting data)');
                console.log(error);
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting data)');
                console.log(error);
            });
    }
}

export default fetchData;