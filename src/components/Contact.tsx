import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Your contact form submission logic here
    };

    return (
        <form className="contact" onSubmit={handleSubmit} aria-hidden="true">
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
                required
            />

            <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="MESSAGE"
                required
            />
            
            <ReCAPTCHA
                sitekey="6Ldmpp4bAAAAAIn0pk_nXN03djoG7h5F_GAfOOyy"
                theme="dark"
                className="g-recaptcha"
            />

            <button id="my-form-button">Submit</button>
            <p>{output}</p>
        </form>
    );
} 