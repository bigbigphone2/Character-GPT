import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';
import { Snackbar } from '@mui/material';
import { useAppState } from '../../Context/AppContext';


export default function StyledAlert() {
    const appState = useAppState().appState;
    const {isOpenAlert} = appState;
    const updateAppState = useAppState().setAppState;
    const handleClose = ()=>{
        updateAppState({...appState, isOpenAlert: {
            ...appState.isOpenAlert,
            isOpen: false,
        }})
    }
    return (
        <Snackbar open={isOpenAlert.isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Box sx={{width:'300px', position:'fixed', zIndex:'100', left:'50%' ,marginLeft:'-150px', top:'10%'}}>
                <Alert  variant="filled"  severity={isOpenAlert.type}>{isOpenAlert.content}</Alert>
            </Box>
        </Snackbar>
    )
}
