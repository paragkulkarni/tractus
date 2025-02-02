import { useEffect } from "react"
import socket from "../socket"

const useSocketSetup = () => {
    useEffect(() => {
        socket.connect()
    },[])
}

export default useSocketSetup;