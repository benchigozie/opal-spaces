type hamMenuProps = {
  isOpen : boolean;
  toggle : () => void;
}
function Hamburger( { isOpen, toggle } : hamMenuProps) {

  return (
    <button
      onClick={toggle}
      className="relative w-6 h-6 flex items-center justify-center focus:outline-none hover:cursor-pointer md:hidden"
      aria-label="Toggle menu"
    >
      <span
        className={`absolute h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-45" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute h-0.5 w-6 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${
          isOpen ? "-rotate-45" : "translate-y-2"
        }`}
      />
    </button>
  )
}

export default Hamburger