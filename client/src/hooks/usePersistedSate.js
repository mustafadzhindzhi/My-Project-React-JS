import { useState } from "react"

export default function usePersistedState(key, defaultValue) { //copy api of useState
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key);

        if (persistedState) {
            return JSON.parse(persistedState);
        };

        return defaultValue;
    });

    const setPersistedState = (value) => {
        setState(value);

        let serializedValue; //object to string
        if (typeof value === 'function') {
            serializedValue = JSON.stringify(value(state));
        } else {
            serializedValue = JSON.stringify(value);
        }

        localStorage.setItem(key, serializedValue) //our key is 'auth'
    };

    return [
        state,
        setPersistedState
    ]
}