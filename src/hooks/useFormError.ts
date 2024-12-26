import { useState } from 'react';

const useFormError = () => {
    const [errorText, setErrorText] = useState<string | null>(null);

    const clearErrorText = () => {
        setErrorText(null);
    };

    return { errorText, clearErrorText, setErrorText };
};

export default useFormError;
