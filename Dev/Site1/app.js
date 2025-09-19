/*
  Petites Annonces - App front seule (HTML/CSS/JS, localStorage)
  - Liste + recherche live
  - Ajout via formulaire (image par URL)
  - Suppression (réservée aux utilisateurs connectés)
  - Auth simplifiée (nom utilisateur, sans mot de passe)
  - Persistance localStorage (annonces + session)
*/

// Accès au LocalStorage en readonly
const LS_KEYS = {
    ADS: "pa_ads_v1",
    SESSION: "pa_session_v1",
};

// Jeu de données initial
const Seed = [
    {
        id: crypto.randomUUID?.() || String(Date.now()),
        title: "PC portable gamer",
        description: "RTX 3060, 16 Go RAM, SSD 1 To. Très bon état.",
        category: "Informatique",
        imageUrl:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
        price: 899.99,
        seller: "Alice",
        location: { label: "Paris" },
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
        id: crypto.randomUUID?.() || String(Date.now() + 1),
        title: "VTT tout-suspendu",
        description: "Vélo en très bon état, peu servi. Taille M.",
        category: "Loisirs",
        imageUrl:
            "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1200&auto=format&fit=crop",
        price: 420,
        seller: "Bob",
        location: { label: "Lyon" },
        createdAt: Date.now() - 1000 * 60 * 60 * 8,
    },
    {
        id: crypto.randomUUID?.() || String(Date.now() + 2),
        title: "Canapé 3 places",
        description: "Confortable, tissu gris, déhoussable.",
        category: "Maison",
        imageUrl:
            "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop",
        price: 250,
        seller: "Chloé",
        location: { label: "Toulouse" },
        createdAt: Date.now() - 1000 * 60 * 30,
    },
];

// Récupere le jeu de données depuis le localStorage, ou initialise
function loadAds() {
    const raw = localStorage.getItem(LS_KEYS.ADS);
    if (!raw) {
        localStorage.setItem(LS_KEYS.ADS, JSON.stringify(Seed));
        return [...Seed];
    }
    try {
        return JSON.parse(raw);
    } catch {
        return [...Seed];
    }
}

// Sauvegarde une nouvelle entrée dans le localStorage
function saveAds(ads) {
    localStorage.setItem(LS_KEYS.ADS, JSON.stringify(ads));
}

// Gestion session (login/logout)
function getSession() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEYS.SESSION) || "null");
    } catch {
        return null;
    }
}
function setSession(session) {
    if (session) localStorage.setItem(LS_KEYS.SESSION, JSON.stringify(session));
    else localStorage.removeItem(LS_KEYS.SESSION);
}

// --- Utilitaires ------------------------------------------------------------

// Formatage date (Timestamp -> "JJ Mmm AAAA HH:MM")
function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Echapper du HTML (pour injection dans du innerHTML)
function escapeHtml(s) {
    const el = document.createElement("div");
    el.textContent = s;
    return el.innerHTML;
}

// --- Rendu UI ---------------------------------------------------------------


// Render d'une carte d'annonce
function renderAdCard(ad) {
    const tpl = document.getElementById("tpl-ad");
    const node = tpl.content.firstElementChild.cloneNode(true);
    const art = node;
    art.dataset.id = ad.id;

    art.querySelector(".thumb").src = ad.imageUrl;
    art.querySelector(".title").textContent = ad.title;
    art.querySelector(".desc").textContent = ad.description;
    art.querySelector(".price").textContent = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(ad.price);
    art.querySelector(".category").textContent = ad.category;
    art.querySelector(".seller").textContent = ad.seller || "Anonyme";
    art.querySelector(".location").textContent = ad.location?.label;
    art.querySelector(".date").textContent = `Ajouté le ${formatDate(
        ad.createdAt
    )}`;

    const btnDel = art.querySelector(".btn-delete");
    const session = getSession();
    if (session) {
        btnDel.hidden = false;
    }
    btnDel.addEventListener("click", () => handleDelete(ad.id));

    return art;
}

// Rendu de la liste d'annonces
function renderList(ads) {
    const list = document.getElementById("adsList");
    list.innerHTML = "";
    const empty = document.getElementById("emptyState");
    if (ads.length === 0) {
        empty.hidden = false;
        return;
    }
    empty.hidden = true;
    const frag = document.createDocumentFragment();
    for (const ad of ads) {
        frag.appendChild(renderAdCard(ad));
    }
    list.appendChild(frag);
}

// --- Logique ---------------------------------------------------------------

// Définition état global (annonces + recherche)
let state = {
    ads: loadAds(),
    query: "",
};

// Affichage des éléments selon état de connexion (login/logout + actions de suppression)
function applyAuthVisibility() {
    const isLogged = !!getSession();
    document.querySelectorAll(".requires-auth").forEach((el) => {
        if (el instanceof HTMLElement) {
            el.hidden = !isLogged;
        }
    });
    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");
    if (isLogged) {
        btnLogin.hidden = true;
        btnLogout.hidden = false;
    } else {
        btnLogin.hidden = false;
        btnLogout.hidden = true;
    }
}

// Filtrage des annonces selon la recherche
function filterAds() {
    const q = state.query.trim().toLowerCase();
    if (!q) return state.ads;
    return state.ads.filter((a) =>
        [a.title, a.description, a.seller, a.category].some((x) =>
            (x || "").toLowerCase().includes(q)
        )
    );
}

// Rafraîchissement de l'affichage (liste filtrée)
function refresh() {
    renderList(filterAds());
}

// --- Handlers --------------------------------------------------------------

// Fonction de suppression d'une annonce
function handleDelete(id) {
    if (!getSession()) return alert("Veuillez vous connecter pour supprimer.");
    const ok = confirm("Supprimer cette annonce ?");
    if (!ok) return;
    state.ads = state.ads.filter((a) => a.id !== id);
    saveAds(state.ads);
    refresh();
}

// Soumission du formulaire d'ajout
function handleAddSubmit(e) {
    e.preventDefault();
    if (!getSession()) return alert("Veuillez vous connecter pour ajouter.");
    const form = e.target;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Validation basique
    const title = String(data.title || "").trim();
    const description = String(data.description || "").trim();
    const category = String(data.category || "").trim();
    const imageUrl = String(data.imageUrl || "").trim();
    const price = Number(data.price || 0);
    if (!title || !description || !category || !imageUrl || !(price >= 0)) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }
    const seller = String(
        data.seller || getSession()?.username || "Anonyme"
    ).trim();

    const locationLabel = String(data.locationLabel || "").trim();

    const ad = {
        id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
        title,
        description,
        category,
        imageUrl,
        price,
        seller,
        location: {
            label: locationLabel || "Non spécifiée",
        },
        createdAt: Date.now(),
    };
    state.ads.unshift(ad);
    saveAds(state.ads);
    closeModal("modalAdd");
    form.reset();
    refresh();
}

// Soumission du formulaire de login
function handleLoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const username = String(new FormData(form).get("username") || "").trim();
    if (!username) {
        alert("Nom d'utilisateur requis");
        return;
    }
    setSession({ username });
    applyAuthVisibility();
    closeModal("modalLogin");
}

// Déconnexion
function handleLogout() {
    setSession(null);
    applyAuthVisibility();
}

// --- Modales ---------------------------------------------------------------
function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.setAttribute("aria-hidden", "false");
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.setAttribute("aria-hidden", "true");
}
function wireModalClose() {
    document.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof HTMLElement)) return;
        if (t.dataset.close === "modal") {
            const modal = t.closest(".modal");
            if (modal?.id) closeModal(modal.id);
        }
    });
}

// --- Bootstrap --------------------------------------------------------------

// Action pour le DOMContentLoaded (Chaque bouton, formulaire, etc.)
window.addEventListener("DOMContentLoaded", () => {
    // Recherche live
    const search = document.getElementById("searchInput");
    search.addEventListener("input", () => {
        state.query = search.value;
        refresh();
    });

    // Boutons header
    document
        .getElementById("btnAdd")
        ?.addEventListener("click", () => openModal("modalAdd"));
    document
        .getElementById("btnLogin")
        ?.addEventListener("click", () => openModal("modalLogin"));
    document.getElementById("btnLogout")?.addEventListener("click", handleLogout);

    // Formulaires
    document
        .getElementById("formAdd")
        ?.addEventListener("submit", handleAddSubmit);
    document
        .getElementById("formLogin")
        ?.addEventListener("submit", handleLoginSubmit);

    wireModalClose();
    applyAuthVisibility();
    refresh();
});
