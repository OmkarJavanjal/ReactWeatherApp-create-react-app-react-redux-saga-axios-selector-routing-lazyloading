import React from 'react';

class Component2 extends React.Component {
    render() {
        const { children } = this.props;
        return(
            <div>
                <div>Component2</div>
                {children}
            </div>
        );
    }
}

export default Component2;
