import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt,setPrevPrompt] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const onSent = async(prompt)=>{
        await run(prompt)
    }
    

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        resultData,
        loading,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;