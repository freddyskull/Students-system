import { useNavigate } from "react-router-dom"
import { FearturedCard } from "./components/fearturedCard"
import { useState } from "react";
import { Datatable } from "@/components/datatable";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { NavHeader } from "./navHeader";

export interface FearturedCard {
  title: string
  subtitle: string
  badgeText: string
  contentLabel: string
  contentValue: string
}

export interface Students {
  cedula: number
  name: string
  lastName: string
  year: number
  secction: string
  createdAt: Date
  updateAt: Date
}

export const HomePage = () => {
  const navigate = useNavigate(); 

  const [fearturedCardObject] = useState<FearturedCard[]>([
    {
      title: "Total de Estudiantes",
      subtitle: "Estadísticas Generales",
      badgeText: "+12.5%",
      contentLabel: "Estudiantes Activos",
      contentValue: "1,200"
    },
    {
      title: "Nuevos Ingresos",
      subtitle: "Último Mes",
      badgeText: "+8.3%",
      contentLabel: "Nuevos Estudiantes",
      contentValue: "150"
    },
    {
      title: "Graduados",
      subtitle: "Último Año",
      badgeText: "+5.0%",
      contentLabel: "Estudiantes Graduados",
      contentValue: "300"
    },
    {
      title: "Estudiantes Retirados",
      subtitle: "Último Año",
      badgeText: "-2.1%",
      contentLabel: "Estudiantes Retirados",
      contentValue: "50"
    }
  ]);

  // const students<Students> mockData = [
  const mockData: Students[] = [
    { cedula: 12345678, name: "Juan", lastName: "Pérez", year: 2023, secction: "A", createdAt: new Date('2023-01-15'), updateAt: new Date() },
    { cedula: 87654321, name: "Ana", lastName: "Gómez", year: 2025, secction: "B", createdAt: new Date('2022-11-20'), updateAt: new Date() },
    { cedula: 11223344, name: "Carlos", lastName: "López", year: 2028, secction: "C", createdAt: new Date('2021-06-10'), updateAt: new Date() },
    { cedula: 22334455, name: "María", lastName: "Fernández", year: 2030, secction: "D", createdAt: new Date('2020-03-05'), updateAt: new Date() },
    { cedula: 33445566, name: "Luis", lastName: "Martínez", year: 1994, secction: "E", createdAt: new Date('2019-08-25'), updateAt: new Date() },
    { cedula: 44556677, name: "Laura", lastName: "García", year: 2022, secction: "F", createdAt: new Date('2018-12-30'), updateAt: new Date() },
    { cedula: 55667788, name: "Pedro", lastName: "Sánchez", year: 2024, secction: "G", createdAt: new Date('2017-09-15'), updateAt: new Date() },
    { cedula: 66778899, name: "Sofía", lastName: "Torres", year: 2026, secction: "H", createdAt: new Date('2016-07-20'), updateAt: new Date() },
    { cedula: 77889900, name: "Andrés", lastName: "Ramírez", year: 2027, secction: "I", createdAt: new Date('2015-05-10'), updateAt: new Date() },
    { cedula: 88990011, name: "Isabel", lastName: "Cruz", year: 2029, secction: "J", createdAt: new Date('2014-02-18'), updateAt: new Date() },
    { cedula: 99001122, name: "Diego", lastName: "Reyes", year: 2021, secction: "K", createdAt: new Date('2013-11-12'), updateAt: new Date() },
    { cedula: 10111213, name: "Valeria", lastName: "Vásquez", year: 2020, secction: "L", createdAt: new Date('2012-10-22'), updateAt: new Date() },
    { cedula: 12131415, name: "Javier", lastName: "Mendoza", year: 2019, secction: "M", createdAt: new Date('2011-09-30'), updateAt: new Date() },
    { cedula: 13141516, name: "Camila", lastName: "Morales", year: 2018, secction: "N", createdAt: new Date('2010-08-14'), updateAt: new Date() },
    { cedula: 14151617, name: "Fernando", lastName: "Salazar", year: 2017, secction: "O", createdAt: new Date('2009-07-28'), updateAt: new Date() },
    { cedula: 15161718, name: "Natalia", lastName: "Cordero", year: 2016, secction: "P", createdAt: new Date('2008-06-11'), updateAt: new Date() },
    { cedula: 16171819, name: "Ricardo", lastName: "Paniagua", year: 2015, secction: "Q", createdAt: new Date('2007-05-23'), updateAt: new Date() },
  ];
  // create a columns array for the table
  const columnHelper = createColumnHelper<Students>()
  const columns = [
    columnHelper.accessor('cedula', {
      header: "Cédula",
      cell: info => <div className="font-bold">{(info.getValue() as number)}</div>,
    }),
    columnHelper.accessor('name', {
      header: "Nombre",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('lastName', {
      header: "Apellido",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('year', {
      header: () => <div className="text-center">año</div>,
      cell: info => <div className="font-bold text-center">
        <Badge className="font-bold" >{info.getValue()}</Badge>
      </div>,
    }),
    columnHelper.accessor('secction', {
      header: () => <div className="text-center">Sección</div>,
      cell: info => <div className="text-center">
        <Badge className="font-bold" variant="outline">{info.getValue()}</Badge>
      </div>,
    }),
    columnHelper.accessor('createdAt', {
      header: () => <div className="text-center">Fecha de Creación</div>,
      cell: info => <div className="text-center">
        <Badge variant='outline'>{(info.getValue() as Date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Badge>
      </div>,
    }),
  ];

  const additionalActions = [
    {
      label: "constancia de estudios",
      onClick: (row: Students) => console.log("constancia de estudios", row),
    },
    {
      label: "Constancia inscripción",
      onClick: (row: Students) => console.log("Constancia de inscripción", row),
    },
    {
      label: "Constancia retiro",
      onClick: (row: Students) => console.log("Constancia de retiro", row),
    },
  ];

  return (
    <main className="">
      <NavHeader />
      <div id="content" className="bg-blue-50 w-full h-[94vh]">
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mx-auto mt-8 container">
          {fearturedCardObject.map((card, index) => (
            <FearturedCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              badgeText={card.badgeText} 
              contentLabel={card.contentLabel} 
              contentValue={card.contentValue}
            />
          ))}
        </div>
        <div id="datable" className="mx-auto mt-8 container">
          <Datatable 
            columns={columns} 
            data={mockData} 
            tableTitle="Datos de Estudiantes" 
            onDelete={(row) => console.log('Delete', row)} 
            onEdit={(row) => { navigate(`/editar-estudiante/${row.cedula}`) }} 
            additionalActions={additionalActions} 
            onAddTable={{ label: "Estudiante", onClick: () => {navigate("/nuevo-estudiante")} }} />
        </div>
      </div>
    </main>
  )
}
