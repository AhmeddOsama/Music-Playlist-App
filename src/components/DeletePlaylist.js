
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, DialogTitle, List, Fab, Modal, Card, Box, Button, ListItem, ListItemAvatar, ListItemText, Avatar, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { getPlaylists, addSongToPlaylist, removeSongFromPlaylist, getSelectedPlaylist, deletePlaylist } from '../redux/slices/playlistsSlice';
import { ListItemButton } from '@mui/material';
const DeletePlaylist = (props) => {
    const { onClose, open } = props;
    const dispatch = useDispatch()
    const selectedPlaylist = useSelector(getSelectedPlaylist)

    const onDeletePlaylist = () => {
        dispatch(deletePlaylist())
        onClose()
    }
    return <Dialog
        open={open}
        onClose={onClose}
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete {selectedPlaylist.name}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>No</Button>
            <Button onClick={onDeletePlaylist} >
                Yes
            </Button>
        </DialogActions>
    </Dialog>

}

export default DeletePlaylist