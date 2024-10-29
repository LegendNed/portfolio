import { useEffect, useRef } from "react";
import Modal from "../components/Modal";
import { emitter } from "../eventEmitter";

import about from "../assets/windows/about";
import imgMe from "../assets/images/me.png";

export default function About() {
    const contentRef = useRef<any>(null)

    useEffect(() => {
        const clickable = contentRef?.current?.querySelector("#clickable");
        if (!clickable) return;

        function handleToggle(event: Event) {
            console.log("clicked")
            event.preventDefault();

            emitter.emit("toggle-window", { name: "about", force: false });
            emitter.emit("toggle-window", { name: "contact", force: true });
        }

        clickable.addEventListener("click", handleToggle);

        return () => {
            clickable.removeEventListener("click", handleToggle);
        }
    }, []);

    return (
        <Modal name="about" title="About me" width="670px">
            <div className="space-between">
                <div className="new-line" ref={contentRef} dangerouslySetInnerHTML={{ __html: about }} />
                <div className="about-image">
                    <img src={imgMe} width="250" style={{ borderRadius: "0.4rem" }} />
                </div>
            </div>
        </Modal>
    )
}