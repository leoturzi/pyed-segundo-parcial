/* Unidad 3 — Estructuras Dinámicas II (Árboles). Clases 8 y 9. */
(function () {
  const { graph, arr, fig, src, note, table, code } = H;
  const C = CONTENT;

  /* ---------- Árbol base a–f (usado en toda la nomenclatura) ---------- */
  const P = { a: [170, 34], b: [92, 104], c: [250, 104], d: [132, 174], e: [210, 174], f: [290, 174] };
  const EDGES = [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'e'], ['c', 'f']];
  function tree(o) {
    o = o || {};
    const nodes = Object.keys(P).map(k => ({ id: k, t: k, x: P[k][0], y: P[k][1], box: (o.box || []).includes(k) }));
    const edges = EDGES.map(e => [e[0], e[1], (o.edge || {})[e[0] + e[1]]]);
    const boxes = o.band ? [{ x: 96, y: 150, w: 232, h: 48 }] : [];
    const texts = o.levels ? [
      { x: 6, y: 38, t: 'Nivel 1', cls: 'mut' }, { x: 6, y: 108, t: 'Nivel 2', cls: 'mut' }, { x: 6, y: 178, t: 'Nivel 3', cls: 'mut' }
    ] : [];
    return graph({ w: 340, h: 208, nodes, edges, boxes, texts, maxw: 340, label: o.label || 'Árbol binario con los nodos a, b, c, d, e y f' });
  }

  const term = (h, def, ej, svg, cap) =>
    '<div class="term"><div class="term-t"><h3>' + h + '</h3><p>' + def + '</p>' + (ej ? '<p class="ej">' + ej + '</p>' : '') + '</div>' +
    '<div class="term-f">' + fig(svg, cap) + '</div></div>';

  /* ======================= CLASE 8 ======================= */

  C['u3-g0-t0'] = () => `
    <p>Un <strong>árbol</strong> es una estructura de datos que puede definirse de forma recursiva como:</p>
    <ul>
      <li>una estructura vacía, o</li>
      <li>un elemento o clave de información (<strong>nodo</strong>) más un número finito de estructuras tipo árbol, disjuntos, llamados <strong>subárboles</strong>.</li>
    </ul>
    <p>Si dicho número de estructuras es inferior o igual a 2, se tiene un <strong>árbol binario</strong>.</p>
    <p>Un árbol es, por tanto, una estructura <strong>no secuencial</strong>.</p>
    ${note(`Otra definición nos da el árbol como un tipo de <strong>grafo acíclico, conexo y no dirigido</strong>. Es un grafo no dirigido en el que existe exactamente un camino entre todo par de nodos. Esta definición permite implementar un árbol y sus operaciones empleando las representaciones que se utilizan para los grafos.`, 'Definición como grafo')}`;

  C['u3-g0-t1'] = () => {
    const grafo = graph({
      w: 300, h: 200, maxw: 300, label: 'Grafo con los nodos A a K',
      nodes: [['A', 150, 22], ['B', 80, 62], ['C', 150, 88], ['D', 235, 68], ['E', 42, 108], ['F', 112, 128], ['G', 196, 118], ['H', 272, 98], ['I', 62, 168], ['J', 156, 178], ['K', 250, 160]]
        .map(n => ({ id: n[0], t: n[0], x: n[1], y: n[2] })),
      edges: [['A', 'B'], ['A', 'C'], ['A', 'D'], ['B', 'E'], ['E', 'I'], ['I', 'F'], ['C', 'G'], ['G', 'J'], ['J', 'K'], ['K', 'H'], ['D', 'H']]
    });
    return `
    <p>Un mismo árbol puede mostrarse de distintas maneras. Las tres figuras de la clase son:</p>
    <div class="figrow">
      ${fig(grafo, '<strong>Grafo</strong>')}
      ${fig(tree(), '<strong>Árbol representado como grafo</strong>')}
      ${fig('<pre class="cols">a\n  b\n    d\n  c\n    e\n    f</pre>', '<strong>Árbol representado como un diagrama en columnas</strong>')}
    </div>`;
  };

  C['u3-g0-t2'] = () => `
    <h3>Árbol binario balanceado (árbol AVL)</h3>
    <p>El nombre AVL proviene de las iniciales de sus creadores: <em>Adelson, Velski y Landis</em>.</p>
    <ul>
      <li>Un árbol balanceado simplifica en gran medida las operaciones de búsqueda.</li>
      <li>Está <strong>balanceado</strong> cuando, para todos sus nodos, la altura de la rama izquierda no difiere más de una unidad de la altura de la rama derecha (o viceversa).</li>
      <li>El <strong>factor de equilibrio (FE)</strong> es la diferencia entre las alturas de un subárbol y las del otro subárbol. En un árbol balanceado, FE = 0, -1 o 1.</li>
    </ul>
    ${table(['Factor de equilibrio', 'Significado'], [
      ['FE = 0', 'Nodo perfectamente equilibrado'],
      ['FE = 1', 'El nodo derecho es un nivel más alto'],
      ['FE = -1', 'El nodo izquierdo es un nivel más alto'],
      ['FE ≥ |2|', 'Hay que equilibrar el árbol']
    ])}
    ${note('Para equilibrar o balancear un árbol hay que aplicar <strong>rotaciones</strong>.')}`;

  C['u3-g0-t3'] = () => `
    <p>La presentación define cada término con un mismo árbol de ejemplo (nodos a, b, c, d, e, f). Término por término, con su figura:</p>
    ${term('Raíz', 'Es aquel elemento que no tiene antecesor.', 'Ejemplo: <strong>a</strong>.', tree({ box: ['a'] }), 'Raíz resaltada: a')}
    ${term('Rama', 'Arista entre dos nodos.', '', tree({ edge: { ac: 'hl' } }), 'Rama resaltada: la arista entre a y c')}
    ${term('Antecesor', 'Un nodo X es antecesor de un nodo Y si por alguna de las ramas de X se puede llegar a Y.', '',
      tree({ box: ['a'], edge: { ac: 'harrow' } }), '“a” es antecesor de “c” pues se puede llegar a “c” desde “a” por una arista.')}
    ${term('Sucesor', 'Un nodo X es sucesor de un nodo Y si por alguna de las ramas de Y se puede llegar a X.', '',
      tree({ box: ['a'], edge: { ac: 'harrow' } }), '“c” es sucesor de “a” pues se puede llegar a “c” desde “a” por una arista.')}
    ${term('Grado de un nodo', 'El número de descendientes directos que tiene.', 'Ejemplo: <strong>c</strong> tiene grado 2, <strong>d</strong> tiene grado 0, <strong>a</strong> tiene grado 2.',
      tree({ box: ['c'], edge: { ce: 'harrow', cf: 'harrow' } }), 'Grado de c: dos descendientes directos (e y f)')}
    ${term('Hoja', 'Nodo que no tiene descendientes: grado 0.', 'Ejemplo: <strong>d</strong>.', tree({ box: ['d'] }), 'Hoja resaltada: d')}
    ${term('Nodo interno', 'Aquel que tiene al menos un descendiente.', '', tree({ box: ['a', 'b', 'c'] }), 'Nodos internos resaltados: a, b y c')}
    ${term('Nivel', 'Número de ramas que hay que recorrer para llegar de la raíz a un nodo.',
      'Ejemplo: el nivel del nodo <strong>a</strong> es 1 (es un convenio), el nivel del nodo <strong>e</strong> es 3.',
      tree({ levels: true, edge: { ac: 'hl', ce: 'hl' } }), 'Camino de la raíz al nodo e: ramas a–c y c–e')}
    ${term('Altura', 'El nivel más alto del árbol.', 'En el árbol de ejemplo, el nivel más alto es el 3.', tree({ levels: true }), 'Niveles del árbol de ejemplo')}
    ${term('Anchura', 'Es el mayor valor del número de nodos que hay en un nivel.', 'En la figura, la anchura es <strong>3</strong>.',
      tree({ levels: true, band: true }), 'El nivel 3 tiene tres nodos: d, e y f')}`;

  C['u3-g0-t4'] = () => `
    <p>En ciencias de la computación, un <strong>árbol binario</strong> es una estructura de datos en la cual cada nodo puede tener un hijo izquierdo y un hijo derecho. No pueden tener más de dos hijos (de ahí el nombre «binario»).</p>
    <p>Si algún hijo tiene como referencia a <code>null</code>, es decir que no almacena ningún dato, entonces este es llamado un <strong>nodo externo</strong>. En el caso contrario el hijo es llamado un <strong>nodo interno</strong>. Usos comunes de los árboles binarios son los <strong>árboles binarios de búsqueda</strong>.</p>
    <h3>Definición en teoría de grafos</h3>
    <p>En teoría de grafos, se usa la siguiente definición: «Un árbol binario es un grafo conexo, acíclico y no dirigido tal que el grado de cada vértice no es mayor a 3». De esta forma solo existe un camino entre un par de nodos.</p>
    <dl class="defs">
      <dt>Grafo</dt><dd>Representación gráfica de diversos puntos que se conocen como nodos o vértices, los cuales se encuentran unidos a través de líneas que reciben el nombre de aristas.</dd>
      <dt>Conexo</dt><dd>Que está conectado o guarda relación entre todas sus partes.</dd>
      <dt>Acíclico</dt><dd>Implica que no tiene ciclos; esto significa que para cada vértice v, no hay un camino directo que empiece y termine en v. No tiene sentido que un vértice tenga un camino directo a sí mismo.</dd>
      <dt>No dirigido</dt><dd>Implica que las aristas son no dirigidas: el grafo no dirigido es aquel en el que su arista no tiene sentido.</dd>
    </dl>
    <h3>Árbol binario enraizado y bosque</h3>
    <p>Un árbol binario enraizado es como un grafo que tiene uno de sus vértices, llamado <strong>raíz</strong>, de grado no mayor a 2. Con la raíz escogida, cada vértice tendrá un único padre, y nunca más de dos hijos. Si rehusamos el requerimiento de la conectividad, permitiendo múltiples componentes conectados en el grafo, llamaremos a esta última estructura un <strong>bosque</strong>.</p>
    ${note('Un árbol binario es un árbol en el que ningún nodo puede tener más de dos subárboles. En un árbol binario cada nodo puede tener cero, uno o dos hijos (subárboles). Se conoce el nodo de la izquierda como <strong>hijo izquierdo</strong> y el nodo de la derecha como <strong>hijo derecho</strong>.')}`;

  C['u3-g0-t5'] = () => {
    const t = graph({
      w: 270, h: 200, maxw: 270, label: 'Árbol binario con las claves 2, 7, 5, 2, 6, 9, 5, 11 y 4',
      nodes: [['r', '2', 130, 24], ['l', '7', 64, 72], ['rr', '5', 190, 72], ['ll', '2', 28, 124], ['lr', '6', 96, 124], ['rrr', '9', 214, 124], ['lrl', '5', 62, 176], ['lrr', '11', 126, 176], ['rrrl', '4', 190, 176]]
        .map(n => ({ id: n[0], t: n[1], x: n[2], y: n[3] })),
      edges: [['r', 'l', 'arrow'], ['r', 'rr', 'arrow'], ['l', 'll', 'arrow'], ['l', 'lr', 'arrow'], ['lr', 'lrl', 'arrow'], ['lr', 'lrr', 'arrow'], ['rr', 'rrr', 'arrow'], ['rrr', 'rrrl', 'arrow']]
    });
    return `
    <p>En base al gráfico, se detallan y ejemplifican las diferentes formas de recorrer el árbol.</p>
    ${fig(t, 'Árbol del ejemplo (las claves pueden repetirse)')}
    <p>Recorrer un árbol es <strong>visitar cada nodo exactamente una vez</strong> (por ejemplo, para imprimir su clave). Como un árbol no es secuencial como una lista, hay que definir un orden. Hay dos familias de recorridos:</p>
    <ul>
      <li>En <strong>profundidad</strong>: se baja por una rama hasta el final antes de pasar a la siguiente (preorden, inorden y postorden).</li>
      <li>En <strong>amplitud</strong> (o por niveles): se visita todo un nivel antes de bajar al siguiente.</li>
    </ul>
    <h3>Recorridos en profundidad</h3>
    <p>Se definen de forma recursiva. En cada nodo hay tres tareas: <strong>R</strong> (visitar la raíz del subárbol), <strong>I</strong> (recorrer su subárbol izquierdo) y <strong>D</strong> (recorrer su subárbol derecho). Siempre se hace I antes que D; lo único que cambia es <strong>cuándo se visita la raíz</strong>. Un subárbol vacío es el caso base: no se hace nada.</p>
    <div class="trav">
      <div><h4>Preorden (R, I, D)</h4>
        <p>La raíz se visita <strong>antes</strong> que los subárboles.</p>
        <ol><li>Visitar la raíz</li><li>Recorrer en preorden el subárbol izquierdo</li><li>Recorrer en preorden el subárbol derecho</li></ol>
        <p>Sirve, por ejemplo, para copiar un árbol, porque cada padre aparece antes que sus hijos.</p>
        ${arr('Preorden', ['2', '7', '2', '6', '5', '11', '5', '9', '4'])}</div>
      <div><h4>Inorden (I, R, D)</h4>
        <p>La raíz se visita <strong>entre</strong> los dos subárboles (también llamado recorrido simétrico).</p>
        <ol><li>Recorrer en inorden el subárbol izquierdo</li><li>Visitar la raíz</li><li>Recorrer en inorden el subárbol derecho</li></ol>
        <p>En un árbol binario de búsqueda (ABB) entrega las claves <strong>ordenadas de menor a mayor</strong>.</p>
        ${arr('Inorden', ['2', '7', '5', '6', '11', '2', '5', '4', '9'])}</div>
      <div><h4>Postorden (I, D, R)</h4>
        <p>La raíz se visita <strong>después</strong> de los subárboles.</p>
        <ol><li>Recorrer en postorden el subárbol izquierdo</li><li>Recorrer en postorden el subárbol derecho</li><li>Visitar la raíz</li></ol>
        <p>Sirve, por ejemplo, para liberar un árbol, porque los hijos se eliminan antes que el padre.</p>
        ${arr('Postorden', ['2', '5', '11', '6', '7', '4', '9', '5', '2'])}</div>
    </div>
    ${note('Regla para recordarlos: el prefijo indica cuándo se visita la raíz. <strong>Pre</strong> = antes de los hijos, <strong>In</strong> = entre los hijos, <strong>Post</strong> = después de los hijos.')}
    <h4>¿Cómo se llega del 7 al 5 en el inorden?</h4>
    <p>El 5 que sigue al 7 no es hijo del 7: es el hijo izquierdo del 6, que es el hijo derecho del 7. Aplicando la regla al nodo 7: primero se recorre su subárbol izquierdo (el 2, que se visita); luego se visita el <strong>7</strong>; y por último se recorre su subárbol derecho, que tiene al 6 como raíz. Ese subárbol también se recorre en inorden: primero su izquierda (el <strong>5</strong>), luego el <strong>6</strong> y luego su derecha (el <strong>11</strong>). Para empezar un subárbol siempre hay que bajar por la izquierda hasta el nodo más a la izquierda, y recién ahí se empieza a visitar.</p>
    <h3>Recorrido en amplitud (o por niveles)</h3>
    <p>Se visitan los nodos <strong>nivel por nivel, de arriba hacia abajo y de izquierda a derecha</strong> dentro de cada nivel: primero la raíz (nivel 1), luego sus hijos (nivel 2), luego los nietos (nivel 3), y así sucesivamente.</p>
    ${arr('Amplitud', ['2', '7', '5', '2', '6', '9', '5', '11', '4'])}
    <p>A diferencia de los recorridos en profundidad, no se implementa de forma recursiva sino <strong>iterativa con una cola</strong> (FIFO: el primero que entra es el primero que sale). Se encola la raíz y, mientras la cola no esté vacía: se <strong>desencola</strong> un nodo, se lo <strong>visita</strong> y se <strong>encolan</strong> sus hijos izquierdo y derecho (solo los que existen). Como los hijos quedan detrás de los nodos que ya estaban esperando, cada nivel se completa antes de pasar al siguiente.</p>
    ${note('Con una <strong>pila</strong> (LIFO) en lugar de una cola, el mismo esquema iterativo produce un recorrido en profundidad (preorden, si se apila primero el hijo derecho y después el izquierdo). Con una <strong>cola</strong> produce el recorrido en amplitud.')}
    <h4>Ejemplo en C</h4>
    ${code(`
void amplitud(tarbol *a)
{
    tCola cola;   /* las claves de la cola serán de tipo árbol binario */
    arbol *aux;
    if (a != NULL) {
        CrearCola(cola);
        encolar(cola, a);
        while (!colavacia(cola)) {
            desencolar(cola, aux);
            visitar(aux);
            if (aux->izq != NULL) encolar(cola, aux->izq);
            if (aux->der != NULL) encolar(cola, aux->der);
        }
    }
}`, 'C')}`;
  };

  /* ======================= CLASE 9 ======================= */

  C['u3-g1-t0'] = () => {
    const root = { id: 'a', t: 'a', x: 150, y: 28 };
    const fig1 = graph({
      w: 300, h: 120, maxw: 300, label: 'Paso 1: la raíz a, con los subárboles {b, d} y {e, c, f}',
      nodes: [root, { id: 'L', t: 'b, d', x: 60, y: 96, shape: 'r' }, { id: 'R', t: 'e, c, f', x: 240, y: 96, shape: 'r' }],
      edges: [['a', 'L'], ['a', 'R']]
    });
    const fig2 = graph({
      w: 300, h: 190, maxw: 300, label: 'Paso 2: se crea el subárbol izquierdo con raíz b',
      nodes: [root, { id: 'b', t: 'b', x: 80, y: 90 }, { id: 'R', t: 'e, c, f', x: 240, y: 90, shape: 'r' },
        { id: 'v', t: 'Vacío', x: 36, y: 160, shape: 'p' }, { id: 'd', t: 'd', x: 126, y: 160, shape: 'r' }],
      edges: [['a', 'b'], ['a', 'R'], ['b', 'v'], ['b', 'd']]
    });
    const fig3 = graph({
      w: 300, h: 230, maxw: 300, label: 'Paso 3: b no tiene subárbol izquierdo; su subárbol derecho es d, sin descendientes',
      nodes: [root, { id: 'b', t: 'b', x: 80, y: 84 }, { id: 'R', t: 'e, c, f', x: 240, y: 84, shape: 'r' },
        { id: 'v1', t: 'Vacío', x: 34, y: 150, shape: 'p' }, { id: 'd', t: 'd', x: 126, y: 150 },
        { id: 'v2', t: 'Vacío', x: 92, y: 212, shape: 'p' }, { id: 'v3', t: 'Vacío', x: 162, y: 212, shape: 'p' }],
      edges: [['a', 'b'], ['a', 'R'], ['b', 'v1'], ['b', 'd'], ['d', 'v2'], ['d', 'v3']]
    });
    const step = (f, pre, ino, cap) => `<div class="step">${f}<div class="arrs">${arr('Preorden', pre)}${arr('Inorden', ino)}</div><p class="stepcap">${cap}</p></div>`;
    return `
    <p>Hasta el momento se ha visto la declaración y recorrido de un árbol binario. Sin embargo, no se ha estudiado ningún método para crearlos. A continuación se estudia un método para crear un árbol binario que <strong>no tenga claves repetidas</strong>, partiendo de su recorrido en preorden e inorden, almacenados en arrays.</p>
    <p>Partiendo de los recorridos preorden e inorden puede determinarse que <strong>la raíz es el primer elemento del recorrido en preorden</strong>. Ese elemento se busca en el array inorden. Los elementos en el array inorden entre <code>izq</code> y la raíz forman el <strong>subárbol izquierdo</strong>. Asimismo, los elementos entre la raíz y <code>der</code> forman el <strong>subárbol derecho</strong>.</p>
    <p class="mut-p">Convención de las figuras: encerrado en círculo, el elemento actual (<code>Pos</code>); tachado, el elemento ya utilizado.</p>
    <h3>Paso 1: la raíz</h3>
    ${step(fig1, [['a', 'cur'], 'b', 'd', 'c', 'e', 'f'], [['b', 'gl'], ['d', 'gl'], ['a', 'cur'], ['e', 'gr'], ['c', 'gr'], ['f', 'gr']],
      'La raíz es <strong>a</strong>. En el inorden, <strong>b, d</strong> quedan a su izquierda (Izq) y <strong>e, c, f</strong> a su derecha (Der).')}
    <h3>Paso 2: el subárbol izquierdo</h3>
    <p>A continuación comienza un proceso recursivo. Se procede a crear el subárbol izquierdo, cuyo tamaño está limitado por los índices <code>izq</code> y <code>der</code>. La siguiente posición en el recorrido en preorden es la raíz de este subárbol.</p>
    ${step(fig2, [['a', 'done'], ['b', 'cur'], 'd', 'c', 'e', 'f'], [['b', 'gl cur'], ['d', 'gl'], ['a', 'done'], ['e', 'gr'], ['c', 'gr'], ['f', 'gr']],
      'La raíz del subárbol izquierdo es <strong>b</strong>. A su izquierda en el inorden no hay nada (<em>Vacío</em>) y a su derecha queda <strong>d</strong>.')}
    <h3>Paso 3: el subárbol derecho de b</h3>
    <p>El subárbol b tiene un subárbol derecho, que no tiene ningún descendiente, tal y como indican los índices <code>izq</code> y <code>der</code>. Se ha obtenido el subárbol izquierdo completo de la raíz a, puesto que b no tiene subárbol izquierdo. Después seguirá construyéndose el subárbol derecho a partir de la raíz a.</p>
    ${step(fig3, [['a', 'done'], ['b', 'done'], ['d', 'cur'], 'c', 'e', 'f'], [['b', 'done'], ['d', 'done'], ['a', 'done'], ['e', 'gr'], ['c', 'gr'], ['f', 'gr']],
      '<strong>d</strong> no tiene descendientes (dos subárboles <em>Vacío</em>). Falta construir el subárbol derecho de a, con <strong>e, c, f</strong>.')}`;
  };

  C['u3-g1-t1'] = () => {
    const abb = graph({
      w: 260, h: 190, maxw: 260, label: 'Árbol binario de búsqueda con raíz 4',
      nodes: [['4', 130, 26], ['-1', 62, 80], ['6', 198, 80], ['2', 96, 140], ['5', 160, 140], ['8', 230, 140]].map(n => ({ id: n[0], t: n[0], x: n[1], y: n[2] })),
      edges: [['4', '-1'], ['4', '6'], ['-1', '2'], ['6', '5'], ['6', '8']]
    });
    return `
    <p>Un <strong>árbol binario de búsqueda</strong> es aquel que es:</p>
    <ul>
      <li>una estructura vacía, o</li>
      <li>un elemento o clave de información (nodo) más un número finito (a lo sumo dos) de estructuras tipo árbol, disjuntos, llamados subárboles, y además cumplen lo siguiente:
        <ol>
          <li>Todas las claves del subárbol izquierdo al nodo son <strong>menores</strong> que la clave del nodo.</li>
          <li>Todas las claves del subárbol derecho al nodo son <strong>mayores</strong> que la clave del nodo.</li>
          <li>Ambos subárboles son árboles binarios de búsqueda.</li>
        </ol></li>
    </ul>
    ${fig(abb, 'Ejemplo de árbol binario de búsqueda')}
    <p>En el ejemplo las claves son números enteros. Dada la raíz 4, las claves del subárbol izquierdo son menores que 4, y las claves del subárbol derecho son mayores que 4. Esto se cumple también para todos los subárboles. Si se hace el recorrido de este árbol en orden central (inorden) se obtiene una lista de los números ordenada de menor a mayor.</p>
    ${note('¿Qué hay que hacer para obtener una lista de los números ordenada de mayor a menor?', 'Cuestión planteada en la clase')}
    ${note('La presentación deja la pregunta abierta. Una respuesta, <em>que no figura en el material</em>: recorrer el árbol en inorden pero visitando primero el subárbol derecho, luego la raíz y por último el izquierdo.', 'Nota agregada')}
    <h3>Ventajas</h3>
    <ul>
      <li>Una ventaja fundamental de los árboles de búsqueda es que son, en general, mucho más rápidos para localizar un elemento que una lista enlazada.</li>
      <li>Por tanto, son más rápidos para insertar y borrar elementos.</li>
      <li>Si el árbol está perfectamente equilibrado, entonces el número de comparaciones necesarias para localizar una clave es aproximadamente de <em>log N</em> en el peor caso.</li>
      <li>Aprovechando las propiedades del árbol de búsqueda se puede acelerar la localización. Simplemente hay que descender a lo largo del árbol a izquierda o derecha dependiendo del elemento que se busca.</li>
    </ul>`;
  };

  /* ======================= PRÁCTICA INTERACTIVA ======================= */

  C['u3-g1-t2'] = () => `
    <p>Practicá con árboles generados al azar. Cada árbol tiene al menos 3 niveles y cada nodo puede tener 0, 1 o 2 hijos. Se muestra la lista de nodos visitados y tenés que decir con qué recorrido se obtuvo.</p>
    <details class="tq-tip"><summary>Pista: cómo distinguirlos</summary>
      <ul>
        <li><strong>Preorden:</strong> el primer nodo es la raíz del árbol.</li>
        <li><strong>Postorden:</strong> el último nodo es la raíz del árbol.</li>
        <li><strong>Inorden:</strong> la raíz queda en el medio: antes van los nodos de su subárbol izquierdo y después los del derecho.</li>
      </ul>
      <p>Después aplicá la misma idea a cada subárbol.</p>
    </details>
    <div class="tq" data-tq></div>`;

  const TQ = (function () {
    const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
    const NAMES = { pre: 'Preorden', ino: 'Inorden', post: 'Postorden' };
    const rnd = n => Math.floor(Math.random() * n);
    const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

    const pre = n => n ? [n.v].concat(pre(n.l), pre(n.r)) : [];
    const ino = n => n ? ino(n.l).concat([n.v], ino(n.r)) : [];
    const post = n => n ? post(n.l).concat(post(n.r), [n.v]) : [];

    /* Árbol binario aleatorio: 3 o 4 niveles, 5 a 10 nodos, hijos 0/1/2 al azar.
       Se reintenta hasta que los tres recorridos den secuencias distintas (así la respuesta es única). */
    function gen() {
      for (let tries = 0; tries < 500; tries++) {
        const letters = shuffle(LETTERS);
        let k = 0, count = 0, height = 0;
        const MAXD = 3 + rnd(2), MAXN = 10;
        const build = d => {
          if (count >= MAXN) return null;
          const n = { v: letters[k++], l: null, r: null, d };
          count++; height = Math.max(height, d);
          if (d < MAXD) {
            const x = Math.random();
            const kids = d === 1 ? (x < 0.15 ? 1 : 2) : (x < 0.25 ? 0 : x < 0.6 ? 1 : 2);
            if (kids === 2) { n.l = build(d + 1); n.r = build(d + 1); }
            else if (kids === 1) { if (Math.random() < 0.5) n.l = build(d + 1); else n.r = build(d + 1); }
          }
          return n;
        };
        const root = build(1);
        if (height < 3 || count < 5) continue;
        const seqs = { pre: pre(root), ino: ino(root), post: post(root) };
        const j = a => a.join('');
        if (j(seqs.pre) === j(seqs.ino) || j(seqs.pre) === j(seqs.post) || j(seqs.ino) === j(seqs.post)) continue;
        return { root, seqs, count, height };
      }
      return null;
    }

    /* Dibujo: x según la posición en el inorden (evita cruces), y según el nivel. */
    function draw(t) {
      const nodes = [], edges = [];
      let i = 0;
      const walk = n => {
        if (!n) return;
        walk(n.l);
        nodes.push({ id: n.v, t: n.v, x: 26 + (i++) * 40, y: 28 + (n.d - 1) * 62 });
        walk(n.r);
      };
      walk(t.root);
      const link = n => { [n.l, n.r].forEach(c => { if (c) { edges.push([n.v, c.v]); link(c); } }); };
      link(t.root);
      const w = 52 + (t.count - 1) * 40, h = 56 + (t.height - 1) * 62;
      return H.graph({ w, h, maxw: w, nodes, edges, label: 'Árbol binario con los nodos ' + ino(t.root).join(', ') });
    }

    function why(t, kind) {
      const r = t.root.v;
      if (kind === 'pre') return 'En <strong>preorden</strong> la raíz se visita primero: acá el primer nodo es <strong>' + r + '</strong>, la raíz del árbol. Después viene todo el subárbol izquierdo y luego todo el derecho.';
      if (kind === 'post') return 'En <strong>postorden</strong> la raíz se visita al final: acá el último nodo es <strong>' + r + '</strong>, la raíz del árbol. Antes van todo el subárbol izquierdo y luego todo el derecho.';
      const L = ino(t.root.l), R = ino(t.root.r);
      const side = (a, nombre) => a.length ? 'los nodos del subárbol ' + nombre + ' (<strong>' + a.join(', ') + '</strong>)' : 'nada (no hay subárbol ' + nombre + ')';
      return 'En <strong>inorden</strong> la raíz queda en el medio: la raíz es <strong>' + r + '</strong>; antes de ella van ' + side(L, 'izquierdo') + ' y después ' + side(R, 'derecho') + '.';
    }

    function mount(el) {
      let score = 0, total = 0, cur = null, answered = false;
      el.innerHTML =
        '<div class="tq-head"><span class="tq-score" data-score></span><button type="button" class="tq-next" data-next>Nuevo árbol</button></div>' +
        '<div data-tree></div>' +
        '<div class="tq-seq" data-seq></div>' +
        '<p class="tq-q">¿Con qué recorrido se obtuvo esta lista de nodos?</p>' +
        '<div class="tq-opts" data-opts>' +
        Object.keys(NAMES).map(k => '<button type="button" class="tq-opt" data-k="' + k + '">' + NAMES[k] + '</button>').join('') +
        '</div>' +
        '<div class="tq-fb" data-fb role="status" aria-live="polite"></div>';
      const q = sel => el.querySelector(sel);
      const opts = Array.from(el.querySelectorAll('.tq-opt'));

      function score_() { q('[data-score]').textContent = 'Aciertos: ' + score + ' de ' + total; }

      function round() {
        const t = gen();
        if (!t) { q('[data-fb]').textContent = 'No se pudo generar un árbol. Probá de nuevo.'; return; }
        const kinds = Object.keys(NAMES);
        cur = { t, kind: kinds[rnd(3)] };
        answered = false;
        q('[data-tree]').innerHTML = '<figure class="fig">' + draw(t) + '</figure>';
        q('[data-seq]').innerHTML = H.arr('Recorrido', t.seqs[cur.kind]);
        q('[data-fb]').innerHTML = '';
        q('[data-fb]').className = 'tq-fb';
        opts.forEach(b => { b.disabled = false; b.className = 'tq-opt'; });
        q('[data-next]').textContent = 'Saltear / nuevo árbol';
        score_();
      }

      function answer(k) {
        if (answered || !cur) return;
        answered = true; total++;
        const ok = k === cur.kind;
        if (ok) score++;
        opts.forEach(b => {
          b.disabled = true;
          if (b.dataset.k === cur.kind) b.classList.add('ok');
          else if (b.dataset.k === k) b.classList.add('bad');
        });
        const all = Object.keys(NAMES).map(x => H.arr(NAMES[x], cur.t.seqs[x].map(c => [c, x === cur.kind ? 'ok' : '']))).join('');
        const fb = q('[data-fb]');
        fb.className = 'tq-fb ' + (ok ? 'ok' : 'bad');
        fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No: era ' + NAMES[cur.kind] + '.') + '</strong> ' + why(cur.t, cur.kind) +
          '<div class="tq-all"><p>Los tres recorridos de este árbol:</p>' + all + '</div>';
        q('[data-next]').textContent = 'Nuevo árbol';
        score_();
      }

      opts.forEach(b => b.addEventListener('click', () => answer(b.dataset.k)));
      q('[data-next]').addEventListener('click', round);
      round();
    }

    return { init: () => document.querySelectorAll('[data-tq]').forEach(mount) };
  })();

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', TQ.init);
  else TQ.init();
})();
