export type AvailabilityStatus = "Available" | "Low Stock" | "Out of Stock";
export type AIPrediction = "High availability" | "Likely to run out soon" | "Restocking expected" | "Stable supply";

export interface Shop {
  id: string;
  name: string;
  address: string;
  distance: number;
  distanceLabel: string;
  status: AvailabilityStatus;
  prediction: AIPrediction;
  price: string;
  lat: number;
  lng: number;
  rating: number;
  items: string[];
}

export const popularSearches = ["Milk", "Rice", "Medicine", "Bread", "Eggs", "Laptop", "Charger", "Soap"];

export const mockShops: Shop[] = [
  { id: "1", name: "Fresh Mart", address: "12 MG Road, Bengaluru", distance: 0.5, distanceLabel: "0.5 km", status: "Available", prediction: "High availability", price: "₹50", lat: 12.9716, lng: 77.5946, rating: 4.5, items: ["milk", "bread", "eggs", "rice"] },
  { id: "2", name: "QuickStop", address: "45 Brigade Rd, Bengaluru", distance: 1.2, distanceLabel: "1.2 km", status: "Low Stock", prediction: "Likely to run out soon", price: "₹48", lat: 12.9736, lng: 77.6010, rating: 4.2, items: ["milk", "medicine", "soap", "charger"] },
  { id: "3", name: "MedPlus Pharmacy", address: "78 Koramangala, Bengaluru", distance: 1.8, distanceLabel: "1.8 km", status: "Available", prediction: "Stable supply", price: "₹120", lat: 12.9352, lng: 77.6245, rating: 4.7, items: ["medicine", "soap", "sanitizer"] },
  { id: "4", name: "Reliance Smart", address: "23 Indiranagar, Bengaluru", distance: 2.3, distanceLabel: "2.3 km", status: "Available", prediction: "High availability", price: "₹55", lat: 12.9784, lng: 77.6408, rating: 4.4, items: ["milk", "rice", "bread", "eggs", "laptop", "charger"] },
  { id: "5", name: "Kirana Corner", address: "90 Jayanagar, Bengaluru", distance: 0.8, distanceLabel: "0.8 km", status: "Out of Stock", prediction: "Restocking expected", price: "₹52", lat: 12.9250, lng: 77.5938, rating: 3.9, items: ["milk", "rice", "bread", "soap"] },
  { id: "6", name: "BigBasket Pickup", address: "56 HSR Layout, Bengaluru", distance: 3.1, distanceLabel: "3.1 km", status: "Available", prediction: "High availability", price: "₹45", lat: 12.9121, lng: 77.6446, rating: 4.6, items: ["milk", "eggs", "rice", "bread"] },
  { id: "7", name: "More Supermarket", address: "34 Whitefield, Bengaluru", distance: 5.2, distanceLabel: "5.2 km", status: "Low Stock", prediction: "Likely to run out soon", price: "₹58", lat: 12.9698, lng: 77.7500, rating: 4.1, items: ["milk", "rice", "laptop", "charger"] },
  { id: "8", name: "Apollo Pharmacy", address: "11 Malleshwaram, Bengaluru", distance: 4.0, distanceLabel: "4.0 km", status: "Available", prediction: "Stable supply", price: "₹115", lat: 13.0035, lng: 77.5710, rating: 4.8, items: ["medicine", "sanitizer", "soap"] },
  { id: "9", name: "DMart", address: "67 Electronic City, Bengaluru", distance: 7.5, distanceLabel: "7.5 km", status: "Available", prediction: "High availability", price: "₹42", lat: 12.8456, lng: 77.6603, rating: 4.3, items: ["milk", "rice", "bread", "eggs", "soap", "charger"] },
  { id: "10", name: "Star Bazaar", address: "29 Marathahalli, Bengaluru", distance: 4.8, distanceLabel: "4.8 km", status: "Low Stock", prediction: "Likely to run out soon", price: "₹53", lat: 12.9591, lng: 77.6974, rating: 4.0, items: ["milk", "bread", "eggs"] },
  { id: "11", name: "Namma Kirana", address: "82 Rajajinagar, Bengaluru", distance: 3.6, distanceLabel: "3.6 km", status: "Out of Stock", prediction: "Restocking expected", price: "₹60", lat: 12.9910, lng: 77.5530, rating: 3.7, items: ["rice", "bread", "soap"] },
  { id: "12", name: "Spencer's", address: "15 Lavelle Road, Bengaluru", distance: 1.5, distanceLabel: "1.5 km", status: "Available", prediction: "Stable supply", price: "₹62", lat: 12.9700, lng: 77.5960, rating: 4.3, items: ["milk", "eggs", "rice", "laptop"] },
];
