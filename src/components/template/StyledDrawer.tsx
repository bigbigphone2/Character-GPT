import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Style } from '../../config/styleConfig';
import StyledSideBar from './StyledSidebar';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface StyledDrawerProps{
  open: boolean, 
  setOpen: (arg0: boolean)=> void,
}

export default function StyledDrawer(props: StyledDrawerProps) {
  const {open, setOpen} = props;
  const anchor: Anchor = 'left';

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: Style.drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <StyledSideBar/>
    </Box>
  );

  return (
    <Box display={{xs: 'none', sm: 'relative'}}>
        <React.Fragment >
          {/* <Button onClick={toggleDrawer(true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
    </Box>
  );
}