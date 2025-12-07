This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

🛒 Next.js E-Commerce Assessment (Front-End)

A fully responsive e-commerce interface built using Next.js 15+ App Router, Tailwind CSS, and Server Actions—based on the given Figma design and API.

🚀 Tech Stack

Next.js 15+ (App Router)

React Server Components

Server Actions (Mandatory API fetching)

TypeScript

Tailwind CSS

📌 Features
✔ Server Actions Only

All API calls are handled through server actions, no fetch/axios inside client components.

✔ API Integration

Get all products

Get all categories

Get category-wise products (e.g., /category/jewelry)

Single product details

Search functionality (server-side search)

✔ UI Implementation

70–80% accurate to Figma

Responsive for mobile, tablet, desktop

Reusable components

Clean layout matching the provided design system

✔ Additional Features

Dynamic category navigation

Category-wise product filtering

Search bar with query state

Loading & error handling

Clean file structure & modular components

📁 Project Structure
app/
 ├─ actions/
 │   ├─ getProducts.ts
 │   ├─ getCategories.ts
 │   ├─ getProductsByCategory.ts
 │   └─ getSingleProduct.ts
 ├─ components/
 │   ├─ Navigation/
 │   ├─ ProductCard/
 │   ├─ ProductGrid/
 │   ├─ CategorySlider/
 │   └─ UI Components
 ├─ category/[slug]/page.tsx
 ├─ product/[id]/page.tsx
 ├─ globals.css
 └─ layout.tsx

🧪 How to Run Locally
1. Clone Repo
git clone [https://github.com/KKBabir7/e-commerce-app.git]
cd your-repo

2. Install Packages
npm install

3. Add Env File

Create .env.local

NEXT_PUBLIC_API_BASE=https://mm-assesment-server.vercel.app/api/v1


Or check .env.example.

4. Run Development Server
npm run dev


Project will run at:
👉 http://localhost:3000

📌 Assumptions

20% UI mismatch in Figma vs API data → used best possible match

Some fields (ratings, descriptions) not available → adjusted accordingly

Routing based strictly on available endpoints

🔗 Live Demo

[https://e-commerce-app-3rjr.vercel.app]