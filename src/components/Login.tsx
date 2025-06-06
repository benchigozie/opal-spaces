import Button from "./Button"

function Login() {
  return (
    <div className="w-full flex flex-col gap-6">
      <form action="" className="flex flex-col gap-3 w-full-">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-my-brown">Email</label>
          <input type="email" id="email" className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-my-brown">Password</label>
          <input type="password" id="password" className="rounded-full shadow-sm  py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <Button btnText="Login" className="text-my-white bg-light-wood" />
      </form>
      <div>
        <p className="hover:text-my-gray/50 cursor-pointer text-my-brown">Forgot Password?</p>
      </div>
    </div>
  )
}

export default Login