import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { setSelectedPlaylist, setSelectedSong } from '../redux/slices/playlistsSlice';
import { useDispatch } from 'react-redux';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
const SimpleAppBar = () => {
    const dispatch = useDispatch()
    const reset = () => {
        dispatch(setSelectedPlaylist({}))
        dispatch(setSelectedSong({}))
    }
    return (
        <AppBar position="fixed" style={{ background: 'black', top: 0, zIndex: 1000, width: '100%', marginBottom: '64px' }}>
            <Toolbar>
                <Box display="flex" justifyContent="center" width="100%" flex={1}>

                    <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        onClick={reset}
                        component={Link}
                        to="/"
                        style={{ backgroundColor: '#333333', color: 'white', margin: '0 10px' }}
                    >
                        Home
                    </Button>

                    <Button variant="contained" startIcon={<AudiotrackIcon />} onClick={reset} component={Link} to="/playlists" style={{ backgroundColor: '#333333', color: 'white', margin: '0 10px' }}>
                        Playlists
                    </Button>

                </Box>

            </Toolbar>
        </AppBar >
    );
}


export default SimpleAppBar;
