/**
 * ============================================================================
 * Ice Dodo Games - Shared Games Database
 * ============================================================================
 * CONFIGURATION & CUSTOMIZATION GUIDE:
 * - To change thumbnail: edit the 'thumb' URL:
 *   (Supports web URLs: https://... or local paths: images/game-logo.png)
 * - To change playable game: edit the 'embedUrl' link
 * ============================================================================
 */

const GAMES_DATA = [
  {
    id: "burnin-rubber-5-xs",
    title: "Burnin Rubber 5 XS",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://slice-master.github.io/gameslicemaster/burnin-rubber-5-xs/logo.png",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://slice-master.github.io/gameslicemaster/burnin-rubber-5-xs/",
    category: "runners",
    badge: "FEATURED",
    badgeType: "badge-featured",
    rating: "4.9",
    plays: "3.2M",
    releaseYear: "2024",
    developer: "Onionfist",
    controls: [
      { key: "A / D or ← / →", desc: "Steer Left / Right" },
      { key: "Spacebar", desc: "Jump / Hop" },
      { key: "R", desc: "Quick Restart" }
    ],
    desc: "Fly and slide as a frosty dodo through mind-bending 3D icy obstacle courses at breakneck speeds. Dodge moving ice pillars, leap across gravity gaps, and conquer ultra-fast procedural tracks in this iconic speedrunner!"
  },
  {
    id: "roblox",
    title: "Roblox",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://slice-master.github.io/gameslicemaster/burnin-rubber-5-xs/logo.png",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://now.gg/apps/roblox-corporation/5349/roblox.html",
    category: "arcade",
    badge: "HOT",
    badgeType: "badge-hot",
    rating: "4.8",
    plays: "8.5M",
    releaseYear: "2024",
    developer: "Roblox Corp",
    controls: [
      { key: "W / A / S / D", desc: "Move Character" },
      { key: "Spacebar", desc: "Jump" },
      { key: "Mouse", desc: "Look Around / Interact" }
    ],
    desc: "Explore an infinite universe of player-created worlds, multiplayer minigames, obbies, tycoon simulations, and roleplaying adventures directly in your browser!"
  },
  {
    id: "crazy-cattle-3d",
    title: "Crazy Cattle 3D",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://slice-master.github.io/gameslicemaster/burnin-rubber-5-xs/logo.png",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://html5.gamedistribution.com/",
    category: "runners",
    badge: "3D",
    badgeType: "badge-3d",
    rating: "4.7",
    plays: "1.9M",
    releaseYear: "2023",
    developer: "Vseigru",
    controls: [
      { key: "← / → or A / D", desc: "Steer Cattle" },
      { key: "Spacebar", desc: "Jump / Dash" }
    ],
    desc: "Control your hilarious runaway farm sheep across vast 3D prairies and obstacle-laden fields. Collect bonuses and dodge barnyard hazards!"
  },
  {
    id: "geometry-dash-lite",
    title: "Geometry Dash Lite",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://play-lh.googleusercontent.com/WGW3z52mC5QZJ-k9vWzE6Jt0rG3C6q0E1-C-eH-f4q4W9vK9X-k9vWzE6Jt0rG3C6q0=w512-h384-rw",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://geometrydashlite.io/",
    category: "skill",
    badge: "HOT",
    badgeType: "badge-hot",
    rating: "4.9",
    plays: "6.4M",
    releaseYear: "2023",
    developer: "RobTop Games",
    controls: [
      { key: "Space / ↑ / Click", desc: "Jump / Fly Rocket" }
    ],
    desc: "Jump, fly, and flip your way through dangerous rhythmic passages and spiky obstacles. Sync your reflexes to energetic beats in this addictive rhythm platformer!"
  },
  {
    id: "run-3",
    title: "Run 3",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://play-lh.googleusercontent.com/97eW3Q4rY1X1q6q8k8vWzE6Jt0rG3C6q0E1-C-eH-f4q4W9vK9X-k9vWzE6Jt0rG3C6q0=w512-h384-rw",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://player.run3.com/",
    category: "runners",
    badge: "POPULAR",
    badgeType: "badge-3d",
    rating: "4.9",
    plays: "7.1M",
    releaseYear: "2023",
    developer: "Joseph Cloutier",
    controls: [
      { key: "A / D or ← / →", desc: "Move & Rotate Tunnel" },
      { key: "Spacebar / Up", desc: "Jump" }
    ],
    desc: "Run through an endless 3D space tunnel, rotate gravity by running on walls, unlock new alien species with special perks, and navigate deep outer space."
  },
  {
    id: "run-2",
    title: "Run 2",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhQ2-Q6jGk8_wZ3L1mX9F5r6T-C4_8h9L3qA&s",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://player.run2.com/",
    category: "runners",
    badge: "CLASSIC",
    badgeType: "badge-classic",
    rating: "4.7",
    plays: "3.5M",
    releaseYear: "2022",
    developer: "Player 03",
    controls: [
      { key: "← / →", desc: "Turn Left / Right" },
      { key: "Spacebar", desc: "Jump" }
    ],
    desc: "The timeless space runner sequel featuring the runner and the skater characters racing along floating platforms in deep space."
  },
  {
    id: "worlds-hardest-game",
    title: "The World's Hardest Game",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y6K6y4E1v_wZ3L1mX9F5r6T-C4_8h9L3qA&s",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://www.snokido.com/game/the-worlds-hardest-game",
    category: "skill",
    badge: "HARD",
    badgeType: "badge-hot",
    rating: "4.8",
    plays: "4.1M",
    releaseYear: "2023",
    developer: "Stephen Critoph",
    controls: [
      { key: "Arrow Keys / W,A,S,D", desc: "Move Red Square" }
    ],
    desc: "Guide your red square through ultra-precision maze levels without touching a single blue circle. Collect all yellow coins before reaching the green safe zone!"
  },
  {
    id: "rooftop-snipers",
    title: "Rooftop Snipers",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2E-q4w1y6r8vWzE6Jt0rG3C6q0E1-C-eH-f4q4W9vK9X&s",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://rooftopsnipers.io/",
    category: "action",
    badge: "2-PLAYER",
    badgeType: "badge-3d",
    rating: "4.8",
    plays: "5.3M",
    releaseYear: "2023",
    developer: "New Eich Games",
    controls: [
      { key: "W / E", desc: "P1: Jump / Shoot" },
      { key: "I / O", desc: "P2: Jump / Shoot" }
    ],
    desc: "Chaotic ragdoll two-player duel on rooftops with snipers, shotguns, beach balls, and hilarious physics. Knock your opponent off the building to score!"
  },
  {
    id: "run-1",
    title: "Run 1",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4eW-Q6jGk8_wZ3L1mX9F5r6T-C4_8h9L3qA&s",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://player.run1.com/",
    category: "runners",
    badge: "CLASSIC",
    badgeType: "badge-classic",
    rating: "4.6",
    plays: "2.7M",
    releaseYear: "2021",
    developer: "Player 03",
    controls: [
      { key: "← / →", desc: "Turn Left / Right" },
      { key: "Spacebar", desc: "Jump" }
    ],
    desc: "The original 3D runner classic through the deep cosmos that started it all. Jump across missing floor tiles and avoid falling into the eternal void."
  },
  {
    id: "slope-2",
    title: "Slope 2",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6f2-q4w1y6r8vWzE6Jt0rG3C6q0E1-C-eH-f4q4W9vK9X&s",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://slope2.io/",
    category: "runners",
    badge: "3D",
    badgeType: "badge-3d",
    rating: "4.8",
    plays: "4.7M",
    releaseYear: "2023",
    developer: "Y8 Games",
    controls: [
      { key: "A / D or ← / →", desc: "Steer Left / Right" }
    ],
    desc: "Roll at hyper speed down thrilling slopes with red obstacles, high jumps, power boosters, and endless neon tunnels."
  },
  {
    id: "slope",
    title: "Slope",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9vWzE6Jt0rG3C6q0E1-C-eH-f4q4W9vK9X-k9vWzE6Jt0rG3C6q0=s512",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://slopegame.online/",
    category: "runners",
    badge: "HOT",
    badgeType: "badge-hot",
    rating: "4.9",
    plays: "9.2M",
    releaseYear: "2023",
    developer: "Rob Kay",
    controls: [
      { key: "A / D or ← / →", desc: "Balance Ball Left / Right" }
    ],
    desc: "The timeless 3D rolling ball adrenaline rush. Keep your ball on the slope as speed ramps up endlessly down dizzying neon skyscraper tracks."
  },
  {
    id: "moto-x3m",
    title: "Moto X3M",
    // 👇 PASTE GAME THUMBNAIL URL HERE 👇
    thumb: "https://play-lh.googleusercontent.com/97eW3Q4rY1X1q6q8k8vWzE6Jt0rG3C6q0E1-C-eH-f4q4W9vK9X-k9vWzE6Jt0rG3C6q0=s512",
    // 👇 PASTE PLAYABLE GAME URL HERE 👇
    embedUrl: "https://motox3m.co/",
    category: "arcade",
    badge: "POPULAR",
    badgeType: "badge-classic",
    rating: "4.8",
    plays: "5.8M",
    releaseYear: "2023",
    developer: "Madpuffers",
    controls: [
      { key: "W / ↑", desc: "Accelerate Bike" },
      { key: "S / ↓", desc: "Brake / Reverse" },
      { key: "A / D or ← / →", desc: "Tilt & Flip in Mid-Air" }
    ],
    desc: "Race your stunt motorbike across lethal tracks packed with giant loops, spinning saws, TNT explosions, and insane aerial stunts."
  }
];

// Helper to look up game by ID
function findGameById(id) {
  if (!id) return GAMES_DATA[0];
  const found = GAMES_DATA.find(g => g.id.toLowerCase() === id.toLowerCase());
  return found || GAMES_DATA[0];
}
