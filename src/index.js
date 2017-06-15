import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import {matchPattern} from 'react-router/lib/PatternUtils';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';
import {Provider} from 'react-redux';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './componentes/Login';
import Logout from './componentes/Logout';

const reducers = combineReducers({timeline, notificacao});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function verificaAutenticacao(nextState,replace) {
    const resultado = matchPattern('/timeline(/:login)',nextState.location.pathname);
    const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;

    if(enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null){
        replace('/?msg=você precisa estar logado para acessar o endereço');
    }
}

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={Login}/>
                <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao}/>
                <Route path="/logout" component={Logout}/>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);
registerServiceWorker();
