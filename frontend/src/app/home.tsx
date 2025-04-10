import { useNavigate } from "react-router-dom"
import { FearturedCard } from "./components/fearturedCard"
import { useState, useEffect, useCallback } from "react";
import { Datatable } from "@/components/datable/datatable";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { NavHeader } from "./navHeader";
import { deleteStudent, getStudents } from "@/api/apiRequest";
import { ConstanciaStudios } from "./components/constanciaStudios";
import { pdf } from "@react-pdf/renderer";
import { Boleta } from "./components/boletRetiroStudent";


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
  createdAt?: Date | string; 
  updateAt?: Date
}

export const HomePage = () => {
  const navigate = useNavigate(); 

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
      cell: info => {
        const createdAtValue = info.getValue();
        let formattedDate: string | null = null;
        if (createdAtValue) {
          formattedDate =
            typeof createdAtValue === 'string'
              ? new Date(createdAtValue).toLocaleDateString()
              : createdAtValue.toLocaleDateString();
        }
        return <div className="text-center">
          <Badge variant='outline'>{formattedDate || '-'}</Badge>
        </div>;
      },
    }),
  ];

  const additionalActions = [
    {
      label: "Boleta de retiro",
      onClick: (row: Students) => generatedBoleta(row),
    },
    {
      label: "constancia de estudios",
      onClick: (row: Students) => generatedConstancia(row),
    }
  ];

  const onDeleteHandled = (row: Students) => {
    deleteStudent(row.cedula)
      .then(() => {
        setStudentsData((prev) => prev.filter((student) => student.cedula !== row.cedula));
      })
      .catch((error) => {
        console.error("Error al eliminar el estudiante:", error);
      });
  }

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


  const generatedConstancia = useCallback(async (data:Students) => {
    const blob = await pdf(<ConstanciaStudios  student={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'datos.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  }, []);

  const generatedBoleta = useCallback(async (data:Students) => {
    const blob = await pdf(<Boleta  student={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'datos.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  }, []);



  return (
    <main className="">
      <NavHeader />
      <div id="content" className="bg-blue-50 w-full md:h-[90vh]">
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
            onDelete={onDeleteHandled} 
            onEdit={(row) => { navigate(`/editar-estudiante/${row.cedula}`) }} 
            additionalActions={additionalActions} 
            onAddTable={{ label: "Estudiante", onClick: () => {navigate("/nuevo-estudiante")} }} />
        </div>
      </div>
    </main>
  )
}
