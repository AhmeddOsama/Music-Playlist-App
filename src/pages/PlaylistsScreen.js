// SongList.js
import React, { useEffect, useState } from 'react';
import SongDetails from '../components/SongDetails';
import { Grid, Paper, Typography } from '@material-ui/core';
import { getPlaylists, getSelectedPlaylist, setSelectedPlaylist } from '../redux/slices/playlistsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Button, IconButton, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import SongList from '../components/SongList';
import { Link } from 'react-router-dom';
import DeletePlaylist from '../components/DeletePlaylist';

const PlaylistsScreen = () => {
    const dispatch = useDispatch()
    const playlists = useSelector(getPlaylists)
    const selectedPlaylist = useSelector(getSelectedPlaylist)
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false)
    const onClickPlaylist = (playlist) => {
        dispatch(setSelectedPlaylist(playlist))
    }
    const onDeletePlaylist = (playlist) => {
        dispatch(setSelectedPlaylist(playlist))
        toggleDeleteDialogue()
    }
    const toggleDeleteDialogue = () => {
        setOpenDeleteDialogue(!openDeleteDialogue)
    }
    useEffect(() => {
    }, [selectedPlaylist])
    return <div style={{ padding: 10 }}>
        {selectedPlaylist.songs == undefined ? playlists.map((playlist) => (
            <ListItem style={{ padding: 16, marginBottom: 16, background: 'linear-gradient(to bottom, #000000, #333333)' }} key={playlist.name}>
                <ListItemButton onClick={(e) => onClickPlaylist(playlist)} >
                    <ListItemText style={{ color: 'white' }} primary={playlist.name} />
                    <Button
                        style={{ color: 'red' }}
                        onClick={() => onDeletePlaylist(playlist)}
                    >
                        Delete Playlist
                    </Button>
                </ListItemButton>
            </ListItem>
        )) : selectedPlaylist.songs.map((song) => (
            <SongDetails key={song.id} song={song} />
        ))
        }
        <DeletePlaylist onClose={toggleDeleteDialogue} open={openDeleteDialogue}>
        </DeletePlaylist>
    </div>
};

export default PlaylistsScreen;
