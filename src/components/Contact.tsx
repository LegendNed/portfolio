import { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';


export default function Contact() {
    const [output, setOutput] = useState('');
    const [state, handleSubmit] = useForm('xleawwng');

    useEffect(() => {
        if (state.succeeded) setOutput('I will try to reply as soon as possible!');
        else if (state.submitting) setOutput('Submitting...');
        else if (state.errors) setOutput('Something went wrong, please try again later.');
    }, [state]);

    return (
        <form className="contact" onSubmit={handleSubmit} aria-hidden="true">
            <input
                type="email"
                name="email"
                placeholder="EMAIL"
                required
            />

            <textarea
                name="message"
                placeholder="MESSAGE"
                required
            />

            <button type="submit" disabled={state.submitting} id="my-form-button">Submit</button>
            <p>{output}</p>
        </form>
    );
} 