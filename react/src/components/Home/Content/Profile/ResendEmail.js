import React, { Component } from 'react'
import Icon from 'react-icons/lib/fa/fighter-jet';
import Button from 'material-ui/Button';
import Axios from 'axios';

const buttonStyle = {
    width: '50px',
    minWidth: '20px'
};


export default class ResendEmail extends Component {

    handleClick = (event) => {
        Axios.post(
            "http://localhost:5000/auth/resend_email",
            { resend: true },
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
                    }
                }
            },
            (err) => {
                console.log(err)
            }
            )
    }

    render() {
        return (
            <div>
                Confirm you account by clicking on the link in the email we sent you.
                <br /><br />
                Email not received? Check your spams! Otherwise, resend a confirmation email here
                <Button onClick={this.handleClick} style={buttonStyle}>
                    <Icon />
                </Button>
            </div>
        )
    }
}
