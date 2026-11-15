/* Unidad 5 — Corte de Control y Apareo de Archivos. Clases 11 y 12. */
(function () {
  const { table, code, fig, flow, src, note } = H;
  const C = CONTENT;
  const P11 = 'Clase 11 · Corte de control (presentación, ';
  const L11 = 'Clase 11 · Lectura “Corte de control”';
  const P12 = 'Clase 12 · Apareo de archivos (presentación, ';
  const L12 = 'Clase 12 · Lectura “Apareo de archivos”';

  /* ======================= CLASE 11 · CORTE DE CONTROL ======================= */

  C['u5-g0-t0'] = () => `
    <p>El <strong>corte de control</strong> es una forma ordenada de mostrar información en forma jerárquica. Consta de usar un <code>while</code> anidado dentro del otro. Esto sería un corte de control simple, pero se pueden anidar más <code>while</code> dentro de cada uno para hacer un corte de control de doble, triple, hasta <em>n</em> profundidad.</p>
    <p>El corte de control es un proceso en el cual, partiendo de registros ordenados por el valor de uno o más campos (denominados <strong>campos clave</strong>, <strong>llave</strong> o <strong>criterio de ordenamiento</strong>), se los procesa en categorías determinadas por los criterios de ordenamiento. En otras palabras, se procesa un conjunto ordenado de registros en <strong>subconjuntos</strong> determinados por los criterios de orden.</p>
    <p>Es una de las operaciones básicas a realizar con archivos. Permite obtener <strong>subtotales</strong> de registros con valores repetidos en algunos de sus campos, y exige que el archivo esté <strong>ordenado</strong> por los campos del corte (ver «Otro ejemplo y requisitos»).</p>
    <h3>Cuándo un problema es de corte de control</h3>
    <p>Un problema se identifica como de corte de control cuando se establece una <strong>jerarquía</strong> sobre los datos a procesar. Esta jerarquía, con respecto a uno o más campos, requiere necesariamente que los datos se presenten agrupados con respecto a dicho o dichos campos y que, además, se repitan en posiciones consecutivas.</p>
    <h3>Ejemplo: lista de personal por categoría (un solo nivel)</h3>
    ${fig(`<div class="listbox"><strong>LISTA DE PERSONAL</strong>
      <div><span class="lb-h">CATEGORÍA 1</span><ul><li>MARTINEZ</li><li>PEREZ</li><li>RODRÍGUEZ</li></ul></div>
      <div><span class="lb-h">CATEGORÍA 2</span><ul><li>GIMENEZ</li><li>SUAREZ</li></ul></div></div>`,
      'Único nivel en la jerarquía')}
    ${flow('u5-c11-lista-personal.png', 'Diagrama de flujo de la lista de personal agrupada por categoría', 'Diagrama de flujo del corte de control por categoría',
      `<ol class="compact">
        <li>Inicio (conector <strong>C</strong>).</li>
        <li><code>ASSIGN(ArchEmpleados, 'C:\\EMPLEADO.DAT')</code></li>
        <li><code>RESET(ArchEmpleados)</code></li>
        <li>Leer registro: <code>LeerRegistro ArchEmpleados, RegEmpleado, Fin</code></li>
        <li><strong>Mientras</strong> <code>NOT Fin</code>:
          <ol>
            <li><code>CategoriaAnt ← RegEmpleado.Categoria</code></li>
            <li>Escribir en la lista: <code>Lst, CategoriaAnt</code></li>
            <li><strong>Mientras</strong> <code>(NOT Fin) AND (CategoriaAnt = RegEmpleado.Categoria)</code>:
              <ol><li>Escribir en la lista: <code>Lst, RegEmpleado.Nombre</code></li>
              <li>Leer registro: <code>LeerRegistro ArchEmpleados, RegEmpleado, Fin</code></li></ol></li>
          </ol></li>
        <li>Fin (conector <strong>F</strong>).</li></ol>`)}`;

  C['u5-g0-t1'] = () => `
    <p>La aplicación más común para la cual se realiza el corte de control es <strong>generar reportes que acumulen cantidades y/o importes</strong>.</p>
    <p>Supongamos que somos un ente regulador de supermercados y aplicamos varios impuestos por provincia, por cada cadena. Deseamos saber cuánto se recauda por provincia, por impuestos, para cada cadena de supermercado ubicada en todo el país.</p>
    <p>A cada cadena se le pueden aplicar uno o varios impuestos diferentes; se desea contabilizar la cantidad de impuestos y el importe total que pagará cada cadena en cada provincia. Para esto queremos generar un informe a partir del archivo que recibimos una vez por mes con la recaudación.</p>
    <h3>Ejemplo</h3>
    <p><strong>Estos son los datos que tenemos</strong> (lista ordenada por provincia e impuesto):</p>
    ${table(['Provincia', 'Cadena', 'Impuesto', 'Importe'], [
      ['Buenos Aires', 'Cadena1', 'i1', '10'], ['Buenos Aires', 'Cadena1', 'i2', '20'], ['Buenos Aires', 'Cadena2', 'i1', '30'],
      ['CABA', 'Cadena1', 'i1', '20'], ['CABA', 'Cadena1', 'i2', '30'], ['CABA', 'Cadena2', 'i1', '60'], ['CABA', 'Cadena2', 'i2', '50'],
      ['Mendoza', 'Cadena1', 'i1', '20'], ['Mendoza', 'Cadena2', 'i2', '30']
    ])}
    <p><strong>Informe resultante</strong> (por provincia, con la cantidad de impuestos e importe por cadena, y la cantidad de cadenas e importe por provincia):</p>
    ${table(null, [
      [{ h: '<strong>Prov.:</strong>' }, 'Buenos Aires', '', '', ''],
      ['Cadena:', 'Cadena1', '', '', ''],
      ['Cantidad Impuestos', '2', '', 'importe', '30'],
      ['Cadena:', 'Cadena2', '', '', ''],
      ['Cantidad Impuestos', '1', '', 'importe', '30'],
      [{ h: '<strong>Cant. Cadenas:</strong>' }, '2', 'importe:', '', { h: '<strong>60</strong>' }],
      [{ h: '<strong>Prov.:</strong>' }, 'CABA', '', '', ''],
      ['Cadena:', 'Cadena1', '', '', ''],
      ['Cantidad Impuestos', '2', '', 'importe', '50'],
      ['Cadena:', 'Cadena2', '', '', ''],
      ['Cantidad Impuestos', '2', '', 'importe', '110'],
      [{ h: '<strong>Cant. Cadenas:</strong>' }, '2', 'importe:', '', { h: '<strong>160</strong>' }],
      [{ h: '<strong>Prov.:</strong>' }, 'Mendoza', '', '', ''],
      ['Cadena:', 'Cadena1', '…', '', '…']
    ])}
    <p class="mut-p">La imagen de la presentación está cortada y termina en «Mendoza / Cadena1».</p>
    ${note(`Aplicando el mismo criterio a los datos de entrada: <strong>Mendoza</strong> → Cadena1: 1 impuesto, importe 20; Cadena2: 1 impuesto, importe 30; Cant. Cadenas: 2, importe 50.`, 'Nota agregada (no figura en el material)')}`;

  C['u5-g0-t2'] = () => `
    <dl class="defs">
      <dt>Control</dt><dd>Significa mando, gobierno, dirección, dominio.</dd>
      <dt>Control de programa</dt><dd>Es el mecanismo para dirigir, gobernar la ejecución de las instrucciones, respetando la secuencia lógica establecida en el diagrama.</dd>
      <dt>Corte de control</dt><dd>Cuando se interrumpe el circuito de instrucciones que se estaban ejecutando.</dd>
      <dt>Caso típico</dt><dd>Procesos donde se solicitan determinados procedimientos para grupos de entes que mantienen cierta homogeneidad.</dd>
      <dt>Campo de control</dt><dd>Es el campo que identifica a cada subconjunto o grupo de elementos de entrada (registros) de un conjunto mayor de datos. No hay que confundirlo con la <em>clave de control</em>.</dd>
    </dl>
    <p>Es necesario determinar el <strong>momento preciso</strong> en que finalizan los elementos de entrada de un grupo para comenzar con otro.</p>
    ${note('<strong>En síntesis:</strong> detectar el momento en que cambia el valor (contenido) de la variable campo de control.')}`;

  C['u5-g0-t3'] = () => `
    <h3>Otro ejemplo</h3>
    <p>Tenemos un archivo que contiene todos los estudiantes de una facultad, los cuales están identificados por su <strong>código de carrera</strong> y <strong>número de legajo</strong>, pero se desea realizar un listado que contenga todos los alumnos <strong>ordenado por carrera</strong>.</p>
    ${fig(`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Código de Carrera</th><th>Legajo</th><th>Apellido y Nombre</th><th>Número de Documento</th><th>Domicilio</th></tr></thead>
      <tbody><tr><td colspan="2" style="text-align:center">CLAVE (código de carrera + legajo)</td><td colspan="3"></td></tr>
      <tr><td style="text-align:center"><strong>CAMPO DE CONTROL</strong></td><td colspan="4"></td></tr></tbody></table></div>`,
      'Registro de alumno: la clave se forma con código de carrera y legajo; el campo de control es el código de carrera')}
    <h3>Requisitos para realizar el corte de control</h3>
    <ol>
      <li>Ordenamiento de los datos de entrada.</li>
      <li>Que existan varios subconjuntos para que tenga sentido el corte de control.</li>
      <li>Que cada subconjunto tenga varios elementos o registros.</li>
    </ol>`;

  C['u5-g0-t4'] = () => `
    <p>La metodología se resume en cinco pasos:</p>
    <ol class="steps5">
      <li>Cuando se lee un registro de un archivo, su contenido se guarda en memoria en variables asociadas a dicho archivo. Luego, cuando se lee el siguiente registro, su contenido se almacena en las mismas variables, <strong>destruyendo la información</strong> almacenada del registro anterior.</li>
      <li>Por lo tanto, para saber si el campo de control del registro recién leído tiene el mismo contenido que el registro anterior, será necesario haber almacenado en una <strong>variable auxiliar</strong> el contenido del campo de control del primer registro del grupo o bloque, para poder compararlo con él y, de esta manera, determinar en forma precisa cuándo se produce la <strong>ruptura</strong> del proceso de corte de control.</li>
      <li><em>Se repite el texto del paso anterior.</em> La diapositiva 13 lo reitera sin cambios.</li>
      <li>Cuando esto se produce, estaremos seguros de que el bloque o conjunto de datos que estábamos procesando ha finalizado. Es este el momento de realizar las operaciones relacionadas con la <strong>finalización del conjunto</strong> (impresión de contadores, impresión de acumuladores, acumular para totales generales, etc.).</li>
      <li>Luego de esto se debe volver a iniciar la variable auxiliar con el contenido del nuevo campo de control del conjunto nuevo a procesar, a fin de poder usarlo como referencia de este nuevo bloque. Se aplica la estructura <em>mientras</em> para repetir el conjunto de operaciones relativas a los registros del mismo conjunto. La condición de salida es que el campo auxiliar sea distinto al campo recién leído.</li>
    </ol>`;

  C['u5-g0-t5'] = () => `
    <h3>Corte por fin de archivo (EOF)</h3>
    <p>En todo programa que lee un archivo secuencial existe una estructura repetitiva general cuya condición de salida será la <strong>finalización del archivo (EOF)</strong>. Por lo tanto, tendrá que realizarse una <strong>primera lectura</strong> antes de entrar a la estructura de proceso.</p>
    ${flow('u5-c11-algoritmo-corte-control.png', 'Diagrama de flujo del algoritmo CORTE CONTROL', 'Algoritmo CORTE CONTROL',
      `<ol class="compact"><li><strong>Algoritmo</strong> CORTE CONTROL</li><li>Escribir <code>'PRINCIPIO DE PROGRAMA'</code></li>
        <li><strong>Mientras</strong> <code>NOT EOF</code>: ejecutar <code>PROCESO</code></li>
        <li>Escribir <code>'FIN DE PROGRAMA'</code></li><li><strong>FinAlgoritmo</strong></li></ol>`)}
    <h3>Corte simple y corte compuesto</h3>
    <dl class="defs">
      <dt>Corte simple</dt><dd>Se da cuando existe un solo campo de control y, por lo tanto, un solo corte de control.</dd>
      <dt>Corte compuesto</dt><dd>Cuando existen varios campos de control de los cuales queremos obtener información.</dd>
    </dl>
    ${flow('u5-c11-funcion-proceso.png', 'Diagrama de flujo de la función PROCESO', 'Función PROCESO',
      `<ol class="compact"><li><strong>Función</strong> PROCESO</li><li>Escribir <code>'PRINCIPIO DE PROCESO'</code></li>
        <li><strong>Mientras</strong> <code>LECTURA = AUX</code>: ejecutar <code>REGISTROS IGUAL CONJUNTO</code></li>
        <li>Ejecutar <code>CORTE CONTROL</code></li><li><strong>FinFunción</strong></li></ol>`)}
    <p>Existirán <strong>tantas estructuras repetitivas anidadas</strong> dentro de la estructura general como cortes de control haya. La estructura más externa será aquella que contenga al resto y, en consecuencia, la más interna la que representa a la entidad contenida en las demás.</p>`;

  C['u5-g0-t6'] = () => {
    const circ = `<svg class="gfx" viewBox="0 0 250 230" style="max-width:250px" role="img" aria-label="Círculos concéntricos: países, provincias, municipios, dentro del programa">
      <rect x="2" y="2" width="246" height="226" fill="var(--surface)" stroke="var(--text)" stroke-width="1.2"/>
      <text class="gt" x="8" y="18">PROGRAMA</text>
      <circle cx="125" cy="125" r="96" fill="none" stroke="var(--muted)" stroke-width="1.3"/><text class="gt" x="125" y="58" text-anchor="middle">PAÍSES</text>
      <circle cx="125" cy="140" r="68" fill="none" stroke="var(--muted)" stroke-width="1.3"/><text class="gt" x="125" y="92" text-anchor="middle">PROVINCIAS</text>
      <circle cx="125" cy="158" r="40" fill="none" stroke="var(--muted)" stroke-width="1.3"/><text class="gt" x="125" y="162" text-anchor="middle">MUNICIPIOS</text></svg>`;
    return `
    <h3>Ejemplo completo: países, provincias y municipios</h3>
    <div class="figrow">
      ${fig(circ, 'Cada nivel queda contenido dentro del anterior')}
      ${fig(`<pre class="code" style="text-align:left"><code>Mientras no sea el fin de archivo
    Mientras no cambie el país
        Mientras no cambie la provincia
            Mientras no cambie el municipio
            Fin_mientras
        Fin_mientras
    Fin_mientras
Fin_mientras</code></pre>`, 'Estructuras <em>mientras</em> anidadas')}
    </div>
    <h3>Ejemplo completo: bancos, sucursales y cuentas</h3>
    <p>Este archivo se encuentra ordenado por <strong>número de banco</strong>, dentro de los bancos por <strong>sucursal</strong> y dentro de la sucursal por <strong>número de cuenta</strong>.</p>
    ${table(['banco', 'sucursal', 'cuenta', 'saldo'], [])}
    <p class="mut-p">Registro del archivo. En la lectura, tres flechas señalan banco, sucursal y cuenta como los campos de orden.</p>
    <p>Si deseamos tener un listado que muestre el valor de cada cuenta, el total por sucursal y, por último, el total por banco, deberemos hacer lo siguiente:</p>
    ${flow('u5-c11-bancos-sucursales.jpeg', 'Diagrama de flujo del corte de control con tres bucles anidados: banco, sucursal y saldo', 'Corte de control por banco y sucursal')}
    <p class="mut-p">Por cuestiones de espacio, se incluyeron dos operaciones en un mismo rectángulo.</p>
    <h3>En seudocódigo</h3>
    ${code(`
Comienzo
    Leo archivo
    Hacer proceso 1 hasta eof
    finalizar
Fin

Proceso 1:
    Aux = bco
    Acumbco = 0
    Hacer proceso 2 hasta eof o bco <> aux
    Imprimir acumbco
Fin proceso 1

Proceso 2:
    Aux1 = suc
    Acumsuc = 0
    Hacer proceso 3 hasta eof o bco <> aux o suc <> aux1
    Acumbco = acumbco + acumsuc
    Imprimir acumsuc
Fin proceso 2

Proceso 3:
    Acumsuc = acumsuc + saldo
    Imprimir saldo
    Leo archivo
Fin proceso 3`)}
    <ul>
      <li>Hemos guardado el valor del banco y de la sucursal en sendos auxiliares, permitiendo leer el archivo hasta que cambien. Cuando cambian, podemos realizar las operaciones de suma en subtotales y su impresión.</li>
      <li>Estos subtotales deben ser colocados en cero cada vez que cambie la sucursal o el banco.</li>
      <li>La <strong>primera lectura</strong> del archivo será hecha afuera de los ciclos y la <strong>segunda lectura</strong> en el nivel más bajo de corte.</li>
      <li>El corte de control lleva el mismo orden que el archivo, debiéndose <strong>repetir en el corte inferior la condición de corte superior</strong>.</li>
    </ul>`;
  };

  C['u5-g0-t7'] = () => `
    <h3>Recordar finalmente</h3>
    <ul>
      <li><strong>Verificar la jerarquía de comparación.</strong> Depende del enunciado del problema; o sea, cuál es la división más importante y, consecuentemente, el diseño de salida de los resultados buscados.</li>
      <li>Depende mucho de la <strong>organización jerárquica de los datos</strong> (archivo), es decir, de su ordenamiento.</li>
    </ul>
    ${note('Si el archivo <strong>no está ordenado, NO SE PUEDE aplicar corte de control</strong>. Solución: arreglos.')}`;

  /* ======================= CLASE 12 · APAREO DE ARCHIVOS ======================= */

  C['u5-g1-t0'] = () => `
    <p>La Clase 12 retoma el corte de control (ver Clase 11), que exige archivos ordenados, para pasar al <strong>apareo</strong>.</p>
    <p>El apareo se realiza con <strong>dos archivos</strong> que estén <strong>ordenados por el mismo campo</strong>. Cuando se lee secuencialmente los registros de cada archivo y se los compara entre sí, se pueden dar tres posibilidades:</p>
    ${table(['Comparación', 'Situación'], [['Iguales', 'Que sean iguales'], ['Menor', 'Que uno sea menor que el otro'], ['Mayor', 'Que uno sea mayor que el otro']])}
    ${note('El corte de control del proceso será hasta que <strong>ambos o alguno</strong> de los archivos finalice.')}`;

  C['u5-g1-t1'] = () => `
    <p>Se tiene un archivo con un listado de <strong>alumnos</strong> (Legajo, apellido, nombre, carrera) y otro archivo que contiene las <strong>notas</strong> de esos alumnos (Legajo, materia, nota), y se quieren listar todas las notas que corresponden a cada uno de los alumnos.</p>
    ${note('Recorrer un archivo de alumnos y otro de notas e imprimir las notas que corresponden a cada alumno.', 'Solución')}
    <p>Veamos el proceso en un diagrama de flujo.</p>
    <h3>1. Abrir los archivos y saltear los encabezados</h3>
    <p>Definimos una función que recibe los dos archivos. Abrimos los archivos y hacemos la lectura en cada uno para quitar los encabezados.</p>
    ${flow('u5-c12-notas-1-abrir-archivos.png', 'Diagrama de flujo: función ImprimirNotasAlumnos, abrir archivos y saltear encabezados', 'Función ImprimirNotasAlumnos',
      `<ol class="compact"><li><strong>Función</strong> <code>ImprimirNotasAlumnos(notas, alumnos)</code></li><li><code>'Abrir archivo notas'</code></li><li><code>'Abrir archivo alumnos'</code></li>
       <li><code>'Leer y saltear encabezado de notas'</code></li><li><code>'Leer y saltear encabezado de alumnos'</code></li></ol>`)}
    <h3>2. Dos vectores, uno para cada registro</h3>
    <p>Dentro de la función definimos dos vectores (uno para cada registro). Deberíamos ir leyendo línea por línea e ir avanzando en el proceso.</p>
    ${flow('u5-c12-notas-2-primer-registro.png', 'Diagrama de flujo: dimensiones de los vectores y lectura del primer registro', 'Vectores alumno y nota',
      `<ol class="compact"><li><code>Dimension alumno[4]</code></li><li><code>Dimension nota[3]</code></li>
       <li><em>Emulando lectura de primer registro de alumnos:</em> <code>alumno ← alumnos[1]</code></li>
       <li><em>Emulando lectura de primer registro de notas:</em> <code>nota ← notas[1]</code></li></ol>`)}
    <h3>3. El proceso</h3>
    <p>El proceso quedaría de la siguiente manera (donde está el índice «2» debería ir la lectura sobre cada archivo hacia la siguiente línea…).</p>
    ${flow('u5-c12-notas-3-proceso.png', 'Diagrama de flujo del apareo de alumnos y notas', 'Proceso de apareo alumnos–notas',
      `<ol class="compact">
        <li><strong>Mientras</strong> <code>alumno &lt;&gt; NULL</code>:
          <ol>
            <li>Escribir <code>alumno[2], ', ', alumno[1], ' - ', alumno[0]</code></li>
            <li><strong>Si</strong> <code>nota = NULL O nota[0] &lt;&gt; alumno[0]</code> (verdadero): escribir <code>'No se registran notas'</code></li>
            <li><strong>Mientras</strong> <code>nota &lt;&gt; NULL Y nota[0] = alumno[0]</code>:
              <ol>
                <li>Escribir <code>'\\t', nota[1], ': ', nota[2]</code></li>
                <li><em>Siguiente registro a leer:</em> <code>nota ← notas[2]</code></li>
                <li><em>Siguiente registro a leer:</em> <code>alumno ← alumnos[2]</code></li>
              </ol></li>
          </ol></li>
        <li>Escribir <code>'Cerrar archivo notas'</code></li>
        <li>Escribir <code>'Cerrar archivo alumnos'</code></li></ol>
       <p class="mut-p">Se transcribe como está dibujado: en el diagrama la lectura del siguiente alumno queda dentro del bucle interior.</p>`)}
    <h3>Con objetos en lugar de vectores</h3>
    <p>Dentro del paradigma de objetos también podríamos haber utilizado dos clases, una para alumno y otra para nota, en lugar de un vector para cada uno.</p>
    <div>
      <div class="uml"><b>Alumno</b><span>- Apellido: string</span><span>- Carrera: string</span><span>- Legajo: int</span><span>- Nombre: string</span></div>
      <div class="uml"><b>Nota</b><span>- Legajo: int</span><span>- Materia: string</span><span>- Nota: int</span></div>
    </div>
    <h3>Código en C#</h3>
    <p>Recordar que con la clase <code>StreamReader</code> podemos ir leyendo línea a línea nuestro archivo. El uso del método <code>Split</code> es adecuado para separar en un vector todos los campos de un registro. En este ejemplo se muestra el encabezado de un archivo separado por el carácter <code>;</code>.</p>
    ${code(`
using (StreamReader sr = new StreamReader(pathEntrada))
{
    //string contenido = sr.ReadToEnd();
    //Console.WriteLine(contenido);

    string encabezado = sr.ReadLine();//La línea header ya fue leída...
    string[] columnaEncabezado = encabezado.Split(';');
    foreach (var dato in columnaEncabezado)
    {
        Console.WriteLine(dato);
    }`, 'C#')}
    <p>Podemos ir creando una instancia de alumno en cada lectura de nuestro archivo principal. En este ejemplo el <code>Split</code> se hace sobre el carácter «tabulador»; podría ser sobre cualquier carácter que nos indique el diseñador del archivo. Generamos nuestro objeto alumno y luego seguiríamos el proceso con el objeto nota, siguiendo el algoritmo planteado anteriormente…</p>
    ${code(`
while (!sr.EndOfStream)
{
    string linea = sr.ReadLine();
    string[] columnas = linea.Split('\\t');

    Alumno alumno = new Alumno();
    alumno.Legajo = int.Parse(columnas[0].ToString());
    alumno.Apellido = columnas[1].ToString();

    //Y así el resto de los campos...
}`, 'C#')}`;

  C['u5-g1-t2'] = () => `
    <p>El apareo de archivos secuenciales se realiza con dos archivos. Estos archivos, para poder aparearse, deben estar <strong>ordenados por los mismos campos</strong>.</p>
    <p>Supongamos que tenemos un <strong>archivo maestro</strong> y uno de <strong>novedades</strong>, con registros repetidos, ordenados ambos por código de artículo. Se comparan los códigos de artículo (<em>artmae</em> y <em>artnov</em>) y se dan las tres posibilidades vistas: igual, mayor o menor. El proceso termina cuando ambos o alguno de los archivos finalizan (<em>eof</em>).</p>
    ${flow('u5-c12-maestro-novedades.jpeg', 'Diagrama de flujo del apareo entre archivo maestro y archivo de novedades', 'Apareo de archivos: maestro y novedades')}
    <h3>En seudocódigo</h3>
    ${code(`
Comienzo
    Hacer inicio
    Hacer proceso hasta eofmae y/o eofnov
    Hacer fin
Fin

Inicio
    Leo mae
    Leo nov
Fin inicio

Proceso
    Si artmae = artnov hacer igual
    Si artmae > artnov hacer mayor
    Si artmae < artnov hacer menor
Fin proceso

Fin
    Cerrar archivos
Fin fin`)}
    <h3>Opción igual</h3>
    <p>Se realizarán todas las operaciones que solicita el programa por la igualdad. Como las novedades vienen con repetidos, conviene hacer un <strong>corte de control</strong>. En este corte de control no es necesario guardar en un auxiliar el valor del artículo, sino que se usa como tal el <code>artmae</code>.</p>
    <h3>Opción mayor</h3>
    <p>En este caso significa que existe un artículo nuevo, que no existe en el maestro. Por lo tanto, habrá que ver si es un error o un <strong>alta</strong> al archivo maestro. Luego de realizar el proceso que corresponda, deberé leer otro registro del archivo de novedades.</p>
    <h3>Opción menor</h3>
    <p>En este caso puede ser que el artículo del maestro no tuvo novedad, o que el registro leído de novedades indica que ya terminaron las modificaciones hacia el del maestro. Si este es el caso, debemos buscar dentro del maestro el artículo nuevo para esta novedad.</p>
    ${note('El archivo a leer por cada situación es siempre <strong>aquel que quedó como menor</strong> en la condición, a excepción del <em>igual</em>, que es normalmente el de novedades.')}`;

  C['u5-g1-t3'] = () => `
    <p>Para acceder a un archivo indexado debemos conocer el valor de su <strong>clave</strong>, que obtendremos, en este caso, del archivo secuencial. Recuerde que la clave del indexado debe ser <strong>única</strong>.</p>
    <div class="figrow">
      ${fig(table(['Cod-art', 'cantidad', 'Tipo de movimiento'], []), 'Dado un archivo secuencial con los siguientes campos (movimientos)')}
      ${fig(table(['Artículo', 'stock'], []), 'Dado un archivo indexado con los siguientes campos, con clave artículo (maestro)')}
    </div>
    <p>Para actualizar el archivo indexado haremos lo siguiente:</p>
    ${flow('u5-c12-secuencial-indexado.jpeg', 'Diagrama de flujo de la actualización de un archivo indexado a partir de un archivo secuencial de movimientos', 'Apareo de un archivo secuencial y uno indexado')}
    <p>El <code>IK</code> funciona como un <code>IF</code> de una estructura condicional.</p>
    <h3>En seudocódigo</h3>
    ${code(`
Comienzo
    Leer movi
    Proceso 1 hasta eof movi
Final
Fin

Proceso 1:
    Articulo = cod-art
    Leo maestro si clave es IK hacer accion
    Si tipo de movimiento = compra entonces
        Stock = stock + cantidad
    De lo contrario
        Stock = stock - cantidad
    Fin si
    Leer movi
Fin proceso 1`)}
    ${note('<strong>IK</strong> significa <em>invalid key</em>, «clave inválida»: si no se encuentra la clave en el archivo indexado no se produce el apareo, da error y ejecuta el proceso <em>acción</em> que se defina.')}`;

  C['u5-g1-t4'] = () => `
    <h3>Resumen del ejemplo</h3>
    <p>En el ejemplo anterior usamos apareo de datos para <strong>combinar y mostrar información</strong>. De forma similar se puede utilizar para <strong>agregar información nueva, borrar información o modificar datos</strong> de un archivo principal.</p>
    <p>Gran parte de las bases de datos relacionales basan su funcionamiento en estas funcionalidades.</p>
    <h3>Resumen general</h3>
    <ul>
      <li>Existen diversas formas de procesar archivos de información. Se puede simplemente <strong>filtrar</strong> la entrada para obtener una salida, o se pueden realizar operaciones más complejas como el corte de control o el apareo.</li>
      <li>El <strong>corte de control</strong> es una técnica de procesamiento de datos ordenados por diversos criterios, que permite agruparlos para obtener subtotales.</li>
      <li>El <strong>apareo</strong> es una técnica de procesamiento que involucra dos archivos con datos ordenados, y permite generar una salida combinada a partir de estos dos archivos.</li>
    </ul>`;
})();
