import {Route} from "react-router-dom"
import HomePage from "./pages/homepage"
import ChatPage from "./pages/chatPage"

function App() {
  return (
    <>
      <div>
        <Route path="/" component={HomePage} exact ></Route>
        <Route path="/chats" component={ChatPage}></Route>
      </div>
    </>
  )
}

export default App
