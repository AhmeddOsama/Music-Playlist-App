import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './slices/playlistsSlice';

const store = configureStore({
    reducer: {
        playlists: playlistsReducer
        // Add other reducers here
    }
});

export default store;