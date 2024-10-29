import { emitter } from "../../eventEmitter"
import Icon from "./icon"

const items = [
    { icon: "about", text: "About" },
    { icon: "skills", text: "Skills" },
    { icon: "projects", text: "Projects" },
    { icon: "socials", text: "Socials" },
    { icon: "contact", text: "Contact", aria: "Contact form" },
]

export default function Dock() {
    function toggle(name: string) {
        emitter.emit("toggle-window", { name })
    }

    return (
        <div className="dock">
            {items.map((item) => (
                <Icon
                    key={item.text}
                    icon={item.icon}
                    text={item.text}
                    onClick={() => toggle(item.icon)}
                />
            ))}
            <Icon
                icon="coffee"
                text="Support"
                onClick={() => window.open("https://www.buymeacoffee.com/nedst")}
            />
        </div>
    )
}