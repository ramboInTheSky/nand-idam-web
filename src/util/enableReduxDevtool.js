/*
  Redux store enhancer to enable devtool (https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
  Usage:

  const store = createStore(rootReducer, enableReduxDevtool)

  or

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(someMiddleware),
      enableReduxDevtool
    )
  )
*/

export default (
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : noop => noop
);
