import Button from "./Button"

function SignUp() {
    return (
        <section className="bg-light-wood py-18 font-Inter">
            <div className="px-4 mx-auto max-w-[1300px] flex flex-col items-center gap-3">
                <p className="text-my-white text-xl md:text-2xl font-bold">Stay Inspired. Stay Updated.</p>
                <p className="text-my-gray">Join our mailing list to get decor tips...</p>
                <div>
                    <div className="bg-my-white max-w-96 py-2 rounded-full px-2 flex justify-between gap-2">
                        <input type="text" name="" id="" placeholder="Enter your email" className="text-my-gray rounded-full px-2 w-full focus:outline-light-wood" />
                        <Button btnText="Subscribe" className="text-my-white bg-light-wood rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp