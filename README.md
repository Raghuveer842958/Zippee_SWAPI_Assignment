# Star Wars Character App

A responsive web application displaying Star Wars characters from the **Star Wars API (SWAPI)**.  
Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## Table of Contents

- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Features](#features)  
- [Bonus Features](#bonus-features)  
- [Trade-offs & Design Choices](#trade-offs--design-choices)  
- [Project Structure](#project-structure)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  

---

## Prerequisites

- **Node.js** v18 or higher  
- **npm** or **yarn**

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
# or
yarn install
```

---

## Usage

### Run the development server

```bash
npm run dev
# or
yarn dev
```

Then open your browser at 👉 [http://localhost:5173](http://localhost:5173)

### Build the production bundle

```bash
npm run build
# or
yarn build
```

### Preview the production build locally

```bash
npm run preview
# or
yarn preview
```

---

## Features

🚀 Fetch and display characters with pagination  
🔍 Search and filter by species with URL-to-name mapping  
📱 Responsive card grid showing 1 card on mobile  
💫 Detailed modal with homeworld and films info  
🔐 Mock authentication with protected routes  
🌗 Dark mode support  
⚙️ Graceful handling of loading, error, and empty states  

---

## Bonus Features

🔄 Silent token refresh (mocked)  
🧠 Combined search and filter  
♿ Accessibility improvements  
🧩 Modular components with TypeScript typings  

---

## Trade-offs & Design Choices

⚛️ React hooks and functional components for simplicity  
🎨 Tailwind CSS for fast styling and responsiveness  
🧠 Mocked authentication to focus on frontend logic  
📱 Mobile card limit to improve UX and performance  
🚫 Avoided complex external state management to keep it lightweight  

---

## Project Structure

```bash
/src
  /components      # Reusable UI components  
  /pages           # Application pages (Home, Login, etc.)  
  /hooks           # Custom React hooks  
  /lib             # Utility functions and API services  
  /assets          # Static assets and images  
  App.tsx          # Main app component and routing  
  main.tsx         # React entry point  
vite.config.ts     # Vite configuration  
tailwind.config.ts # Tailwind CSS configuration  
```

---

## Technologies

- React  
- TypeScript  
- Vite  
- Tailwind CSS  
- Shadcn UI

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.
