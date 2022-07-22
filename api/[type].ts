import type { VercelRequest, VercelResponse } from '@vercel/node';

import SpotifyWebApi from 'spotify-web-api-node';
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.VERCEL
        ? process.env.redirectUri
        : `http://localhost:3000/api/callback`
});

import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL as string)

export default async function (req: VercelRequest, res: VercelResponse) {
    const { type } = req.query

    if (type === 'listening') {
        let accessToken = await redis.hget('tokens', 'access')

        if (!accessToken)
            return res.redirect(spotifyApi.createAuthorizeURL(['user-read-currently-playing'], 'state'));

        const refreshToken = await redis.hget('tokens', 'refresh')
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.setRefreshToken(refreshToken as string)

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
                            redis.hset('tokens', 'access', data.body['access_token'])

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

            redis.hset('tokens', 'access', data.body['access_token'])
            redis.hset('tokens', 'refresh', data.body['refresh_token'])

            return res.redirect('/api/listening')
        })
    } else return res.status(400).send('Beep Boop?')
}