import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

import { Style } from '../../config/styleConfig';
import { useEffect } from 'react';
import { AppStateInterface, useAppState } from '../../Context/AppContext';

interface StyledAppBarProps{
    appBarRef: any,
    setOpen: (arg0: boolean)=> void,
}

export default function StyledAppBar(props: StyledAppBarProps) {
    const {appBarRef, setOpen} = props;
    
    const appState = useAppState().appState;
    const updateAppState = useAppState().setAppState;


    const handleOnClickNewChat = () => {
        updateAppState({...appState, isOpenNewChatForm: true} as AppStateInterface);
    };

    return (
        <Box ref={appBarRef} sx={{ flexGrow: 1 }} display={{xs: 'relative', sm: 'none'}}>
            <AppBar position="static" sx={{backgroundColor: Style.mainBlack}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2}}
                        onClick={()=>setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display:'flex', justifyContent: 'center' }}>
                        {appState.currentTopicKey}
                    </Typography>
                    <IconButton color="inherit" onClick={()=>handleOnClickNewChat()}>
                        <AddIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}