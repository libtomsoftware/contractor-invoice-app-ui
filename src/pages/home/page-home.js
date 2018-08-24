import React from 'react';
import { browserHistory } from 'react-router';
import './page-home.css';

class PageHome extends React.Component {

    routeTo(path) {
        browserHistory.push(path);
    }

    render() {
        return (
            <div className="page page-home">
                home page
            </div>
        );
    }
}

export default PageHome;
