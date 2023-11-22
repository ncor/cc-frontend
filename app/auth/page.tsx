import AuthModal from "./components/AuthModal";


export default async function Login() {
    return <div
        className="w-full h-screen flex justify-center \
            items-center grainy-background"
    >
        <AuthModal/>
    </div>
}
