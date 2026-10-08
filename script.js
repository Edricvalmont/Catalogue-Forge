/* =====================================================================
   CATALOGUE DE LA FORGE — FONCTIONNEMENT
   Recherche, filtres, images, devis. Pas besoin d'y toucher pour
   changer les prix : tout est dans data.js.
   ===================================================================== */
(function () {
  const CATS = ["Tout", ...new Set(CATALOGUE.map(g => g.categorie))];
  const $ = s => document.querySelector(s);
  const norm = s => (s || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const slug = s => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const money = n => n == null ? '<span class="na">Sur devis</span>' : n + " " + BOUTIQUE.monnaie;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Petites préférences gardées dans le navigateur (facultatif)
  const store = {
    get(k, d) { try { const v = localStorage.getItem("forge-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("forge-" + k, JSON.stringify(v)); } catch (e) {} },
  };

  let cat = "Tout";
  let licOnly = false; // filtre « Sous licence »
  const LIC = (typeof LICENCES !== "undefined") ? LICENCES : { origines: {} };
  const licNom = g => LIC.origines[g.licence]?.nom || g.licence;
  let devis = store.get("devis", []); // [{id, label, prix, qty}]

  $("#shop-name").textContent = BOUTIQUE.nom;
  $("#shop-sub").textContent = BOUTIQUE.sousTitre;
  document.title = BOUTIQUE.nom;

  // Index des objets
  const ITEMS = {};
  // Copie des objets : une même recette peut servir à plusieurs groupes (variantes)
  CATALOGUE.forEach(g => { g.items = g.items.map(it => ({ ...it })); });
  CATALOGUE.forEach(g => g.items.forEach(it => {
    it._id = slug(g.groupe) + "-" + slug(it.nom);
    it._groupe = g.groupe;
    it._search = norm([g.groupe, g.categorie, it.nom, it.mat, g.licence ? "licence " + licNom(g) : ""].join(" "));
    ITEMS[it._id] = it;
  }));

  // Filtres catégorie
  CATS.forEach(c => {
    const b = document.createElement("button");
    b.className = "chip"; b.textContent = c;
    b.setAttribute("aria-pressed", c === cat);
    b.onclick = () => { cat = c; document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b)); render(); };
    $("#chips").appendChild(b);
  });

  // Filtre « Sous licence » (se combine avec la catégorie)
  const licChip = document.createElement("button");
  licChip.className = "chip chip-lic"; licChip.textContent = "Sous licence";
  licChip.setAttribute("aria-pressed", "false");
  licChip.onclick = () => setLic(!licOnly);
  $("#chips").appendChild(licChip);
  function setLic(on, scrollTo) {
    licOnly = on; licChip.setAttribute("aria-pressed", on);
    render();
    if (on) document.getElementById(scrollTo || "licences")?.scrollIntoView({ behavior: "smooth" });
  }

  // Bloc d'informations sur les licences
  const fmt = n => n.toLocaleString("fr-FR") + " " + BOUTIQUE.monnaie;
  function tarifTable(titre, rows) {
    return `<table class="lic-table"><thead><tr><th>${esc(titre)}</th><th class="num">Par unité</th></tr></thead><tbody>
      ${rows.map(([qui, p]) => `<tr><td>${esc(qui)}</td><td class="num prix">${fmt(p)}</td></tr>`).join("")}
    </tbody></table>`;
  }
  function licencePanel() {
    const used = new Set(CATALOGUE.map(g => g.licence).filter(Boolean));
    const cards = Object.entries(LIC.origines).map(([key, o]) => `
      <div class="lic-card" id="lic-${key}">
        <h3>${esc(o.nom)} ${o.article ? `<small>${esc(o.article)}</small>` : ""}</h3>
        ${o.autorite ? `<p class="lic-auth">Délivrée par : <strong>${esc(o.autorite)}</strong></p>` : ""}
        ${o.equipement ? tarifTable("Vêtements, armures, bijoux, artefacts", o.equipement) : ""}
        ${o.armes ? tarifTable("Armes et carquois", o.armes) : ""}
        ${!o.equipement && !o.armes ? '<p class="na">Tarif de port non communiqué.</p>' : ""}
        ${o.supplement ? `<p class="lic-sup">${esc(o.supplement)}</p>` : ""}
        ${!used.has(key) ? '<p class="na">Aucun objet de ce type au catalogue.</p>' : ""}
      </div>`).join("");
    return `<section class="lic-panel" id="licences">
      <h2>Licences <small>Port et fabrication</small></h2>
      <div class="lic-intro">
        <p class="lic-fab">Licence de fabrication : <strong>${fmt(LIC.fabrication)}</strong> <span class="na">(prix fixe)</span></p>
        ${(LIC.regles || []).map(r => `<p>${esc(r)}</p>`).join("")}
      </div>
      <div class="lic-grid">${cards}</div>
    </section>`;
  }

  // Menu "Aller à"
  CATALOGUE.forEach(g => {
    const o = document.createElement("option");
    o.value = "g-" + slug(g.groupe); o.textContent = g.groupe;
    $("#jump").appendChild(o);
  });
  $("#jump").onchange = e => {
    const id = e.target.value; e.target.value = "";
    if (!id) return;
    if (!document.getElementById(id)) { cat = "Tout"; $("#search").value = ""; document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x.textContent === "Tout")); render(); }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Image : essaie img, sinon images/<id>.png → .jpg → .webp, sinon carré vide
  function imgCell(it) {
    const tries = it.img ? ["images/" + it.img] : ["png", "jpg", "webp"].map(x => "images/" + it._id + "." + x);
    return `<td class="thumb"><img loading="lazy" alt="${esc(it.nom)}" title="${esc(tries[0])}" data-tries='${JSON.stringify(tries)}' data-i="0" src="${esc(tries[0])}"></td>`;
  }
  document.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName !== "IMG" || !img.dataset.tries) return;
    const tries = JSON.parse(img.dataset.tries), i = +img.dataset.i + 1;
    if (i < tries.length) { img.dataset.i = i; img.src = tries[i]; }
    else { const ph = document.createElement("div"); ph.className = "ph"; ph.title = "Image attendue : " + tries[0]; img.replaceWith(ph); }
  }, true);

  function render() {
    const words = norm($("#search").value).split(/\s+/).filter(Boolean);
    let html = "";
    CATALOGUE.forEach(g => {
      if (cat !== "Tout" && g.categorie !== cat) return;
      if (licOnly && !g.licence) return;
      const items = g.items.filter(it => words.every(w => it._search.includes(w)));
      if (!items.length) return;
      const hasMat = items.some(it => it.mat);
      html += `<section class="group" id="g-${slug(g.groupe)}">
        <h2><span>${esc(g.groupe)}${g.licence ? ` <button class="lic-badge" data-lic="${esc(g.licence)}" title="Voir les tarifs de licence">Licence</button>` : ""}</span> <small>${esc(g.categorie)}</small></h2>
        ${g.licence ? `<div class="note lic-note">Soumis à licence ${esc(licNom(g))}${LIC.origines[g.licence]?.autorite ? " (" + esc(LIC.origines[g.licence].autorite) + ")" : ""} · fabrication ${fmt(LIC.fabrication)} · port : ${LIC.origines[g.licence]?.equipement ? "à partir de " + fmt(Math.min(...LIC.origines[g.licence].equipement.map(r => r[1]))) + " par pièce" : "tarif non communiqué"}</div>` : ""}
        ${g.note ? `<div class="note">${esc(g.note)}</div>` : ""}
        <table><thead><tr>
          <th class="thumb"></th><th>Objet</th>${hasMat ? '<th class="mat">Matériaux</th>' : ""}
          <th class="num mo">M.O.</th><th class="num">Prix</th><th class="devis-col"></th>
        </tr></thead><tbody>
        ${items.map(it => `<tr>
          ${imgCell(it)}
          <td>${esc(it.nom)}${it.mat ? `<div class="mat-inline">${esc(it.mat)}</div>` : ""}</td>
          ${hasMat ? `<td class="mat">${esc(it.mat || "")}</td>` : ""}
          <td class="num mo">${it.mo ?? "–"}</td>
          <td class="num prix">${money(it.prix)}</td>
          <td class="devis-col"><button class="add" data-id="${it._id}" title="Ajouter au devis">+</button></td>
        </tr>`).join("")}
        </tbody></table></section>`;
    });
    $("#list").innerHTML = (licOnly ? licencePanel() : "") + (html || '<p class="empty">Aucun objet trouvé.</p>');
  }

  // Interrupteurs d'affichage
  [["t-mat", "hide-mat"], ["t-mo", "hide-mo"], ["t-img", "hide-img"], ["t-devis", "devis-off"]].forEach(([id, cls]) => {
    const box = document.getElementById(id);
    box.checked = store.get(id, true);
    const apply = () => { document.body.classList.toggle(cls, !box.checked); store.set(id, box.checked); if (id === "t-devis") $("#devis").style.display = box.checked ? "" : "none"; };
    box.onchange = apply; apply();
  });

  // Devis
  function renderDevis() {
    const n = devis.reduce((s, l) => s + l.qty, 0);
    const total = devis.reduce((s, l) => s + (l.prix || 0) * l.qty, 0);
    const unknown = devis.some(l => l.prix == null);
    $("#devis-total").textContent = n ? `${n} article${n > 1 ? "s" : ""} · ${total} ${BOUTIQUE.monnaie}${unknown ? " +?" : ""}` : "0 article";
    $("#devis-body").innerHTML = devis.length ? devis.map((l, i) => `<div class="line">
        <span>${esc(l.label)}</span>
        <span class="qty"><button data-q="${i}" data-d="-1">−</button>${l.qty}<button data-q="${i}" data-d="1">+</button></span>
        <strong>${l.prix == null ? "?" : l.prix * l.qty}</strong>
      </div>`).join("") : '<p class="empty" style="padding:16px">Clique sur + pour ajouter un objet.</p>';
    store.set("devis", devis);
  }
  function devisText() {
    const total = devis.reduce((s, l) => s + (l.prix || 0) * l.qty, 0);
    const lines = devis.map(l => `- ${l.qty} x ${l.label} : ${l.prix == null ? "sur devis" : l.prix * l.qty + " " + BOUTIQUE.monnaie}`);
    return [`Devis — ${BOUTIQUE.nom}`, ...lines, `Total : ${total} ${BOUTIQUE.monnaie}${devis.some(l => l.prix == null) ? " (+ objets sur devis)" : ""}`].join("\n");
  }

  document.addEventListener("click", e => {
    const add = e.target.closest(".add");
    if (add) {
      const it = ITEMS[add.dataset.id];
      const ex = devis.find(l => l.id === it._id);
      if (ex) ex.qty++; else devis.push({ id: it._id, label: `${it.nom} (${it._groupe})`, prix: it.prix, qty: 1 });
      $("#devis").classList.remove("closed");
      renderDevis(); return;
    }
    const badge = e.target.closest(".lic-badge");
    if (badge) { setLic(true, "lic-" + badge.dataset.lic); return; }
    const q = e.target.closest("[data-q]");
    if (q) {
      const l = devis[+q.dataset.q]; l.qty += +q.dataset.d;
      if (l.qty <= 0) devis.splice(+q.dataset.q, 1);
      renderDevis(); return;
    }
    if (e.target.matches(".thumb img")) {
      $("#lightbox img").src = e.target.src; $("#lightbox").classList.add("open"); return;
    }
    if (e.target.closest("#lightbox")) $("#lightbox").classList.remove("open");
  });
  $("#devis-head").onclick = () => $("#devis").classList.toggle("closed");
  $("#devis-clear").onclick = () => { devis = []; renderDevis(); };
  $("#devis-copy").onclick = async () => {
    const btn = $("#devis-copy");
    try { await navigator.clipboard.writeText(devisText()); btn.textContent = "Copié !"; }
    catch (err) {
      // Secours si le presse-papier moderne est bloqué
      const ta = document.createElement("textarea");
      ta.value = devisText(); document.body.appendChild(ta); ta.select();
      btn.textContent = document.execCommand("copy") ? "Copié !" : "Échec";
      ta.remove();
    }
    setTimeout(() => btn.textContent = "Copier", 1500);
  };

  // Recherche + raccourcis clavier
  $("#search").addEventListener("input", render);
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== $("#search")) { e.preventDefault(); $("#search").focus(); }
    if (e.key === "Escape") { $("#lightbox").classList.remove("open"); if (document.activeElement === $("#search")) { $("#search").value = ""; render(); } }
  });

  render(); renderDevis();
})();
