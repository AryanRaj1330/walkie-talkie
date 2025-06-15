import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx"
import {BrowserRouter} from "react-router-dom"
import ChatProvider from "./context/chatContext.jsx"
import { Provider } from './components/ui/provider.jsx'
// import {ColorModeScript} from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </Provider>
)
