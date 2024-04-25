import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPropmt, setrecentPropmt] = useState("")
    const [prevPropmts, setprevPropmts] = useState([])
    const [showResult, setshowResult] = useState(false)
    const [loading, setloading] = useState(false)
    const [resultData, setresultData] = useState("")


    const delayPara = (index, word) => {


        setTimeout(() => {
            setresultData(prev => prev + word)
        }, 75 * index);

    }

    const newChat = ()=>{
        setloading(false)
        setshowResult(false)
    }

    const onSent = async (prompt) => {

        setresultData("")
        setloading(true)
        setshowResult(true)
        let response;
        if (prompt !== undefined) {

            setrecentPropmt(prompt)
            response = await runChat(prompt)

        } else {

            setrecentPropmt(input)
            setprevPropmts(prev => [...prev, input])
            response = await runChat(input)
        }


        const responseArray = response.split("**")

        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }


        }
        const newResponse2 = newResponse.split("*").join("</br>")

        const newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {

            delayPara(i, newResponseArray[i] + " ")

        }


        setloading(false)
        setInput("")



    }



    const ContextValue = {
        input,
        setInput,
        recentPropmt,
        setrecentPropmt,
        prevPropmts,
        setprevPropmts,
        showResult,
        loading,
        resultData,
        onSent,
        newChat,
    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider