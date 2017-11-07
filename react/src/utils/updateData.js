import Axios from 'axios';
import { getJSON } from 'jquery';
import JSONdata from '../static/data.min.json';
import {formatData} from './formatData';

// Use local json data or fetch from server
var USE_LOCAL_ONLY = true;

function updateData(component) {
    console.log('Looking for Update...');
    // element is the react component

    Axios.get('http://oop-pro.herokuapp.com/dbVersion/').then(
        (response) => {
            console.log('Success (getting dbVersion)');
            const dbVersion = response.data.dbVersion;
            if (dbVersion && dbVersion !== component.props.data.dbVersion){
                Axios.get('http://oop-pro.herokuapp.com/data/').then(
                    (response) => {
                        console.log('Success (updating data)');
                        if (dbVersion && dbVersion !== component.props.data.dbVersion){
                            data = formatData(response.data);
                            data.dbVersion = dbVersion;
                            component.props.setData(data);
                            component.props.makeDataAvailable();
                            localStorage.data = JSON.stringify(data);
                        }
                    },
                    (error) => {
                        console.log('Server Error (updating data)');
                        console.log(error);
                        
                    }).catch(
                    (error) => {
                        console.log('Catching JS Error (updating data)');
                        console.log(error);
                    });
            }
            
        },
        (error) => {
            console.log('Server Error (getting dbVersion)');
            console.log(error);
            
        }).catch(
        (error) => {
            console.log('Catching JS Error (getting dbVersion)');
            console.log(error);
        });
}

export default updateData;