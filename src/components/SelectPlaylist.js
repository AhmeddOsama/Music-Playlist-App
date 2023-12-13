
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, DialogTitle, List, Fab, Modal, Card, Box, Button, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { getPlaylists, addSongToPlaylist } from '../redux/slices/playlistsSlice';
import { ListItemButton } from '@mui/material';
import AddNewPlaylist from './AddNewPlaylist';
function SelectPlaylist(props) {
    const { onClose, selectedValue, open } = props;
    const playlists = useSelector(getPlaylists)
    const dispatch = useDispatch()
    const [addPlaylistDialogOpen, setAddPlaylistDialogOpen] = useState(false);
    const toggleAddPlaylist = () => {
        setAddPlaylistDialogOpen(!addPlaylistDialogOpen);
    };



    useEffect(() => {
        console.log('Playlists', playlists)
    }, [])
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (playlist) => {
        dispatch(addSongToPlaylist(playlist))
        handleClose()
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select Playlist</DialogTitle>
            <List>
                {playlists.map((playlist) => (

                    <ListItem key={playlist.name}>
                        <ListItemButton onClick={() => handleListItemClick(playlist)}>
                            <ListItemText primary={playlist.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={toggleAddPlaylist}

                    >
                        <ListItemAvatar>
                            <Fab>+</Fab>
                        </ListItemAvatar>
                        <ListItemText primary="Add playlist" />
                    </ListItemButton>
                </ListItem>
                <AddNewPlaylist
                    open={addPlaylistDialogOpen}
                    onClose={toggleAddPlaylist}
                />
            </List>

        </Dialog>
    );
}

export default SelectPlaylist