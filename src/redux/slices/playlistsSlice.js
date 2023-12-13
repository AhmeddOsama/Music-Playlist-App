// reducers/playlists.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlists: [],
    selectedPlaylist: {},
    selectedSong: {}
};

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setSelectedSong(state, action) {
            state.selectedSong = action.payload
        },
        setSelectedPlaylist(state, action) {
            state.selectedPlaylist = action.payload
        },
        addSongToPlaylist: (state, action) => {
            const selectedPlaylist = action.payload;
            const selectedSong = state.selectedSong;
            const playlistIndex = state.playlists.findIndex(
                (playlist) => playlist.name === selectedPlaylist.name
            );

            if (playlistIndex !== -1) {
                const playlist = state.playlists[playlistIndex];
                const isSongAlreadyAdded = playlist.songs.some(
                    (song) => song.id === selectedSong.id
                );

                if (!isSongAlreadyAdded) {
                    state.playlists[playlistIndex].songs.push(selectedSong);
                }
            }
        },
        removeSongFromPlaylist(state) {
            const { selectedSong, selectedPlaylist } = state;

            const playlistIndex = state.playlists.findIndex(playlist => playlist.name === selectedPlaylist.name);

            if (playlistIndex !== -1) {
                state.playlists[playlistIndex].songs = state.playlists[playlistIndex].songs.filter(song => song.id !== selectedSong.id);
                state.selectedPlaylist.songs = state.playlists[playlistIndex].songs
            }
        },
        deletePlaylist(state) {
            state.playlists = state.playlists.filter((playlist) => playlist.name !== state.selectedPlaylist.name);
            state.selectedPlaylist = {}
        },
        addNewPlaylist(state, action) {
            state.playlists.push({ name: action.payload, songs: [] });
        }
    }
});

export const { setSelectedPlaylist, getAllPlaylists, addNewPlaylist, deletePlaylist, removeSongFromPlaylist, addSongToPlaylist, setSelectedSong } = playlistsSlice.actions;
export const getPlaylists = (state) => state.playlists.playlists;
export const getSelectedPlaylist = (state) => state.playlists.selectedPlaylist;
export default playlistsSlice.reducer;