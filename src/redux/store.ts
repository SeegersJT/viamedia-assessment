import { configureStore, type Reducer } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	type PersistConfig,
	type PersistedState,
} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { RootReducer } from './reducers/Root.reducer'
import { RootSaga } from './sagas/Root.saga'
import { version } from '../../package.json'
import type { RootState } from './types/Root.types'

const toVersionNumber = (v: string): number => {
	const [major, minor, patch] = v.split('.').map(Number)
	return major * 10_000 + minor * 100 + patch
}

const sagaMiddleware = createSagaMiddleware()

const persistConfig: PersistConfig<RootState> = {
	key: 'auth',
	version: toVersionNumber(version),
	storage,
	whitelist: ['auth'],
	migrate: (state: PersistedState) => {
		return Promise.resolve(state)
	},
}

const persistedReducer = persistReducer<RootState>(
	persistConfig,
	RootReducer as unknown as Reducer<RootState>
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: false,
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(sagaMiddleware),
	devTools: true,
})

export const persistor = persistStore(store)

sagaMiddleware.run(RootSaga)

export type AppDispatch = typeof store.dispatch
