import type { VercelRequest, VercelResponse } from '@vercel/node';

import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.VERCEL
        ? process.env.redirectUri
        : `http://localhost:3000/api/callback`
});

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'api', 'config.json');
const config = JSON.parse(readFileSync(file, 'utf8'))

function writeFile() {
    const data = JSON.stringify(config, null, 2);
    writeFileSync(file, data, 'utf8');
}

if (config.accessToken && config.refreshToken) {
    spotifyApi.setAccessToken(config.accessToken);
    spotifyApi.setRefreshToken(config.refreshToken);
}

export default function (req: VercelRequest, res: VercelResponse) {
    const { type } = req.query

    if (type === 'listening') {
        if (!config.first) {
            config.first = true
            writeFile()

            return res.redirect(spotifyApi.createAuthorizeURL(['user-read-currently-playing'], 'state'));
        }

        function getTrack() {
            spotifyApi
                .getMyCurrentPlayingTrack()
                .then((data) => {
                    res
                        .status(200)
                        .send(data.body);
                }).catch((error) => {
                    if (!error.message.includes('token expired')) return

                    spotifyApi
                        .refreshAccessToken()
                        .then((data) => {
                            spotifyApi.setAccessToken(data.body['access_token'])
                            writeFile()

                            getTrack()
                        })
                })
        }

        return getTrack()

    } else if (type === 'callback') {
        let { code } = req.query
        if (!code) return res.status(404).send("Shit")

        spotifyApi.authorizationCodeGrant(code as string).then((data) => {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);

            config.accessToken = data.body['access_token']
            config.refreshToken = data.body['refresh_token']
            writeFile()

            return res.redirect('/api/listening')
        })
    } else return res.status(400).send('Beep Boop?')
}