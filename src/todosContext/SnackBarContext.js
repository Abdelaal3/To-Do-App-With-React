import { createContext, useState, useContext } from "react";
import SnackBar from "../Components/SnackBar";


const SnackBarContext = createContext(null)

export const ToastProvider = ({ children }) => {



    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);


    function ShowHideSnack(message) {
        setOpen(true)
        setMessage(message)


        setTimeout(() => { setOpen(false) }, 2000)
    }

    return (

        <>
            <SnackBarContext.Provider value={{ ShowHideSnack }}> {children} </SnackBarContext.Provider>

            <SnackBar open={open} message={message}></SnackBar>

        </>


    )

}

export const useToast = () => {
    return useContext(SnackBarContext)
}