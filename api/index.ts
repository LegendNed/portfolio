import { Hono } from "hono";
import { cors } from "hono/cors";
import { getNowPlaying } from "./spotify";
import { JSONValue } from "hono/utils/types";

const app = new Hono<{ Bindings: Env }>();
app.use("/api/*", cors());

app.get("/api/listening", async (c) => {
    const response = await getNowPlaying(c.env);
    return c.json(response);
});


export default app;