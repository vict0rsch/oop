/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',
        // maxWidth: '260px',
        display: 'inline-block',
        textAlign: 'left'
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%'
    }
});

class CustomInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.model[this.props.id] || '',
            visited: false
        };
    }

    handleChange = value => event => {
        this.props.onChange(event.target.value)
        this.setState({
            [value]: event.target.value,
        });
    };

    setVisited = () => {
        this.setState({
            visited: true
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.model[this.props.id] !== this.state.value) {
            this.setState({
                value: nextProps.model[this.props.id]
            })
        }
    }

    //////////////////////////////////////////////////////

    render() {
        const { classes } = this.props;
        const label = this.props.label;
        const id = this.props.id;
        const multiline = this.props.multiline || false;
        const rowsMax = this.props.rowsMax || 1;
        const error = (this.props.valid === undefined ? false : !this.props.valid) && this.state.visited
        return (
            <FormControl className={classes.formControl} >
                <InputLabel error={error}>{label}</InputLabel>
                <Input
                    id={id}
                    className={classes.textField}
                    value={this.state.value || ''}
                    onChange={this.handleChange('value')}
                    onFocus={this.setVisited}
                    onBlur={this.props.onBlur}
                    type={this.props.type || "text"}
                    error={error}
                    multiline={multiline}
                    rowsMax={rowsMax}
                    style={this.props.style}
                    endAdornment={this.props.endAdornment ?
                        <InputAdornment position="end">
                            {this.props.endAdornment}
                        </InputAdornment> : ''
                    }
                />
            <FormHelperText>{this.props.helperText || ''}</FormHelperText>
            </FormControl>
        );
    }
}

CustomInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomInput);