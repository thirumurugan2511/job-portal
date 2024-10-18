import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import authReducer from './slices/authSlice'; // Assuming you have an authSlice for authentication
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Combine all reducers (if you have more reducers, combine them here)
const rootReducer = combineReducers({
    jobs: jobsReducer,
    auth: authReducer, // Add the auth reducer
});

// Create a persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store); // Create a persistor

export { store, persistor };

// Define the RootState type from the store itself
export type RootState = ReturnType<typeof store.getState>;
