import React from 'react';

export default class ListDetails extends React.Component {
    render() {
        let toReturnElement = this.props.details.map((sugg, key) => {
            return <div key={key} className="list-data">
                <div style={{ margin: '1%' }}>Title : <b>{sugg.title}</b> </div>
                <div style={{ margin: '1%' }}>Author : <b>{sugg.author}</b> </div>
                <br />
                <div style={{ margin: '1%' }}>
                    {sugg.summary}
                </div>
            </div>
        });
        return (
            <React.Fragment>
                {toReturnElement}
            </React.Fragment>
        );
    }
}