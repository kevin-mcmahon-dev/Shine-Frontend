import { BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";

import Home from "../pages/Home";
import Conversations from "../pages/Conversations";
import ConversationShow from "../pages/ConversationShow";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import NewUser from "../pages/Register";

// import { useRecoilValue } from "recoil";
// import { loggedInState } from "../recoil/selectors";

const Routing = () => {
    // set the returned value of useRecoilValue to a variable
    // const loggedIn = useRecoilValue(loggedInState);
  
    return (
        <Routes >
          <Route path='/' element={ < Home /> } />
          <Route path='/conversations' element={ < Conversations /> }/>
          <Route path='/conversations/:id' element={ <ConversationShow /> }/>
          <Route path='/login' element={ < Login /> }/>
          <Route path='/register' element={ < NewUser /> }/>
          <Route path='/profile' element={ < Profile /> }/>
        </Routes>
    )
};

export default Routing;