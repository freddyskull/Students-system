import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const NavHeader = () => {
  return (
    <div id='nav' className="shadow-sm p-4">
      <div className="mx-auto container">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" >
              <span className="font-bold text-2xl uppercase">LOGO</span>
            </Link>
          </div>
          <div>
            <Button variant='outline'>Cerrar Sesión</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
