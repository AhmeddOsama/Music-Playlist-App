import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { setSelectedPlaylist, setSelectedSong } from '../redux/slices/playlistsSlice';
import { useDispatch } from 'react-redux';

const SimpleAppBar = () => {
    const dispatch = useDispatch()
    const reset = () => {
        dispatch(setSelectedPlaylist({}))
        dispatch(setSelectedSong({}))
    }
    return (
        <AppBar position="static" style={{ background: 'linear-gradient(to bottom, #000000, #333333)' }}>
            <Toolbar>
                <Box display="flex" justifyContent="center" width="100%">

                    <Button onClick={reset} component={Link} to="/" style={{ color: 'white', margin: '0 10px' }}>
                        Home
                    </Button>

                    <Button onClick={reset} component={Link} to="/playlists" style={{ color: 'white', margin: '0 10px' }}>
                        Playlists
                    </Button>

                </Box>

            </Toolbar>
        </AppBar >
    );
}


export default SimpleAppBar;
