import { auth } from '../../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Handle the sign-in result
                console.log('User signed in:', result.user);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error during sign-in:', error);
            });
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default Login;
