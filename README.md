# eCommerce BharatGo


🌐 **Live Demo**: [ecommerce-bharatgo-sable.vercel.app](https://ecommerce-bharatgo-sable.vercel.app)  
📂 **Source Code**: [github.com/prathmeshlp/ecommerce-bharatgo](https://github.com/prathmeshlp/ecommerce-bharatgo)

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices using Tailwind CSS.
- **Product Browsing**: Search and filter products by category and title with a dynamic grid layout.
- **Cart Management**: Add, update, and remove items from the cart with real-time total calculation.
- **User Authentication**: Secure login and registration powered by Firebase Authentication.
- **Order History**: View past orders with expandable details for each purchase.
- **Account Management**: Display user email and ID in a clean, accessible interface.
- **Sidebar Navigation**: Interactive sidebar for product details and checkout, with smooth animations via Framer Motion.
- **State Management**: Efficient state handling with Redux Toolkit for products, cart, and orders.
- **Type Safety**: Built with TypeScript for robust type checking and maintainability.
- **Reusable Components**: Modular UI components (`Card`, `Input`, `PrimaryButton`, `SectionHeading`) for consistency and scalability.

## Tech Stack

- **Frontend**: React 19.0.0, TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: Redux Toolkit 1.9.5
- **Authentication**: Firebase Authentication
- **Animations**: Framer Motion 10.12.16
- **Routing**: React Router DOM 6.11.0
- **Icons**: React Icons
- **Loading Indicators**: React Spinners
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Version Control**: Git, GitHub

## Prerequisites

To run the project locally, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher (or Yarn/Pnpm)
- **Git**: For cloning the repository
- **Firebase Account**: For authentication setup (see [Firebase Setup](#firebase-setup))

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prathmeshlp/ecommerce-bharatgo.git
   cd ecommerce-bharatgo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Or, if using Yarn:
   ```bash
   yarn install
   ```

3. **Firebase Setup**:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Email/Password** authentication in the Authentication section.
   - Copy your Firebase configuration (API keys, etc.) and create a `.env` file in the project root:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```
   - Ensure the `.env` file is added to `.gitignore` to avoid exposing sensitive data.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Or, if using Yarn:
   ```bash
   yarn dev
   ```
   The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

5. **Build for Production**:
   ```bash
   npm run build
   ```
   To preview the production build:
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds the app for production.
- `npm run preview`: Serves the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.


## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Navigate to **Authentication** > **Sign-in method** and enable **Email/Password**.
3. In the Firebase project settings, find your **Web API Key** and other configuration details.
4. Add these to the `.env` file as shown above.
5. The `useAuth.ts` hook in `src/hooks` uses these environment variables to initialize Firebase Authentication.




## Issues

If you encounter bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/prathmeshlp/ecommerce-bharatgo/issues).



## Acknowledgments

- Built by [Prathmesh](https://github.com/prathmeshlp).
- Powered by [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Redux Toolkit](https://redux-toolkit.js.org/), and [Firebase](https://firebase.google.com/).
- Hosted on [Vercel](https://vercel.com/).



