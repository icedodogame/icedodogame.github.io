/**
 * Ice Dodo Games - Homepage Logic (app.js)
 * Coordinates filtering, live search, favorites, and navigates to play.html
 */

class HomePageManager {
  constructor() {
    // Loaded from games-data.js
    this.games = typeof GAMES_DATA !== "undefined" ? GAMES_DATA : [];
    
    // Auto-detect base path if inside /category/* subdirectories
    this.basePath = document.body.getAttribute("data-base-path") || (window.location.pathname.includes("/category/") ? "../../" : "");
    
    // Auto-detect category from body attribute if on category page
    const pageCategory = document.body.getAttribute("data-page-category");
    this.currentCategory = pageCategory || "all";
    
    this.searchQuery = "";
    this.showOnlyFavorites = false;
    this.favorites = this.loadFavorites();

    this.cacheDOMElements();
    this.bindEvents();
    this.updateFavCountBadge();
    this.render();
  }

  cacheDOMElements() {
    this.gamesGrid = document.getElementById("gamesGrid");
    this.searchInput = document.getElementById("searchInput");
    this.clearSearchBtn = document.getElementById("clearSearchBtn");
    this.emptyState = document.getElementById("emptyState");
    this.resetSearchBtn = document.getElementById("resetSearchBtn");
    this.gameCounter = document.getElementById("gameCounter");
    this.categoryPills = document.querySelectorAll(".pill");
    this.favoritesToggleBtn = document.getElementById("favoritesToggleBtn");
    this.favCountBadge = document.getElementById("favCountBadge");

    this.homeLogoBtn = document.getElementById("homeLogoBtn");
    this.navIceDodoBtn = document.getElementById("navIceDodoBtn");
    this.navTrendingBtn = document.getElementById("navTrendingBtn");
  }

  loadFavorites() {
    try {
      const stored = localStorage.getItem("icedodo_favs");
      return stored ? JSON.parse(stored) : ["ice-dodo"];
    } catch {
      return ["ice-dodo"];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem("icedodo_favs", JSON.stringify(this.favorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }

  toggleFavorite(gameId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.favorites.includes(gameId)) {
      this.favorites = this.favorites.filter(id => id !== gameId);
    } else {
      this.favorites.push(gameId);
    }
    this.saveFavorites();
    this.updateFavCountBadge();

    if (this.showOnlyFavorites) {
      this.render();
    }
  }

  updateFavCountBadge() {
    if (this.favCountBadge) {
      this.favCountBadge.textContent = this.favorites.length;
    }
  }

  bindEvents() {
    // Live Search
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.clearSearchBtn) {
          this.clearSearchBtn.style.display = this.searchQuery ? "block" : "none";
        }
        this.render();
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener("click", () => {
        this.searchInput.value = "";
        this.searchQuery = "";
        this.clearSearchBtn.style.display = "none";
        this.searchInput.focus();
        this.render();
      });
    }

    // Keyboard shortcut '/' to search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.searchInput) {
        e.preventDefault();
        this.searchInput.focus();
      }
    });

    // Reset button on empty search
    if (this.resetSearchBtn) {
      this.resetSearchBtn.addEventListener("click", () => {
        this.searchInput.value = "";
        this.searchQuery = "";
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = "none";
        this.setCategory("all");
      });
    }

    // Category pills filter
    this.categoryPills.forEach(pill => {
      pill.addEventListener("click", (e) => {
        // If pill has an href and we are inside a category folder or want full navigation:
        const href = pill.getAttribute("href");
        if (href && href !== "#" && this.basePath) {
          // Allow natural link navigation to target folder
          return;
        }
        e.preventDefault();
        const cat = pill.getAttribute("data-category");
        this.setCategory(cat);
      });
    });

    // Navigation bar buttons
    if (this.homeLogoBtn) {
      this.homeLogoBtn.addEventListener("click", (e) => {
        if (this.basePath) {
          // Let link navigate back to root index.html
          return;
        }
        e.preventDefault();
        this.setCategory("all");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Direct link to play Ice Dodo
    if (this.navIceDodoBtn) {
      this.navIceDodoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = `${this.basePath}play.html?id=ice-dodo`;
      });
    }

    if (this.navTrendingBtn) {
      this.navTrendingBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCategory("hot");
      });
    }

    // Favorites Filter toggle
    if (this.favoritesToggleBtn) {
      this.favoritesToggleBtn.addEventListener("click", () => {
        this.showOnlyFavorites = !this.showOnlyFavorites;
        this.favoritesToggleBtn.classList.toggle("active", this.showOnlyFavorites);
        this.render();
      });
    }
  }

  setCategory(category) {
    this.currentCategory = category;
    this.showOnlyFavorites = false;
    if (this.favoritesToggleBtn) {
      this.favoritesToggleBtn.classList.remove("active");
    }

    this.categoryPills.forEach(pill => {
      pill.classList.toggle("active", pill.getAttribute("data-category") === category);
    });

    this.render();
  }

  getFilteredGames() {
    return this.games.filter(game => {
      if (this.showOnlyFavorites && !this.favorites.includes(game.id)) {
        return false;
      }

      if (this.currentCategory !== "all") {
        if (this.currentCategory === "hot") {
          if (game.badge !== "HOT" && game.badge !== "FEATURED" && parseFloat(game.rating) < 4.9) {
            return false;
          }
        } else if (game.category !== this.currentCategory) {
          return false;
        }
      }

      if (this.searchQuery) {
        const matchesTitle = game.title.toLowerCase().includes(this.searchQuery);
        const matchesCategory = game.category.toLowerCase().includes(this.searchQuery);
        const matchesDesc = (game.desc || "").toLowerCase().includes(this.searchQuery);
        return matchesTitle || matchesCategory || matchesDesc;
      }

      return true;
    });
  }

  render() {
    const filtered = this.getFilteredGames();

    if (this.gameCounter) {
      this.gameCounter.textContent = `${filtered.length} Game${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      this.gamesGrid.innerHTML = "";
      this.emptyState.style.display = "block";
      return;
    }

    this.emptyState.style.display = "none";
    this.gamesGrid.innerHTML = filtered.map(game => this.createCardHTML(game)).join("");
  }

  createCardHTML(game) {
    const playUrl = `${this.basePath}play.html?id=${game.id}`;
    return `
      <a href="${playUrl}" class="game-card" aria-label="Play ${game.title}">
        <div class="card-thumb-wrap">
          <img src="${game.thumb}" alt="${game.title} Thumbnail" class="card-thumb-img" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22><rect width=%22400%22 height=%22250%22 fill=%22%230f172a%22/><text x=%22200%22 y=%22115%22 fill=%22%2300e5ff%22 font-size=%2245%22 text-anchor=%22middle%22>🎮</text><text x=%22200%22 y=%22165%22 fill=%22%23ffffff%22 font-family=%22sans-serif%22 font-weight=%22bold%22 font-size=%2222%22 text-anchor=%22middle%22>${encodeURIComponent(game.title)}</text></svg>';">
          <span class="card-badge ${game.badgeType}">${game.badge}</span>
          <div class="card-overlay">
            <div class="play-hover-btn" title="Play Now">
              <svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
            </div>
          </div>
        </div>
        <div class="card-details">
          <h2 class="game-title">${game.title}</h2>
          <div class="game-rating-star">
            <span>★</span>
            <span>${game.rating}</span>
          </div>
        </div>
      </a>
    `;
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.homeApp = new HomePageManager();
});
