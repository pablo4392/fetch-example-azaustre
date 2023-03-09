import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null)

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
         
        fetch(url, {signal: abortController.signal})
            .then((response) =>  response.json())
            .then((data) => setData(data))
            .catch((error) => {
                if(error.name === "AbortError") {  //en caso de que la accion sea cancelada por el usuario, se ejecutara un nuevo tipo de error    
                    console.log("Request Cancelled");
                } else{
                    setError(error);
                }
            }) //si existiera algun error en la promesa nos permitira mostrarlo
            .finally(() => setLoading(false)) //se ejecutara una vez queterminen de cumplirse las promesas

        return() => abortController.abort();
    }, []);

    const handleCancelRequest = () => {
        if(controller){
            controller.abort();
            setError("Request cancelled")
        }
    }

    return {data, loading, error, handleCancelRequest};
}
