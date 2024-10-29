import { SpotifyResponse } from "../types";

const nowPlayingEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const getAccessToken = async (env: Env) => {
    const basic = Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: env.SPOTIFY_REFRESH_TOKEN,
        }),
    });

    return response.json() as unknown as { access_token: string };
};

export const getNowPlaying = async (env: Env) => {
    const { access_token } = await getAccessToken(env);

    const response = await fetch(nowPlayingEndpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return response.json() as unknown as SpotifyResponse;
};
