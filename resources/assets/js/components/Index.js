import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Misc from './Misc';

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

if (document.getElementById('foobar')) {
    ReactDOM.render(<Misc />, document.getElementById('foobar'));
}
