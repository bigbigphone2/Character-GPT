import { Box, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import StyledDrawer from '../components/template/StyledDrawer'
import StyledAppBar from '../components/template/StyledAppBar';
import StyledSideBar from '../components/template/StyledSidebar';
import ChatArea from '../components/ChatArea';
import OpenAI from 'openai';
import { useAppState } from '../Context/AppContext';

const HomePageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center', 
    // alignItems: 'center',
    width: '100%',
    height: '100vh',
})

interface HomePageProps{
    openai: OpenAI
}

export default function HomePage(props: HomePageProps) {
    const {openai} = props;
    const appBarRef = useRef<any>(null);
    const [appBarHeight, setAppBarHeight] = useState<number>(0);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    React.useEffect(() => {
        window.addEventListener("resize", () => setAppBarHeight(appBarRef.current ? appBarRef.current.clientHeight : 0), false);
    }, []);
    
    return (
        <HomePageContainer>
            <StyledDrawer open={openDrawer} setOpen={setOpenDrawer}/>
            <Box display={{xs: 'none', sm: 'block'}}>
                <StyledSideBar/>
            </Box>
            <Box width={'100%'}>
                <StyledAppBar appBarRef={appBarRef} setOpen={setOpenDrawer}/>
                <ChatArea openai={openai} appBarHeight={appBarHeight}/> 
            </Box>
        </HomePageContainer>
    )
}
