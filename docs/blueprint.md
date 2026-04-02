# **App Name**: Titi Tapas Digital

## Core Features:

- AI-Powered Menu Data Ingestion: Utilizes a generative AI tool to parse provided menu images (e.g., 'captura1.jpg', 'captura2.jpg'), extracting dish names, categories, prices, and descriptions to automatically populate the initial Firestore 'menu' collection.
- Dynamic Menu Display & Filtering: Displays the restaurant's menu items dynamically loaded from the Firestore 'menu' collection, with responsive cards showing photo, name, price, and description. Includes filtering by categories such as 'Desayunos', 'Tapas', 'Montaditos', 'Raciones', and 'Bebidas'.
- Table Reservation System: A user-friendly form enabling customers to make table reservations, collecting essential details like name, phone, date, time, number of people, and a message. Reservations are stored in the Firestore 'reservas' collection with real-time validation.
- Customer Reviews & Testimonials: Allows customers to submit ratings and comments which are saved to the Firestore 'reseñas' collection. Recent customer reviews are prominently displayed on the application's homepage to build trust and social proof.
- Interactive Contact & Location: Provides the restaurant's address, clickable phone number for direct calls, business hours displayed in a table, and an embedded Google Map for easy directions. Includes a suggestions form that stores data in Firestore.
- Takeaway Order Selection: Enables users to browse menu items and add them to a temporary in-app cart, simulating a selection process for potential future takeaway orders without full e-commerce functionality.

## Style Guidelines:

- A rich Andalusian Red (`#A62F2F`) serves as the primary color, embodying passion, tradition, and the inviting warmth of Bar Titi. It provides a striking contrast against the lighter background.
- A soft, inviting Cream (`#F8F4E6`) defines the background, offering a natural, light, and airy feel that complements the traditional aesthetic and ensures high readability across all content.
- An earthy Wood Brown (`#8B4513`) acts as the accent color, reflecting natural materials and rustic authenticity. It will be strategically used to highlight interactive elements and important calls to action.
- A calming Olive Green (`#2D5A2D`) is introduced as a secondary color, subtly evoking nature, freshness, and the verdant landscapes of Andalusia, enriching the overall traditional Spanish palette.
- Headline font: 'Playfair Display' (serif), chosen for its elegant and sophisticated character, lending a classic yet contemporary feel to titles and prominent headings.
- Body font: 'Inter' (sans-serif), a modern and highly readable font, used for all body text, menu descriptions, and form labels to ensure clarity and clean aesthetics across the application.
- Use custom, illustrative icons inspired by traditional Spanish tapas, local Seville culture, and restaurant elements to enhance thematic consistency and user engagement throughout the app.
- A mobile-first, responsive grid layout prioritizes optimal viewing and interaction across all device sizes. This ensures clear content hierarchy, intuitive navigation, and accessibility for every user.
- Subtle and tasteful animations for page transitions, interactive element states (like button hovers), and content loading to provide smooth user feedback and enhance the overall polished feel without being distracting.