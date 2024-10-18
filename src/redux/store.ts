import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import authReducer from './slices/authSlice'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    jobs: jobsReducer,
    auth: authReducer, 
});


const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store); 

export { store, persistor };


export type RootState = ReturnType<typeof store.getState>;
