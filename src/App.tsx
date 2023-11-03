import { useState } from "react";
import HomePage from "./pages/HomePage";

import OpenAI from "openai";
import { useAppState } from "./Context/AppContext";
import NewChatForm from "./components/NewChatForm";
import LogInForm from "./components/LogInForm";
import StyledAlert from "./components/template/StyledAlert";

function App() {
  const appState = useAppState().appState;
  const apiKey = appState.apiKey;
  const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true });

  return (
    <>
      <HomePage openai={openai}/>
      <NewChatForm/>
      <LogInForm/>
      <StyledAlert/>
    </>
  );
}

export default App;
