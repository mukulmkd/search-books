import React from 'react';

export default class AutoSuggest extends React.Component {
    render() {
        let toReturnElement = this.props.suggestions.map((sugg, key) => {
            return (<div style={{ cursor: 'pointer' }} key={key} onClick={this.props.setTextBox}>
                {sugg}
            </div>);
        });
        return (
            <React.Fragment>
                {toReturnElement}
            </React.Fragment>
        );
    }
}