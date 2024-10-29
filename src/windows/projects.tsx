import Modal from "../components/Modal";
import projects from "../assets/windows/projects.json"
import imgFolder from "../assets/images/folder.png";
import { useState } from "react";
import { emitter } from "../eventEmitter";

export default function Projects() {
    const [current, setCurrent] = useState({} as typeof projects.cur[0])

    function changeCurrent(item: typeof projects.cur[0]) {
        setCurrent(item)

        emitter.emit('toggle-window', { name: 'project', force: true })
    }

    return (
        <>
            <Modal name="project" title="Notepad" width="320px">
                <h3 style={{ marginTop: "7px" }}>
                    URL: 
                    <a
                        style={{marginLeft: "5px"}}
                        href={current.url?.href || ''}
                        target={current.url?.href ? '_blank' : ''}
                    >
                        {current.url?.text || "Nothing selected"}
                    </a>
                </h3>
                <h3 style={{marginTop: "-15px"}}>
                    Position: {current.position || "Nothing selected"}
                </h3>
                <h3 style={{marginTop: "-15px"}}>
                    {current.period}
                </h3>

                <p style={{whiteSpace: "pre-wrap"}}>{current.text}</p>
            </Modal>

            <Modal name="projects" title="Projects Explorer" width="420px">
                <div className="divider" data-text="Current Projects">
                    <hr className="left" />
                    <hr className="right" />
                </div>
                <div className="project-container">
                    {projects.cur.map(item => (
                        <div
                            className="project-icon"
                            key={item.name}
                            tabIndex={0}
                            onClick={() => changeCurrent(item)}
                        >
                            <img src={imgFolder} />
                            <h4>{item.name}</h4>
                        </div>
                    ))}
                </div>

                <div className="divider" data-text="Obsolete Projects">
                    <hr className="left" />
                    <hr className="right" />
                </div>
                <div className="project-container">
                    {projects.old.map(item => (
                        <div
                            className="project-icon"
                            key={item.name}
                            tabIndex={0}
                            onClick={() => changeCurrent(item)}
                        >
                            <img src={imgFolder} />
                            <h4>{item.name}</h4>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    )
}