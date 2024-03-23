import { createContext, useEffect, useRef, useState } from "react"
import { STORAGE_NAME, defaultValues } from "../constant"

export const valueContext = createContext()

const ValueContext = ({ children }) => {
    const [values, setValues] = useState(defaultValues)
    const addedValues = useRef([])

    useEffect(() => {
        const previousValues = localStorage.getItem(STORAGE_NAME)
        if (previousValues) {
            try {
                const parsedValues = JSON.parse(previousValues)
                setValues(prev => [...prev, ...parsedValues].sort((a, b) => a - b))
                addedValues.current = [...parsedValues]
            }
            catch (e) {
                console.error("Saved values seem wrong", e)
            }
        }
    }, [])

    const addValue = (newValue) => setValues(prev => [...prev, newValue].sort((a, b) => a - b))
    const removeValue = (value) => {
        const idx = values.indexOf(value)
        setValues(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)])
    }

    return <valueContext.Provider value={{ values, addValue, removeValue, addedValues }}>{children}</valueContext.Provider>
}

export default ValueContext