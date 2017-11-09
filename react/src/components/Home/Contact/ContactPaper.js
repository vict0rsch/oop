import React, { Component } from 'react';
import MarkdownPaper from '../MarkdownPaper';

const enMdSource = [
    '**Get in touch**:\n [(Google Form)](https://goo.gl/forms/Zzj9WSmImS7iIKJM2)\n',
    '\n',
    '**Suggest Edit**:\n [(Google Form)](https://goo.gl/forms/xuS5Jl4ufXFQDrIl1)\n',
    '\n',
    '**Github**: [Frontend](https://github.com/vict0rsch/oop) | [Backend](https://github.com/vict0rsch/oop-back) \n',
].join("");

const frMdSource = [
    '**Contactez-nous**:\n [(Google Form)](https://goo.gl/forms/Zzj9WSmImS7iIKJM2)\n',
    '\n',
    '**Suggérer une modification**:\n [(Google Form)](https://goo.gl/forms/xuS5Jl4ufXFQDrIl1)\n',
    '\n',
    '**Github**: [Frontend](https://github.com/vict0rsch/oop) | [Backend](https://github.com/vict0rsch/oop-back) \n',
].join("");

class ContactPaper extends Component {

    

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <MarkdownPaper
                    {...this.props}
                    enMdSource={enMdSource}
                    frMdSource={frMdSource}
                    toggle={this.props.toggleContact}
                />
            </div>
        );
    }
}

export default ContactPaper;