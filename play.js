/**
 * Ice Dodo Games - Game Player Page Logic (play.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Extract game ID from URL query param: ?id=xxx
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("id") || "ice-dodo";

  const currentGame = findGameById(gameId);

  // Initialize Page Elements
  initPageMeta(currentGame);
  initGamePlayer(currentGame);
  initControlsGuide(currentGame);
  initRelatedGames(currentGame);
  initActionHandlers(currentGame);
  initQuickSearch();
});

/**
 * Updates title, meta tags, and breadcrumbs
 */
function initPageMeta(game) {
  document.getElementById("pageTitle").textContent = `${game.title} - Play Online | Ice Dodo Games`;
  document.getElementById("crumbCategory").textContent = game.category.toUpperCase();
  const categoryLink = document.getElementById("crumbCategoryLink");
  if (categoryLink) {
    categoryLink.href = `category/${game.category}/`;
  }
  document.getElementById("crumbGameTitle").textContent = game.title;

  document.getElementById("arenaGameTitle").textContent = game.title;
  document.getElementById("loaderGameTitle").textContent = `Loading ${game.title}...`;

  const badgeEl = document.getElementById("arenaBadge");
  badgeEl.textContent = game.badge;
  badgeEl.className = `card-badge ${game.badgeType}`;

  document.getElementById("arenaDeveloper").textContent = `By ${game.developer || "Onionfist"}`;
  document.getElementById("arenaRating").textContent = `★ ${game.rating} (${game.plays} Plays)`;

  document.getElementById("aboutDescription").textContent = game.desc;
  document.getElementById("metaCategoryText").textContent = game.category.toUpperCase();
  document.getElementById("metaReleaseText").textContent = game.releaseYear || "2024";
}

/**
 * Loads iframe and manages loading state
 */
function initGamePlayer(game) {
  const iframe = document.getElementById("mainGameIframe");
  const loader = document.getElementById("playerLoader");

  loader.classList.remove("hidden");

  // Load target embed URL
  iframe.src = game.embedUrl;

  iframe.onload = () => {
    loader.classList.add("hidden");
  };

  // Fallback timeout to prevent permanent loading screen
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2200);
}

/**
 * Renders keyboard control key-caps
 */
function initControlsGuide(game) {
  const controlsList = document.getElementById("controlsList");
  if (!game.controls || game.controls.length === 0) {
    controlsList.innerHTML = `<p class="control-action">Mouse / Keyboard supported.</p>`;
    return;
  }

  controlsList.innerHTML = game.controls.map(ctrl => `
    <div class="control-item">
      <span class="control-action">${ctrl.desc}</span>
      <span class="key-cap">${ctrl.key}</span>
    </div>
  `).join("");
}

/**
 * Renders Similar / Recommended Games in Sidebar
 */
function initRelatedGames(currentGame) {
  const relatedList = document.getElementById("relatedGamesList");
  // Get other games, prioritize same category or popular ones
  const otherGames = GAMES_DATA.filter(g => g.id !== currentGame.id);

  relatedList.innerHTML = otherGames.slice(0, 6).map(g => `
    <a href="play.html?id=${g.id}" class="related-game-item" title="Play ${g.title}">
      <div class="related-thumb-wrap">
        <img src="${g.thumb}" alt="${g.title}" class="related-thumb-img" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 65%22><rect width=%22100%22 height=%2265%22 fill=%22%230f172a%22/><text x=%2250%22 y=%2240%22 fill=%22%2300e5ff%22 font-size=%2222%22 text-anchor=%22middle%22>🎮</text></svg>';">
      </div>
      <div class="related-info">
        <h4 class="related-title">${g.title}</h4>
        <div class="related-meta">
          <span>★ ${g.rating}</span> &bull;
          <span>${g.category}</span>
        </div>
      </div>
    </a>
  `).join("");
}

/**
 * Toolbar Actions: Fullscreen, Restart, Theatre, Favorites, Share
 */
function initActionHandlers(game) {
  const gameViewport = document.getElementById("gameViewport");
  const arenaCard = document.getElementById("gameArenaCard");
  const iframe = document.getElementById("mainGameIframe");

  // Fullscreen
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      if (gameViewport.requestFullscreen) {
        gameViewport.requestFullscreen();
      } else if (gameViewport.webkitRequestFullscreen) {
        gameViewport.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  // Theatre Mode
  const theatreToggleBtn = document.getElementById("theatreToggleBtn");
  theatreToggleBtn.addEventListener("click", () => {
    arenaCard.classList.toggle("theatre-mode");
    const isTheatre = arenaCard.classList.contains("theatre-mode");
    theatreToggleBtn.querySelector("span").textContent = isTheatre ? "Standard" : "Theatre";
  });

  // Reload / Restart
  const reloadGameBtn = document.getElementById("reloadGameBtn");
  reloadGameBtn.addEventListener("click", () => {
    const loader = document.getElementById("playerLoader");
    loader.classList.remove("hidden");
    const src = iframe.src;
    iframe.src = "";
    setTimeout(() => {
      iframe.src = src;
    }, 150);
  });

  // Favorite handler
  const favToggleBtn = document.getElementById("favToggleBtn");
  const storedFavs = getFavorites();
  if (storedFavs.includes(game.id)) {
    favToggleBtn.classList.add("active");
  }

  favToggleBtn.addEventListener("click", () => {
    let favs = getFavorites();
    if (favs.includes(game.id)) {
      favs = favs.filter(id => id !== game.id);
      favToggleBtn.classList.remove("active");
      showToast("Removed from favorites");
    } else {
      favs.push(game.id);
      favToggleBtn.classList.add("active");
      showToast("Added to favorites! ❤️");
    }
    localStorage.setItem("icedodo_favs", JSON.stringify(favs));
  });

  // Share Game
  const shareGameBtn = document.getElementById("shareGameBtn");
  shareGameBtn.addEventListener("click", () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("Game link copied to clipboard! 📋");
      }).catch(() => {
        fallbackCopyText(shareUrl);
      });
    } else {
      fallbackCopyText(shareUrl);
    }
  });
}

function getFavorites() {
  try {
    const stored = localStorage.getItem("icedodo_favs");
    return stored ? JSON.parse(stored) : ["ice-dodo"];
  } catch {
    return ["ice-dodo"];
  }
}

function showToast(message) {
  const toast = document.getElementById("toastAlert");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function fallbackCopyText(text) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  showToast("Game link copied to clipboard! 📋");
}

/**
 * Quick Search in Navbar dropdown
 */
function initQuickSearch() {
  const input = document.getElementById("playerSearchInput");
  const dropdown = document.getElementById("searchDropdown");

  input.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      dropdown.style.display = "none";
      return;
    }

    const matches = GAMES_DATA.filter(g => 
      g.title.toLowerCase().includes(query) || 
      g.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding: 0.75rem; font-size: 0.85rem; color: #94a3b8; text-align: center;">No games found</div>`;
    } else {
      dropdown.innerHTML = matches.slice(0, 5).map(g => `
        <a href="play.html?id=${g.id}" class="quick-search-item">
          <img src="${g.thumb}" class="quick-search-thumb" alt="${g.title}" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 60 40%22><rect width=%2260%22 height=%2240%22 fill=%22%230f172a%22/><text x=%2230%22 y=%2226%22 fill=%22%2300e5ff%22 font-size=%2216%22 text-anchor=%22middle%22>🎮</text></svg>';">
          <div>
            <div class="quick-search-title">${g.title}</div>
            <div class="quick-search-cat">${g.category}</div>
          </div>
        </a>
      `).join("");
    }

    dropdown.style.display = "block";
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}
