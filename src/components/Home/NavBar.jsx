import { Leaf,Settings,LogOut,UserPen, LucideShoppingBag } from "lucide-react"
import { Link } from "react-router"



export default function NavBar() {



return <nav className="">
        <div className="navbar shadow-lg top-0 fixed z-20 backdrop-blur-3xl">
          <div className="flex-1">
            <div className="flex">
               <Link to={"/"} className="ml-2 text-3xl font-semibold bg-linear-90
                  to-green-700 from-gray-700 text-transparent bg-clip-text cursor-pointer">
                    TsJungle
                  </Link>
               <Leaf className="h-8 w-8 text-green-600" />
            </div>  
           </div>

          <div className="flex gap-1.5">
              <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-green-500">
                     <div className="indicator">
                          <LucideShoppingBag />
                          <span className="badge badge-sm indicator-item">{0}</span>
                      </div>
                  </div>


                  <div
                      tabIndex={0}
                      className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-56 shadow">
                      <div className="card-body">
                        <span className="text-lg font-bold text-gray-700">{0} Items</span>
                        <span className="text-2xl underline text-gray-700">Subtotal: 0$</span>
                        <div className="card-actions">
                          <button  className="btn bg-green-600 btn-block text-white">View cart</button>
                        </div>
                      </div>
                  </div>
           </div>

           <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                   <img className="rounded-full h-20 w-20"
                            alt={""}
                            src={""} />
                 </div>
             </div>
             
              <ul
                 tabIndex={0}
                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                  <li>
                    <Link to={"/profile"} className="justify-between">
                          Profile
                     <span className="badge"><UserPen /></span>
                    </Link>
                  </li>


                 <li>
                     <Link to={"/settings"}>Settings
                     <span className="badge"><Settings /></span>
                      </Link>
                  </li>

                  <li>
                   <Link>Logout
                    <span className="badge"><LogOut /></span> 
                     </Link>
                   </li>
              </ul>
            </div>
           </div>
         </div>    
      </nav>
}