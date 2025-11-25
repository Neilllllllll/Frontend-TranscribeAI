import { useEffect, useState } from "react";

export default function ({blob}){
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (!blob) {
            setUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [blob]);
    return(
        <audio style={{ width: '80%' }} controls src = {url}></audio>
    );
}