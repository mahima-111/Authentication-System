import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { store } from './store';
import { Provider } from 'react-redux';
import UpdateProfile from './components/UpdateProfile.jsx';
import UpdatePassword from './components/UpdatePassword.jsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            //protected routes
            {
                path: "",
                element: <PrivateRoute/>,
                children:[
                    {
                        path: "/profile",
                        element: <Profile/>,
                    },
                    {
                        path: "/update-profile",
                        element: <UpdateProfile/>,
                    },
                    {
                        path: "/update-password",
                        element: <UpdatePassword/>,
                    }
                ] 
            },
        ],
        errorElement: <Error/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    
    // </React.StrictMode>,
)
