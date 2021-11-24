import { BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";

import Home from "../pages/Home";
import Conversations from "../pages/Conversations";
import ConversationShow from "../pages/ConversationShow";
import Account from "../pages/Account";
import Login from "../pages/Login";
import NewUser from "../pages/NewUser";

// import { useRecoilValue } from "recoil";
// import { loggedInState } from "../recoil/selectors";

const Routing = () => {
    // set the returned value of useRecoilValue to a variable
    // const loggedIn = useRecoilValue(loggedInState);
  
    return (
      <Router > 
        <Routes >
          <Route path='/' element={ < Home /> } />
          <Route path='/conversations' element={ < Conversations /> }/>
          <Route path='/conversations/:id' element={ <ConversationShow /> }/>
          <Route path='/:id' element={ < Account /> }/>
          <Route path='/login' element={ < Login /> }/>
          <Route path='/sign-up' element={ < NewUser /> }/>
        </Routes>
      </Router> 
    )

      // {/* wrap the routes in a conditional check so that they will only be available if the user state is true */}
      // {/* {loggedIn && ( */}
      //   {/* <Routes> */}
      //     // <Route path='/conversations' element={ < Conversations /> } />

      //     {/* Will need to update below to user id /:id */}
      //     // <Route path='/account' element <Account /> } />
      //     // <Route path='/login' element={ <Login />} />
      //     // <Route path='/sign-up' element= { <NewUser />} />
      //   {/* </Routes> */}
      // {/* )} */}

  };

export default Routing;