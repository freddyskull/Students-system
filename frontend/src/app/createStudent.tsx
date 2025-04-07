import { NavHeader } from './navHeader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'


export const CreateStudent = ({ studentId }: { studentId?: number }) => {
  const navigate = useNavigate(); 
  
  console.log(studentId)

  const secctionOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
  ]
  const [selectedSection, setSelectedSection] = useState('A');
  const handleSubmit = () => {
    const studentData = {
      cedula: parseInt((document.getElementById('cedula') as HTMLInputElement).value, 10),
      name: (document.getElementById('name') as HTMLInputElement).value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      year: parseInt((document.getElementById('year') as HTMLInputElement).value, 10),
      section: selectedSection,
    };
    console.log(studentData);
    
    // Redireccionar a la página de inicio después de crear el estudiante
    // window.location.href = '/';
  }
    

  return (
    <main>
      <NavHeader />
      <div id="content" className="bg-blue-50 w-full h-[94vh]">
        <div className="flex justify-center items-center px-4 h-full">
          <div className="bg-white shadow-md mt-8 p-4 py-8 rounded-lg w-full max-w-md">
            <h2 className="mb-4 font-bold text-2xl text-center uppercase">
              {studentId ? "Editar Estudiante" : "Crear Estudiante"}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
              <div className="mb-4 px-4">
                <Label className='uppercase' htmlFor="cedula">Cédula</Label>
                <Input className='mt-2' type="number" id="cedula" min="10000000" max="999999999" required />
              </div>
              <div className="mb-4 px-4">
                <Label className='uppercase' htmlFor="name">Nombres</Label>
                <Input className='mt-2' type="text" id="name" required />
              </div>
              <div className="mb-4 px-4">
                <Label className='uppercase' htmlFor="lastName">Apellidos</Label>
                <Input className='mt-2' type="text" id="lastName" required />
              </div>
              <div className="mb-4 px-4">
                <Label className='uppercase' htmlFor="year">Año</Label>
                <Input className='mt-2' type="number" id="year" min="1955" max="2100" required />
              </div>
              <div className="mb-4 px-4">
                <Label className='uppercase' htmlFor="section">Sección</Label>
                <Select defaultValue={selectedSection} required>
                  <SelectTrigger className="mt-2 w-full" aria-label="Sección">
                    <SelectValue placeholder="Selecciona una sección" />
                  </SelectTrigger>
                  <SelectContent>
                    {secctionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} onClick={() => setSelectedSection(option.value)}>
                        <b>{option.label}</b>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='mt-8 px-4 w-full'>
                <Button type="submit" className={`w-full ${studentId ? "bg-amber-400 text-slate-700" : null}`}>
                  {studentId ? "Editar Estudiante" : "Crear Estudiante"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
