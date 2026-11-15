/* Unidad 6 — Estilos de Programación. Clase 13 (lectura). */
(function () {
  const { src, note } = H;
  const C = CONTENT;
  const L = 'Clase 13 · Lectura “Estilos de Programación”';
  const chip = (cls, t) => '<span class="chip ' + cls + '">' + t + '</span>';
  const concept = (c, t, body) => '<div class="concept">' + chip(c, t) + '<div>' + body + '</div></div>';

  C['u6-g0-t0'] = () => `
    <p>Un <strong>paradigma de programación</strong> representa una particular manera de enfocar los procesos de construcción de un software. El programador, al elegir un paradigma, está asumiendo una visión determinada sobre los métodos para la construcción de un programa o subprograma.</p>
    <p>Por lo tanto, diferentes paradigmas resultan en diferentes formas de pensar la solución de problemas (tenga en cuenta que con la solución de múltiples «problemas» se construye una aplicación) y en <strong>diferentes estilos de programación</strong>.</p>
    <p>En este módulo y en esta unidad en particular, presentaremos los paradigmas vigentes y más utilizados en los últimos años. En el Módulo II nos focalizaremos en uno de ellos: el <strong>paradigma orientado a objetos</strong>. Centraremos allí la actividad práctica a través de los laboratorios, que procurarán guiarlo/a en la programación en Visual.NET.</p>
    <h3>Metas de aprendizaje</h3>
    <p>En esta unidad esperamos que usted, a través del estudio, alcance las siguientes metas:</p>
    <ul>
      <li>Conocer los distintos tipos de paradigmas.</li>
      <li>Analizar e identificar las ventajas y desventajas de cada paradigma.</li>
      <li>Relacionar los paradigmas con los lenguajes más próximos a ellos.</li>
    </ul>
    <h3>Contenidos de la unidad</h3>
    <p>A continuación se presenta el detalle de los contenidos y actividades que integran esta unidad. Usted deberá ir avanzando en el estudio y profundización de los diferentes temas, realizando las lecturas requeridas y elaborando las actividades propuestas.</p>
    <p><strong>Paradigmas de programación</strong></p>
    <ul><li>Paradigma lógico</li><li>Paradigma estructurado</li><li>Paradigma orientado a objetos</li><li>Paradigma orientado a eventos</li></ul>
    <h3>Paradigmas de programación</h3>
    <p>En el campo de las Ciencias Sociales, el término paradigma se refiere al conjunto de prácticas que definen a una disciplina científica en un período determinado de tiempo.</p>
    <p>En nuestro campo, el de la informática, un paradigma de programación determina la visión y métodos de un analista en la construcción de un sistema. El sujeto elige, entre todos los paradigmas de programación, aquel que cree más eficaz para ese sistema.</p>`;

  C['u6-g0-t1'] = () => `
    <p>No obstante estas diferencias, todos los paradigmas tienen en común –en mayor o en menor medida– el uso de los siguientes métodos o procedimientos:</p>
    <div class="trav">
      <div><h4>Modularidad</h4>
        <p>Es la descomposición lógica de un sistema en entidades más pequeñas. Contribuye en este sentido al permitir descomponer el problema en unidades discretas más simples, más pequeñas y manejables. También permite el intercambio de las mismas. Dichas unidades o módulos tienen entre sí un grado de <strong>cohesión</strong> y de <strong>acoplamiento</strong>.</p></div>
      <div><h4>Recursividad</h4>
        <p>Significa aplicar una función como parte de la definición de esa misma función. El concepto de recursividad va ligado al de repetición. Son recursivos aquellos algoritmos que, estando encapsulados dentro de una función, son llamados desde ella misma una y otra vez.</p>
        <p>En contraposición están los algoritmos <strong>iterativos</strong>, que hacen uso de bucles <code>while</code>, <code>do-while</code>, <code>for</code>, etc. El caso típico de recursividad es el <strong>cálculo del factorial</strong> de un número dado.</p></div>
    </div>
    <p>La lectura propone a continuación una revisión de las principales características de los paradigmas de programación más utilizados en nuestro medio.</p>`;

  C['u6-g0-t2'] = () => `
    <p>La <strong>programación lógica</strong> es un paradigma de programación basado, como su nombre lo indica, en la <strong>lógica</strong>. Los programas construidos en un lenguaje lógico están construidos únicamente por <strong>expresiones lógicas</strong>; es decir, que son ciertas o falsas, en oposición a una expresión interrogativa (una pregunta) o expresiones imperativas (una orden).</p>
    <p>El paradigma lógico es el que comúnmente se utiliza en <strong>Inteligencia Artificial</strong>. Tal como lo señalamos, se basa en axiomas, en sentencias sobre las que debe demostrarse su veracidad mediante la búsqueda en una enorme base de datos.</p>
    <p>La Inteligencia Artificial es el resultado de implementar en un objeto inanimado las facultades humanas que configuran la inteligencia.</p>
    ${note('El lenguaje más conocido de este paradigma es <strong>Prolog</strong>.')}`;

  C['u6-g0-t3'] = () => `
    <p>Las características de este paradigma fueron estudiadas en Programación Estructurada. La lectura recuerda algunos aspectos fundamentales.</p>
    <p>La programación bajo este paradigma divide el proceso en <strong>bloques</strong> que pueden o no comunicarse entre sí. Estos bloques son:</p>
    <p class="chips">${chip('c-gray', 'Procedimientos')} ${chip('c-gray', 'Funciones')}</p>
    <p>Utiliza <strong>tres estructuras básicas de control</strong>:</p>
    <ul><li>El control secuencial</li><li>El control de selección</li><li>El control iterativo</li></ul>
    <p>Trabajar con este paradigma tiene varias ventajas; entre ellas, permite <strong>reutilizar el código</strong> programado y otorga una mejor comprensión de la programación.</p>
    ${note('Su opuesto es el <strong>paradigma no estructurado</strong> (muy poco usado). Como su nombre lo indica, no tiene ninguna estructura: es simplemente un «bloque», como por ejemplo los archivos batch (<code>.bat</code>).')}`;

  C['u6-g0-t4'] = () => `
    <p>Cada paradigma tiene sus lenguajes específicos. El paradigma orientado a objetos (POO) tiene, entre otros, a <strong>Visual.NET</strong>. Este es el lenguaje que se utilizará para realizar los laboratorios que iniciarán en la Unidad 3. Por ello, se ven algunos conceptos básicos, contemplando que su ampliación y profundización será motivo de estudio en la asignatura que lleva el mismo nombre.</p>
    <p>El POO se basa en la idea de <strong>encapsular estado y operaciones en objetos</strong>. En general, la programación se resuelve comunicando dichos objetos a través de mensajes (programación orientada a mensajes).</p>
    <ul>
      <li>Los <strong>pilares</strong> de este paradigma son: <strong>herencia, encapsulamiento, polimorfismo y abstracción</strong>.</li>
      <li>Su principal ventaja es la <strong>reutilización de códigos</strong> y su facilidad para pensar soluciones a determinados problemas.</li>
      <li>Los lenguajes que responden a este paradigma son Simula, Smalltalk, C++, Java, Visual Basic .NET, etc.</li>
    </ul>
    <h3>Conceptos clave del paradigma orientado a objetos</h3>
    ${concept('c-gray', 'Objeto', '<p>Un objeto es cualquier cosa real o abstracta que posee una estructura que lo define y acciones que lo controlan.</p>')}
    ${concept('c-dark', 'Identidad', '<p>Un objeto presenta una identidad, un estado y un comportamiento en un momento dado. La identidad de un objeto le permite ser distinguido de entre otros y esto se da gracias a la dirección de memoria. Los objetos son distintos si ocupan distintas direcciones de memoria.</p>')}
    ${concept('c-brown', 'Estado', '<p>El estado de un objeto es el conjunto de valores concretos que lo caracterizan en un momento dado, como peso, color, precio, etc.</p>')}
    ${concept('c-mauve', 'Clase', '<p>Una clase es una construcción estática que describe comportamientos comunes y atributos, incluyendo en ella datos y métodos o funciones.</p>')}
    ${concept('c-wine', 'Métodos', '<p>Los métodos por defecto son el <strong>constructor</strong>, que inicializa valores, y el <strong>destructor</strong>, que libera recursos al finalizar la vida útil de una instancia de una clase creada en memoria.</p>')}
    ${concept('c-red', 'Instancia', '<p>A esta instancia de una clase se la llama objeto, quien posee identidad, comportamiento y estado fijo o variable específicos a ese objeto. <strong>Instanciación</strong> es la acción por la cual se crean instancias de una clase. Los objetos creados corresponden al tipo de la clase que los origina.</p>')}
    <p class="chips">O sea que un ${chip('c-gray', 'Objeto')} es la ${chip('c-red', 'Instancia')} de una ${chip('c-mauve', 'Clase')}</p>
    ${note('Estos conceptos están desarrollados en la bibliografía cuya lectura se solicita en este punto de la unidad.')}`;

  C['u6-g0-t5'] = () => `
    <div class="concept">${chip('c-light', 'Evento')}<div>
      <p>Un <strong>evento</strong> es un suceso que ocurre en un sistema. Pueden ser eventos un clic, un doble clic, mover el mouse, presionar una tecla especial, etc.</p></div></div>
    <p>Tal como su nombre lo indica, este paradigma está orientado hacia la resolución de eventos provocados por el programa o desde el exterior. La realización de un suceso dependerá de la definición de eventos que realice el programador. Él determinará los eventos a los cuales el programa reaccionará y las acciones que seguirá al presentarse cada uno. Esto se conoce como <strong>manejador de eventos</strong>.</p>
    <p>Al ejecutarse un programa así programado, se iniciará con el código escrito y luego el programa esperará a que ocurra un evento (clic, doble clic, movimiento del mouse, teclado, etc.). Al ocurrir «algo», se ejecutará el código correspondiente al evento que se realizó.</p>
    <p>Mientras se realiza el código correspondiente a un evento, es normal que el resto del sistema continúe en otro estado distinto, sin saber lo que está ocurriendo en él, salvo que el programador haya definido lo contrario mediante el uso de variables o estructuras en el ambiente global; es decir, en el módulo.</p>
    ${note('<strong>Visual Basic 6</strong> es un buen ejemplo de programación orientada a eventos porque, justamente, no tiene herencia (es decir, no se produce la herencia de los atributos ni los métodos de ningún objeto superior).')}`;
})();
