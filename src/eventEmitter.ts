import mitt from "mitt"

type Events = {
    "toggle-window": {
        name: string
        force?: boolean
    }
    "focus-window": {
        name: string
    }
}

export const emitter = mitt<Events>()