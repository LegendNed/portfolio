import Modal from "../components/Modal";
import socials from "../assets/windows/socials.json";

let images: { [key: string]: string } = {};
for (let social of socials) {
    if (social.name == "br") continue;

    let image: any = new URL(
        `../assets/images/${social.name}.png`,
        import.meta.url
    );

    images[social.name] = image;
}
export default function Socials() {
    return (
        <Modal name="socials" title="Social Media" width="280px">
            {socials.map(item => (
                <div className="space-between" key={item.name}>
                    <div className="socials">
                        {item.name == "br"
                            ? <div style={{ marginBottom: "10px" }} />
                            : <div>
                                <img src={images[item.name]} width="16" />
                                <h4>{item.name}</h4>
                            </div>
                        }
                    </div>
                    <h4 className="socials">
                        <strong>
                            <a href={item.href} aria-hidden target="_blank">
                                {item.text || ""}
                            </a>
                        </strong>
                    </h4>
                </div>
            ))}
        </Modal>
    )
}