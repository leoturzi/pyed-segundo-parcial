/* Helpers compartidos por los archivos de contenido de cada unidad. */
window.CONTENT = {};
window.H = (function () {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let uid = 0;

  /* Grafo/árbol en SVG.
     o = { w, h, label, nodes:[{id,t,x,y,shape:'c'|'r'|'p',box}], edges:[[a,b,estilo]], boxes:[{x,y,w,h}], texts:[{x,y,t,cls,a}] }
     estilo de arista: undefined | 'arrow' | 'hl' | 'harrow' */
  function graph(o) {
    const id = 'g' + (++uid);
    const R = 16, by = {};
    o.nodes.forEach(n => { by[n.id] = n; });
    const half = n => n.shape === 'r' ? { w: Math.max(40, n.t.length * 7 + 14) / 2, h: 12 }
      : n.shape === 'p' ? { w: n.t.length * 3.6 + 2, h: 8 } : { w: R, h: R };
    const rad = (n, ux, uy) => {
      const k = half(n);
      return 1 / Math.sqrt((ux / k.w) ** 2 + (uy / k.h) ** 2);
    };
    let s = '<svg class="gfx" viewBox="0 0 ' + o.w + ' ' + o.h + '" style="max-width:' + (o.maxw || o.w) + 'px" role="img" aria-label="' + esc(o.label || '') + '">';
    s += '<defs>' +
      '<marker id="' + id + 'a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="mk" d="M0 0L10 5L0 10z"/></marker>' +
      '<marker id="' + id + 'h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="mk hl" d="M0 0L10 5L0 10z"/></marker>' +
      '</defs>';
    (o.boxes || []).forEach(b => { s += '<rect class="hlbox" x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" rx="3"/>'; });
    (o.edges || []).forEach(e => {
      const A = by[e[0]], B = by[e[1]], st = e[2] || '';
      let dx = B.x - A.x, dy = B.y - A.y;
      const L = Math.hypot(dx, dy); dx /= L; dy /= L;
      const arrow = st === 'arrow' || st === 'harrow';
      const x1 = A.x + dx * (rad(A, dx, dy) + 1), y1 = A.y + dy * (rad(A, dx, dy) + 1);
      const x2 = B.x - dx * (rad(B, dx, dy) + (arrow ? 2 : 1)), y2 = B.y - dy * (rad(B, dx, dy) + (arrow ? 2 : 1));
      const hl = st === 'hl' || st === 'harrow';
      s += '<line class="te' + (hl ? ' hl' : '') + '" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"' +
        (arrow ? ' marker-end="url(#' + id + (hl ? 'h' : 'a') + ')"' : '') + '/>';
    });
    o.nodes.forEach(n => {
      const sh = n.shape || 'c';
      if (sh === 'c') {
        s += '<g class="tn"><circle cx="' + n.x + '" cy="' + n.y + '" r="' + R + '"/><text x="' + n.x + '" y="' + n.y + '" dy=".35em">' + esc(n.t) + '</text></g>';
        if (n.box) s += '<rect class="hlbox" x="' + (n.x - R - 5) + '" y="' + (n.y - R - 5) + '" width="' + (2 * R + 10) + '" height="' + (2 * R + 10) + '" rx="3"/>';
      } else if (sh === 'r') {
        const k = half(n);
        s += '<g class="tn"><rect x="' + (n.x - k.w) + '" y="' + (n.y - k.h) + '" width="' + (2 * k.w) + '" height="' + (2 * k.h) + '"/><text x="' + n.x + '" y="' + n.y + '" dy=".35em" class="sm">' + esc(n.t) + '</text></g>';
      } else {
        s += '<text class="gt b" x="' + n.x + '" y="' + n.y + '" text-anchor="middle" dy=".35em">' + esc(n.t) + '</text>';
      }
    });
    (o.texts || []).forEach(t => {
      const lines = String(t.t).split('\n');
      s += '<text class="gt ' + (t.cls || '') + '" x="' + t.x + '" y="' + t.y + '" text-anchor="' + (t.a || 'start') + '">' +
        lines.map((l, i) => '<tspan x="' + t.x + '" dy="' + (i ? '1.3em' : '0') + '">' + esc(l) + '</tspan>').join('') + '</text>';
    });
    return s + '</svg>';
  }

  /* Arreglo de celdas. cells: ['a', ['b','cur'], ...]  estados: cur | done | gl | gr */
  function arr(label, cells) {
    return '<div class="arr"><span class="arr-l">' + esc(label) + '</span><span class="arr-c">' +
      cells.map(c => { const p = Array.isArray(c) ? c : [c, '']; return '<span class="cell ' + p[1] + '">' + esc(p[0]) + '</span>'; }).join('') +
      '</span></div>';
  }

  /* Tabla. Las celdas son texto; si son {h:'html'} se insertan sin escapar. */
  function table(head, rows, cls) {
    const c = x => (x && typeof x === 'object' && 'h' in x) ? x.h : esc(x);
    return '<div class="tbl-wrap"><table class="tbl ' + (cls || '') + '">' +
      (head ? '<thead><tr>' + head.map(h => '<th>' + c(h) + '</th>').join('') + '</tr></thead>' : '') +
      '<tbody>' + rows.map(r => '<tr>' + r.map(x => '<td>' + c(x) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  }

  const code = (txt, lang) => '<pre class="code"' + (lang ? ' data-lang="' + lang + '"' : '') + '><code>' + esc(txt.replace(/^\n/, '').replace(/\s+$/, '')) + '</code></pre>';
  const fig = (inner, cap) => '<figure class="fig">' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
  /* Diagrama de flujo: imagen original + transcripción en texto (desplegable, abierta por defecto). */
  const flow = (file, alt, cap, transcription) =>
    '<figure class="fig flow"><div class="imgbox"><img src="assets/' + file + '" alt="' + esc(alt) + '" loading="lazy"></div>' +
    (cap ? '<figcaption>' + cap + '</figcaption>' : '') +
    (transcription ? '<details class="transc" open><summary>Transcripción del diagrama</summary>' + transcription + '</details>' : '') + '</figure>';
  const src = t => '<p class="source">Fuente: ' + t + '</p>';
  const note = (t, title) => '<div class="callout">' + (title ? '<strong class="ct">' + title + '</strong>' : '') + t + '</div>';

  return { esc, graph, arr, table, code, fig, flow, src, note };
})();
