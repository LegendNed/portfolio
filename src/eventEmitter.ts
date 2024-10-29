import mitt from "mitt"

type Events = {
    "toggle-window": {
        name: string
        force?: boolean
    }
}

export const emitter = mitt<Events>()