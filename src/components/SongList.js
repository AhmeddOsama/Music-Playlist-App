// SongList.js
import React from 'react';
import SongDetails from './SongDetails';
import { Grid, Paper, Typography } from '@material-ui/core';
import SearchBar from './SearchBar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SongList = ({ songs }) => {

    return <div>
        <Paper style={{ padding: 10, marginBottom: 16, background: 'linear-gradient(to bottom, #000000, #333333)' }}>
            <Grid container spacing={2} >
                <Grid item xs={2}>
                    <Typography style={{ color: 'gray' }} variant="subtitle1">Song:</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ color: 'gray' }} variant="subtitle1">Artist:</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ color: 'gray' }} variant="subtitle1">Album:</Typography>
                </Grid>
                <Grid item xs={2}>
                    <AccessTimeIcon style={{ color: 'gray' }}></AccessTimeIcon>
                </Grid>
            </Grid>
        </Paper>
        {songs.map((song) => (
            <SongDetails key={song.id} song={song} /> // Use the SongDetails component for each song
        ))}
    </div>
};

export default SongList;
