import { generateRandomString, sha256, base64encode } from '../utils/auth';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:3000/callback';
const scope = 'user-read-private user-read-email';

const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export default function Home() {
    return (
        <div>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
}
