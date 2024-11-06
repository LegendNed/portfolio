import { SpotifyResponse } from "../../types";
import Quotes from "../assets/quotes.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPowerOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState, useMemo } from "react";
import date from "date-and-time"
import ElevatorMusic from "../assets/audio.mp3"
import nothingImage from "../assets/images/nothing.jpg"
import Modal from "./Modal";
import { emitter } from "../eventEmitter";

const quote = Quotes[Math.floor(Math.random() * Quotes.length)]
const audio = new Audio(ElevatorMusic)
audio.volume = 0.3
export default function Navigation() {
    const [time, setTime] = useState(new Date())
    const tick = useCallback(() => setTime(new Date()), [])
    useEffect(() => {
        const timer = setInterval(tick, 1000)
        return () => clearInterval(timer)
    }, [])
    const timeString = useMemo(() => date.format(time, "ddd, MMM DD⠀ hh:mm A"), [time])

    const [isPlaying, setIsPlaying] = useState(false)
    function notification() {
        isPlaying ? audio.pause() : audio.play()
        setIsPlaying(!isPlaying)
    }

    const [lData, setLData] = useState({} as SpotifyResponse)
    async function getListeningData() {
        let data = {} as SpotifyResponse;
        try {
            const response = await fetch("/api/listening")
            data = await response.json()
        } catch {}
        setLData(data)
        emitter.emit("toggle-window", { name: "listening" })
    }
    function formatName(data: SpotifyResponse, truncate?: boolean) {
        if (!data.is_playing) return "Currently nothing...";
        return data.item.name.length >= 20 && truncate
            ? `${data.item.name.substring(0, 20)}...`
            : data.item.name;
    }


    return (
        <>
            <div className="nav-bar" aria-hidden="true">
                <div className="nav-quote">{quote}</div>
                <div className="nav-time">{timeString}</div>
                <div className="nav-icons">
                    <FontAwesomeIcon icon={faVolumeUp} onClick={() => getListeningData()} />
                    <FontAwesomeIcon icon={faBell} onClick={notification} />
                    <FontAwesomeIcon icon={faPowerOff} onClick={() => window.close()} />
                </div>
            </div>
            <Modal name="listening" title="I'm currently listening to..." width="420px">
                <div className="space-between">
                    <div aria-live="off">
                        <a
                            href={lData.is_playing ? lData.item?.external_urls.spotify : "#"}
                            target="_blank"
                        >
                            <h1 style={{ margin: 0 }}>
                                <abbr title={formatName(lData)} aria-hidden="true">
                                    {formatName(lData, true)}
                                </abbr>
                            </h1>
                        </a>
                        {lData.is_playing ? <div className="artists">
                            <h3>By</h3>
                            {lData.item.artists.map((artist, index) => (
                                <h3 key={index}>
                                    <a
                                        href={artist.external_urls.spotify}
                                        target="_blank"
                                        style={{ marginRight: 0 }}
                                    >
                                        {artist.name}
                                    </a>
                                        {index + 1 == lData.item.artists.length ? "" : ", "}
                                </h3>
                            ))}
                        </div> : <h3 style={{ margin: 0 }} aria-hidden="true">By nobody...</h3>}
                        <div style={{marginLeft: "-20px"}}>
                            <p style={{ margin: "20px 0 -17px 20px" }} aria-hidden="true">Preview</p>
                             <audio
                                id="audio"
                                controls
                                controlsList="nodownload"
                                aria-hidden="true"
                            >
                                <source
                                    src={lData.is_playing ? lData.item.preview_url : ''}
                                    type="audio/mpeg"
                                />
                                Question, how doesnt your browser support audio?
                            </audio>
                        </div>
                    </div>
                    <div style={{ marginLeft: "-5px", width: "150px"}}>
                        <img
                            src={lData.is_playing ? lData.item.album.images[0].url : nothingImage}
                            width="150"
                            style={{borderRadius: "0.4rem"}}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}