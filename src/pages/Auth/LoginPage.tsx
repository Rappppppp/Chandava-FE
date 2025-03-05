import AuthBackground from "@assets/images/login-bg.jpg"
import Logo from "@assets/logo/logo.jpg"
import Input from "@features/auth/components/Input"


const LoginPage = () => {
    return (

        <div className="relative h-screen w-screen flex flex-col lg:flex-row bg-black">
            <div
                className="fixed inset-0 bg-black brightness-50"
                style={{
                    backgroundImage: `url(${AuthBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                }}
            />
            {/* Content Goes Here */}
            <div className="relative z-10 text-white w-full lg:w-1/2 flex flex-col items-center justify-center px-10 py-10">
            <img src={Logo} alt="" className="aspect-square w-[6.25rem] lg:w-[9.375rem] rounded-full mb-3" />
                <h1 className="text-4xl lg:text-6xl text-center  font-water-brush">Welcome to Chandava Lake Resort and Resto</h1>
                <p className="text-lg lg:text-2xl">your gateway to relaxation</p>
            </div>

            <div className="relative z-10 text-white  flex-1 flex lg:items-center justify-center px-10  lg:px-30 py-10 lg:py-20 backdrop-blur-sm">
                <form className="w-full lg:border border-white/30 lg:rounded-2xl lg:p-10" autoComplete="off">
                    <h1 className="text-xl lg:text-2xl font-bold mb-3">Log In. Relax. Enjoy.</h1>
                    <p className="mb-5">Secure your stay in just a few clicks!</p>
                    <Input icon="Mail" type="email" name="email" label="Email Address" />
                    <Input icon="Key" type="password" name="password" label="Password"/>

                    <div className="mt-5">
                        <button className="border border-white/30 disabled:bg-white/10 disabled:cursor-not-allowed hover:bg-white/10 transition-all w-full py-3 rounded-2xl font-bold cursor-pointer">Login</button>
                    </div>

                    <div className="mt-5 text-center">
                        <p className="underline">Don't have an account? Click here.</p>
                    </div>

                    <div className="mt-3 text-center">
                        <p className="underline">Forgot password?</p>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default LoginPage;