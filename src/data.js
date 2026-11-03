export const products = [
  {
    id: "gamepad",
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    old: 160,
    discount: 40,
    image: "gamepad.png",
    category: "Gaming",
    rating: 5,
    reviews: 88,
    description:
      "Play your way with a precision gamepad. Responsive controls, a comfortable grip, and dual vibration bring every adventure to life.",
  },
  {
    id: "keyboard",
    name: "AK-900 Wired Keyboard",
    price: 960,
    old: 1160,
    discount: 35,
    image: "keyboard.png",
    category: "Computers",
    rating: 4,
    reviews: 75,
    description:
      "Make every keystroke count. A full-size mechanical keyboard with a satisfying feel, reliable wired connection, and adjustable backlighting.",
  },
  {
    id: "monitor",
    name: "IPS LCD Gaming Monitor",
    price: 370,
    old: 400,
    discount: 30,
    image: "monitor.png",
    category: "Computers",
    rating: 5,
    reviews: 99,
    description:
      "See the bigger picture with a vivid IPS display, smooth motion, and crisp detail. Designed for work, play, and everything in between.",
  },
  {
    id: "chair",
    name: "S-Series Comfort Chair",
    price: 375,
    old: 400,
    discount: 25,
    image: "chair.png",
    category: "Home & Lifestyle",
    rating: 4.5,
    reviews: 99,
    description:
      "Settle into everyday comfort. Ergonomic support, an adjustable height, and a soft upholstered seat make long days feel a little easier.",
  },
  {
    id: "coat",
    name: "The north coat",
    price: 260,
    old: 360,
    image: "coat.svg",
    category: "Men’s Fashion",
    rating: 5,
    reviews: 65,
    description:
      "A timeless outer layer for cooler days. This comfortable coat pairs a considered silhouette with a soft, warm lining.",
  },
  {
    id: "bag",
    name: "Gucci duffle bag",
    price: 960,
    old: 1160,
    image: "bag.svg",
    category: "Woman’s Fashion",
    rating: 4.5,
    reviews: 65,
    description:
      "Carry your essentials in style. A spacious duffle with sturdy handles, a detachable shoulder strap, and thoughtfully placed pockets.",
  },
  {
    id: "cooler",
    name: "RGB liquid CPU Cooler",
    price: 160,
    old: 170,
    image: "cooler.svg",
    category: "Computers",
    rating: 4.5,
    reviews: 65,
    description:
      "Keep your setup cool under pressure. Efficient liquid cooling meets customizable lighting for a quietly powerful desktop.",
  },
  {
    id: "bookshelf",
    name: "Small BookShelf",
    price: 360,
    image: "bookshelf.svg",
    category: "Home & Lifestyle",
    rating: 5,
    reviews: 65,
    description:
      "A home for your favorite things. Clean lines and practical shelving make this compact bookshelf a natural fit in any room.",
  },
  {
    id: "dog-food",
    name: "Breed Dry Dog Food",
    price: 100,
    image: "dog-food.svg",
    category: "Groceries & Pets",
    rating: 3,
    reviews: 35,
    description:
      "A balanced everyday meal for your best friend, with a crunchy texture and carefully selected ingredients.",
  },
  {
    id: "camera",
    name: "CANON EOS DSLR Camera",
    price: 360,
    image: "camera.svg",
    category: "Cameras",
    rating: 4,
    reviews: 95,
    description:
      "Make memories worth keeping. Capture sharp photographs and beautiful video with intuitive controls and dependable autofocus.",
  },
  {
    id: "laptop",
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    image: "laptop.png",
    category: "Computers",
    rating: 5,
    reviews: 325,
    description:
      "Your next adventure starts here. Enjoy a vibrant Full HD screen and responsive performance in a portable gaming laptop.",
  },
  {
    id: "skincare",
    name: "Curology Product Set",
    price: 500,
    image: "skincare.svg",
    category: "Health & Beauty",
    rating: 4,
    reviews: 145,
    description:
      "A little care, every day. A simple collection of skincare essentials for your morning and evening routine.",
  },
  {
    id: "car",
    name: "Kids Electric Car",
    price: 960,
    image: "car.svg",
    category: "Baby’s & Toys",
    rating: 5,
    reviews: 65,
    isNew: true,
    description:
      "Big adventures for little drivers. An exciting ride-on car with easy controls and a comfortable seat. Adult supervision required.",
  },
  {
    id: "shoes",
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    image: "shoes.svg",
    category: "Sports & Outdoor",
    rating: 5,
    reviews: 35,
    description:
      "Find your stride on the field. Lightweight soccer cleats with a supportive fit and dependable traction.",
  },
  {
    id: "controller",
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    image: "controller.svg",
    category: "Gaming",
    rating: 4.5,
    reviews: 55,
    isNew: true,
    description:
      "PlayStation 5 Controller Skin. High-quality vinyl with air channel adhesive for an easy, bubble-free install. Pressure-sensitive controls and a comfortable grip.",
  },
  {
    id: "jacket",
    name: "Quilted Satin Jacket",
    price: 660,
    image: "jacket.png",
    category: "Men’s Fashion",
    rating: 4.5,
    reviews: 55,
    description:
      "An effortless finishing touch. A lightweight quilted jacket with a satin finish, ribbed cuffs, and everyday versatility.",
  },
  {
    id: "speaker",
    name: "JBL Boombox 2",
    price: 299,
    old: 349,
    image: "jbl.png",
    category: "Headphones",
    rating: 5,
    reviews: 120,
    description:
      "Bring your music to life with bold sound, powerful bass, and a portable design built for the good times.",
  },
  {
    id: "iphone",
    name: "iPhone 14",
    price: 799,
    old: 899,
    image: "iphone.png",
    category: "Phones",
    rating: 5,
    reviews: 210,
    description:
      "Beautifully designed and ready for every day. A brilliant display, exceptional cameras, and smooth performance in the palm of your hand.",
  },
];
export const sideCategories = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];
export const categoryMatches = (p, c) =>
  !c ||
  p.category === c ||
  (c === "Electronics" &&
    ["Phones", "Computers", "Cameras", "Gaming", "Headphones"].includes(
      p.category,
    )) ||
  (c === "Medicine" && p.category === "Health & Beauty");
