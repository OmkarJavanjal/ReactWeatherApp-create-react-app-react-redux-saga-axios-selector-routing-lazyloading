import React from 'react';
import styles from './styles.module.scss';
class Component1 extends React.Component {
    render() {
        const { children } = this.props;
        return(
            <div>
                <div className={styles.header}>Component1</div>
                {children}
            </div>
        );
    }
}

export default Component1;
