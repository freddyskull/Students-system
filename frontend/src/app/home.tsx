import { useNavigate } from "react-router-dom"
import { FearturedCard } from "./components/fearturedCard"
import { useState, useEffect } from "react";
import { Datatable } from "@/components/datatable";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { NavHeader } from "./navHeader";
import { getStudents } from "@/api/apiRequest";

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

  // get the data for a datatable

  const [studentsData, setStudentsData] = useState<Students[]>([]);

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
        <Badge variant='outline'>{new Date(info.getValue()).toLocaleDateString()}</Badge>
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

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudentsData(data);
      } catch (error) {
        console.error("Error al obtener los datos de estudiantes:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <main className="">
      <NavHeader />
      <div id="content" className="bg-blue-50 w-full h-[90vh]">
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mx-auto pt-8 container">
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
            data={studentsData} 
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
