import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="z-1000 fixed top-0 flex h-[80px] w-screen items-center justify-between bg-[#F3F5F9] px-5">
      <h1 className="text-4xl font-semibold leading-[54.66px]">Stamps</h1>
      <h1 onClick={() => navigate("/login")} className="text-lg font-semibold leading-[54.66px] hover:text-blue-600  cursor-pointer">Login</h1>
    </div>
  )
}

export default Navbar
