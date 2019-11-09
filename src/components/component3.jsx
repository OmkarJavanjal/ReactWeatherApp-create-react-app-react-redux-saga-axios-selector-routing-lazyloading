import React from 'react';

class Component3 extends React.Component {
    render() {
        const { children } = this.props;
        return(
            <div>
                <div>Component3</div>
                {children}
            </div>
        );
    }
}

export default Component3;
