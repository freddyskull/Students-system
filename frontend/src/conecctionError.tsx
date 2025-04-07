import React from 'react'
import { NavHeader } from './app/navHeader'
import { Button } from './components/ui/button'

export const ConecctionError = () => {
  return (
    <>
      <NavHeader />
      <div id="content" className="flex flex-col justify-center items-center bg-blue-50 w-full h-[90vh]">
        <p>Error: No se puede establecer una conexión con la base de datos</p>
        <p className="mt-2 text-gray-600">Si el problema persiste, por favor contacte al soporte.</p>
        <div className="mt-4">
          <Button onClick={() => window.location.href = "/" }>Reintentar</Button>
        </div>
      </div>
    </>
  )
}
