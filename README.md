# 🎲 Snake & Ladders – Modern Web-Based Multiplayer Game

This project is a **modern, web-based reimagining of the classic Snake & Ladders board game**, built from the ground up to deliver a **polished, interactive, and multiplayer experience directly in the browser**.  
It combines clean UI design, smooth animations, and well-structured game logic to create a fun and engaging gameplay experience.

---

## 🛠️ Languages & Technologies Used

- **HTML5**
  - Structures the entire game layout
  - Canvas-based board rendering
  - Sidebar controls and setup / win overlays

- **CSS3**
  - Dark Mode UI with **glassmorphism effects**
  - Flexbox-based responsive layouts
  - Keyframe animations (dice shake, transitions)

- **JavaScript (ES6+)**
  - Core game engine and logic
  - Player turn management and state handling
  - Async movement animations
  - Coordinate mapping for a 10×10 zig-zag board

---

## 🚀 Key Features

### 🎮 Dynamic Multiplayer (2–4 Players)
- Select number of players at the start
- Enter **custom player names**
- Color-coded turn indicator for clarity

### 🚶 Smooth Walking Mechanics
- Tokens move **square-by-square**
- No instant teleportation
- Creates a realistic and engaging board traversal

### 🐍🪜 Real Image Assets
- Uses real **PNG images** for snakes and ladders
- Automatically rotated and stretched
- Precisely aligned with board squares

### 🎨 Interactive UI / UX
- Sidebar showing:
  - Active player
  - Current square position
- Animated 3D-style dice
- Visually responsive turn changes

### 🎉 Win Celebration
- Dedicated win overlay
- Confetti animation on reaching **Square 100**
- Clear and satisfying victory feedback

---

## 🧠 Implementation Highlights

### 🔢 Zig-Zag Coordinate System
- Square 1 starts at **bottom-left**
- Square 100 ends at **top-left**
- A mathematical mapping function converts positions (1–100) into exact `(X, Y)` pixel coordinates on the canvas

### 📐 Trigonometric Rotation Logic
- Snakes and ladders are rendered using:
  - Distance calculation between start & end squares
  - Angle calculation using trigonometry
- Canvas is translated and rotated to perfectly center and align each image

### ⏳ Async Movement Flow
- Uses `async / await` for player movement
- Ensures:
  - Smooth animations
  - Sequential square traversal
  - Better visual storytelling during gameplay

---

## ✨ Why This Project Stands Out

- **High Visual Polish**
  - Glassmorphism UI
  - Image-based snakes & ladders instead of plain lines

- **Smooth & Engaging Motion**
  - Players *see* the journey across the board

- **Clean & Responsive Layout**
  - Vertical structure: `Header → Game → Footer`
  - Organized and adaptable across screen sizes

- **Professional Presentation**
  - Integrated header and footer
  - Links back to portfolio and GitHub
  - Fully shareable and deploy-ready project

---

## 📦 How to Run the Project
1.Access via Browser (Deployed Version)

You can access the project directly in your browser since it has already been deployed.

**Steps:**
1. Open the GitHub repository.
2. Look at the right-side panel of the repository page.
3. Scroll down to the **Deployments** section.
4. Click on **`github-pages`** to get the live deployment link.
5. The project will open directly in your browser.

**Alternative Method:**
- Open the live website directly using the link below:


2. Clone the repository
   ```bash
   git clone https://github.com/your-username/snake-and-ladders-web.git




---

## ⭐ Support

If you found this project useful or enjoyed playing it, please consider giving this repository a ⭐ on GitHub.  
Your support helps improve the project and motivates further enhancements and features.

---

## 👤 Author

**Chintada Chanukya Venkata Sai**  
Computer Science & Engineering Student | Cybersecurity Enthusiast  

🌐 Portfolio: https://chanukyachintada.vercel.app  
💻 GitHub: https://github.com/chanukya006  
🔗 LinkedIn: https://www.linkedin.com/in/chanukya006  

Built with a focus on clean design, smooth animations, and engaging gameplay, blending classic game mechanics with modern web technologies.

---
