# 3D CSS Cube

A pure CSS 3D rotating cube animation with no JavaScript required.

![3D Cube Animation](cube.png)

## 🔗 Live Demo

**[cube.kahdev.me](https://cube.kahdev.me)**

## Description

An interactive 3D cube built entirely with HTML and CSS. Uses CSS 3D transforms and keyframe animations to create a continuously rotating cube with six labeled faces.

## Tech

- HTML5
- CSS3
  - 3D Transforms (`perspective`, `rotateX`, `rotateY`, `translateZ`)
  - Keyframe animations
  - Flexbox positioning

## Features

- Pure CSS animation (no JavaScript)
- Smooth infinite rotation
- Terminal-inspired dark theme matching [kahdev.me](https://kahdev.me)
- Responsive design
- Semi-transparent cube faces with green accent color

## Usage

Clone and open `index.html` in any browser:
```bash
git clone https://github.com/khesse-757/cube.git
cd cube
open index.html
```

## 📁 Structure
```
cube/
├── index.html        # Main HTML structure
├── style.css         # CSS animations and styling
├── CNAME            # Custom domain configuration
└── README.md        # This file
```

## 🔧 How It Works

The cube uses CSS `transform-style: preserve-3d` to maintain 3D space, with each face positioned using:
- `rotateY()` for front/back/left/right faces
- `rotateX()` for top/bottom faces  
- `translateZ()` to push faces outward from center

The rotation animation applies both `rotateX(360deg)` and `rotateY(360deg)` over 10 seconds for a tumbling effect.

## 🎨 Customization

Adjust rotation speed in `style.css`:
```css
@keyframes rotate {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to { transform: rotateX(360deg) rotateY(360deg); }
}

.cube {
    animation: rotate 10s infinite linear;  /* Change 10s to adjust speed */
}
```

Change cube size:
```css
.cube,
.face {
    width: 200px;   /* Adjust size */
    height: 200px;
}

.front  { transform: rotateY(0deg) translateZ(100px); }  /* Half of width */
/* Update all translateZ values to half of new size */
```

## 📝 License

MIT License - feel free to use this code for your own projects

## Part of kahdev.me

This is a standalone project from my personal site: [kahdev.me](https://kahdev.me)

Check out more projects at [kahdev.me/projects](https://kahdev.me/projects)

## Author

- Website: [kahdev.me](https://kahdev.me)
- GitHub: [@khesse-757](https://github.com/khesse-757)

---

*Built with ☕ and CSS*