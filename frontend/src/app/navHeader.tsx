import { Button, buttonVariants } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
// Removed incorrect import of 'json'

export const NavHeader = () => {
  const auth = JSON.parse(sessionStorage.getItem("auth") || "{}");
  const navigate = useNavigate();
  const onLogOut = () => {
    sessionStorage.removeItem("auth");
    navigate("/login");
  }
  return (
    <div id='nav' className="shadow-sm p-4">
      <div className="mx-auto container">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/home" >
              <span className="font-bold text-2xl uppercase">Bienvenido {auth.userName || 'usuario'}</span>
            </Link>
          </div>
          <div className='overflow-hidden'>
            <span onClick={onLogOut} className={`mr-2 ${buttonVariants()}`}>
              Cerra sesión
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
