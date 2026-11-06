import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import AuthContextProvider from "./components/Context/Auth.Context";
import ProtectedRouts from "./components/ProtectedRouts/ProtectedRouts";
import ProtectedRoutsLogin from "./components/ProtectedRoutsLogin/ProtectedRoutsLogin";
import {QueryClientProvider , QueryClient} from "@tanstack/react-query" 
import PostDetails from "./pages/PostDetails/PostDetails";
import Notifications from "./pages/Notifications/Notifications";
import ChangePassword from './components/CangePassword/ChangePassword';
const query = new QueryClient();
function App() {
  const routs = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "home", element: <ProtectedRouts> <Home /> </ProtectedRouts> },
        { path: "postdetails/:id", element: <ProtectedRouts> <PostDetails /> </ProtectedRouts> },
        { index: true, element: <ProtectedRouts> <Home /> </ProtectedRouts>  },
        { path: "profile", element: <ProtectedRouts> <Profile/> </ProtectedRouts>  },
        { path: "notifications", element: <ProtectedRouts> <Notifications/> </ProtectedRouts>  },
        { path: "/settings", element: <ProtectedRouts> <ChangePassword /> </ProtectedRouts>  },

        
        { path: "notfound", element: <NotFound /> },
        
      ],
    },
    { path: "/login", element: <ProtectedRoutsLogin> <Login /></ProtectedRoutsLogin> },
    { path: "/register", element: <ProtectedRoutsLogin> <Register /></ProtectedRoutsLogin> },
    
  ]);
  return (
    <>
    <QueryClientProvider client={query}>
    <AuthContextProvider>
<RouterProvider router={routs}></RouterProvider>
    </AuthContextProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
