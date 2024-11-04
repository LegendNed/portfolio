import Modal from "../components/Modal";
import skills from "../assets/windows/skills.json";

const text = skills.text.join('\n\n')
export default function Skills() {
    return (
        <Modal name="skills" title="Skills & Experience" width="390px">
            <div
                className="new-line"
                style={{ margin: 0 }}
                dangerouslySetInnerHTML={{ __html: text }}
            />

            <div style={{ marginTop: "20px" }} />
            {skills.skills.map(skill => (
                <div key={skill.name}>
                    <h4 style={{ color: skill?.category ? "#A14151" : ""}}>{skill.name}</h4>
                    <div className="progress">
                        <div className="progress-bar" style={{width: skill.value}} />
                    </div>
                </div>
            ))}
        </Modal>
    )
}