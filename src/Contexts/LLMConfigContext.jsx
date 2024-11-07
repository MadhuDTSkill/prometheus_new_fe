import { createContext, useContext, useEffect, useState } from "react";

const LLMConfigContext = createContext()

export const LLMConfigContextProvider = ({ children }) => {

    const availableModels = {
        "Google": ["gemma-7b-it", "gemma2-9b-it"],
        "Meta": [
            "llama3-8b-8192",
            "llama-3.1-8b-instant",
            "llama3-70b-8192",
            "llama-3.1-70b-versatile",
        ],
        "Mistral": [
            "mixtral-8x7b-32768",
        ],
    }
    const [llmConfig, setLLMConfig] = useState({
        model: 'llama3-70b-8192',
        temperature: 0.3,
        max_tokens: 5000
    })

    const updateModel = (model) => {
        setLLMConfig({
            ...llmConfig,
            model
        })
    }

    const updateTemperature = (temperature) => {
        setLLMConfig({
            ...llmConfig,
            temperature
        })
    }

    const updateMaxTokens = (max_tokens) => {
        setLLMConfig({
            ...llmConfig,
            max_tokens
        })
    }


    return (
        <LLMConfigContext.Provider value={{
            llmConfig,
            availableModels,
            updateModel,
            updateTemperature,
            updateMaxTokens
        }}>
            {children}
        </LLMConfigContext.Provider>
    )
}

export default LLMConfigContext