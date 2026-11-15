/* Unidad 4 — Archivos. Clase 10 (presentación + lectura en PDF). */
(function () {
  const { table, code, fig, src, note } = H;
  const C = CONTENT;
  const PPT = 'Clase 10 · Archivos (presentación, ';
  const PDF = 'Clase 10 · Lectura “Archivos” (PDF, ';

  C['u4-g0-t0'] = () => `
    <p>En las aplicaciones que se han desarrollado hasta el momento, los datos únicamente los manejamos en tiempo de ejecución; es decir, una vez cerrada la aplicación, los datos que fueron cargados en memoria se pierden.</p>
    <p>La manera de almacenar y recuperar información que perdure en el tiempo se basa en el uso de <strong>memoria secundaria</strong>, compuesta esencialmente por unidades externas como CD, DVD, memorias USB, SD, entre otros tipos de almacenamiento.</p>
    <p>En cualquiera de estos medios, la unidad de almacenamiento de información se denomina <strong>archivo</strong>.</p>
    ${note(`<ul class="compact">
      <li>Un archivo <strong>no es lo mismo que una base de datos</strong>.</li>
      <li>Es un conjunto de bits o paquetes de datos que son almacenados en un dispositivo.</li>
      <li>Es identificado por un nombre y la descripción de la carpeta o directorio que lo contiene.</li>
      <li>Se almacenan físicamente en discos y tienen extensiones variadas.</li>
    </ul>`, 'Qué es un archivo')}`;

  C['u4-g0-t1'] = () => `
    <div class="trav">
      <div><h4>Ventajas del uso de archivos</h4>
        <ul>
          <li><strong>Residencia:</strong> los datos se guardan en memoria secundaria (disco), así que no ocupan la memoria principal mientras no se usan.</li>
          <li><strong>Independencia:</strong> los datos existen separados del programa, por lo que distintos programas pueden usarlos y sobreviven a ellos.</li>
          <li><strong>Permanencia:</strong> la información se conserva después de cerrar el programa o apagar el equipo.</li>
          <li><strong>Portabilidad:</strong> el archivo se puede copiar o trasladar a otro equipo o medio (pendrive, red) y usarse allí.</li>
          <li><strong>Capacidad:</strong> permiten almacenar volúmenes de datos mucho mayores que los que entran en la memoria principal.</li>
        </ul></div>
      <div><h4>Desventajas del uso de archivos</h4>
        <ul>
          <li><strong>Concurrencia:</strong> si varios usuarios o programas acceden al mismo archivo a la vez, pueden pisarse los cambios o leer datos inconsistentes, y el archivo no ofrece un control propio de ese acceso.</li>
          <li><strong>Transacciones:</strong> un archivo no garantiza que un conjunto de operaciones se aplique completo o no se aplique; si algo falla a la mitad, los datos pueden quedar a medias y no hay forma automática de deshacerlos.</li>
          <li><strong>Dependencia con el programa que lo gestiona:</strong> la estructura de los registros la define el programa, así que para leer el archivo hay que conocer su formato, y si el formato cambia hay que modificar los programas que lo usan.</li>
        </ul></div>
    </div>
    <p class="mut-p">La presentación solo enumera estos puntos; las definiciones son un complemento.</p>`;

  C['u4-g0-t2'] = () => `
    <p>Los archivos se pueden clasificar de cuatro maneras: según el flujo de datos, según su uso, según los datos cargados y según el tipo de acceso.</p>
    <h3>Según el flujo de datos</h3>
    ${table(['Clase', 'Qué hace', 'Pasos'], [
      [{ h: '<strong>Entrada</strong>' }, 'Lectura de datos', { h: '<ol class="compact"><li>Se crea un flujo de datos de lectura.</li><li>Se leen datos con los métodos apropiados.</li><li>Se cierra el flujo de datos.</li></ol>' }],
      [{ h: '<strong>Salida</strong>' }, 'Escritura de datos', { h: '<ol class="compact"><li>Se crea un objeto flujo de datos de escritura.</li><li>Se escriben datos utilizando los métodos apropiados.</li><li>Se cierra el flujo de datos.</li></ol>' }],
      [{ h: '<strong>Entrada/Salida</strong>' }, 'Lectura y escritura de datos', '—']
    ])}
    <h3>Según su uso</h3>
    ${table(['Clase', 'Descripción'], [
      [{ h: '<strong>Permanentes</strong>' }, 'Los datos guardados en ellos cambian poco en el tiempo; generalmente se usan para estadísticas y cumplen una función de soporte o complemento.'],
      [{ h: '<strong>De movimiento</strong>' }, 'Son los archivos tradicionales, donde el sistema realiza las actualizaciones constantes.'],
      [{ h: '<strong>Temporales</strong>' }, 'Se crean solo cuando se usan y luego se destruyen.']
    ])}
    <h3>Según los datos cargados</h3>
    ${table(['Clase', 'Descripción'], [
      [{ h: '<strong>Texto plano</strong>' }, 'Están compuestos únicamente por texto sin formato, solo caracteres. Estos caracteres se pueden codificar de distintos modos, dependiendo de la lengua usada.'],
      [{ h: '<strong>Binario</strong>' }, 'Es un archivo informático que contiene información de cualquier tipo, codificada en forma binaria para el propósito de almacenamiento y procesamiento de ordenadores.']
    ])}
    <h3>Según el tipo de acceso</h3>
    ${table(['Clase', 'Descripción'], [
      [{ h: '<strong>Acceso secuencial</strong>' }, 'Está diseñado para utilizarlo con archivos de texto sin formato. Se considera que cada carácter de un archivo representa un carácter de texto o una secuencia de formato de texto, como un carácter de nueva línea. Los datos se almacenan como caracteres ANSI.'],
      [{ h: '<strong>Acceso aleatorio</strong>' }, 'Un archivo abierto para acceso aleatorio se considera compuesto por un conjunto de registros de longitud idéntica, o de conjuntos de campos que contienen información. Se pueden utilizar tipos definidos por el usuario para crear registros compuestos por numerosos campos, cada uno de los cuales puede tener diferentes tipos de datos. Los datos se almacenan como información binaria.'],
      [{ h: '<strong>Acceso binario</strong>' }, 'Permite utilizar archivos para almacenar datos de cualquier modo que se ajuste a las necesidades, ya sean numéricos, de cadena o ambos. Es similar al aleatorio, excepto que no se hacen suposiciones acerca del tipo de datos o de la longitud de registro. Es necesario conocer cómo se escribieron exactamente los datos en el archivo para poder recuperarlos correctamente. Por ejemplo, si almacena una serie de nombres y números de teléfono, debe recordar que el primer campo (el nombre) es texto y el segundo (el número de teléfono) es numérico.']
    ])}
    <h3>Comparación de los tres accesos</h3>
    ${table(['', 'Secuencial', 'Aleatorio (<em>Random</em>)', 'Binario'].map(x => ({ h: x })), [
      ['Longitud de registro', 'Variable', 'Fija', 'Variable'],
      ['Tipo de datos', 'Texto', 'Texto o binarios', 'Binarios'],
      ['Acceso', 'Secuencial', 'Aleatorio', 'Aleatorio (no ASCII)']
    ])}
    <h3>Qué pueden contener</h3>
    <p>Básicamente, un archivo puede contener:</p>
    <ul><li>Archivos con texto, visible desde un editor de Windows.</li><li>Archivos con datos binarios.</li><li>Archivos con el estado de un objeto guardado.</li></ul>`;

  C['u4-g0-t3'] = () => `
    <p>Los campos de un registro son la <strong>unidad lógica</strong> donde se almacenan los datos de un registro.</p>
    <ul>
      <li>Tienen como característica <strong>nombre, tipo y tamaño</strong>.</li>
      <li>Los tipos de datos y su tamaño se ven restringidos por el lenguaje que se utilice. No todos los lenguajes soportan los mismos tipos de datos y los rangos de los mismos pueden variar.</li>
      <li>Un conjunto de <strong>campos</strong> componen un <strong>registro</strong>.</li>
      <li>Un conjunto de <strong>registros</strong> componen un <strong>archivo</strong>.</li>
    </ul>
    ${table(['Nombre', 'Tipo', 'Tamaño'], [
      ['NroCta', 'Número', '5'],
      ['RazonSocial', 'Alfabético', '25'],
      ['FechaDeposito', 'Fecha', '6'],
      ['Comentarios', 'Memo', '200']
    ])}
    <p>Como lo ejemplifica la tabla, los cuatro datos tomados como una unidad componen el <strong>registro</strong>; cada uno de ellos es un <strong>campo</strong>.</p>
    ${fig(`<div class="nest"><span class="nest-l">Archivo</span>
      <div class="nest-r"><span class="nest-l">registro</span><span class="nest-f">campo</span><span class="nest-f">campo</span><span class="nest-f">campo</span></div>
      <div class="nest-r"><span class="nest-l">registro</span><span class="nest-f">campo</span><span class="nest-f">campo</span><span class="nest-f">campo</span></div></div>`,
      'Un archivo se compone de registros, y cada registro, de campos')}`;

  C['u4-g0-t4'] = () => `
    <p>Existen básicamente dos tipos de archivos: <strong>secuenciales</strong> e <strong>indexados</strong>.</p>
    <h3>Archivos secuenciales</h3>
    <p>Tienen como característica principal que <strong>su organización es secuencial</strong> y su forma de acceso a los distintos registros es únicamente secuencial. Es decir, para acceder al registro 50 debo haber pasado por los 49 anteriores.</p>
    <p>Estos archivos pueden o no estar ordenados y pueden o no tener registros repetidos; o sea, varios registros para una misma cuenta. En los ejemplos, cada fila representa un registro del archivo y las columnas, los campos de los mismos:</p>
    <div class="trav">
      <div><h4>Sin repetidos y desordenado</h4>
        ${table(['Artículo', 'Denominación', 'Cantidad vendida'], [['10', 'Libro', '5'], ['5', 'Sacapuntas', '15'], ['1', 'Lápiz', '20'], ['3', 'Regla', '30'], ['2', 'Goma', '10']])}
        <p>Los registros están desordenados y hay uno solo por artículo.</p></div>
      <div><h4>Sin repetidos y ordenado</h4>
        ${table(['Artículo', 'Denominación', 'Cantidad vendida'], [['1', 'Lápiz', '20'], ['2', 'Goma', '10'], ['3', 'Regla', '30'], ['5', 'Sacapuntas', '15'], ['10', 'Libro', '5']])}
        <p>Lo mismo que el caso anterior, pero ordenado.</p></div>
      <div><h4>Con repetidos y ordenado</h4>
        ${table(['Artículo', 'Denominación', 'Cantidad vendida'], [['1', 'Lápiz', '20'], ['1', 'Lápiz', '30'], ['1', 'Lápiz', '10'], ['2', 'Goma', '15'], ['2', 'Goma', '5']])}
        <p>Este archivo está ordenado y con registros repetidos para cada artículo.</p></div>
    </div>
    <p>Para definir un registro, tomaremos como notación la siguiente y colocaremos debajo de cada campo el tipo de dato y el tamaño del campo. Con <strong>S/R</strong> se indica «sin repetidos» y con <strong>C/R</strong> «con repetidos»:</p>
    ${table(['Artículo', 'Descripción', 'Cantidad'], [['C/R · N(5)', 'A(25)', 'F(6)']])}
    <p class="mut-p">Así figura en la lectura: N = numérico, A = alfabético, F = fecha, seguido del tamaño entre paréntesis.</p>
    <p>El ordenamiento del archivo puede ser realizado por más de un campo.</p>

    <h3>Archivos indexados</h3>
    <p>Los archivos indexados tienen como particularidad el <strong>acceso restringido</strong>, por lo que es necesario tener clave para acceder a los mismos. Están ordenados por claves. Si bien la organización física de los registros es de acuerdo con el orden de grabación, su organización lógica está dada por la clave.</p>
    <p>La organización de un archivo indexado es indexada y, según el lenguaje, las formas de acceso pueden ser secuencial, <em>random</em> (al azar) y dinámica:</p>
    <dl class="defs">
      <dt>Secuencial</dt><dd>Es la lectura de un registro a posteriori del anterior, con la única seguridad de que el archivo se encuentra ordenado por la clave de acceso definida.</dd>
      <dt>Random</dt><dd>Es el que se realiza en forma directa y única a un registro en particular, debiéndose conocer el valor completo de la clave de acceso. Si el registro está compuesto por más de un campo, se deberán conocer todos los valores de esos campos que componen la clave.</dd>
      <dt>Dinámica</dt><dd>Es la forma de acceso a un registro en particular. Una vez allí, permite leer el archivo en forma secuencial hasta una condición dada. En este caso no es necesario conocer la clave completa. Si ésta se encuentra compuesta por más de un campo y existe peso de orden entre ellos, será necesario que conozcamos aquellos campos de mayor peso. No podemos conocer los campos de menor peso y desconocer los de mayor peso cuando las claves están ordenadas.</dd>
    </dl>
    <h4>Clave compuesta por más de un campo</h4>
    <p>Suponga el archivo de notas de un alumno. Este estará ordenado por legajo y, dentro de los legajos, ordenado por materias; entonces no se puede querer ingresar a una materia si antes no se sabe de qué alumno se trata. Este ejemplo es una clave compuesta por dos campos (legajo y materia) que explica en parte lo anteriormente explicado.</p>
    <p>En el caso de un archivo de infracciones, la clave está compuesta por la patente del automóvil y, como ésta puede estar repetida por varias multas, hay que agregarle el campo <code>nroinfraccion</code> para lograr que ese valor sea único. Este archivo estará lógicamente ordenado por patente y dentro de ella por número de infracción.</p>
    ${table([{ h: '<u>patente</u>' }, { h: '<u>nroinfraccion</u>' }, 'tipoinfraccion', 'monto'], [])}
    <p class="mut-p">Registro del archivo de infracciones: los dos primeros campos (subrayados) forman la clave.</p>
    <p>Un archivo indexado puede tener varias claves de acceso definidas a la vez. Eso dependerá del lenguaje a utilizar. Podemos decir que un archivo indexado está compuesto por la <strong>tabla base</strong>, donde se encuentran los registros propiamente dichos, y distintas <strong>tablas índices</strong> asociadas para su más rápido y fácil acceso.</p>
    ${note('Los archivos indexados <strong>no existen en .NET</strong>. Sí existen en otros lenguajes de programación.')}
    <p>A continuación, la lectura presenta otras operaciones que se pueden realizar con los archivos.</p>
    <p><strong>Lectura requerida:</strong> la bibliografía obligatoria indicada en «Introducción y concepto de archivo».</p>
    <p>Le proponemos a continuación una serie de trabajos prácticos que le permitirán ejercitar las operaciones aprendidas. Tenga en cuenta que este trabajo tiene fecha de entrega. Administre su tiempo y cumpla entregando en tiempo y forma. Consulte el Cronograma de Actividades de la asignatura.</p>`;

  C['u4-g0-t5'] = () => `
    <p>Todo lo referido a Entrada/Salida (E/S) se maneja desde la clase <strong>System.IO</strong> del marco .NET y está basado en el concepto de <strong>streams</strong>. Un stream es un conjunto de bytes en el cual podemos escribir, leer, situarnos dentro de una posición determinada y mucho más, siempre dependiendo de la capacidad del dispositivo en el que estemos trabajando.</p>
    ${table(['Clase', 'Descripción'], [
      ['System.IO.File', 'Proporciona métodos estáticos para crear, copiar, eliminar, mover y abrir un solo archivo, y contribuye a la creación de objetos FileStream. También manipula archivos: su creación, copiarlos, eliminarlos, moverlos o detectar su existencia.'],
      ['FileStream', 'Es una secuencia de bytes que representa el contenido del archivo. Permite crear objetos para leer o escribir datos en archivos. Para ello es necesario definir el nombre completo del archivo (incluyendo la ruta de ubicación de sus carpetas).'],
      ['StreamWriter', 'Permite crear objetos que implementan un sistema de escritura de datos basado en secuencias de caracteres.'],
      ['StreamReader', 'Permite crear objetos que implementan un sistema de lectura de datos basado en secuencias de caracteres.']
    ])}
    <h3>FileStream</h3>
    <p>Los archivos pertenecen a la clase <code>FileStream</code> y podemos reducir sus operaciones a:</p>
    <ol><li>Crear un archivo o abrir uno ya existente.</li><li>Leer o escribir datos en un archivo.</li><li>Cerrar el archivo.</li></ol>
    <p>Lo primero que debemos hacer es crear un objeto de tipo <code>FileStream</code> asociado a un archivo en particular. El código podría ser:</p>
    ${code(`
FileStream miArchivo (ruta, modo apertura)
FileStream miArchivo (ruta, modo apertura, acceso)
FileStream miArchivo (ruta, modo apertura, acceso, sharing)`)}
    <dl class="defs">
      <dt>Ruta</dt><dd>Directorio donde se desea guardar el archivo.</dd>
      <dt>Modo de apertura (FileMode)</dt><dd>Crearse, abrirse, crearse si no existe, abrirse para agregar datos, etc.</dd>
      <dt>Acceso (FileAccess)</dt><dd>Leer, escribir o ambas.</dd>
      <dt>Sharing</dt><dd>Modo de bloqueo.</dd>
    </dl>
    <p><code>File.Open(string, fileMode)</code> devuelve un <code>FileStream</code>. Los modos de apertura (<code>Append</code>, <code>Create</code>, <code>CreateNew</code>, <code>Open</code>, <code>OpenOrCreate</code> y <code>Truncate</code>) se detallan en el tema «FileMode y FileAccess».</p>`;

  C['u4-g0-t6'] = () => `
    <h3>Ejemplos de apertura</h3>
    ${table(['Situación', 'Código'], [
      ['El archivo ya existe y desea leer o escribir', { h: '<code>FileStream miArchivo = new FileStream("a1.txt", FileMode.Open);</code>' }],
      ['Queremos abrir un archivo. No existe, lo crea', { h: '<code>FileStream miArchivo = new FileStream("a1.txt", FileMode.OpenOrCreate);</code>' }],
      ['Abrir un archivo para leer (el archivo existe)', { h: '<code>FileStream miArchivo = new FileStream("a1.txt", FileMode.Open, FileAccess.Read);</code>' }],
      ['Crear un archivo y escribirlo (si ya existía, lo pisa)', { h: '<code>FileStream miArchivo = new FileStream("a1.txt", FileMode.Create, FileAccess.Write);</code>' }],
      ['Permitir que otro proceso escriba y lea el archivo', { h: '<code>FileStream miArchivo = new FileStream("a1.txt", FileMode.Create, FileAccess.Write, FileShare.ReadWrite);</code>' }]
    ])}
    <h3>FileMode: modos de apertura</h3>
    ${table(['FileMode', 'Uso (presentación)', 'Descripción (lectura)'], [
      ['CreateNew', 'Crea un nuevo archivo. Si el archivo existe dispara una IOException.', 'Crea un archivo. Si existe uno con igual nombre envía una excepción.'],
      ['Truncate', 'Abrir un archivo existente. Una vez abierto, el archivo será truncado a cero bytes de longitud.', 'Abre un archivo existente y lo deja en cero bytes.'],
      ['Create', 'Crea un nuevo archivo. Si el archivo existe será sobrescrito.', 'Crea un archivo nuevo; si existía lo pisa.'],
      ['Open', 'Abrir un archivo existente. Si no existe dispara una FileNotFoundException.', 'Abre un archivo existente. Si no existe envía una excepción.'],
      ['OpenOrCreate', 'Abrir un archivo existente; si no existe, lo crea.', 'Abre el archivo y, si no existe, lo crea.'],
      ['Append', 'Abrir un archivo para agregar datos al final en caso de existir; de lo contrario crea un archivo nuevo.', 'Si no existe lo crea. Si existe lo abre y se sitúa al final del mismo.']
    ])}
    <h3>FileAccess: modos de acceso</h3>
    ${table(['FileAccess', 'Uso'], [
      ['Read', 'Acceso al archivo en modo de solo lectura. Permite leer datos de un archivo.'],
      ['ReadWrite', 'Acceso al archivo en modo de lectura y escritura.'],
      ['Write', 'Acceso al archivo en modo de solo escritura. Permite escribir datos en un archivo.']
    ])}`;

  C['u4-g0-t7'] = () => `
    <p>Para trabajar con archivos de texto puro se utilizan <code>StreamReader</code> y <code>StreamWriter</code>. Para leer datos de un archivo es necesario abrirlo en modo lectura, estableciendo un flujo al crear un objeto de la clase <code>StreamReader</code>.</p>
    <h3>Cómo se crea</h3>
    <p>Cuando queremos leer un archivo, creamos primero el <code>FileStream</code> y luego el <code>StreamReader</code> para leerlo:</p>
    ${code(`
string fileName = "temp.txt";

// Creamos el FileStream
FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read);

// Creamos el StreamReader para leerlo
StreamReader reader = new StreamReader(stream);

// Forma abreviada, sin crear el FileStream aparte
StreamReader lector = new StreamReader("a1.dat");`, 'C#')}
    <h3>Métodos principales de StreamReader</h3>
    ${table(['Método', 'Descripción'], [
      ['Read', 'Lee el próximo carácter disponible a partir de la posición actual y avanza.'],
      ['ReadBlock', 'Lee un bloque de caracteres y lo almacena en un vector de chars.'],
      ['ReadLine', 'Lee una línea del archivo.'],
      ['ReadToEnd', 'Lee el contenido de todo el archivo y lo guarda en un string.'],
      ['Peek', 'Obtiene el valor del próximo carácter disponible pero no avanza.'],
      ['Close', 'Cierra el stream liberando recursos y referencias al archivo.']
    ])}
    <h3>Ejemplos</h3>
    <h4>Lectura por línea</h4>
    ${code(`
FileStream miArchivo = new FileStream("a1.txt", FileMode.OpenOrCreate);
StreamReader lector = new StreamReader(miArchivo);
string linea;
linea = lector.ReadLine();
this.label1.Text = lector.ReadToEnd();   // (solo figura en la lectura)
this.listBox1.Items.Clear();              // (solo figura en la lectura)
while (linea != null)
{
    this.listBox1.Items.Add(linea);
    linea = lector.ReadLine();
}
lector.Close();
miArchivo.Close();`, 'C#')}
    <h4>Utilizando Peek en el while</h4>
    ${code(`
string fileName = "temp.txt";
FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
StreamReader reader = new StreamReader(stream);
while (reader.Peek() > -1)
{
    Console.WriteLine(reader.ReadLine());
}
reader.Close();
stream.Close();`, 'C#')}
    <h4>Si queremos leer el archivo de una sola vez</h4>
    ${code(`
string fileName = "temp.txt";
FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
StreamReader reader = new StreamReader(stream);
string contenido = reader.ReadToEnd();
reader.Close();
stream.Close();`, 'C#')}
    ${note('El código de este tema se reescribió con la sintaxis correcta de C# (mayúsculas en <code>FileMode</code>, <code>ReadLine</code>, <code>Close</code>, etc.) y se corrigieron errores de tipeo de las fuentes. Los ejemplos de la presentación y de la lectura que eran la misma idea se muestran una sola vez.')}`;

  C['u4-g0-t8'] = () => `
    <p>Para escribir datos en un archivo es necesario abrirlo en modo escritura, estableciendo un flujo al crear un objeto de la clase <code>StreamWriter</code>:</p>
    ${code('StreamWriter escritor = new StreamWriter(NombreArchivo);', 'C#')}
    <h3>Métodos de StreamWriter</h3>
    ${table(['Método', 'Descripción'], [
      ['Write', 'Escribe una cadena de texto en el archivo.'],
      ['WriteLine', 'Escribe una cadena y le agrega un salto de fin de línea.'],
      ['Flush', 'Devuelve el contenido del buffer del stream al archivo.'],
      ['Close', 'Realiza cualquier escritura pendiente sobre el archivo (flush) y lo cierra.']
    ])}
    <h3>Ejemplos</h3>
    <h4>Escribir un archivo de texto agregando al final</h4>
    ${code(`
FileStream miArchivo = new FileStream("a1.txt", FileMode.Append);
StreamWriter escritor = new StreamWriter(miArchivo);
string registro = txtUni.Text + "|" + txtFacu.Text + "|" + txtCarrera.Text + "|" + txtLegajo.Text;
escritor.WriteLine(registro);
escritor.Close();
miArchivo.Close();`, 'C#')}
    ${note('Si usted nombra a este nuevo archivo <code>a1.dat</code> y resulta que éste ya existía, <strong>perderá el contenido</strong> del archivo existente.')}
    <h4>Escribir 100 líneas</h4>
    ${code(`
StreamWriter escritor = new StreamWriter("a1.txt");
int i;
for (i = 1; i <= 100; i++)
    escritor.WriteLine(i);
escritor.Close();`, 'C#')}
    <p class="mut-p">Recuerde que hay que pasar de <em>integer</em> a <em>string</em> (en la lectura el ejemplo usa <code>i.ToString()</code>).</p>`;

  C['u4-g0-t9'] = () => `
    <h3>File.Create</h3>
    ${code('File.Create(path, bufferSize, FileOptions, FileSecurity)', 'C#')}
    <dl class="defs">
      <dt>path</dt><dd>Nombre del archivo.</dd>
      <dt>bufferSize</dt><dd>Número de bytes almacenados en el búfer para leer y escribir en el archivo.</dd>
      <dt>FileOptions</dt><dd>Describe cómo crear o sobrescribir el archivo.</dd>
      <dt>FileSecurity</dt><dd>Determina el control de acceso y la seguridad de auditoría del archivo.</dd>
    </dl>
    <h3>Valores de FileOptions</h3>
    ${table(['Valor', 'Descripción'], [
      ['Async', '—'],
      ['DeleteOnClose', '—'],
      ['Encrypt', '—'],
      ['None', '—'],
      ['RandomAccess', 'Indica que el acceso al archivo se realiza aleatoriamente. El sistema puede considerar que esto es una sugerencia para optimizar el almacenamiento en caché del archivo.'],
      ['SequentialScan', 'Indica que el acceso al archivo debe ser secuencial, de principio a fin.']
    ])}
    <p class="mut-p">La presentación enumera Async, DeleteOnClose, Encrypt y None sin descripción.</p>
    <h3>Comprobación: File.Exists</h3>
    <p><code>File.Exists(string)</code>. Pueden suceder fallas: archivos inexistentes, dañados o sin permisos de lectura.</p>
    <h3>Manejo del sistema de archivos: ¿cómo saber si un archivo existe?</h3>
    ${code(`
if (File.Exists(NombreArchivo))
{
    // ...
}`, 'C#')}`;

  C['u4-g0-t10'] = () => `
    <p>Para los tipos de archivos que no guardan texto plano legible, sino código binario, debemos utilizar otras clases: <code>BinaryReader</code> y <code>BinaryWriter</code>.</p>
    <h3>BinaryWriter</h3>
    <p>Para escribir archivos binarios es obligatorio crear previamente un <code>FileStream</code>.</p>
    ${code(`
string fileName = "temporal.txt";
int[] data = { 0, 1, 22, 31, 4, 5, 45 };
FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Write);
BinaryWriter writer = new BinaryWriter(stream);
for (int i = 0; i < data.Length; i++)
{
    writer.Write(data[i]);
}
writer.Close();
stream.Close();`, 'C#')}
    <p>Los métodos más comunes de esta clase son:</p>
    ${table(['Método', 'Descripción'], [
      ['Write', 'Guarda una variable en el archivo.'],
      ['Flush', 'Vuelca en el archivo cualquier escritura pendiente.'],
      ['Seek', 'Se sitúa en una posición particular dentro del archivo.'],
      ['Close', 'Cierra el BinaryWriter, el FileStream y libera recursos.']
    ])}
    <h3>BinaryReader</h3>
    <p>Para leer un archivo binario el procedimiento es similar al de texto y tiene las mismas restricciones. Para abrir el archivo y leerlo:</p>
    ${code(`
string fileName = "temp.txt";
int letter = 0;
FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
BinaryReader reader = new BinaryReader(stream);
while (letter != -1)
{
    letter = reader.Read();
    if (letter != -1)
    {
        Console.Write((char)letter);
    }
}
reader.Close();
stream.Close();`, 'C#')}
    <p>Los métodos más comunes de esta clase son:</p>
    ${table(['Método', 'Descripción'], [
      ['PeekChar', 'Consulta el próximo carácter disponible pero no avanza el cursor.'],
      ['Read', 'Lee un bloque de bytes del archivo.'],
      ['ReadBoolean', 'Lee una variable booleana.'],
      ['ReadByte, ReadBytes', 'Lee un byte o un bloque de bytes.'],
      ['ReadChar, ReadChars', 'Lee un carácter o un bloque de caracteres.'],
      ['ReadSingle', 'Lee una variable single.'],
      ['ReadDecimal', 'Lee una variable decimal.'],
      ['Close', 'Cierra el BinaryReader y el FileStream (la lectura dice «binarywriter»).']
    ])}
    ${note('Las propuestas de trabajo en el Laboratorio recuperan y amplían los contenidos trabajados hasta este momento. Si durante el trabajo surgen dudas o inquietudes, sería muy provechoso compartirlas con los pares: en la Web, los foros creados por los programadores son herramientas fundamentales para el aprendizaje compartido y la profesionalización. Iníciese, si aún no lo ha hecho, en esta práctica de trabajo colaborativo.', 'Trabajo colaborativo')}`;

  C['u4-g0-t11'] = () => `
    <p>A continuación, la lectura deja un detalle del uso de <em>streams</em>, a partir de una explicación y los conceptos asociados.</p>
    <p>La clase abstracta <code>Stream</code> representa una secuencia de bytes que va o que viene de un medio de almacenamiento (por ejemplo, un archivo) o de un dispositivo virtual o físico (por ejemplo, un puerto paralelo, una tubería de comunicación entre procesos o un socket TCP/IP). Las secuencias (<em>streams</em>) permiten leer o escribir de/en un almacén que puede corresponderse con uno de entre varios medios de almacenamiento.</p>
    <h3>Operaciones con secuencia</h3>
    <p>Las operaciones fundamentales que pueden ejecutarse sobre las secuencias son: <strong>lectura, escritura y búsqueda</strong>. No todos los tipos de secuencia permiten todas estas operaciones.</p>
    <p>La mayoría de los objetos de secuencia almacenan los datos en búferes de una forma transparente. No es necesario decir que el almacenamiento en búfer mejora notablemente el rendimiento. Las secuencias de archivos se almacenan en búferes, mientras que las secuencias de memoria no, porque no existe un motivo para almacenar en un búfer una secuencia asignada de memoria. Podría utilizar el objeto <code>BufferedStream</code> para agregar capacidad de almacenamiento en búfer a un objeto <code>Stream</code> que no cuente con ella de forma nativa.</p>
    <h3>Lectura y escritura de secuencia</h3>
    <p>Cuando el objeto stream genérico solo puede leer y escribir bytes individuales o grupos de bytes, la mayor parte de las veces deberá utilizar objetos auxiliares «lectores de secuencia y escritores de secuencia» que le permitirán trabajar con datos de forma más estructurada. .NET Framework dispone de varios lectores y escritores de secuencia, como las clases <code>BinaryReader</code> y <code>BinaryWriter</code>, y las clases <code>StreamReader</code> y <code>StreamWriter</code>, entre otras.</p>
    <h3>Lectura y escritura de archivos de texto</h3>
    <p>Normalmente, utilizará el objeto <code>StreamReader</code> para leer desde un archivo de texto. Después de que tenga una referencia a un objeto <code>StreamReader</code>, podrá utilizar uno de sus numerosos métodos para leer uno o más caracteres e, incluso, líneas de texto completas.</p>
    <h3>Lectura y escritura de archivos binarios</h3>
    <p>Las clases <code>BinaryReader</code> y <code>BinaryWriter</code> resultan apropiadas para trabajar con secuencias binarias; una de estas secuencias se puede asociar con un archivo que contenga datos en formato nativo. En este contexto, <em>formato nativo</em> significa los bits reales utilizados para almacenar el valor en memoria. Trabajar con el objeto <code>BinaryWriter</code> resulta especialmente sencillo porque su método <code>Write</code> ha sido sobrecargado para que acepte todos los tipos de .NET Framework.</p>
    <h3>Lectura y escritura de secuencia de memoria</h3>
    <p>Los lectores y escritores de secuencia no sirven exclusivamente para los archivos. Por ejemplo, podrá utilizarlos en unión del objeto <code>MemoryStream</code> para trabajar con la memoria como si fuera un archivo temporal (proporciona un mejor rendimiento que utilizar un archivo real).</p>
    <h3>Lectura y escritura de cadenas en memoria</h3>
    <p>Si los datos que desea leer se encuentran ya contenidos en una variable de cadena, tal vez desee utilizar un objeto <code>StringReader</code> para recuperarlos.</p>
    <h3>Lectores y escritores de secuencias personalizados</h3>
    <p>Podrá crear con facilidad lectores y escritores de secuencias personalizados que trabajen con objetos personalizados, gracias a la herencia.</p>`;
})();
