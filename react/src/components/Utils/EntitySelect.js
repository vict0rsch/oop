import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue || ''
        }
    }
    

    logChange = (val) => {
        this.setState({
            value: val
        });
        if (val && val.id) {
            if (this.props.data.idSet.indexOf(parseInt(val.id, 10)) > -1) {
                this.props.onChange(val)
            }
        }
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.clear > this.props.clear){
            this.setState({
                value:''
            })
        }
    }
    

    render() {

        const {autofocus, placeholder, onBlur } = this.props

        return (
            <Select
                name="form-field-name"
                value={this.state.value}
                options={this.props.data.optionsData}
                onChange={this.logChange}
                onBlur={onBlur}
                ignoreCase
                ignoreAccents
                menuStyle={{ backgroundColor: 'rgba(204, 172, 149, 0.35)'}}
                menuContainerStyle={{ width: this.props.style ? this.props.style.width || 'inherit' : '100%', margin: 'auto', zIndex:1000 }}
                placeholder={placeholder}
                arrowRenderer={() => null}
                autoBlur
                clearable={false}
                autofocus={autofocus}
                ref={(select) => { this.select = select; }}
                style={this.props.style}
            />
        );
    }
}

export default SearchBar;
