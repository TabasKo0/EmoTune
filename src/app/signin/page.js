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
    return <div className={"flex justify-center items-start h-screen mt-10"}><button onClick={handleSignIn} className="bg-tertbac p-4 rounded-[36px]">Sign In with Spotify</button></div>;
}
