# Zaliant Services

A premium React + Vite website with universal background video, neon purple theme, and complete e-commerce functionality.

## 🎨 Design Features

- **Universal Background Video**: Looping video background on every page with dark purple gradient overlay
- **Neon Purple Theme**: Pure purple/violet color scheme (NO PINK)
- **Glassmorphism**: Premium glass cards with backdrop blur and glow effects
- **Smooth Animations**: Framer Motion throughout for buttery smooth transitions
- **Responsive Design**: Fully responsive across all devices

## 🚀 Tech Stack

- **React 18** + **Vite** - Lightning fast development
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling with custom purple theme
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Recharts** - Beautiful analytics charts
- **Shadcn UI** - Premium component library

## 📦 Key Features

### Customer Features
- 🛍️ **Full E-commerce Flow**: Browse products, add to cart, checkout
- 🔐 **Authentication**: Login/Register with role-based access
- 💳 **Crypto Payments**: Bitcoin, Ethereum, Litecoin support
- 🎫 **License Keys**: Automatic generation and management
- 📄 **Invoices**: Downloadable transaction receipts
- 📊 **User Dashboard**: View orders, licenses, and account stats

### Admin Features
- 📈 **Analytics Dashboard**: Revenue, orders, and sales charts
- 📦 **Product Management**: CRUD operations for products
- 🛒 **Order Management**: View and track all orders
- 🎟️ **Coupon System**: Create percentage or flat discount codes
- 👥 **User Management**: View all users and their activity
- 📣 **Announcement System**: Global site-wide announcements

## 🎯 Pages

- `/` - Home page with hero, features, testimonials
- `/store` - Product listing with filters
- `/product/:id` - Product details with plans selector
- `/cart` - Shopping cart with promo codes
- `/checkout` - Payment selection and processing
- `/success` - Order confirmation with license keys
- `/login` - User authentication
- `/register` - New user registration
- `/dashboard` - User orders and licenses
- `/admin` - Admin panel with full CMS

## 🔐 Admin Access

**Email**: admin@zaliant.com  
**Password**: zaliant123

## 🎨 Color Scheme

All colors use HSL format for consistency:
- Primary Purple: `hsl(269, 90%, 58%)`
- Dark Background: `hsl(264, 71%, 8%)`
- Neon Glow: `hsl(269, 100%, 70%)`
- Accent Violet: `hsl(275, 95%, 65%)`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # Shadcn components
│   ├── BackgroundVideo.tsx
│   ├── PageLayout.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── pages/           # Route pages
├── contexts/        # React contexts (Auth, Cart)
├── utils/           # Utility functions (licenses, invoices)
├── data/            # Mock JSON data
└── App.tsx          # Main app component
```

## 🎥 Background Video

The background video (`public/admin-bg.mp4`) plays on every page with:
- Autoplay and loop
- Dark purple gradient overlay
- Subtle blur effect
- Radial gradient for depth

## 📝 License

© 2024 Zaliant Services. All rights reserved.
