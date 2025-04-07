import React from 'react'

export const EmptyState = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[50vh]'>
      <div className='flex justify-center items-center bg-slate-300 rounded-full w-24 h-24'>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z" />
        </svg>
      </div> 
      <div className="mt-4">
        <p className='font-bold text-2xl text-center uppercase'>No hay datos disponibles</p>
        <p className='mt-2 text-center'>Lo que estás buscando no existe o no lo haz creado.</p>
      </div>
    </div>
  )
}
