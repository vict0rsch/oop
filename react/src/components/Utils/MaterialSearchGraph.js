import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash'

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(params) {
    const { suggestion, index, itemProps, theme, highlightedIndex, selectedItem } = params;
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem === suggestion.label;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular,
                zIndex: 999
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
    return (
        <Paper {...containerProps} square style={{
            zIndex: 999,
            position: 'fixed',
            backgroundColor: 'whitesmoke',
            width: '62%',
            height: '200px',
            overflow: 'scroll'
        }}>
            {children}
        </Paper>
    );
}

function getSuggestions(suggestions, defaults, inputValue) {
    let count = 0;

    if (!inputValue) {
        return defaults
    }

    return suggestions.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
            count < 3000;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

const styles = {
    container: {
        flexGrow: 1
    },
    textField: {
        width: '100%',
    },
};

class IntegrationAutosuggest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaults: _.sampleSize(this.propssuggestions, 5),
        }
    }

    shuffleDefaults = () => {
        this.setState({
            defaults: _.sampleSize(this.propssuggestions, 5)
        })
    }

    render() {
        const { classes, theme, onChange, onInputValueChange, placeholder, suggestions, propsValue } = this.props;

        return (
            <div style={{ width: '100%' }}>
                <Downshift
                    onChange={onChange}
                    onInputValueChange={onInputValueChange}
                    itemToString={i => { return i == null ? '' : String(i) }}
                    render={
                        ({
                        getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue,
                            selectedItem,
                            highlightedIndex,
                    }) => {
                            return (
                                <div className={classes.container}>
                                    {renderInput({
                                        ...getInputProps({
                                            classes,
                                            placeholder: placeholder,
                                            id: 'integration-downshift',

                                        }),
                                        value: propsValue
                                    }
                                    )}
                                    {isOpen
                                        ? renderSuggestionsContainer({
                                            children: getSuggestions(suggestions, this.state.defaults, inputValue).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    theme,
                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                    highlightedIndex,
                                                    selectedItem,
                                                }),
                                            ),
                                        })
                                        : null}
                                </div>
                            )
                        }}
                />
            </div>
        );
    }
}


IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationAutosuggest);