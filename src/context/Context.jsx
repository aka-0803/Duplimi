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

    const delayPara = (index,nextWord)=>{
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }
    const processText = (text) => {
        // Replace ## with <h1> tags
        text = text.replace(/## (.+)/g, '<h1>$1</h1>');
        // Replace ** with <b> tags
        text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        // Replace * with <br> tags 
        text = text.replace(/\*/g, '<br>');
        return text;
      };
    const onSent = async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0;i<responseArray.length;i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        // let newResponse2 = processText(response)
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponse3 = processText(newResponse2)
        //let newResponseArray = newResponse2.split(" ");
        let newResponseArray = newResponse3.split(" ")
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        // setResultData(newResponse2)
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