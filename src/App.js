import "./App.css"

// React
import React from "react"

// Router
import history from './utils/history'
import {Router} from 'react-router-dom'
import {Route, Redirect} from 'react-router-dom'

import RouteMap from './utils/router'

// Redux
import {createStore, applyMiddleware, compose} from 'redux';

import {Provider} from 'react-redux'

// Redux Reducer
import rootReducer from "./redux/reducers"

// Redux Middlewares
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

// Redux Persist
import {persistStore, autoRehydrate} from "redux-persist"
// session storage
// import { asyncSessionStorage } from 'redux-persist/storages'
// web with recommended localForage
// import localForage from 'localforage'

// 布局组件
import IndexPage from './pages/IndexPage'

// Store
const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  // apply middleware
  applyMiddleware(thunkMiddleware, promiseMiddleware()),
  // add `autoRehydrate` as an enhancer
  autoRehydrate()
);
export const store = createStore(rootReducer, enhancer);

persistStore(store)
// persistStore(store, {storage: localForage})
// persistStore(store, {storage: asyncSessionStorage})


// App 组件
class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Router history={history}>
          <div  style={{
               height:"100%",
                }}>
            <Route exact path={RouteMap.index} render={() => <Redirect to={RouteMap.homePage}/>}/>

            <Route path={RouteMap.index} component={IndexPage}/>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;