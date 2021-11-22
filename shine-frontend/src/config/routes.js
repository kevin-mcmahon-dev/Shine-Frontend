import { Routes, Route} from "react-router-dom";

import Home from "../pages/Home";
import Conversations from "../pages/Conversations";
import Account from "../pages/Account";
import Login from "../pages/Login";
import NewUser from "../pages/NewUser";

const Routes = () => {
    // set the returned value of useRecoilValue to a variable
    // const loggedIn = useRecoilValue(loggedInState);
  
    return (
      <Routes>
        <Route path='/' element={Home} />
        {/* wrap the routes in a conditional check so that they will only be available if the user state is true */}
        {loggedIn && (
        // we will need to wrap the routes in another switch to keep them from all rendering at once
          <Routes>
            <Route path='/conversations' element={ Conversations } />
            <Route path='/:id' element={ Account } />
            <Route path='/login' element={ Login } />
            <Route path='/sign-up' element= { NewUser } />
          </Routes>
        )}
      </Routes>
    );
  };
  
  export default Routes;