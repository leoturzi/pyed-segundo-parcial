/* Unidad 7 — Repaso conceptual (preguntas de revisión con respuesta desplegable). */
(function () {
  const { table, code, fig, note, graph } = H;
  const C = CONTENT;

  const qa = (q, a) => '<details class="qa"><summary>' + q + '</summary><div class="qa-a">' + a + '</div></details>';

  /* Diagrama de recorrido: árbol de 6 nodos con el orden de visita numerado junto a cada nodo. */
  const TRAV = {
    pre:  ['A', 'B', 'D', 'E', 'C', 'F'],
    ino:  ['D', 'B', 'E', 'A', 'C', 'F'],
    post: ['D', 'E', 'B', 'F', 'C', 'A']
  };
  const TRAV_NAME = { pre: 'Preorden', ino: 'Inorden', post: 'Postorden' };
  function travFig(kind) {
    const pos = { D: [30, 154], B: [82, 92], E: [134, 154], A: [186, 30], C: [238, 92], F: [290, 154] };
    const order = TRAV[kind];
    const nodes = Object.keys(pos).map(k => ({ id: k, t: k, x: pos[k][0], y: pos[k][1] }));
    const edges = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F']];
    const texts = order.map((k, i) => ({ x: pos[k][0] + 15, y: pos[k][1] - 15, t: String(i + 1), cls: 'ord' }));
    const svg = graph({ w: 320, h: 184, maxw: 320, nodes, edges, texts, label: 'Árbol con el orden de visita en ' + TRAV_NAME[kind].toLowerCase() + ': ' + order.join(', ') });
    return fig(svg, 'El número junto a cada nodo indica en qué momento se lo visita') + H.arr(TRAV_NAME[kind], order);
  }

  const tools = '<p class="qa-tools"><button type="button" class="qa-toggle" data-qa-toggle>Mostrar / ocultar todas las respuestas</button></p>';
  const intro = '<p>Intentá responder cada pregunta antes de abrir la respuesta.</p>' + tools;

  /* ======================= ÁRBOLES ======================= */

  C['u7-g0-t0'] = () => {
    /* Árbol de altura 4 (ABB). x según el inorden, y según el nivel; las hojas van enmarcadas. */
    const spec = [[10, 4], [20, 3], [30, 2], [40, 3], [50, 1], [70, 2], [80, 3], [90, 4]];
    const leaves = [10, 40, 90];
    const nodes = spec.map((s, i) => ({ id: String(s[0]), t: String(s[0]), x: 26 + i * 44, y: 28 + (s[1] - 1) * 62, box: leaves.includes(s[0]) }));
    const edges = [[50, 30], [50, 70], [30, 20], [30, 40], [20, 10], [70, 80], [80, 90]].map(e => [String(e[0]), String(e[1])]);
    const t43 = graph({ w: 360, h: 250, maxw: 360, nodes, edges, label: 'Árbol de altura 4 con las hojas 10, 40 y 90 enmarcadas' });

    return intro +
    qa('¿Qué es un árbol?', `
      <p>Es una <strong>estructura de datos no lineal y jerárquica</strong> formada por <strong>nodos</strong> unidos por <strong>aristas</strong>. Tiene un nodo especial llamado <strong>raíz</strong>; todos los demás nodos tienen exactamente un padre y no hay ciclos. Es una estructura <strong>recursiva</strong>: cada nodo es la raíz de un subárbol.</p>
      <p>Sirve para representar jerarquías (carpetas y archivos, organigramas, expresiones) y para buscar datos de forma eficiente.</p>`) +
    qa('¿Qué tipos de árboles conoce?', `
      <ul>
        <li><strong>Árbol general (n-ario):</strong> cada nodo puede tener cualquier cantidad de hijos.</li>
        <li><strong>Árbol binario:</strong> cada nodo tiene como máximo dos hijos (izquierdo y derecho).</li>
        <li><strong>Árbol binario de búsqueda (ABB):</strong> binario donde, en cada nodo, las claves del subárbol izquierdo son menores y las del derecho son mayores.</li>
        <li><strong>Árbol AVL:</strong> ABB que se mantiene equilibrado mediante rotaciones.</li>
        <li><strong>Árbol B:</strong> árbol de búsqueda multicamino y equilibrado, pensado para almacenamiento en disco (bases de datos, índices).</li>
      </ul>
      <p>Según su forma también se habla de árboles <em>completos</em>, <em>llenos</em> y <em>degenerados</em> (una cadena).</p>`) +
    qa('¿Qué es la altura de un árbol?', `
      <p>Es el <strong>nivel más alto</strong> del árbol, es decir, la cantidad de niveles que tiene contando la raíz como nivel 1. Equivale al número de nodos del camino más largo desde la raíz hasta una hoja.</p>
      <p>Ejemplo: un árbol con raíz, hijos y nietos tiene altura 3. Algunos autores cuentan aristas en lugar de nodos y entonces la altura es una unidad menor; conviene usar el criterio que use la cátedra.</p>`) +
    qa('¿Cuándo un árbol está equilibrado?', `
      <p>Un árbol está <strong>equilibrado</strong> cuando para <strong>cada nodo</strong> las alturas de sus subárboles izquierdo y derecho difieren como máximo en 1. Esa es la condición de los árboles AVL (factor de equilibrio −1, 0 o 1).</p>
      <p>Un árbol equilibrado tiene altura cercana a log<sub>2</sub> n, por eso la búsqueda es rápida. Si está desequilibrado (por ejemplo, claves insertadas en orden creciente en un ABB), se degenera en una lista y la búsqueda pasa a ser O(n).</p>`) +
    qa('Dibuje un árbol de altura 4 e indique el valor de sus hojas', `
      ${fig(t43, 'Árbol binario de búsqueda de altura 4. Las hojas (enmarcadas) son 10, 40 y 90')}
      <p>El árbol tiene 4 niveles: 50 en el nivel 1; 30 y 70 en el 2; 20, 40 y 80 en el 3; 10 y 90 en el 4.</p>
      <p><strong>Hojas</strong> (nodos sin hijos): <strong>10, 40 y 90</strong>.</p>`) +
    qa('¿Cuáles son las formas de recorrer los árboles binarios?', `
      <ul>
        <li><strong>En profundidad</strong> (recursivo): <em>preorden</em> (raíz, izquierdo, derecho), <em>inorden</em> (izquierdo, raíz, derecho) y <em>postorden</em> (izquierdo, derecho, raíz).</li>
        <li><strong>En amplitud</strong> o por niveles (iterativo, con una cola): nivel por nivel, de izquierda a derecha.</li>
      </ul>`) +
    qa('¿Cómo se manejan los árboles binarios?', `
      <p>Se implementan con <strong>nodos dinámicos enlazados</strong>: cada nodo guarda un dato y dos punteros (a su hijo izquierdo y a su hijo derecho), y el árbol se maneja a través de un puntero a la raíz (<code>NULL</code> si está vacío). Las operaciones básicas son crear, insertar, buscar, eliminar y recorrer, y casi todas se escriben de forma <strong>recursiva</strong>, porque cada subárbol es un árbol.</p>
      ${code(`
typedef struct nodo {
    int dato;
    struct nodo *izq, *der;
} tNodo;
typedef tNodo *tArbol;

/* Inserción en un árbol binario de búsqueda */
tArbol insertar(tArbol a, int x)
{
    if (a == NULL) {
        a = malloc(sizeof(tNodo));
        a->dato = x;
        a->izq = a->der = NULL;
    } else if (x < a->dato)
        a->izq = insertar(a->izq, x);
    else
        a->der = insertar(a->der, x);
    return a;
}`, 'C')}`) +
    qa('¿Cómo se maneja un recorrido preorden?', `
      <p>Se visita la <strong>raíz primero</strong>, antes que sus subárboles. En cada nodo, de forma recursiva:</p>
      <ol><li>Visitar la raíz.</li><li>Recorrer en preorden el subárbol izquierdo.</li><li>Recorrer en preorden el subárbol derecho.</li></ol>
      <p>Si el subárbol está vacío, no se hace nada (caso base). Sirve, por ejemplo, para copiar un árbol, porque cada padre aparece antes que sus hijos.</p>
      ${travFig('pre')}`) +
    qa('¿Cómo se maneja un recorrido postorden?', `
      <p>Se visita la <strong>raíz al final</strong>, después de sus subárboles. En cada nodo, de forma recursiva:</p>
      <ol><li>Recorrer en postorden el subárbol izquierdo.</li><li>Recorrer en postorden el subárbol derecho.</li><li>Visitar la raíz.</li></ol>
      <p>Sirve, por ejemplo, para liberar un árbol, porque los hijos se eliminan antes que el padre.</p>
      ${travFig('post')}`) +
    qa('¿Cómo se maneja un recorrido inorden?', `
      <p>Se visita la <strong>raíz en el medio</strong>, entre sus dos subárboles. En cada nodo, de forma recursiva:</p>
      <ol><li>Recorrer en inorden el subárbol izquierdo.</li><li>Visitar la raíz.</li><li>Recorrer en inorden el subárbol derecho.</li></ol>
      <p>En un árbol binario de búsqueda entrega las claves ordenadas de menor a mayor.</p>
      ${travFig('ino')}`) +
    qa('¿Cómo se manejan los árboles B?', `
      <p>Un <strong>árbol B de orden m</strong> es un árbol de búsqueda <strong>multicamino y equilibrado</strong>: cada nodo guarda varias claves ordenadas (hasta m − 1) y puede tener hasta m hijos. Todas las hojas están en el mismo nivel. Se usa en bases de datos y sistemas de archivos porque, al tener nodos grandes y poca altura, minimiza los accesos a disco.</p>
      <ul>
        <li><strong>Búsqueda:</strong> en cada nodo se busca la clave entre las suyas; si no está, se baja por el hijo correspondiente al intervalo donde caería.</li>
        <li><strong>Inserción:</strong> se inserta en la hoja correspondiente. Si el nodo se llena más de lo permitido, se <strong>divide en dos</strong> y la clave del medio sube al padre (la división puede propagarse y hacer crecer la raíz).</li>
        <li><strong>Eliminación:</strong> si un nodo queda con menos claves que el mínimo, se toma prestada una clave de un hermano o se <strong>fusiona</strong> con él.</li>
      </ul>
      <p>Como las divisiones y fusiones mantienen siempre las hojas a la misma profundidad, el árbol nunca se desequilibra.</p>`) +
    qa('¿Cómo es el manejo de un árbol AVL?', `
      <p>Es un ABB que se <strong>autoequilibra</strong>. A cada nodo se le calcula el <strong>factor de equilibrio</strong> FE = altura(derecho) − altura(izquierdo) (según el autor puede definirse al revés), que debe ser −1, 0 o 1.</p>
      <ol>
        <li>Se inserta o elimina como en un ABB común.</li>
        <li>Se recalculan los factores de equilibrio subiendo hacia la raíz.</li>
        <li>Si algún nodo llega a ±2, se <strong>rota</strong> para restablecer el equilibrio.</li>
      </ol>
      ${table(['Caso', 'Desequilibrio', 'Rotación'], [
        ['Izquierda-izquierda', 'El árbol está cargado hacia la izquierda del hijo izquierdo', 'Simple a la derecha'],
        ['Derecha-derecha', 'Cargado hacia la derecha del hijo derecho', 'Simple a la izquierda'],
        ['Izquierda-derecha', 'Cargado hacia la derecha del hijo izquierdo', 'Doble: izquierda y luego derecha'],
        ['Derecha-izquierda', 'Cargado hacia la izquierda del hijo derecho', 'Doble: derecha y luego izquierda']
      ])}
      <p>Gracias a esto, búsqueda, inserción y borrado cuestan <strong>O(log n)</strong> en el peor caso.</p>`) +
    qa('Realice una comparación entre los distintos árboles', `
      ${table(['Árbol', 'Hijos por nodo', 'Orden de las claves', 'Equilibrio', 'Uso típico', 'Búsqueda (peor caso)'], [
        ['General', 'Cualquier cantidad', 'Ninguno', 'No', 'Jerarquías (carpetas, organigramas)', 'O(n)'],
        ['Binario', 'Hasta 2', 'Ninguno necesariamente', 'No', 'Expresiones, base de otros árboles', 'O(n)'],
        ['ABB', 'Hasta 2', 'Izquierda &lt; raíz &lt; derecha', 'No garantizado', 'Búsqueda y datos ordenados', 'O(n) (O(log n) en promedio)'],
        ['AVL', 'Hasta 2', 'Igual que el ABB', 'Sí, con rotaciones', 'Búsquedas frecuentes en memoria', 'O(log n)'],
        ['B', 'Hasta m (varias claves por nodo)', 'Claves ordenadas dentro del nodo', 'Sí, hojas al mismo nivel', 'Bases de datos e índices en disco', 'O(log n), con pocos accesos a disco']
      ].map(r => r.map(x => ({ h: x }))))}`);
  };

  /* ======================= ARCHIVOS ======================= */

  C['u7-g0-t1'] = () => intro +
    qa('¿Cuáles son los tipos de archivos en relación al programa con el que se los usa?', `
      <p>Se pueden ver desde dos puntos de vista:</p>
      <ul>
        <li><strong>Según el flujo de datos respecto del programa:</strong> de <em>entrada</em> (el programa los lee), de <em>salida</em> (el programa los escribe) y de <em>entrada/salida</em> (se leen y se escriben).</li>
        <li><strong>Según su uso en el sistema:</strong> <em>permanentes</em> (maestros: sus datos cambian poco), de <em>movimiento</em> (novedades que se aplican sobre los permanentes) y <em>temporales</em> (se crean mientras se usan y luego se destruyen).</li>
      </ul>
      <p>También depende del programa el formato: los archivos de <em>texto</em> se pueden leer con cualquier editor, mientras que los <em>binarios</em> solo los interpreta correctamente el programa que los generó.</p>`) +
    qa('¿Cuáles son los tipos de organización?', `
      <ul>
        <li><strong>Secuencial:</strong> los registros se guardan uno detrás de otro y se acceden en ese mismo orden; para llegar al registro 50 hay que pasar por los 49 anteriores. Pueden estar ordenados o no.</li>
        <li><strong>Indexada:</strong> los registros se localizan por una <strong>clave</strong> con ayuda de un índice; el orden lógico lo da la clave, aunque físicamente estén en el orden de grabación.</li>
      </ul>
      <p>En otros textos se agrega la organización <em>relativa o directa</em>, donde la posición del registro se calcula a partir de la clave.</p>`) +
    qa('¿Cuáles son los tipos de acceso?', `
      <ul>
        <li><strong>Secuencial:</strong> se leen los registros uno tras otro, en orden. Típico de los archivos de texto.</li>
        <li><strong>Aleatorio (directo o <em>random</em>):</strong> se accede directamente a un registro sin leer los anteriores. Requiere registros de longitud fija (o conocer la clave en un indexado).</li>
        <li><strong>Binario:</strong> permite leer y escribir bytes en cualquier posición; hay que conocer exactamente cómo se escribieron los datos.</li>
        <li><strong>Dinámico:</strong> en archivos indexados, combina el acceso secuencial y el aleatorio.</li>
      </ul>`) +
    qa('¿Cómo se crea un archivo?', `
      <p>Se crea un <strong>flujo</strong> (<em>stream</em>) de salida sobre un nombre de archivo; si el archivo no existe, se crea. Después hay que cerrarlo.</p>
      ${code(`
using System.IO;

// Crea (o sobrescribe) el archivo y lo cierra
File.Create("alumnos.txt").Close();

// O directamente con un StreamWriter
using (StreamWriter sw = new StreamWriter("alumnos.txt", false)) // false = crear / sobrescribir
{
    // acá se escribirían los registros
}`, 'C#')}`) +
    qa('¿Cómo se lee un archivo?', `
      <p>Pasos: <strong>abrir</strong> el flujo de lectura (verificando antes que el archivo exista), <strong>leer</strong> hasta el fin del archivo (EOF) y <strong>cerrar</strong>.</p>
      ${code(`
if (File.Exists("alumnos.txt"))
{
    using (StreamReader sr = new StreamReader("alumnos.txt"))
    {
        string linea;
        while ((linea = sr.ReadLine()) != null)   // null = fin del archivo
            Console.WriteLine(linea);
    }
}`, 'C#')}`) +
    qa('¿Cómo se graba un archivo?', `
      <p>Pasos: <strong>abrir</strong> el flujo de escritura, <strong>escribir</strong> los datos y <strong>cerrar</strong> (el cierre vacía el búfer y asegura que todo quede guardado). Con <code>append = true</code> se agregan registros al final sin borrar los anteriores.</p>
      ${code(`
using (StreamWriter sw = new StreamWriter("alumnos.txt", true)) // true = agregar al final
{
    sw.WriteLine("1;Ana;9");
    sw.WriteLine("2;Luis;7");
}`, 'C#')}
      <p>Para archivos binarios se usan <code>BinaryWriter</code> y <code>BinaryReader</code>.</p>`);

  /* ======================= CORTE DE CONTROL Y APAREO ======================= */

  C['u7-g0-t2'] = () => intro +
    qa('Explique la metodología del corte de control. ¿Para qué se usa?', `
      <p>Se usa para <strong>procesar un archivo agrupando sus registros</strong> según el valor de uno o más campos (los <em>campos de control</em>) y obtener resultados por grupo: totales, subtotales, promedios o contadores. Ejemplo: listar las ventas con el subtotal por sucursal y el total general.</p>
      <p>El archivo debe estar <strong>ordenado por el campo de control</strong>, de modo que los registros de un mismo grupo queden juntos. Cuando el valor del campo <strong>cambia</strong> respecto del registro anterior, se produce el <strong>corte</strong>: se emite el resultado del grupo y se reinician los acumuladores.</p>
      ${code(`
leer(reg)
mientras no sea fin de archivo
    controlAnterior = reg.campo
    acumulador = 0
    mientras no sea fin de archivo y reg.campo = controlAnterior
        acumulador = acumulador + reg.importe
        leer(reg)
    fin mientras
    imprimir controlAnterior, acumulador      // corte
    totalGeneral = totalGeneral + acumulador
fin mientras
imprimir totalGeneral`)}
      <p>Si hay <strong>varios campos de control</strong> (corte compuesto, por ejemplo banco → sucursal → cuenta) se anidan los ciclos: cuando cambia un campo de nivel superior, primero se cortan los niveles inferiores y luego el superior.</p>`) +
    qa('¿Qué es un campo?', `
      <p>Es la <strong>unidad lógica mínima</strong> de información de un archivo, donde se guarda un dato individual (por ejemplo, número de cuenta, apellido o fecha). Se define por su <strong>nombre, tipo y tamaño</strong>.</p>`) +
    qa('¿Qué es un registro?', `
      <p>Es un <strong>conjunto de campos relacionados</strong> que describen una misma entidad (por ejemplo, todos los datos de un alumno). Un archivo es un conjunto de registros; si se lo piensa como una tabla, cada fila es un registro y cada columna un campo.</p>`) +
    qa('¿Qué es necesario para realizar un corte de control?', `
      <ul>
        <li>Un archivo <strong>ordenado</strong> por el campo (o los campos) de control, y con registros repetidos para ese campo.</li>
        <li>Definir el <strong>campo de control</strong> y, si el corte es compuesto, su <strong>orden jerárquico</strong> de mayor a menor.</li>
        <li>Una variable que guarde el <strong>valor de control anterior</strong> para detectar el cambio.</li>
        <li><strong>Acumuladores y contadores</strong> por cada nivel de corte, más los totales generales.</li>
        <li>Control del <strong>fin de archivo</strong> (EOF) y emisión de los resultados del último grupo al terminar.</li>
      </ul>`) +
    qa('Explique la metodología para el apareo de archivos secuencial', `
      <p>El <strong>apareo</strong> procesa dos (o más) archivos ordenados por la misma clave recorriéndolos <strong>en paralelo</strong> y comparando las claves del registro actual de cada uno. Se usa, por ejemplo, para actualizar un archivo <em>maestro</em> con un archivo de <em>novedades</em> (altas, bajas y modificaciones) y generar un maestro nuevo.</p>
      <ul>
        <li><strong>Claves iguales:</strong> se procesa el par (por ejemplo, se actualiza el maestro con la novedad) y se avanza en ambos archivos.</li>
        <li><strong>Clave del primero menor:</strong> ese registro no tiene correspondiente en el otro; se procesa y se avanza solo en el primero.</li>
        <li><strong>Clave del primero mayor:</strong> se procesa el registro del segundo y se avanza solo en el segundo.</li>
        <li>Cuando <strong>uno termina</strong>, se procesa lo que quede del otro.</li>
      </ul>
      ${code(`
leer(A); leer(B)
mientras no sea fin de A o no sea fin de B
    si claveA = claveB
        procesar A y B ; leer(A) ; leer(B)
    sino si claveA < claveB
        procesar A ; leer(A)
    sino
        procesar B ; leer(B)
    fin si
fin mientras`)}
      ${note('Truco habitual: cuando un archivo llega a su fin se le asigna a su clave un <strong>valor máximo</strong> (<em>high value</em>). Así el ciclo único sigue funcionando hasta que ambos terminan, sin repetir código para el resto del otro archivo.')}`) +
    qa('¿Qué es necesario para realizar un apareo?', `
      <ul>
        <li>Que los archivos estén <strong>ordenados por la misma clave</strong> y en el mismo sentido (ascendente o descendente).</li>
        <li>Una <strong>clave común</strong> bien definida; normalmente sin repetidos en el maestro (las novedades pueden repetirse).</li>
        <li>Una <strong>lectura inicial</strong> de cada archivo y una variable de clave por cada uno.</li>
        <li>Control del <strong>fin de archivo de cada uno</strong> por separado.</li>
        <li>Un <strong>archivo de salida</strong> (maestro actualizado, listado o ambos) y las acciones a realizar en cada caso: igual, menor y mayor.</li>
      </ul>`);

  /* ======================= PARADIGMAS ======================= */

  C['u7-g0-t3'] = () => intro +
    qa('¿Cuáles son los fundamentos del paradigma estructurado?', `
      <p>Se basa en dividir el problema en <strong>bloques</strong> (procedimientos y funciones) y en usar solo <strong>tres estructuras de control</strong>: <em>secuencia</em>, <em>selección</em> (if, switch) e <em>iteración</em> (while, for). Se evita el salto incondicional (<code>goto</code>) y se resuelve el problema de lo general a lo particular (diseño descendente). Ventajas: programas más claros, fáciles de mantener y de reutilizar.</p>`) +
    qa('¿Cuáles son los fundamentos del paradigma orientado a eventos?', `
      <p>El flujo del programa no lo determina una secuencia fija de instrucciones sino los <strong>eventos</strong> que ocurren (un clic, una tecla, un temporizador, un mensaje). El programador define qué eventos le interesan y escribe un <strong>manejador de eventos</strong> para cada uno; el programa arranca, queda <strong>esperando</strong> y, cuando ocurre un evento, ejecuta el código asociado. Es el modelo de las interfaces gráficas.</p>`) +
    qa('¿Cuáles son los fundamentos del paradigma orientado a objetos?', `
      <p>Modela el sistema como un conjunto de <strong>objetos</strong> que combinan <strong>estado</strong> (atributos) y <strong>comportamiento</strong> (métodos) y que se comunican enviándose mensajes. Los objetos se crean a partir de <strong>clases</strong>. Sus pilares son <strong>abstracción, encapsulamiento, herencia y polimorfismo</strong>, y su principal ventaja es la reutilización de código.</p>`) +
    qa('¿A qué llamamos herencia?', `
      <p>Es el mecanismo por el cual una clase (<strong>subclase</strong>, derivada o hija) <strong>adquiere los atributos y métodos</strong> de otra (<strong>superclase</strong>, base o padre), pudiendo agregar otros nuevos o redefinir los heredados. Expresa una relación del tipo «es un»: un <em>Perro</em> es un <em>Animal</em>.</p>`) +
    qa('La herencia, ¿entre quiénes se da?', `
      <p>Se da <strong>entre clases</strong> (no entre objetos): de una clase base a una o más clases derivadas.</p>`) +
    qa('¿Qué tipos de herencia conoce?', `
      <ul>
        <li><strong>Simple:</strong> una clase deriva de una sola clase base.</li>
        <li><strong>Múltiple:</strong> una clase deriva de varias bases (C++ lo permite; Java y C# no, y usan interfaces).</li>
        <li><strong>Multinivel:</strong> una cadena de derivaciones (A → B → C).</li>
        <li><strong>Jerárquica:</strong> varias clases derivan de una misma base.</li>
        <li><strong>Híbrida:</strong> combinación de las anteriores.</li>
      </ul>`) +
    qa('¿Qué es el polimorfismo?', `
      <p>Es la capacidad de que <strong>un mismo mensaje o método tenga comportamientos distintos</strong> según el objeto que lo recibe. Se logra por <em>sobrecarga</em> (mismo nombre con distintos parámetros, resuelto al compilar) y por <em>sobrescritura</em> (la subclase redefine un método de la base, resuelto al ejecutar).</p>
      ${code(`
abstract class Figura { public abstract double Area(); }
class Circulo   : Figura { public double r;     public override double Area() { return Math.PI * r * r; } }
class Rectangulo: Figura { public double b, h;  public override double Area() { return b * h; } }

Figura f = new Circulo();   // la misma llamada f.Area() ejecuta
f.Area();                   // el código de la clase real del objeto`, 'C#')}`) +
    qa('¿Qué es el encapsulamiento?', `
      <p>Es <strong>ocultar el estado interno</strong> de un objeto y permitir el acceso solo mediante su interfaz pública (métodos y propiedades). Se logra con modificadores de acceso como <code>private</code> y <code>public</code>. Protege los datos de modificaciones indebidas y permite cambiar la implementación sin afectar a quien usa la clase.</p>`) +
    qa('¿A qué se llama reutilización de código?', `
      <p>A usar código ya escrito y probado (funciones, módulos, clases, bibliotecas) en distintos programas o partes de un programa, en lugar de volver a escribirlo. Reduce tiempo y errores. En el paradigma estructurado se logra con funciones y procedimientos; en el orientado a objetos, con clases, herencia y composición.</p>`) +
    qa('¿Qué es un objeto?', `
      <p>Es una <strong>instancia de una clase</strong>: una entidad concreta, real o abstracta, que tiene <strong>identidad</strong> (se distingue de los demás), <strong>estado</strong> (valores actuales de sus atributos) y <strong>comportamiento</strong> (los métodos que puede ejecutar).</p>`) +
    qa('¿Qué es un método?', `
      <p>Es una <strong>función definida dentro de una clase</strong> que describe una operación o comportamiento de sus objetos y que puede leer o modificar su estado. Los métodos especiales más conocidos son el <strong>constructor</strong> (inicializa el objeto) y el <strong>destructor</strong> (libera recursos).</p>`) +
    qa('¿Qué es instanciar un objeto?', `
      <p>Es <strong>crear un objeto a partir de una clase</strong>: se reserva memoria y se ejecuta el constructor.</p>
      ${code(`Persona p = new Persona("Ana");   // p es una instancia de la clase Persona`, 'C#')}`) +
    qa('¿Qué es una clase?', `
      <p>Es la <strong>plantilla o molde</strong> que define los atributos y métodos comunes de un conjunto de objetos. Describe cómo serán los objetos, pero no es un objeto en sí: un objeto es una instancia de una clase.</p>`) +
    qa('¿Qué es un evento?', `
      <p>Es un <strong>suceso que ocurre en el sistema</strong> y al que el programa puede reaccionar: un clic, un doble clic, mover el mouse, presionar una tecla, que venza un temporizador, etc. El código que se ejecuta como respuesta se llama <strong>manejador de eventos</strong>.</p>`) +
    qa('En el paradigma lógico, ¿qué son los predicados?', `
      <p>Son <strong>relaciones</strong> entre objetos, formadas por un nombre y una lista de argumentos. Se definen con hechos y reglas y pueden ser verdaderos o falsos.</p>
      ${code(`padre(juan, pedro).     % predicado padre/2: Juan es padre de Pedro`, 'Prolog')}`) +
    qa('En el paradigma lógico, ¿qué son los goals?', `
      <p>Son las <strong>metas u objetivos</strong>: lo que se quiere demostrar o resolver, es decir, las consultas. El sistema intenta <strong>satisfacerlas</strong> buscando en los hechos y reglas y, si tienen variables, devuelve los valores que las hacen verdaderas.</p>
      ${code(`?- padre(juan, X).      % goal: ¿de quién es padre Juan?`, 'Prolog')}`) +
    qa('En el paradigma lógico, ¿qué son las reglas?', `
      <p>Son <strong>cláusulas condicionales</strong> con la forma <code>cabeza :- cuerpo</code>: la cabeza es verdadera si se cumplen todas las condiciones del cuerpo. Se diferencian de los <strong>hechos</strong>, que son afirmaciones incondicionales.</p>
      ${code(`abuelo(X, Z) :- padre(X, Y), padre(Y, Z).   % X es abuelo de Z si X es padre de Y e Y es padre de Z`, 'Prolog')}`) +
    qa('¿Para qué se usa backtracking? ¿Para qué sirve?', `
      <p>El <strong>backtracking</strong> (vuelta atrás) es el mecanismo con el que Prolog <strong>busca soluciones</strong>. Se usa para <strong>probar alternativas</strong> cuando un camino no lleva a una solución: si un goal falla, el sistema <strong>vuelve atrás</strong> hasta el último punto donde había otra opción (otra cláusula u otro valor) y la prueba.</p>
      <p>Sirve para:</p>
      <ul>
        <li>Encontrar una solución aunque la primera alternativa elegida falle.</li>
        <li>Obtener <strong>todas</strong> las soluciones posibles de una consulta.</li>
        <li>Resolver problemas de búsqueda, como laberintos, puzzles o combinaciones, sin que el programador escriba explícitamente el recorrido.</li>
      </ul>
      ${code(`padre(juan, pedro).
padre(juan, ana).

?- padre(juan, X).    % X = pedro ; al pedir otra solución, vuelve atrás y obtiene X = ana`, 'Prolog')}`) +
    qa('¿Para qué sirve fail?', `
      <p><code>fail</code> es un predicado que <strong>siempre falla</strong>. Se usa para <strong>forzar el backtracking</strong>: obliga al sistema a volver atrás y buscar la siguiente solución. Es la forma típica de recorrer todas las soluciones, por ejemplo para listarlas.</p>
      ${code(`listar :- padre(X, Y), write(X), write(' es padre de '), write(Y), nl, fail.
listar.`, 'Prolog')}`) +
    qa('Realice un cuadro sinóptico comparando los paradigmas', `
      ${table(['Paradigma', 'Idea central', 'Unidad básica', 'Cómo se controla el flujo', 'Ventajas', 'Lenguajes'], [
        ['Estructurado', 'Dividir el problema en bloques con 3 estructuras de control', 'Procedimientos y funciones', 'Secuencia, selección e iteración', 'Claridad, mantenimiento y reutilización', 'C, Pascal'],
        ['Lógico', 'Programar con hechos, reglas y metas lógicas', 'Predicado (hecho o regla)', 'Búsqueda y backtracking del intérprete', 'Muy apto para inteligencia artificial y consultas', 'Prolog'],
        ['Orientado a objetos', 'Objetos con estado y comportamiento que se envían mensajes', 'Clase y objeto', 'Llamadas a métodos entre objetos', 'Reutilización (herencia), encapsulamiento, polimorfismo', 'C++, Java, C#, Visual Basic .NET, Smalltalk'],
        ['Orientado a eventos', 'El programa reacciona a lo que sucede', 'Evento y su manejador', 'Los eventos determinan qué código se ejecuta', 'Ideal para interfaces gráficas interactivas', 'Visual Basic 6, C# (Windows Forms), JavaScript']
      ].map(r => r.map(x => ({ h: x }))))}`) +
    qa('¿Cuáles son los lenguajes representativos de cada estilo?', `
      <ul>
        <li><strong>Estructurado:</strong> C, Pascal.</li>
        <li><strong>Lógico:</strong> Prolog.</li>
        <li><strong>Orientado a objetos:</strong> Simula, Smalltalk, C++, Java, C# y Visual Basic .NET.</li>
        <li><strong>Orientado a eventos:</strong> Visual Basic 6 y, en general, los entornos de interfaz gráfica (C# con Windows Forms, JavaScript en el navegador).</li>
      </ul>`);

  /* Botón «Mostrar / ocultar todas»: abre todas las respuestas de la sección, o las cierra si ya están todas abiertas. */
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-qa-toggle]');
    if (!b) return;
    const all = Array.from(b.closest('section').querySelectorAll('details.qa'));
    const open = all.some(d => !d.open);
    all.forEach(d => { d.open = open; });
  });
})();
