import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const delayPara = (index,nextWord)=>{

}

const ContextProvider = (props) => {
    
    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt,setPrevPrompt] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const onSent = async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input)
        const response = await run(input)
        // let responseArray
        setResultData(response)
        setLoading(false)
        setInput("")

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