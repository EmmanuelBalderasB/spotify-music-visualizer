export default async function codeChallenge() {
  let results;

  function generateCodeVerifier(length) {
    console.log("Generating code verifier...");
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log("Generated code verifier:", text);
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    console.log("Generating code challenge for verifier:", codeVerifier);
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const challenge = btoa(
      String.fromCharCode.apply(null, [...new Uint8Array(digest)])
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    console.log("Generated code challenge:", challenge);
    return challenge;
  }

  async function redirectToAuthCodeFlow(clientId) {
    console.log("Redirecting to auth code flow with client ID:", clientId);
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    console.log("Storing verifier in localStorage:", verifier);
    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append(
      "scope",
      "user-read-private user-read-email user-library-read playlist-read-private playlist-read-collaborative"
    );
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    console.log("Redirecting to URL:", authUrl);
    document.location = authUrl;
  }

  async function getAccessToken(clientId, code) {
    console.log(
      "Getting access token with client ID:",
      clientId,
      "and code:",
      code
    );
    const verifier = localStorage.getItem("verifier");
    console.log("Retrieved verifier from localStorage:", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    console.log("Requesting access token...");
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!result.ok) {
      console.error(
        `Failed to get access token: ${result.status} ${result.statusText}`
      );
      throw new Error(
        `Failed to get access token: ${result.status} ${result.statusText}`
      );
    }

    const { access_token } = await result.json();
    console.log("Retrieved access token:", access_token);
    return access_token;
  }

  async function fetchTracks(accessToken) {
    console.log("Fetching tracks with access token:", accessToken);
    const result = await fetch(
      "https://api.spotify.com/v1/me/tracks?market=MX&limit=20&offset=0",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const tracks = await result.json();
    console.log("Fetched tracks:", tracks);
    return tracks;
  }

  const clientId = "f3401270f9e646908f19c3fbb2d829c5";
  console.log("Client ID:", clientId);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log("Authorization code from URL params:", code);

  if (!code) {
    console.log(
      "No authorization code found, redirecting to auth code flow..."
    );
    redirectToAuthCodeFlow(clientId);
  } else {
    console.log("Authorization code found, getting access token...");
    const accessToken = await getAccessToken(clientId, code);
    console.log("Fetching tracks with access token...");
    results = await fetchTracks(accessToken);
    console.log("Returning results...");
    return results;
  }
}
