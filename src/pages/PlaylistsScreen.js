// SongList.js
import React, { useEffect, useState } from 'react';
import SongDetails from '../components/SongDetails';
import { Grid, Paper, Typography } from '@material-ui/core';
import { getPlaylists, getSelectedPlaylist, setSelectedPlaylist } from '../redux/slices/playlistsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Button, Fab, IconButton, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import SongList from '../components/SongList';
import { Link, useNavigate } from 'react-router-dom';
import DeletePlaylist from '../components/DeletePlaylist';
import AddIcon from '@mui/icons-material/Add';
import AddNewPlaylist from '../components/AddNewPlaylist';
import '../styles/item.css'
import DeleteIcon from '@mui/icons-material/Delete';
const PlaylistsScreen = () => {
    const dispatch = useDispatch()
    const playlists = useSelector(getPlaylists)
    const selectedPlaylist = useSelector(getSelectedPlaylist)
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false)
    const [addPlaylistDialogOpen, setAddPlaylistDialogOpen] = useState(false);
    const navigate = useNavigate();

    const toggleAddPlaylist = () => {
        setAddPlaylistDialogOpen(!addPlaylistDialogOpen);
    };

    const onClickPlaylist = (playlist) => {
        dispatch(setSelectedPlaylist(playlist))
        navigate(`/playlists/${playlist.name}`);

    }
    const onDeletePlaylist = (playlist) => {
        dispatch(setSelectedPlaylist(playlist))
        toggleDeleteDialogue()
    }
    const toggleDeleteDialogue = () => {
        setOpenDeleteDialogue(!openDeleteDialogue)
    }

    return <div style={{ padding: 10 }}>

        {selectedPlaylist.songs == undefined ? playlists.map((playlist) => (
            <ListItem className="item" style={{ padding: 16, marginBottom: 16 }} key={playlist.name}>
                <ListItemButton onClick={(e) => onClickPlaylist(playlist)} >
                    <ListItemText style={{ color: 'white' }} primary={playlist.name} />

                </ListItemButton>
                <Button
                    startIcon={<DeleteIcon />}
                    style={{ color: 'red' }}
                    onClick={() => onDeletePlaylist(playlist)}
                >
                    Delete Playlist
                </Button>
            </ListItem>
        )) : <></>
        }
        {
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fab onClick={toggleAddPlaylist} style={{ backgroundColor: 'black' }} aria-label="add">
                    <AddIcon style={{ color: 'white' }} />
                </Fab>
                <span style={{ marginLeft: 8, color: 'white' }}>Add Playlist</span>
            </div>
        }
        <AddNewPlaylist
            open={addPlaylistDialogOpen}
            onClose={toggleAddPlaylist}
        />
        <DeletePlaylist onClose={toggleDeleteDialogue} open={openDeleteDialogue}>
        </DeletePlaylist>
    </div>
};

export default PlaylistsScreen;
