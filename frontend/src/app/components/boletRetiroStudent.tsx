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
    lineHeight: 2,
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



function generarFechaHoyFormatoLargo() {
  const hoy = new Date();
  const dia = hoy.getDate();
  const mesNombre = new Intl.DateTimeFormat('es-VE', { month: 'long' }).format(hoy).toUpperCase();
  const anio = hoy.getFullYear();

  return (
    <>
      <Text style={styles.bold}>{dia}</Text> días del mes de{' '}
      <Text style={styles.bold}>{mesNombre}</Text> del año{' '}
      <Text style={styles.bold}>{anio}</Text>
    </>
  );
}

// Component to generate the Constancia de Estudio
export const Boleta = ({student} : {student: Students}) => {
  const fechaLarga = generarFechaHoyFormatoLargo();
  const anioActual = new Date().getFullYear();
  const { name, lastName, secction, cedula } = student;
  const nombreAlumno = `${name} ${lastName}`;
  const añoEscolar = anioActual;
  const director = 'MSG. ROBERT R. GARCIA S.';
  
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
          <Text style={styles.title}>BOLETA DE RETIRO</Text>

          <Text style={styles.body}>
          Quien suscribe; Robert R. García S. portador de la cedula C.I: 13.203.271, Director del Complejo Educativo “Alberto Furzán”, ubicado en la Urb. Cruz Verde, calle Nª 04 sector, Nº 04, del Municipio Miranda del Estado Falcón.
          </Text>

          <Text style={{ ...styles.body, marginTop: 20 }}>
            Que el alumno: <Text style={styles.bold}>{nombreAlumno.toUpperCase()}</Text>, portador de la Cédula de Identidad personal <Text style={styles.bold}>Nº: V-{cedula}</Text>, curso el <text style={styles.bold}>{secction} AÑO</text> de <Text style={styles.bold}>EDUCACIÓN MEDIA GENERAL</Text>, durante el año escolar {añoEscolar}, el cual <Text style={styles.bold}>NO</Text> Aprobó.{'\n'}
            Constancia que se expide a solicitud de parte interesada en <Text style={{ fontWeight: 'bold' }}>SANTA ANA DE CORO</Text> a los {fechaLarga}.
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