import LoginForm from "./components/AuthForm";


export default function LoginPage() {
    return <div
        className="w-full h-screen flex justify-center \
            items-center"
    >
        <canvas id="gradient-canvas" data-transition-in/>
        <LoginForm/>
    </div>
}
