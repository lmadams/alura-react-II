import React, { Component } from 'react';
import Header from "./componentes/Header";
import Timeline from './componentes/Timeline';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';

const reducers = combineReducers({timeline, notificacao});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={this.context.store} />
                    <Timeline login={this.props.params.login} store={this.context.store} />
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default App;
