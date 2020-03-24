import React, { Component } from 'react';
import withContext from './withContext';
import Context from './context';

import { Link } from 'react-router-dom';

const Consumer = Context.Consumer;

class Children extends Component {
    render() {
        return (
            <div>
                <h1>childrenA</h1>

                <Link to={'/teachermanager/growth/12/哈哈'}>下钻</Link>
            </div>
        );
    }
}

export default withContext(Consumer, Children);
