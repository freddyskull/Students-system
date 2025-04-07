import React from 'react'
import { useParams } from 'react-router-dom';
import { CreateStudent } from '../createStudent';

export const EditStudet = () => {
  // necesito recibir la cedula del estudiante y convertirala a un numero
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);
  
  return (
    <>
      <CreateStudent studentId={studentId} />
    </>
  )
}
