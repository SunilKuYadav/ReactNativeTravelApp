import {combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {flightReduce} from './reducer';

const rootReducer = combineReducers({
  flight: flightReduce,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      //   .prepend(
      //     // correctly typed middlewares can just be used
      //     additionalMiddleware,
      //     // you can also type middlewares manually
      //     untypedMiddleware as Middleware<
      //       (action: Action<'specialAction'>) => number,
      //       RootState
      //     >,
      //   )
      //   // prepend and concat calls can be chained
      .concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
