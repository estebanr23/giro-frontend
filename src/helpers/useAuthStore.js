import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { handleLogin, handleLogout, onChecking } from "../store/auth";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = ( { email, password } ) => {
        dispatch( onChecking() );

        try {
            const { user } = { user: { email, password, token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" } };

            if (user) {
                localStorage.setItem('token', user.token);
                dispatch(handleLogin(user));
            } else {
                toast.error("Invalid credentials", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
            }

        } catch (error) {
            console.log('Error!');
        }
    }

    const checkAuthToken = () => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( handleLogout() );

        try {
            const { user } = { user: { email:"esteban@correo.com", password:"12345", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC10" } };
            localStorage.setItem('token', user.token);
            dispatch( handleLogin(user) );
        } catch (error) {
            localStorage.clear();
            dispatch( handleLogout() );
        }
    }

    return {
        //* Propiedades
        status, 
        user, 
        errorMessage,

        //* Metodos
        startLogin,
        checkAuthToken
    }

}
