interface IconProps {
    icon: string,
    text: string,
    onClick?: () => void
}

export default function Icon(props: IconProps) {
    const { icon, text, onClick = () => { } } = props
    const image = new URL(`../../assets/images/${icon}.webp`, import.meta.url)

    return (
        <div className="dock-icon" tabIndex={0} onClick={onClick}>
            <img src={image.href} alt={text} />
            <span>{text}</span>
        </div>
    )
}