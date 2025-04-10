import { Document, Page, Text, Font, StyleSheet, View, Image } from '@react-pdf/renderer';
import logo from '/logoLiceo.png';
import { Students } from '../home';
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v23/RYjYAwDhDQamCnwBZinHCYEnkyILrMCcBNFc.ttf' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v10/Z9i7jxRwaP0azYkMgEKYrggu9hOMY-Y4HvSjbRo-lbw.ttf', fontWeight: 'bold' },
  ],
});

// Define styles for the document
const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  container: {
    border: '2px double #FC9F12',
    padding: 30,
  },
  container2: {
    marginTop: 40,
    border: '2px double #FC9F12',
    padding: 30,
  },
  headerContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 1.2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  body: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
  },
  signature: {
    marginTop: 140,
    fontSize: 11,
    textAlign: 'center',
  },
  director: {
    fontSize: 12,
  },
});

function generarFechaHoyFormatoExpedicion() {
  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, '0');
  const mesNombre = new Intl.DateTimeFormat('es-VE', { month: 'long' }).format(hoy);
  const anio = hoy.getFullYear();

  return `${dia} de ${mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1)} de ${anio}`;
}

// Component to generate the Constancia de Estudio
export const ConstanciaStudios = ({student} : {student: Students}) => {
  const fechaHoyFormatoExpedicion = generarFechaHoyFormatoExpedicion();
  const anioActual = new Date().getFullYear();
  const { name, lastName, secction, cedula } = student;
  const nombreAlumno = `${name} ${lastName}`;
  const añoEscolar = anioActual;
  const director = 'MSG. ROBERT R. GARCIA S.';
  const fechaExpedicion = fechaHoyFormatoExpedicion;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Image style={styles.logo} src={logo} />
            </View>
            <View>
              <Text style={styles.headerText}>
                REPÚBLICA BOLIVARIANA DE VENEZUELA{'\n'}
                MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN{'\n'}
                COMPLEJO EDUCATIVO “ALBERTO FURZAN”{'\n'}
                CORO ESTADO FALCÓN
              </Text>
              </View>
              <View>
              {'\n'}
              </View>
          </View>          
        </View>
        <View style={styles.container2}>
          <Text style={styles.title}>CONSTANCIA DE ESTUDIO</Text>

          <Text style={styles.body}>
            Quien suscribe; <Text style={styles.bold}>{director}</Text>, Director del Complejo Educativo “Alberto Furzan”,
            ubicado en la Urb. Cruz Verde, calle Nª 04 sector, Nº 04, del Municipio Miranda del Estado Falcón.{'\n\n'}
            Hace constar por medio de la presente que el (la) alumno(a): <Text style={styles.bold}>{nombreAlumno}</Text>,
            portador de la Cedula de Identidad: <Text style={styles.bold}>{cedula}</Text>, cursa en este plantel el{' '}
            <Text style={styles.bold}>{secction}</Text> año de <Text style={styles.bold}>Educación Media Técnica</Text>, en el año escolar{' '}
            <Text style={styles.bold}>{añoEscolar}</Text>.{'\n\n'}
            Constancia que se expide a solicitud de parte interesada en <Text style={styles.bold}>Santa Ana de Coro</Text> a los{' '}
            <Text style={styles.bold}>{fechaExpedicion}</Text>.
          </Text>

          <Text style={styles.signature}>
            ATENTAMENTE,{'\n\n'}
            <Text style={styles.bold}>{director}</Text>{'\n'}
            DIRECTOR (E)
          </Text>
        </View>
      </Page>
    </Document>
  );
};