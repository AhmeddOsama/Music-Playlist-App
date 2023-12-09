import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

const SongDetails = ({ song }) => {
    const trackDurationInMs = song.duration_ms;
    const minutes = Math.floor(trackDurationInMs / 60000);
    const seconds = ((trackDurationInMs % 60000) / 1000).toFixed(0);

    return (
        <Paper style={{ padding: 16, marginBottom: 16, background: 'linear-gradient(to bottom, #000000, #333333)' }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography style={{ color: 'white' }} >{song.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography style={{ color: 'white' }} >{song.artists.map((artist) => artist.name).join(', ')}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography style={{ color: 'white' }} >{song.album.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography style={{ color: 'white' }} >{minutes}:{seconds.padStart(2, '0')}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SongDetails;