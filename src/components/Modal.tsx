import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import ReactModal from "react-modal"
import { emitter } from "../eventEmitter"

interface ModalProps {
    name: string,
    title: string,
    fullscreen?: boolean,
    closable?: boolean,
    width: string,
    children: React.ReactNode
}

export default function Modal(props: ModalProps) {
    const { name, title, fullscreen, closable = true, width, children } = props
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = useRef(null);

    useEffect(() => {
        emitter.on("toggle-window", (win: { name: string, force?: boolean }) => {
            if (win.name !== name) return;
            setIsOpen(prev => win.force ?? !prev);
        });
    }, []);

    return (
        <ReactModal
            id={name}
            contentLabel={name}
            isOpen={isOpen}
            overlayClassName="window"
            ariaHideApp={false}
            className={"window"}
        >
            <Draggable handle=".window-navigation" nodeRef={nodeRef} defaultPosition={{ x: window.innerWidth / 2, y: (window.innerHeight / 2 ) }}>
                <div className="window-content " style={{ width, zIndex: 1000 }} ref={nodeRef}>
                    <div className="window-navigation">
                        <div className="traffic-lights focus">
                            <button
                                className={`traffic-light traffic-light-close ${!closable ? 'disabled' : ''}`}
                                id="close"
                                onClick={() => setIsOpen(false)}
                            >
                                <svg width="7" height="7" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        stroke="#000"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        d="M1.182 5.99L5.99 1.182M5.99 6.132L1.182 1.323"
                                    />
                                </svg>
                            </button>
                            <button
                                className="traffic-light traffic-light-minimize disabled"
                                id="minimize"
                                tabIndex={0}
                            >
                                <svg width="7" height="2" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        stroke="#000"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        d="M.61.703h5.8"
                                    />
                                </svg>
                            </button>
                            <button
                                className={`traffic-light traffic-light-maximize ${!fullscreen ? 'disabled' : ''}`}
                                id="maximize"
                                onClick={() => { }}
                                tabIndex={0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.73 15">
                                    <polyline points="0 15 0 3.38 11.29 15" />
                                    <polyline points="14.73 10.89 14.73 0 4.28 0" />
                                </svg>
                            </button>
                        </div>

                        {title}
                    </div>
                    <section className="window-inside">
                        {children}
                    </section>
                </div>
            </Draggable>
        </ReactModal>
    )
}