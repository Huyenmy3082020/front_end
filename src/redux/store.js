import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from './slides/OrderSlide';
import cartReducer from './slides/CartSlide';
import productReducer from './slides/ProductSlide';
import userReducerV1 from './slides/UserSlideV1';
import shipReducer from './slides/ShipSlide';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    order: orderReducer,
    cart: cartReducer,
    product: productReducer,
    ship: shipReducer,
    userv1: userReducerV1,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
