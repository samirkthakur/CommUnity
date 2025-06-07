import { auth } from "../firebaseConfig"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Button } from "../../components/ui/button";
import { FcGoogle } from "react-icons/fc"

const Auth = () => {
    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const apiUrl = import.meta.env.VITE_API_URL;
            await fetch(`${apiUrl}/api/users`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                })
            })
            console.log("User data saved");
            
        } catch (error) {
            console.error("Error signing in", error);
        }
    }
    return (
        <div>
        <Button variant="outline" onClick={ googleSignIn } className="w-full gap-2">
                <FcGoogle size={20} /> Continue with Google
        </Button>
        </div>
    )
}

export default Auth;