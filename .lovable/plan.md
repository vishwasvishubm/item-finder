

# NearbyIQ – Smart Item Availability Finder

## Overview
A polished, hackathon-ready frontend app that lets users search for items, see nearby shop availability with AI predictions, and view results on an interactive map.

## Pages & Components

### 1. Home Page
- "NearbyIQ" branded header with dark mode toggle
- Hero section with gradient background
- Search bar: item input + location/pincode input + "Find Nearby" button
- "Use Current Location" button using browser geolocation API
- Popular search suggestions (milk, medicine, rice, etc.)

### 2. Results Page
- Search summary bar (editable)
- Filter/sort controls: sort by distance/availability/price, filter available-only
- Result cards with:
  - Shop name, distance, price
  - Color-coded availability badges (green/yellow/red)
  - AI prediction badges ("Likely to run out soon", "High availability")
  - "View on Map" button
- Loading skeletons during simulated search
- Empty state for no results

### 3. Map View
- Leaflet map integrated alongside or toggleable with list view
- User location marker + shop markers
- Clicking a marker shows shop info popup
- Map and list stay in sync (highlight selected shop)

### 4. Shared UI
- Responsive navbar with NearbyIQ logo, dark mode toggle
- Mobile-first layout, cards stack vertically on small screens
- Smooth transitions and hover effects throughout
- Lucide icons for all iconography

## Data
- Rich mock dataset (~10-15 shops) with varied items, distances, stock statuses, prices, and coordinates
- All state managed client-side with React state + URL params for search/filters

## Tech
- React + React Router for navigation
- Tailwind CSS for styling
- Leaflet (react-leaflet) for maps
- Lucide React for icons
- Dark mode via class toggle

