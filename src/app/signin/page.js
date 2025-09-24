"use client";

export default function SignInPage() {

    async function handleSignIn() {
        try {
            const res=await fetch('/api/auth/signin');
            const data= await res.json();
            if (res.ok) {
                window.location.href = data.url;
            }
            else {
                console.error('Failed to get sign-in URL:', data);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    }
    return <div><button onClick={handleSignIn}>Sign In with Spotify</button></div>;
}
