import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx"
import {BrowserRouter} from "react-router-dom"
import ChatProvider from "./context/chatContext.jsx"
import { Provider } from './components/ui/provider.jsx'
import { ColorModeProvider } from './components/ui/color-mode.jsx'
import { Theme } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <Provider>
    <Theme appearance='light'>
      <BrowserRouter>
        <ChatProvider>
          <App />
        </ChatProvider>
      </BrowserRouter>
    </Theme>
  </Provider>
)
