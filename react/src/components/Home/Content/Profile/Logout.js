import React, { Component } from 'react';
import Icon from 'react-icons/lib/fa/plane';
import Button from 'material-ui/Button';
import Axios from 'axios';

export default class Logout extends Component {

    handleClick = (event) => {
        Axios.post(
            "http://localhost:5000/auth/logout",
            { logout: true },
            {
                headers: {
                    Authorization: "Bearer " + localStorage['_jwt']
                }
            }
        ).then(
            (resp) => {
                console.log(resp);
                if (resp.data) {
                    if (resp.data.status === 'success') {
                        console.log('ok');
                        this.props.logOut();
                    }
                }
            },
            (err) => {
                console.log(err)
                this.props.logOut();
            }
            )
    }

    render() {
        return (
            <div>
                <Button color='accent' onClick={this.handleClick}>
                   Logout &nbsp; <Icon />
                </Button>
            </div>
        )
    }
}
