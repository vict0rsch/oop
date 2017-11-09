import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class LanguageSelect extends React.Component {

    handleChange = name => event => {
        console.log(this.props.setActiveLanguage, event.target.value, this.props.currentLanguage);
        this.props.setActiveLanguage(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">{this.props.translate('home.settings.languageButton')}</InputLabel>
                    <Select
                        value={this.props.currentLanguage}
                        onChange={this.handleChange('age')}
                        input={<Input id="set-language" />}
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'fr'}>Français</MenuItem>
                    </Select>
                </FormControl>

            </form>
        );
    }
}

LanguageSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageSelect);