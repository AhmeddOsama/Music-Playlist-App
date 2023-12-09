// SongList.js
import React from 'react';
import SongDetails from './SongDetails';
import { Grid, Paper, Typography } from '@material-ui/core';

const SongList = ({ songs }) => {
    return <div>
        <ul>
            <Paper style={{ padding: 16, marginBottom: 16, background: 'linear-gradient(to bottom, #000000, #333333)' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography style={{ color: 'gray' }} variant="subtitle1">Song:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography style={{ color: 'gray' }} variant="subtitle1">Artist:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography style={{ color: 'gray' }} variant="subtitle1">Album:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography style={{ color: 'gray' }} variant="subtitle1">Duration:</Typography>
                    </Grid>
                </Grid>
            </Paper>
            {songs.map((song) => (
                <SongDetails key={song.id} song={song} /> // Use the SongDetails component for each song
            ))}
        </ul>
    </div>
};

export default SongList;
