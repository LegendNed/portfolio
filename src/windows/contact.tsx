import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useForm } from "@formspree/react";

export default function Contact() {
    const [state, handleSubmit] = useForm("xleawwng")
    const [output, setOutput] = useState("");

    useEffect(() => {
        if (state.submitting) setOutput("Sending...")
        else if (state.succeeded) setOutput("I will try to reply as soon as possible!")
        else if (state.errors) setOutput("Something went wrong, please try again later.")
    }, [state])

    return (
        <Modal name="contact" title="Contact me" width="280px">
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
        </Modal>
    );
}