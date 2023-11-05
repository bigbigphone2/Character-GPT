import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Style } from '../../config/styleConfig';

interface StyledTextFieldProps{
    onSubmit: any
}

export default function StyledTextField(props: StyledTextFieldProps) {
    const {onSubmit} = props;
    const [value, setValue] = useState<string>("");

    const handleKeyPress = (e: any)=> {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
    }
    
    const handleSubmit = ()=> {
        onSubmit(value);
        setValue("");
    };

    return (
        <Paper
            component="form"
            sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: '80%', 
                maxWidth: 500, 
                border: `1px solid ${Style.mainGrey}`,
                borderRadius: '10px',
                boxShadow: `${Style.mainShadow}`
            }}
            onKeyDown={(e)=>handleKeyPress(e)}    
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Send a message"
                inputProps={{ 'aria-label': 'Send a message' }}
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={()=>handleSubmit()}>
                <SendIcon/>
            </IconButton>
        </Paper>
  );
}