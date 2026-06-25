import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { RootReducer } from './reducers/Root.reducer'
import { RootSaga } from './sagas/Root.saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: RootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
	devTools: true,
})

sagaMiddleware.run(RootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
