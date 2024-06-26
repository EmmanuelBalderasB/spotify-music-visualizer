export default async function codeChallenge(codeArg) {
  let results;
  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append(
      "redirect_uri",
      "https://spotify-music-visualizer.vercel.app" //PRODUCTION REDIRECT URI
      //"http://localhost:5173/callback" //LOCAL REDIRECT URI
    ); //REDURECT URI
    params.append(
      "scope",
      "user-read-private user-read-email user-library-read playlist-read-private playlist-read-collaborative"
    );
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append(
      "redirect_uri",
      "https://spotify-music-visualizer.vercel.app" //PRODUCTION REDIRECT URI
      //"http://localhost:5173/callback" //LOCAL REDIRECT URI
    ); //REDIRECT URI
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!result.ok) {
      throw new Error(
        `Failed to get access token: ${result.status} ${result.statusText}`
      );
    }

    const { access_token } = await result.json();
    return access_token;
  }

  function generateCodeVerifier(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  const clientId = "f3401270f9e646908f19c3fbb2d829c5";
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    const accessToken = await getAccessToken(clientId, codeArg);
    results = await fetchTracks(accessToken);
    return results;
  }

  async function fetchTracks(code) {
    const result = await fetch(
      "https://api.spotify.com/v1/me/tracks?market=MX&limit=20&offset=0",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${code}` },
      }
    );
    return await result.json();
  }
}
