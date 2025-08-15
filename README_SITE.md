# Pioneer‑Style Portfolio (Starter)

A minimal, beginner‑friendly, scroll‑driven portfolio inspired by immersive sites like *Pioneer – Corn. Revolutionized.*
This repo is ready for **GitHub Pages**.

## 🚀 Quick Start
1. Upload these files to a new GitHub repo (e.g., `portfolio`).
2. Go to **Settings → Pages → Build and deployment**.
3. Set **Branch** to `main` and **/ (root)`**. Click **Save**.
4. Visit: `https://YOUR_USERNAME.github.io/` or `https://YOUR_USERNAME.github.io/REPO_NAME/`.

## ✏️ Customize
- In `index.html`, change `YOUR_USERNAME`, `YOUR_HANDLE`, and `YOUR_NAME`.
- In the **Projects** section, put your real links.
- Colors live in `styles.css` (`--accent` controls the golden tone).

## 🧠 How it works
- 3D background: **THREE.js**, golden spheres arranged organically.
- Scroll effects: **GSAP + ScrollTrigger**.
- Performance helpers: clamped `devicePixelRatio`, lightweight geometry & lights.

## 🛠 Tech
- No build step. Pure HTML/CSS/JS + CDN.
- Works on GitHub Pages out of the box.

## 🧩 Next ideas
- Replace spheres with your own GLTF/GLB model (e.g., Blender export).
- Add section pinning and more elaborate timelines.
- Lazy‑load heavy assets with `IntersectionObserver`.
