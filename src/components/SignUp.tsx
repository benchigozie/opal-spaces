
import Button from "./Button";

function SignUp() {
  return (
    <div className="w-full">
      <form action="" className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="first-name" className="text-my-brown">First Name</label>
          <input type="text" id="first-name" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last-name" className="text-my-brown">Last Name</label>
          <input type="text" id="last-name" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-my-brown">Email</label>
          <input type="email" id="email" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-my-brown">Password</label>
          <input type="password" id="password" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-my-brown">Confirm password</label>
          <input type="password" id="confirm-password" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
        </div>
        <Button btnText="Create Account" className="text-my-white bg-light-wood" />
      </form>
    </div>

  )
}

export default SignUp