import { useEffect, useState } from 'react';

type InitialValue<T> = T | (() => T);

export const useLocalStorage = <T>(key: string, initValue: InitialValue<T>): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const getLocalValue = (): T => {
        const localValue = localStorage.getItem(key);
        return localValue ? JSON.parse(localValue) : typeof initValue === 'function' ? (initValue as () => T)() : initValue;
    };

    const [value, setValue] = useState<T>(getLocalValue());

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};