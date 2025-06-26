import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { themeChange } from 'theme-change'
import { Leaf, LucideShoppingBag, Sun, Moon } from "lucide-react"
import { Link } from "react-router"
import PanierStore from '@/stores/panierStore'
import ShoppingCart from '@/layouts/Panier'
import { ANIMATION_VARIANTS } from '@/utils/animations'


export default function NavBar() {

  const [theme, setTheme] = useState('light')

  const { openCart, cartItems } = PanierStore();
 
  let savedUser = JSON.parse(localStorage.getItem('user'));


  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );


  useEffect(() => {
    themeChange(false)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={ANIMATION_VARIANTS.container}
    >
      <motion.div className="navbar shadow-lg top-0 fixed z-20 backdrop-blur-3xl" variants={ANIMATION_VARIANTS.item}>
        <div className="flex-1">
          <div className="flex">
            <Link to={"/"} className="ml-2 text-3xl font-semibold bg-linear-90 to-green-700 from-gray-700 text-transparent bg-clip-text cursor-pointer">
              TsJungle
            </Link>
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle hover:bg-green-500">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-green-500">
              <div className="indicator">
                <LucideShoppingBag />
                <span className="badge badge-sm indicator-item">{cartItems.length-1}</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-56 shadow">
              <div className="card-body">
                <span className="text-lg font-bold text-gray-700">{cartItems.length - 1 } Items</span>
                <span className="text-2xl underline text-gray-700">Subtotal: {subtotal}$</span>
                <div className="card-actions">
                  <button onClick={openCart} className="btn bg-green-600 btn-block text-white">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div  role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-16 rounded-full">
                <Link to={"/profile"}>
                       <img className="rounded-full h-20 w-20" alt={" "} src={savedUser.picture || " "} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <ShoppingCart />
    </motion.nav>
  )
}
