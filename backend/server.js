const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
try { require('dotenv').config(); } catch (e) {}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..')));

let nextProductId = 163;

const DATA_DIR = path.join(__dirname, '..', 'data');
const isVercel = !!process.env.VERCEL;
if (!isVercel) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadJSON(filename, fallback) {
  if (isVercel) return fallback;
  const filePath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return fallback;
}

function saveJSON(filename, data) {
  if (isVercel) return;
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
}

const adminUser = { username: 'adminmazharhussain', password: 'adminmaz154' };
const orders = loadJSON('orders.json', []);

const products = [
  {
    id: 1,
    name: 'Heritage Walnut Desk',
    price: 10000,
    currency: 'PKR',
    description: 'Hand-carved from century-old walnut wood, this executive desk features dovetail joinery and a hand-rubbed oil finish that deepens with age. Each piece is unique.',
    category: 'simple-tables',
    images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'],
    materials: ['Solid Walnut', 'Brass Hardware', 'Natural Oil Finish'],
    dimensions: '72"L x 36"W x 30"H',
    weight: '85 lbs',
    inStock: true,
    featured: true,
    threeDModel: true
  },
  {
    id: 2,
    name: 'Artisan Marble Vase',
    price: 25000,
    currency: 'PKR',
    description: 'Sculpted from single-block Carrara marble by Italian artisans. The organic silhouette captures light differently from every angle.',
    category: 'showcase',
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800', 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800'],
    materials: ['Carrara Marble', 'Hand-polished'],
    dimensions: '12"H x 6"W',
    weight: '12 lbs',
    inStock: true,
    featured: true,
    threeDModel: true
  },
  {
    id: 3,
    name: 'Cashmere Heritage Throw',
    price: 12500,
    currency: 'PKR',
    description: 'Two-ply Mongolian cashmere, woven on traditional hand-looms. Each throw requires the fleece of four goats and 80 hours of craftsmanship.',
    category: 'sofa',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'],
    materials: ['100% Mongolian Cashmere', 'Natural Dyes'],
    dimensions: '60" x 80"',
    weight: '1.5 lbs',
    inStock: true,
    featured: true,
    threeDModel: false
  },
  {
    id: 4,
    name: 'Premium Leather Stool',
    price: 16500,
    currency: 'PKR',
    description: 'Rich leather stool with barrel-stitched details and sturdy wooden legs, perfect as an accent piece.',
    category: 'stool',
    images: ['/assets/images/stool_table_5.png', '/assets/images/stool_table_6.png'],
    materials: ['Top-Grain Leather', 'Walnut Legs', 'Brass Details'],
    dimensions: '16"L x 16"W x 18"H',
    weight: '9 lbs',
    inStock: true,
    featured: true,
    threeDModel: true
  },
  {
    id: 5,
    name: 'Saffron Leather Armchair',
    price: 117500,
    currency: 'PKR',
    description: 'Full-grain Italian leather upholstery over a kiln-dried ash frame. Hand-tufted back with brass nailhead trim.',
    category: 'sofa',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'],
    materials: ['Italian Full-Grain Leather', 'Ash Wood Frame', 'High-Resilience Foam'],
    dimensions: '32"W x 34"D x 38"H',
    weight: '65 lbs',
    inStock: true,
    featured: false,
    threeDModel: true
  },
  {
    id: 6,
    name: 'Luxury Side Table',
    price: 54500,
    currency: 'PKR',
    description: 'Polished volcanic stone top on a bronzed stainless steel base. Each table reveals unique natural veining.',
    category: 'side-tables',
    images: ['/assets/images/side_table_33.png'],
    materials: ['Volcanic Stone', 'Stainless Steel', 'Bronze Finish'],
    dimensions: '48"L x 28"W x 16"H',
    weight: '120 lbs',
    inStock: true,
    featured: false,
    threeDModel: false
  },
  {
    id: 7, name: 'Luxury Upholstered Bed', price: 85000, currency: 'PKR', description: 'Premium upholstered bed frame with diamond-stitched headboard, crafted for ultimate comfort and elegance.', category: 'beds', images: ['/assets/images/Bedroom1.jpg'], materials: ['Velvet Upholstery', 'Solid Wood Frame', 'Memory Foam'], dimensions: '78"L x 62"W x 50"H', weight: '95 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 8, name: 'Modern Platform Bed', price: 72000, currency: 'PKR', description: 'Sleek platform bed with a low-profile design, perfect for contemporary bedrooms.', category: 'beds', images: ['/assets/images/Bedroom2.jpg'], materials: ['Engineered Wood', 'Walnut Veneer', 'Steel Frame'], dimensions: '80"L x 60"W x 12"H', weight: '75 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 9, name: 'Classic Wooden Bed Frame', price: 65000, currency: 'PKR', description: 'Solid Sheesham wood bed frame with traditional hand-carved detailing and a rich walnut finish.', category: 'beds', images: ['/assets/images/bedroom3.jpg'], materials: ['Sheesham Wood', 'Natural Finish', 'Brass Accents'], dimensions: '78"L x 60"W x 48"H', weight: '110 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 10, name: 'Elegant Storage Bed', price: 95000, currency: 'PKR', description: 'Hydraulic storage bed with spacious under-bed compartments, combining style with practicality.', category: 'beds', images: ['/assets/images/bedroom4.jpg'], materials: ['Plywood', 'Fabric Upholstery', 'Gas Lift Mechanism'], dimensions: '80"L x 62"W x 45"H', weight: '130 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 11, name: 'Minimalist Japanese Bed', price: 55000, currency: 'PKR', description: 'Low-profile Japanese-inspired platform bed with clean lines and natural wood grain.', category: 'beds', images: ['/assets/images/bedroom5.jpg'], materials: ['Oak Wood', 'Natural Oil Finish', 'Slatted Base'], dimensions: '80"L x 60"W x 10"H', weight: '55 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 12, name: 'Royal Canopy Bed', price: 145000, currency: 'PKR', description: 'Majestic canopy bed with intricate wrought-iron work and a regal silhouette.', category: 'beds', images: ['/assets/images/bedroom6.jpg'], materials: ['Wrought Iron', 'Brass Details', 'Wooden Slats'], dimensions: '84"L x 66"W x 80"H', weight: '155 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 13, name: 'Tufted Headboard Bed', price: 78000, currency: 'PKR', description: 'Button-tufted headboard bed with premium fabric finish and sturdy wooden frame.', category: 'beds', images: ['/assets/images/bedroom7.jpg'], materials: ['Linen Fabric', 'High-Density Foam', 'Solid Wood'], dimensions: '78"L x 62"W x 52"H', weight: '88 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 14, name: 'White Lacquer Bed', price: 68000, currency: 'PKR', description: 'High-gloss white lacquer bed with sleek modern design and durable finish.', category: 'beds', images: ['/assets/images/bedroom8.jpg'], materials: ['MDF', 'Lacquer Finish', 'Chrome Legs'], dimensions: '80"L x 60"W x 42"H', weight: '70 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 15, name: 'Rustic Log Bed', price: 82000, currency: 'PKR', description: 'Handcrafted rustic log bed made from reclaimed pine, bringing natural warmth to your bedroom.', category: 'beds', images: ['/assets/images/bedroom9.jpg'], materials: ['Reclaimed Pine', 'Natural Varnish', 'Steel Hardware'], dimensions: '78"L x 62"W x 46"H', weight: '120 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 16, name: 'Art Deco Velvet Bed', price: 92000, currency: 'PKR', description: 'Art Deco-inspired bed with emerald velvet upholstery and gold-tipped legs.', category: 'beds', images: ['/assets/images/bedroom10.jpg'], materials: ['Velvet', 'Gold Brass', 'Solid Wood Frame'], dimensions: '80"L x 64"W x 48"H', weight: '98 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 17, name: 'Contemporary Panel Bed', price: 73500, currency: 'PKR', description: 'Clean-lined panel bed with a warm grey finish, ideal for modern bedrooms.', category: 'beds', images: ['/assets/images/bedroom11.jpg'], materials: ['Wood Veneer', 'Grey Laminate', 'Steel Brackets'], dimensions: '80"L x 60"W x 44"H', weight: '82 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 18, name: 'Leather King Bed', price: 125000, currency: 'PKR', description: 'Premium leather-upholstered king-size bed with padded headboard and chrome accents.', category: 'beds', images: ['/assets/images/bedroom12.jpg'], materials: ['Italian Leather', 'Chrome Frame', 'Memory Foam'], dimensions: '84"L x 72"W x 50"H', weight: '145 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 19, name: 'Four-Poster Mahogany Bed', price: 138000, currency: 'PKR', description: 'Grand four-poster bed crafted from solid mahogany with ornate turned posts.', category: 'beds', images: ['/assets/images/bedroom13.jpg'], materials: ['Solid Mahogany', 'Shellac Finish', 'Brass Hardware'], dimensions: '84"L x 66"W x 84"H', weight: '175 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 20, name: 'Floating Platform Bed', price: 62000, currency: 'PKR', description: 'Modern floating platform bed with LED underglow and a cantilevered design.', category: 'beds', images: ['/assets/images/bedroom14.jpg'], materials: ['MDF', 'Walnut Veneer', 'LED Strip'], dimensions: '80"L x 60"W x 14"H', weight: '65 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 21, name: 'Scroll Iron Bed', price: 58000, currency: 'PKR', description: 'Elegant iron bed with decorative scrollwork and a classic white finish.', category: 'beds', images: ['/assets/images/bedroom15.jpg'], materials: ['Wrought Iron', 'Powder Coat Finish', 'Wood Slats'], dimensions: '78"L x 60"W x 44"H', weight: '60 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 22, name: 'Navy Tufted Bed', price: 88000, currency: 'PKR', description: 'Deep navy blue tufted bed with crystal button details and sleek tapered legs.', category: 'beds', images: ['/assets/images/bedroom16.jpg'], materials: ['Polyester Fabric', 'Crystal Buttons', 'Rubberwood'], dimensions: '80"L x 64"W x 48"H', weight: '92 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 23, name: 'Bamboo Eco Bed', price: 49000, currency: 'PKR', description: 'Eco-friendly bamboo bed with a minimalist design and sustainable construction.', category: 'beds', images: ['/assets/images/bedroom17.jpg'], materials: ['Bamboo', 'Natural Sealant', 'Aluminum Frame'], dimensions: '78"L x 60"W x 16"H', weight: '48 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 24, name: 'Victorian Style Bed', price: 115000, currency: 'PKR', description: 'Ornate Victorian-style bed with carved floral motifs and antique brass finials.', category: 'beds', images: ['/assets/images/bedroomm18.jpg'], materials: ['Solid Oak', 'Antique Brass', 'Hand-Carved Details'], dimensions: '84"L x 66"W x 72"H', weight: '165 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 25, name: 'Grey Upholstered Storage Bed', price: 99000, currency: 'PKR', description: 'Grey fabric storage bed with four large drawers and a padded headboard.', category: 'beds', images: ['/assets/images/bedroomm19.jpg'], materials: ['Polyester Fabric', 'Plywood', 'Metal Drawer Runners'], dimensions: '80"L x 62"W x 46"H', weight: '140 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 26, name: 'Golden Teak Bed', price: 108000, currency: 'PKR', description: 'Sumptuous teak wood bed with a golden honey finish and slatted headboard.', category: 'beds', images: ['/assets/images/bedroomm20.jpg'], materials: ['Teak Wood', 'Polyurethane Finish', 'Steel Frame'], dimensions: '80"L x 62"W x 42"H', weight: '105 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 27, name: 'Sleigh Bed with Storage', price: 112000, currency: 'PKR', description: 'Classic sleigh bed with hidden storage drawers and a rich cherry wood finish.', category: 'beds', images: ['/assets/images/bedroomm21.jpg'], materials: ['Cherry Wood', 'Leather Accents', 'Ball-Bearing Drawers'], dimensions: '82"L x 64"W x 50"H', weight: '155 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 28, name: 'Minimalist White Bed', price: 52000, currency: 'PKR', description: 'Clean white minimalist bed with a slim profile, perfect for small spaces.', category: 'beds', images: ['/assets/images/bedroomm22.jpg'], materials: ['Engineered Wood', 'White Laminate', 'Metal Legs'], dimensions: '76"L x 56"W x 38"H', weight: '55 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 29, name: 'Walnut Slat Bed', price: 77000, currency: 'PKR', description: 'Contemporary slatted bed with a natural walnut finish and an integrated headboard.', category: 'beds', images: ['/assets/images/bedroomm23.jpg'], materials: ['Walnut Wood', 'Natural Oil Finish', 'Rubberwood Slats'], dimensions: '80"L x 60"W x 40"H', weight: '85 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 30, name: 'Rose Gold Accent Bed', price: 102000, currency: 'PKR', description: 'Luxurious bed with rose gold metal frame and plush velvet upholstery.', category: 'beds', images: ['/assets/images/bedroomm24.jpg'], materials: ['Velvet', 'Rose Gold Metal', 'High-Resilience Foam'], dimensions: '80"L x 62"W x 48"H', weight: '108 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 31, name: 'Cottage Style Bed', price: 63500, currency: 'PKR', description: 'Charming cottage-style bed with paneled headboard and footboard in antique white.', category: 'beds', images: ['/assets/images/bedroomm25.jpg'], materials: ['Pine Wood', 'Chalk Paint Finish', 'Brass Handles'], dimensions: '78"L x 60"W x 44"H', weight: '72 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 32, name: 'Black Metal Platform Bed', price: 47500, currency: 'PKR', description: 'Sturdy black metal platform bed with a minimalist industrial aesthetic.', category: 'beds', images: ['/assets/images/bedroomm26.jpg'], materials: ['Steel', 'Powder Coat', 'Wood Slats'], dimensions: '78"L x 60"W x 16"H', weight: '52 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 33, name: 'Luxury Adjustable Bed', price: 195000, currency: 'PKR', description: 'Premium adjustable bed with massage function, USB ports, and memory foam mattress.', category: 'beds', images: ['/assets/images/bedroomm27.jpg'], materials: ['Memory Foam', 'Steel Frame', 'Electronic Motor'], dimensions: '80"L x 60"W x 18"H', weight: '185 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 34, name: 'Wicker Bohemian Bed', price: 59000, currency: 'PKR', description: 'Bohemian-style bed with natural wicker headboard and a light airy frame.', category: 'beds', images: ['/assets/images/bedroomm28.jpeg'], materials: ['Natural Wicker', 'Mango Wood', 'Cotton Rope'], dimensions: '78"L x 60"W x 48"H', weight: '58 lbs', inStock: true, featured: false, threeDModel: false
  },
  {
    id: 35, name: 'Modern LED Bed', price: 87000, currency: 'PKR', description: 'Contemporary bed with integrated RGB LED lighting and a floating effect.', category: 'beds', images: ['/assets/images/bedroomm29.jpg'], materials: ['MDF', 'Acrylic', 'RGB LED Strips'], dimensions: '80"L x 62"W x 16"H', weight: '78 lbs', inStock: true, featured: true, threeDModel: false
  },
  {
    id: 36, name: 'Grand King Size Bed', price: 158000, currency: 'PKR', description: 'Spacious king-size bed with oversized padded headboard and premium build.', category: 'beds', images: ['/assets/images/bedroomm30.jpg'], materials: ['Premium Fabric', 'Solid Wood Frame', 'Chrome Accents'], dimensions: '86"L x 76"W x 52"H', weight: '165 lbs', inStock: true, featured: true, threeDModel: false
  }
];

function getSofaImageName(index) {
  if (index === 20) return 'sofa-20.png';
  return `sofa_${index}.png`;
}

const sofaNames = [
  'Grand Palladian Sofa', 'Verona Velvet Sofa', 'Chelsea Chesterfield', 'Monte Carlo Sectional',
  'Amalfi Linen Sofa', 'Siena Leather Sofa', 'Tuscany Arm Sofa', 'Capri Modern Sofa',
  'Florence Tufted Sofa', 'Venice Loveseat', 'Milan Sleeper Sofa', 'Como Fabric Sofa',
  'Pisa Curved Sofa', 'Roma Leather Couch', 'Turin Velvet Loveseat', 'Naples Outdoor Sofa',
  'Bologna Sectional', 'Genoa Armless Sofa', 'Lucca Mid-Century Sofa', 'Perugia Recliner Sofa',
  'Ravenna Modular Sofa', 'Trieste Tufted Couch', 'Padova Fabric Sofa', 'Vicenza Leather Sofa',
  'Arezzo Loveseat', 'Brescia Sleeper Sofa', 'Modena Velvet Couch', 'Parma Arm Sofa',
  'Ferrara Sectional', 'Livorno Outdoor Couch', 'Ancona Fabric Loveseat', 'Cremona Leather Couch',
  'Mantua Velvet Sectional', 'Lecce Modern Loveseat', 'Udine Curved Couch',
  'Sorrento Fabric Sofa', 'Bari Velvet Loveseat'
];

const sofaPrices = [
  125000, 98500, 145000, 189000, 89000, 178000, 112000, 156000,
  135000, 72000, 115000, 92000, 168000, 195000, 85000, 105000,
  175000, 78000, 95000, 138000, 165000, 128000, 88000, 182000,
  68000, 108000, 132000, 98000, 158000, 95000, 75000, 142000,
  172000, 82000, 118000,
  108000, 96000
];

const sofaMaterials = [
  ['Velvet', 'Solid Wood Frame', 'Brass Legs'],
  ['Italian Velvet', 'Kiln-Dried Wood', 'Chrome Accents'],
  ['Leather', 'Hardwood Frame', 'Brass Nailheads'],
  ['Linen Blend', 'Plywood Frame', 'Plastic Glides'],
  ['Polyester Fabric', 'Engineered Wood', 'Gold Legs'],
  ['Full-Grain Leather', 'Ash Wood', 'Steel Springs'],
  ['Cotton-Linen', 'Solid Oak', 'Wood Legs'],
  ['Microfiber', 'Stainless Steel', 'Plastic Feet'],
  ['Chenille Fabric', 'Kiln-Dried Wood', 'Silver Nailheads'],
  ['Velvet', 'Solid Wood', 'Chrome Legs'],
  ['Polyester Blend', 'Metal Frame', 'Memory Foam Mattress'],
  ['Linen Fabric', 'Rubberwood', 'Tapered Legs'],
  ['Velvet', 'Plywood Frame', 'Castors'],
  ['Leather', 'Steel Frame', 'Adjustable Headrest'],
  ['Velvet', 'Solid Wood Legs', 'High-Resilience Foam'],
  ['Solution-Dyed Acrylic', 'Aluminum Frame', 'Quick-Dry Foam'],
  ['Polyester', 'Fabric', 'Solid Wood'],
  ['Linen Blend', 'Plywood Frame', 'Plastic Glides'],
  ['Velvet', 'Rubberwood', 'Tapered Metal Legs'],
  ['Leather', 'Power Recliner Mechanism', 'Steel Frame'],
  ['Polyester Fabric', 'Modular Connectors', 'Solid Wood'],
  ['Chenille', 'Kiln-Dried Wood', 'Brass Accents'],
  ['Polyester Fabric', 'Engineered Wood', 'Wood Legs'],
  ['Leather', 'Solid Wood Frame', 'Chrome Feet'],
  ['Velvet', 'Rubberwood', 'Thin Metal Legs'],
  ['Chenille Fabric', 'Plywood Frame', 'Pull-Out Mechanism'],
  ['Velvet', 'Solid Wood', 'Square Block Feet'],
  ['Linen', 'Hardwood Frame', 'Recliner Mechanism'],
  ['Polyester Fabric', 'Solid Wood', 'Connecting Brackets'],
  ['Acrylic Fabric', 'Aluminum', 'Quick-Dry Foam'],
  ['Linen Fabric', 'Plywood Frame', 'Slim Metal Legs'],
  ['Leather', 'Steel Frame', 'Tapered Legs'],
  ['Velvet', 'Engineered Wood', 'Stainless Steel Base'],
  ['Microfiber', 'Rubberwood', 'Gold Metal Legs'],
  ['Velvet', 'Plywood', 'Chrome Castors'],
  ['Polyester Fabric', 'Solid Wood', 'Brass Legs'],
  ['Velvet', 'Rubberwood', 'Chrome Accents']
];

const sofaDescriptions = [
  'A grand statement piece upholstered in rich velvet with scrolled arms and deep button tufting.',
  'Sumptuous Italian velvet with a sleek silhouette and plush cushioning for modern elegance.',
  'Classic leather chesterfield with deep button tufting, rolled arms, and antique brass nails.',
  'Spacious modular sectional covered in premium fabric, perfect for family gatherings.',
  'Relaxed linen sofa with wide track arms and down-blend cushions for casual comfort.',
  'Hand-stitched Italian leather on a kiln-dried ash frame with steel suspension.',
  'Generously scaled sofa with oversized rolled arms and a loose pillow back.',
  'Clean-lined modern sofa with a low profile and track arms for a contemporary look.',
  'Elegant tufted back sofa with sumptuous chenille upholstery and antique brass trim.',
  'Compact loveseat with a gracefully curved back and plush velvet upholstery.',
  'Multi-functional sleeper sofa with a premium memory foam mattress and hidden storage.',
  'Tailored fabric sofa with birch wood legs and a timeless silhouette.',
  'Elegantly curved sofa in soft velvet, designed to anchor spacious living rooms.',
  'Sink-in leather sofa with deep seats, pillow arms, and a relaxed attitude.',
  'Vintage-inspired loveseat with velvet upholstery and elegant exposed wood legs.',
  'Weather-resistant outdoor sofa with quick-dry foam and fade-proof acrylic fabric.',
  'Large L-shaped sectional with reversible chaise, customizable to your space.',
  'Sleek armless sofa in breathable linen, ideal for small apartments and lofts.',
  'Mid-century inspired sofa with tapered metal legs and retro velvet upholstery.',
  'Power recliner sofa with USB ports, cup holders, and padded headrests.',
  'Versatile modular sofa system with connecting brackets, seatbacks, and ottomans.',
  'Diamond-tufted chenille sofa with graceful rolled arms and brass nailhead trim.',
  'Clean-lined fabric sofa with square arms and a tight back for a crisp look.',
  'Rich leather sofa with wide track arms and chrome feet for an executive feel.',
  'Petite loveseat with velvet upholstery and slim metal legs, perfect for nooks.',
  'Pull-out sleeper loveseat with a gel-infused memory foam mattress.',
  'Deep-seated velvet couch with square block feet and plush feather-blend cushions.',
  'Comfortable arm sofa with built-in recliner and padded chaise extension.',
  'Spacious sectional with a wedge corner and plush polyester upholstery.',
  'Rustic outdoor couch with all-weather cushions and a powder-coated frame.',
  'Back-to-basics loveseat in breathable linen with a slim metal frame.',
  'Streamlined leather couch with a low profile and sculptural tapered legs.',
  'Angular velvet sectional in a bold hue with a polished stainless steel base.',
  'Curved loveseat in soft micro-fabric with gold metal legs for a hint of glam.',
  'Sweeping curved sofa in plush velvet with chrome castors for easy mobility.',
  'Tailored fabric sofa with brestfed linen, button tufting, and turned wood legs.',
  'Compact velvet loveseat with curved backrest and sleek chrome legs.'
];

const sofaDims = [
  '90"L x 38"D x 36"H', '84"L x 36"D x 34"H', '88"L x 40"D x 38"H', '110"L x 60"D x 34"H',
  '80"L x 36"D x 34"H', '86"L x 38"D x 36"H', '78"L x 36"D x 38"H', '72"L x 34"D x 32"H',
  '84"L x 38"D x 36"H', '60"L x 32"D x 34"H', '80"L x 36"D x 34"H', '76"L x 34"D x 34"H',
  '92"L x 40"D x 36"H', '86"L x 42"D x 34"H', '64"L x 32"D x 34"H', '80"L x 36"D x 32"H',
  '100"L x 60"D x 34"H', '70"L x 34"D x 33"H', '76"L x 34"D x 34"H', '82"L x 40"D x 40"H',
  '96"L x 54"D x 34"H', '88"L x 38"D x 36"H', '74"L x 34"D x 34"H', '84"L x 38"D x 34"H',
  '54"L x 30"D x 32"H', '66"L x 34"D x 34"H', '82"L x 38"D x 36"H', '78"L x 38"D x 38"H',
  '96"L x 52"D x 34"H', '78"L x 36"D x 32"H', '56"L x 30"D x 32"H', '72"L x 34"D x 32"H',
  '94"L x 56"D x 34"H', '62"L x 32"D x 34"H', '90"L x 40"D x 36"H',
  '86"L x 36"D x 34"H', '62"L x 32"D x 34"H'
];

const sofaWeights = [
  '95 lbs', '78 lbs', '110 lbs', '145 lbs', '72 lbs', '105 lbs', '88 lbs', '65 lbs',
  '92 lbs', '55 lbs', '120 lbs', '68 lbs', '98 lbs', '115 lbs', '62 lbs', '52 lbs',
  '135 lbs', '58 lbs', '70 lbs', '128 lbs', '140 lbs', '100 lbs', '65 lbs', '108 lbs',
  '48 lbs', '85 lbs', '95 lbs', '90 lbs', '130 lbs', '55 lbs', '45 lbs', '75 lbs',
  '125 lbs', '60 lbs', '102 lbs',
  '82 lbs', '58 lbs'
];

for (let i = 0; i < 37; i++) {
  products.push({
    id: nextProductId++,
    name: sofaNames[i],
    price: sofaPrices[i],
    currency: 'PKR',
    description: sofaDescriptions[i],
    category: 'sofa',
    images: ['/assets/images/' + getSofaImageName(i + 1)],
    materials: sofaMaterials[i],
    dimensions: sofaDims[i],
    weight: sofaWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 6,
    threeDModel: false
  });
}

const diningNames = [
  'Grand Oak Dining Table', 'Marble Palazzo Table', 'Rustic Farmhouse Table', 'Modern Glass Dining Table',
  'Walnut Trestle Table', 'Round Pedestal Table', 'Extendable Dining Table', 'Counter-Height Dining Table',
  'French Provincial Table', 'Industrial Steel Table', 'Scandinavian Dining Table', 'Expandable Butterfly Table',
  'Live Edge Slab Table', 'Contemporary Marble Table', 'Traditional Mahogany Table', 'Outdoor Dining Table',
  'Small Space Drop-Leaf Table', 'Lazy Susan Round Table', 'Rectangular Dining Table', 'Bistro Dining Table',
  'Concrete Top Dining Table', 'Oval Dining Table', 'Japanese Low Dining Table', 'Brass Inlay Dining Table',
  'Glass Top Chromium Table', 'Acacia Wood Dining Table', 'Folding Dining Table', 'Bamboo Dining Table',
  'Heritage Carved Dining Table'
];

const diningPrices = [
  145000, 189000, 112000, 135000, 98000, 125000, 168000, 85000,
  178000, 95000, 108000, 142000, 195000, 175000, 158000, 72000,
  55000, 115000, 128000, 45000, 88000, 138000, 82000, 165000,
  105000, 92000, 48000, 58000, 155000
];

const diningMaterials = [
  ['Solid Oak', 'Natural Varnish'],
  ['Italian Marble', 'Stainless Steel Base'],
  ['Reclaimed Pine', 'Wrought Iron Legs'],
  ['Tempered Glass', 'Chrome Frame'],
  ['Black Walnut', 'Steel Hardware'],
  ['Solid Mahogany', 'Brass Hardware'],
  ['Engineered Wood', 'Leaves Mechanism'],
  ['Rubberwood', 'Powder-Coated Base'],
  ['Cherry Wood', 'Gold Accents'],
  ['Steel', 'Reclaimed Wood Top'],
  ['Birch Wood', 'White Laminate'],
  ['MDF', 'Veneer Finish', 'Butterfly Leaf'],
  ['Reclaimed Elm', 'Epoxy Resin'],
  ['Carrara Marble', 'Brass Base'],
  ['Solid Mahogany', 'Hand-Carved Details'],
  ['Teak Wood', 'Aluminum Frame'],
  ['Rubberwood', 'Drop-Leaf Hinges'],
  ['Mango Wood', 'Lazy Susan Turntable'],
  ['Acacia Wood', 'Cross-Base Design'],
  ['Birch Wood', 'Compact Size'],
  ['Concrete', 'Steel Legs'],
  ['Walnut Veneer', 'Oval Shape'],
  ['Bamboo', 'Low Profile Legs'],
  ['Sheesham Wood', 'Brass Inlay'],
  ['Tempered Glass', 'Chromium Legs'],
  ['Solid Acacia', 'Natural Grain', 'Steel Brackets'],
  ['Pine Wood', 'Hinged Fold', 'Metal Lock'],
  ['Bamboo', 'Lacquer Finish'],
  ['Sheesham Wood', 'Hand-Carved Base', 'Antique Finish']
];

const diningDescriptions = [
  'Sturdy oak dining table with a hand-rubbed natural finish, seating eight comfortably.',
  'Luxurious white marble table on a sleek stainless steel base with seating for six.',
  'Rustic farmhouse table crafted from reclaimed pine with sturdy wrought iron legs.',
  'Modern glass dining table with a transparent top and polished chrome frame.',
  'Classic walnut trestle table with a hand-carved base and warm natural grain.',
  'Elegant round pedestal table in solid mahogany, perfect for intimate dinners.',
  'Versatile extendable table with hidden leaves, expanding to seat ten guests.',
  'Counter-height dining table ideal for casual meals with bar stools.',
  'French provincial style table with carved cherry wood details and gold accents.',
  'Industrial chic table combining a live-edge wood top with a steel frame.',
  'Minimalist Scandinavian table with clean lines and a light birch wood finish.',
  'Space-saving butterfly leaf table that expands smoothly for extra guests.',
  'Live edge slab table with epoxy resin fill, showcasing natural wood beauty.',
  'Contemporary marble dining table with a sculptural brass base.',
  'Ornate mahogany table with hand-carved floral details, seating eight.',
  'Weather-resistant teak outdoor dining table with an aluminum frame.',
  'Compact drop-leaf table that folds down to save space in small apartments.',
  'Round table with a built-in lazy susan, ideal for family-style dining.',
  'Rectangular acacia table with a cross-shaped base and smooth finish.',
  'Small bistro table perfect for kitchen nooks and breakfast corners.',
  'Urban concrete table with a matte finish and black steel legs.',
  'Elegant oval table with walnut veneer and a rich espresso finish.',
  'Traditional Japanese low dining table for floor seating arrangements.',
  'Sheesham wood table with intricate brass inlay work and carved edges.',
  'Sleek glass table on slim chromium legs with a contemporary silhouette.',
  'Solid acacia dining table with live edges and a natural oil finish.',
  'Lightweight folding table that stores easily when not in use.',
  'Eco-friendly bamboo dining table with a sleek modern silhouette.',
  'Heritage carved dining table with antique finish, seating eight in grandeur.'
];

const diningDims = [
  '72"L x 40"W x 30"H', '60"L x 40"W x 30"H', '84"L x 42"W x 30"H', '72"L x 36"W x 30"H',
  '78"L x 38"W x 30"H', '48"Dia x 30"H', '66"L x 40"W x 30"H', '42"L x 24"W x 36"H',
  '72"L x 44"W x 30"H', '80"L x 40"W x 30"H', '60"L x 36"W x 30"H', '72"L x 40"W x 30"H',
  '96"L x 42"W x 30"H', '72"L x 40"W x 30"H', '84"L x 44"W x 30"H', '72"L x 38"W x 30"H',
  '42"L x 30"W x 30"H', '48"Dia x 30"H', '72"L x 36"W x 30"H', '30"L x 24"W x 30"H',
  '72"L x 36"W x 30"H', '60"L x 42"W x 30"H', '48"L x 30"W x 14"H', '72"L x 40"W x 30"H',
  '60"L x 36"W x 30"H', '78"L x 40"W x 30"H', '36"L x 30"W x 29"H', '60"L x 36"W x 30"H',
  '84"L x 44"W x 30"H'
];

const diningWeights = [
  '95 lbs', '120 lbs', '85 lbs', '55 lbs', '78 lbs', '70 lbs', '105 lbs', '52 lbs',
  '90 lbs', '68 lbs', '48 lbs', '62 lbs', '115 lbs', '108 lbs', '110 lbs', '45 lbs',
  '35 lbs', '65 lbs', '72 lbs', '25 lbs', '82 lbs', '75 lbs', '40 lbs', '98 lbs',
  '50 lbs', '88 lbs', '30 lbs', '38 lbs', '105 lbs'
];

function getDiningImageName(p) {
  return 'dinning_table_' + (p <= 26 ? p : p + 1) + '.png';
}

for (let i = 0; i < 29; i++) {
  products.push({
    id: nextProductId++,
    name: diningNames[i],
    price: diningPrices[i],
    currency: 'PKR',
    description: diningDescriptions[i],
    category: 'dining-tables',
    images: ['/assets/images/' + getDiningImageName(i + 1)],
    materials: diningMaterials[i],
    dimensions: diningDims[i],
    weight: diningWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const stoolNames = [
  'Classic Wooden Stool', 'Velvet Bar Stool', 'Rustic Oak Stool', 'Modern Counter Stool',
  'Leather Sitting Stool', 'Industrial Metal Stool', 'Upholstered Kitchen Stool', 'Folding Wooden Stool',
  'Round Ottoman Stool', 'Scandinavian Bar Stool', 'Bamboo Foot Stool', 'Tufted Vanity Stool',
  'Minimalist Wood Stool', 'Metal Bar Stool Set', 'Antique Carved Stool', 'Swivel Piano Stool',
  'Natural Rattan Stool', 'Cushioned Breakfast Stool', 'Heritage Wooden Stool', 'Gliding Vanity Stool',
  'Hexagonal Stool', 'Farmhouse Step Stool', 'Velvet Compact Stool', 'Tripod Leather Stool',
  'Cross-Back Bar Stool', 'Saddle Leather Stool', 'Bamboo Step Stool', 'Acrylic Ghost Stool',
  'Brass Foot Rest Stool', 'Handcrafted Oak Stool'
];

const stoolPrices = [
  12000, 18500, 9500, 22000, 15000, 8000, 16500, 5500,
  7500, 19500, 4500, 13500, 6500, 28000, 25000, 21000,
  7000, 14500, 11000, 17500, 8500, 5000, 12500, 16000,
  14000, 19000, 4000, 22000, 6000, 15500
];

const stoolMaterials = [
  ['Sheesham Wood', 'Natural Finish'],
  ['Velvet', 'Gold Metal Frame'],
  ['Solid Oak', 'Hand-Rubbed Oil'],
  ['Birch Wood', 'Chrome Ring'],
  ['Top-Grain Leather', 'Walnut Legs'],
  ['Steel', 'Powder Coat Finish'],
  ['Polyester Fabric', 'Rubberwood', 'Memory Foam'],
  ['Pine Wood', 'Steel Hinges'],
  ['Cotton Linen', 'Plywood Base'],
  ['Birch Wood', 'White Lacquer'],
  ['Bamboo', 'Natural Varnish'],
  ['Velvet', 'Brass Nailheads'],
  ['Acacia Wood', 'Clear Coat'],
  ['Steel', 'Chrome Finish', 'Pair'],
  ['Mango Wood', 'Hand-Carved', 'Antique Finish'],
  ['Beech Wood', 'Padded Seat', 'Height Adjustable'],
  ['Rattan', 'Natural Weave'],
  ['Polyester Fabric', 'Metal Frame', 'Foam Cushion'],
  ['Rubberwood', 'Dark Walnut Stain'],
  ['Velvet', 'Chrome Swivel Base'],
  ['Mango Wood', 'Hexagonal Design'],
  ['Pine Wood', 'Non-Slip Steps'],
  ['Velvet', 'Square Block Legs'],
  ['Leather', 'Metal Tripod Base'],
  ['Rubberwood', 'Cross-Back Design', 'Chrome Footrest'],
  ['Leather', 'Polished Wood', 'Saddle Shape'],
  ['Bamboo', 'Twill Rope'],
  ['Acrylic', 'Clear Finish'],
  ['Solid Brass', 'Leather Top'],
  ['White Oak', 'Danish Oil Finish']
];

const stoolDescriptions = [
  'Classic wooden stool with a smooth finish, perfect for extra seating anywhere.',
  'Luxurious velvet bar stool with a gold metal frame and plush cushioning.',
  'Rustic oak stool with a hand-rubbed oil finish and traditional joinery.',
  'Clean-lined modern counter stool with a comfy footrest ring.',
  'Rich leather stool with barrel-stitched details and sturdy walnut legs.',
  'Industrial metal stool with a matte powder coat finish, stackable design.',
  'Padded kitchen stool with upholstered seat and durable wooden legs.',
  'Compact folding stool that tucks away easily when not in use.',
  'Round ottoman stool with a soft linen top and fluted wooden base.',
  'Scandinavian bar stool with a sleek white lacquer finish and tapered legs.',
  'Natural bamboo foot stool, lightweight and eco-friendly.',
  'Elegant vanity stool with deep button tufting and brass nailhead trim.',
  'Minimalist acacia stool with a simple silhouette and smooth finish.',
  'Set of two modern steel bar stools with a brilliant chrome finish.',
  'Antique carved mango wood stool with a distressed antique finish.',
  'Height-adjustable swivel piano stool with a padded leatherette seat.',
  'Handwoven rattan stool with a natural earthy texture and warm tone.',
  'Cushioned breakfast bar stool with a supportive foam seat.',
  'Heritage rubberwood stool with a dark walnut stain and cross braces.',
  'Velvet vanity stool with a 360-degree swivel chrome base.',
  'Unique hexagonal mango wood stool with geometric appeal.',
  'Practical farmhouse step stool with two wide anti-slip steps.',
  'Compact velvet stool with square block legs for bedroom seating.',
  'Tripod stool in rich leather with a modern sculptural silhouette.',
  'Cross-back bar stool with a curved wooden backrest and footrest.',
  'Saddle-shaped leather stool on polished wood legs.',
  'Lightweight bamboo step stool with twill rope ties.',
  'Clear acrylic ghost stool with an invisible floating effect.',
  'Solid brass foot rest stool with a cushioned leather top.',
  'Handcrafted white oak stool with a Danish oil finish and wedged tenons.'
];

const stoolDims = [
  '14"L x 14"W x 18"H', '16"L x 16"W x 30"H', '14"L x 14"W x 18"H', '16"L x 16"W x 26"H',
  '16"L x 16"W x 18"H', '15"L x 15"W x 30"H', '16"L x 16"W x 24"H', '12"L x 12"W x 17"H',
  '18"Dia x 18"H', '16"L x 16"W x 30"H', '14"L x 10"W x 10"H', '14"L x 14"W x 20"H',
  '13"L x 13"W x 18"H', '16"L x 16"W x 30"H', '15"L x 15"W x 18"H', '18"L x 14"W x 20"H',
  '14"L x 14"W x 18"H', '17"L x 17"W x 25"H', '14"L x 14"W x 18"H', '15"L x 15"W x 20"H',
  '14"L x 14"W x 18"H', '20"L x 12"W x 12"H', '14"L x 14"W x 18"H', '14"L x 14"W x 18"H',
  '18"L x 16"W x 30"H', '16"L x 16"W x 18"H', '18"L x 12"W x 10"H', '15"Dia x 18"H',
  '10"Dia x 8"H', '14"L x 14"W x 18"H'
];

const stoolWeights = [
  '8 lbs', '12 lbs', '7 lbs', '10 lbs', '9 lbs', '6 lbs', '11 lbs', '4 lbs',
  '5 lbs', '8 lbs', '3 lbs', '10 lbs', '5 lbs', '14 lbs', '12 lbs', '11 lbs',
  '4 lbs', '9 lbs', '7 lbs', '10 lbs', '6 lbs', '4 lbs', '8 lbs', '7 lbs',
  '10 lbs', '9 lbs', '3 lbs', '6 lbs', '4 lbs', '8 lbs'
];

for (let i = 0; i < 30; i++) {
  products.push({
    id: nextProductId++,
    name: stoolNames[i],
    price: stoolPrices[i],
    currency: 'PKR',
    description: stoolDescriptions[i],
    category: 'stool',
    images: ['/assets/images/stool_table_' + (i + 1) + '.png'],
    materials: stoolMaterials[i],
    dimensions: stoolDims[i],
    weight: stoolWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const chairNames = [
  'Upholstered Dining Chair', 'Cross-Back Dining Chair', 'Velvet Parsons Chair', 'Scandinavian Dining Chair',
  'Leather Arm Dining Chair', 'Rattan Dining Chair', 'Mid-Century Dining Chair', 'Slat-Back Dining Chair',
  'Tufted Dining Chair', 'Farmhouse Dining Chair', 'Modern Acrylic Chair', 'Wingback Dining Chair',
  'Bamboo Dining Chair', 'Metal Dining Chair', 'Curved Dining Chair', 'Ladder-Back Dining Chair',
  'Button-Tufted Chair', 'Boho Dining Chair', 'Minimalist Dining Chair', 'Captain Dining Chair',
  'Ghost Dining Chair', 'Brass Accent Chair', 'Cane Dining Chair', 'Slipper Dining Chair',
  'Industrial Dining Chair', 'Tulip Dining Chair', 'Navy Velvet Chair', 'Bentwood Dining Chair',
  'Henredon Style Chair', 'Linen Slipper Chair'
];

const chairPrices = [
  22000, 15000, 28000, 18000, 35000, 12000, 19500, 14000,
  32000, 16000, 25000, 38000, 10000, 13000, 21000, 11500,
  30000, 17000, 14500, 24000, 19500, 27000, 15500, 20000,
  12500, 23000, 34000, 11000, 28000, 18500
];

const chairMaterials = [
  ['Polyester Fabric', 'Rubberwood', 'Foam Padding'],
  ['Solid Beech', 'Walnut Finish'],
  ['Velvet', 'Gold Metal Legs'],
  ['Birch Wood', 'White Lacquer'],
  ['Top-Grain Leather', 'Ash Wood Frame'],
  ['Natural Rattan', 'Mango Wood Frame'],
  ['Walnut Veneer', 'Velvet Seat'],
  ['Solid Oak', 'Natural Finish'],
  ['Chenille Fabric', 'Kiln-Dried Wood'],
  ['Pine Wood', 'Chalk Paint Finish'],
  ['Clear Acrylic', 'Chrome Frame'],
  ['Polyester Blend', 'Hardwood Frame', 'Button Tufting'],
  ['Bamboo', 'Natural Varnish'],
  ['Steel', 'Mesh Back', 'Powder Coat'],
  ['Molded Plywood', 'Walnut Veneer', 'Plastic Glides'],
  ['Rubberwood', 'Ladder-Back Design'],
  ['Velvet', 'Button Tufting', 'Brass Legs'],
  ['Rattan', 'Boho Weave', 'Cotton Cushion'],
  ['Polypropylene', 'Sled Base', 'Black Finish'],
  ['Solid Mahogany', 'Upholstered Seat'],
  ['Polycarbonate', 'Transparent Finish'],
  ['Velvet', 'Brass Frame', 'High-Resilience Foam'],
  ['Natural Cane', 'Oak Wood Frame'],
  ['Polyester Fabric', 'Slim Frame', 'Tapered Legs'],
  ['Steel', 'Wood Seat', 'Industrial Style'],
  ['Fiberglass Shell', 'Chrome Base', 'Swivel'],
  ['Navy Velvet', 'Chrome Legs', 'Diamond Tufting'],
  ['Bent Beechwood', 'Natural Lacquer'],
  ['Wood Frame', 'Upholstered Back', 'Antique Brass'],
  ['Linen Blend', 'Solid Wood Legs', 'High-Density Foam']
];

const chairDescriptions = [
  'Comfortable upholstered dining chair with a padded seat and sturdy rubberwood legs.',
  'Classic cross-back chair in solid beech wood with a timeless walnut stain.',
  'Luxurious velvet parsons chair with gold metal legs and plush foam cushioning.',
  'Clean-lined Scandinavian chair in white lacquered birch with tapered legs.',
  'Premium leather armchair with a high back and sculpted ash wood frame.',
  'Natural rattan chair with a mango wood frame, bringing coastal charm.',
  'Mid-century inspired chair with walnut veneer and a velvet-upholstered seat.',
  'Traditional slat-back chair in solid oak with a hand-rubbed natural finish.',
  'Deep-button tufted chair in soft chenille fabric with mahogany legs.',
  'Rustic farmhouse chair with a distressed chalk-painted pine finish.',
  'Sleek ghost chair in transparent acrylic with a chrome frame.',
  'Elegant wingback dining chair with button tufting and brass nailhead trim.',
  'Eco-friendly bamboo chair with a smooth natural varnish finish.',
  'Industrial metal dining chair with a breathable mesh back and steel frame.',
  'Molded plywood chair with a curved walnut veneer back for ergonomic support.',
  'Classic ladder-back dining chair in rubberwood with a warm walnut stain.',
  'Luxurious velvet chair with deep button tufting and polished brass legs.',
  'Bohemian rattan chair with a handwoven back and soft cotton seat cushion.',
  'Stackable polypropylene chair with a sleek sled base and minimalist profile.',
  'Captain-style dining chair with a solid mahogany frame and upholstered seat.',
  'Transparent polycarbonate ghost chair with a sleek minimalist silhouette.',
  'Glamorous dining chair with velvet upholstery and a brass-framed backrest.',
  'Cane-back dining chair with a natural oak frame and woven rattan seat.',
  'Slim-profile slipper chair with a polyester fabric seat and tapered legs.',
  'Rugged industrial chair with a steel frame and reclaimed wood seat.',
  'Iconic tulip chair with a fiberglass shell on a swivel chrome base.',
  'Diamond-tufted navy velvet chair with polished chrome legs.',
  'Classic bentwood chair with a smooth lacquered finish, stackable design.',
  'Traditional chair with an upholstered back, carved wood frame, and antique brass details.',
  'Lightweight linen slipper chair with solid wood legs and dense foam padding.'
];

const chairDims = [
  '18"W x 20"D x 34"H', '18"W x 17"D x 36"H', '20"W x 22"D x 36"H', '18"W x 18"D x 34"H',
  '22"W x 20"D x 38"H', '18"W x 18"D x 34"H', '19"W x 20"D x 35"H', '18"W x 17"D x 37"H',
  '20"W x 22"D x 38"H', '18"W x 18"D x 34"H', '17"W x 19"D x 32"H', '22"W x 20"D x 40"H',
  '18"W x 18"D x 34"H', '18"W x 19"D x 34"H', '19"W x 20"D x 33"H', '17"W x 18"D x 36"H',
  '20"W x 22"D x 36"H', '19"W x 19"D x 34"H', '17"W x 18"D x 32"H', '20"W x 18"D x 36"H',
  '18"W x 20"D x 33"H', '20"W x 22"D x 36"H', '18"W x 19"D x 35"H', '18"W x 20"D x 34"H',
  '18"W x 18"D x 34"H', '20"W x 20"D x 32"H', '20"W x 22"D x 36"H', '18"W x 18"D x 34"H',
  '19"W x 18"D x 36"H', '18"W x 20"D x 34"H'
];

const chairWeights = [
  '12 lbs', '10 lbs', '14 lbs', '11 lbs', '18 lbs', '8 lbs', '13 lbs', '9 lbs',
  '16 lbs', '11 lbs', '7 lbs', '20 lbs', '6 lbs', '10 lbs', '12 lbs', '8 lbs',
  '15 lbs', '9 lbs', '5 lbs', '14 lbs', '6 lbs', '13 lbs', '10 lbs', '11 lbs',
  '9 lbs', '12 lbs', '16 lbs', '7 lbs', '15 lbs', '10 lbs'
];

for (let i = 0; i < 30; i++) {
  products.push({
    id: nextProductId++,
    name: chairNames[i],
    price: chairPrices[i],
    currency: 'PKR',
    description: chairDescriptions[i],
    category: 'dining-chairs',
    images: ['/assets/images/dinning_chair_' + (i + 1) + '.png'],
    materials: chairMaterials[i],
    dimensions: chairDims[i],
    weight: chairWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const sideTableNames = [
  'Obsidian Accent Table', 'Marble Top Side Table', 'Walnut Nightstand', 'Gold Leaf Pedestal',
  'Crystal Accent Table', 'Brass Tripod Table', 'Glass Top Side Table', 'Carved Wood Side Table',
  'Velvet Accent Table', 'Mirrored Side Table', 'Rattan Accent Table', 'Ceramic Drum Table',
  'Metal Accent Table', 'Petite Marble Table', 'Acrylic Side Table', 'Mahogany C-Table',
  'Bamboo Nesting Set', 'Lacquered Side Table', 'Stone Top Accent Table', 'Leather Wrapped Table',
  'Hexagonal Side Table', 'Industrial Pipe Table', 'Mother of Pearl Table', 'Burl Wood Accent Table',
  'Brass Inlay Side Table', 'Mosaic Tile Table', 'Bamboo Side Table', 'Ceramic Inlay Table',
  'Resin Art Side Table', 'Heritage Carved Table'
];

const sideTablePrices = [
  35000, 45000, 28000, 55000, 42000, 38000, 32000, 48000,
  36000, 52000, 25000, 40000, 30000, 58000, 22000, 45000,
  35000, 42000, 50000, 38000, 28000, 34000, 65000, 55000,
  48000, 38000, 22000, 45000, 42000, 60000
];

const sideTableMaterials = [
  ['Obsidian Stone', 'Brass Base', 'Felt Pads'],
  ['Carrara Marble', 'Stainless Steel', 'Gold Accents'],
  ['Solid Walnut', 'Brass Hardware', 'Natural Oil Finish'],
  ['Gold Leaf', 'Resin', 'MDF Core'],
  ['Crystal Glass', 'Chrome Frame', 'Anti-Slip Rings'],
  ['Solid Brass', 'Marble Top', 'Hand-Polished'],
  ['Tempered Glass', 'Nickel Frame', 'Glass Shelves'],
  ['Mango Wood', 'Hand-Carved', 'Antique Finish'],
  ['Velvet', 'Birch Wood', 'Brass Nailheads'],
  ['Mirrored Glass', 'Steel Frame', 'Chrome Accents'],
  ['Natural Rattan', 'Bamboo Frame', 'Handwoven'],
  ['Glazed Ceramic', 'Wood Base', 'Hand-Painted'],
  ['Steel', 'Powder Coat', 'Brass Tips'],
  ['Italian Marble', 'Brass Legs', 'Marble Top'],
  ['Clear Acrylic', 'Chrome Connections', 'Anti-Scratch'],
  ['Solid Mahogany', 'Brass Details', 'Lacquer Finish'],
  ['Natural Bamboo', 'Rope Details', 'Nesting Design'],
  ['MDF', 'High-Gloss Lacquer', 'Gold Legs'],
  ['Natural Stone', 'Iron Base', 'Stone Top'],
  ['Top-Grain Leather', 'Stainless Steel', 'Hand-Stitched'],
  ['Mango Wood', 'Hexagonal Design', 'Natural Grain'],
  ['Iron', 'Wood Top', 'Industrial Style'],
  ['Mother of Pearl', 'Wood Core', 'Inlay Work'],
  ['Burl Wood', 'Brass Inlay', 'Hand-Rubbed Finish'],
  ['Sheesham Wood', 'Brass Inlay', 'Hand-Carved'],
  ['Ceramic Tiles', 'Wood Frame', 'Grout Finish'],
  ['Bamboo', 'Natural Varnish', 'Eco-Friendly'],
  ['Ceramic', 'Brass Details', 'Hand-Painted'],
  ['Resin', 'Gold Leaf', 'Geode Design'],
  ['Sheesham Wood', 'Hand-Carved Base', 'Heritage Finish']
];

const sideTableDescriptions = [
  'Sleek obsidian stone top on a polished brass base, adding dark elegance to any space.',
  'Pure Carrara marble top with a slim stainless steel frame and subtle gold accents.',
  'Classic walnut nightstand with dovetail drawers and brushed brass hardware.',
  'Stunning gold leaf pedestal table with a sculptural silhouette and luminous finish.',
  'Crystal-clear glass accent table with a gleaming chrome frame and sleek profile.',
  'Tripod side table in solid brass with a honed marble top and antique patina.',
  'Minimalist glass top table with a brushed nickel frame and open storage shelf.',
  'Hand-carved mango wood side table with intricate floral motifs and antique finish.',
  'Sumptuous velvet-upholstered table with brass nailhead trim and turned wood legs.',
  'Mirrored side table that reflects light beautifully, with chrome-finished edges.',
  'Handwoven rattan accent table with a natural bamboo frame and organic texture.',
  'Hand-painted ceramic drum table with a glossy finish and carved wood base.',
  'Industrial metal accent table with a powder-coated steel frame and brass feet.',
  'Italian marble pedestal table with elegant brass legs and a veined stone top.',
  'Nearly invisible acrylic side table with a floating effect, perfect for modern rooms.',
  'Rich mahogany C-table with brass gallery rails, ideal for beside the sofa.',
  'Set of two nesting bamboo tables with natural rope detailing and eco-friendly build.',
  'High-gloss lacquered side table with an inverted dome silhouette and gold legs.',
  'Natural stone top on a wrought iron base, bringing organic elegance indoors.',
  'Leather-wrapped side table with hand-stitched seams and a polished steel frame.',
  'Hexagonal mango wood table with a stunning natural grain pattern and clear coat.',
  'Rustic industrial pipe table with a reclaimed wood top and black iron fittings.',
  'Exquisite mother of pearl inlay table with intricate geometric patterns.',
  'Burl wood accent table with brass inlay and a lustrous hand-rubbed finish.',
  'Sheesham wood table with detailed brass inlay work and hand-carved edges.',
  'Colorful mosaic tile table with hand-set ceramic pieces and a sturdy wood frame.',
  'Lightweight bamboo side table with a smooth natural varnish and eco appeal.',
  'Hand-painted ceramic table with brass accents and a vibrant artistic design.',
  'Resin art side table with a geode-inspired design, gold leaf, and high-gloss finish.',
  'Heritage carved sheesham table with traditional motifs and a rich walnut stain.'
];

const sideTableDims = [
  '18"L x 18"W x 24"H', '20"L x 20"W x 26"H', '16"L x 16"W x 28"H', '14"Dia x 24"H',
  '18"L x 18"W x 22"H', '16"Dia x 26"H', '20"L x 14"W x 24"H', '18"L x 18"W x 26"H',
  '16"L x 16"W x 22"H', '18"L x 18"W x 26"H', '16"L x 16"W x 24"H', '14"Dia x 22"H',
  '14"L x 14"W x 26"H', '16"Dia x 24"H', '16"L x 16"W x 22"H', '20"L x 12"W x 26"H',
  '18"L x 14"W x 22"H', '16"Dia x 24"H', '18"Dia x 26"H', '18"L x 18"W x 24"H',
  '14"L x 14"W x 26"H', '16"L x 16"W x 24"H', '16"L x 16"W x 24"H', '18"L x 18"W x 26"H',
  '18"L x 18"W x 24"H', '16"Dia x 22"H', '14"L x 14"W x 24"H', '16"Dia x 24"H',
  '15"Dia x 24"H', '18"L x 18"W x 26"H'
];

const sideTableWeights = [
  '18 lbs', '22 lbs', '15 lbs', '12 lbs', '14 lbs', '16 lbs', '13 lbs', '20 lbs',
  '15 lbs', '18 lbs', '8 lbs', '24 lbs', '12 lbs', '28 lbs', '10 lbs', '22 lbs',
  '9 lbs', '14 lbs', '26 lbs', '16 lbs', '11 lbs', '15 lbs', '10 lbs', '18 lbs',
  '20 lbs', '16 lbs', '7 lbs', '14 lbs', '12 lbs', '22 lbs'
];

for (let i = 0; i < 30; i++) {
  const imgIndex = i + 1;
  const imgName = imgIndex === 1 ? 'side_table_31.png' : 'side_table_' + imgIndex + '.png';
  products.push({
    id: nextProductId++,
    name: sideTableNames[i],
    price: sideTablePrices[i],
    currency: 'PKR',
    description: sideTableDescriptions[i],
    category: 'side-tables',
    images: ['/assets/images/' + imgName],
    materials: sideTableMaterials[i],
    dimensions: sideTableDims[i],
    weight: sideTableWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const extraSideTables = [
  { name: 'Art Deco Side Table', price: 52000, desc: 'Stunning art deco inspired side table with geometric brass inlay and a rich walnut finish, perfect for modern interiors.', mats: ['Brass', 'Walnut Wood', 'Lacquer Finish'], dims: '20"L x 20"W x 26"H', wt: '16 lbs' },
  { name: 'Contemporary C-Table', price: 38000, desc: 'Sleek contemporary C-table with a tempered glass top and brushed stainless steel frame, designed to slide over sofas.', mats: ['Tempered Glass', 'Stainless Steel', 'Rubber Pads'], dims: '22"L x 14"W x 24"H', wt: '12 lbs' }
];

for (let i = 0; i < 2; i++) {
  const et = extraSideTables[i];
  const extraImg = i === 0 ? 'side_table_32.png' : 'side_table_1.png';
  products.push({
    id: nextProductId++,
    name: et.name,
    price: et.price,
    currency: 'PKR',
    description: et.desc,
    category: 'side-tables',
    images: ['/assets/images/' + extraImg],
    materials: et.mats,
    dimensions: et.dims,
    weight: et.wt,
    inStock: true,
    featured: false,
    threeDModel: false
  });
}

const dressingNames = [
  'Classic Vanity Dressing Table', 'Modern Mirror Dressing Table', 'LED Illuminated Dressing Table',
  'Rustic Wooden Dressing Table', 'Hollywood Glam Dressing Table', 'Minimalist White Dressing Table',
  'Antique Carved Dressing Table', 'Marble Top Dressing Table', 'Velvet Stool Dressing Table',
  'Wall-Mounted Dressing Table', 'Corner Dressing Table', 'Farmhouse Dressing Table',
  'Art Deco Dressing Table', 'Glass Top Dressing Table', 'Compact Dressing Table',
  'Luxury Vanity Dressing Table', 'Rattan Dressing Table', 'Gold Accent Dressing Table',
  'Floating Dressing Table', 'Victorian Dressing Table', 'Bamboo Dressing Table',
  'French Provincial Dressing Table', 'Industrial Dressing Table', 'Mirrored Dressing Table',
  'Scandinavian Dressing Table', 'Elegant Walnut Dressing Table', 'White Gloss Dressing Table',
  'Vintage Dressing Table', 'Contemporary Dressing Table', 'Heritage Dressing Table'
];

const dressingPrices = [
  45000, 52000, 68000, 38000, 75000, 42000, 58000, 65000, 48000,
  35000, 40000, 37000, 62000, 55000, 32000, 85000, 36000, 72000,
  48000, 59000, 28000, 55000, 38000, 50000, 45000, 60000, 42000,
  48000, 52000, 68000
];

const dressingMaterials = [
  ['Solid Sheesham Wood', 'Beveled Mirror', 'Brass Handles'],
  ['Engineered Wood', 'LED Mirror', 'Chrome Accents'],
  ['MDF', 'LED Strip Lights', 'Tempered Glass Top'],
  ['Reclaimed Pine', 'Antique Mirror', 'Wrought Iron Legs'],
  ['Birch Wood', 'Hollywood Bulbs', 'Velvet Stool'],
  ['White Laminate', 'Frameless Mirror', 'Gold Legs'],
  ['Mango Wood', 'Hand-Carved Details', 'Antique Brass'],
  ['Italian Marble', 'Stainless Steel Frame', 'Marble Top'],
  ['Velvet Upholstery', 'Rubberwood', 'Brass Nailheads'],
  ['MDF', 'Mirror Panel', 'Floating Brackets'],
  ['Engineered Wood', 'Tri-fold Mirror', 'Compact Design'],
  ['Pine Wood', 'Chalk Paint Finish', 'Wooden Knobs'],
  ['Walnut Veneer', 'Geometric Mirror', 'Brass Inlay'],
  ['Tempered Glass', 'Chrome Frame', 'Glass Shelves'],
  ['Rubberwood', 'Flip-Top Mirror', 'Slim Profile'],
  ['Solid Mahogany', 'Gold Leaf Accents', 'Crystal Knobs'],
  ['Natural Rattan', 'Bamboo Frame', 'Round Mirror'],
  ['Glossy White', 'Gold Metal Frame', 'Velvet Drawers'],
  ['MDF', 'LED Mirror', 'Wall-Mounted Design'],
  ['Solid Oak', 'Ornate Carving', 'Antique Brass Handles'],
  ['Bamboo', 'Natural Varnish', 'Mirrored Top'],
  ['Cherry Wood', 'Curved Legs', 'Gold Accents'],
  ['Steel Frame', 'Reclaimed Wood Top', 'Industrial Pipes'],
  ['Mirrored Glass', 'Chrome Frame', 'LED Dimmable'],
  ['Birch Wood', 'White Lacquer', 'Minimalist Design'],
  ['Solid Walnut', 'Brass Inlay', 'Natural Oil Finish'],
  ['High-Gloss MDF', 'White Finish', 'Chrome Handles'],
  ['Rubberwood', 'Distressed Finish', 'Vintage Knobs'],
  ['Acacia Wood', 'Black Metal Legs', 'Clean Lines'],
  ['Sheesham Wood', 'Hand-Carved Motifs', 'Heritage Finish']
];

const dressingDescriptions = [
  'Classic wooden dressing table with a large beveled mirror and three spacious drawers, crafted from solid sheesham wood.',
  'Modern dressing table featuring an illuminated mirror with adjustable lighting and a sleek floating shelf.',
  'Premium LED dressing table with color-changing lights, touch controls, and a tempered glass top.',
  'Rustic charm meets functionality with this reclaimed pine dressing table featuring an antique-style mirror.',
  'Hollywood glam dressing table with bulb-lit mirror, plush velvet stool, and gleaming gold hardware.',
  'Clean minimalist dressing table in bright white with a frameless mirror and elegant gold tapered legs.',
  'Hand-carved antique dressing table with intricate floral motifs, brass handles, and a warm mango wood finish.',
  'Luxurious marble top dressing table with a brushed stainless steel frame and elegant tapered legs.',
  'Sumptuous velvet-upholstered dressing table with tufted stool, brass nailhead trim, and turned legs.',
  'Space-saving wall-mounted dressing table with a fold-down mirror panel and hidden storage compartments.',
  'Clever corner dressing table with a tri-fold mirror, maximizing space in smaller bedrooms.',
  'Charming farmhouse dressing table with a distressed chalk-painted finish and wooden knob hardware.',
  'Art deco inspired dressing table with walnut veneer, geometric mirror, and intricate brass inlay details.',
  'Sleek glass top dressing table with a chrome frame, open shelving, and a contemporary silhouette.',
  'Compact dressing table with a flip-top mirror and slim profile, ideal for tight spaces and apartments.',
  'Luxury vanity dressing table crafted from solid mahogany with gold leaf accents and crystal drawer knobs.',
  'Natural rattan dressing table with a round mirror and bamboo frame, bringing bohemian elegance.',
  'Glamorous dressing table in high-gloss white with a gold metal frame and velvet-lined drawers.',
  'Modern floating dressing table with a backlit LED mirror and a sleek wall-mounted design.',
  'Ornate Victorian dressing table in solid oak with hand-carved flowers, scrollwork, and antique brass.',
  'Eco-friendly bamboo dressing table with a smooth varnish finish and a built-in mirrored top.',
  'French provincial dressing table in cherry wood with elegant curved legs and soft gold accents.',
  'Industrial style dressing table with a reclaimed wood top, steel pipe frame, and exposed hardware.',
  'Fully mirrored dressing table with chrome trim and dimmable LED lighting for perfect makeup application.',
  'Scandinavian dressing table in light birch with a clean white lacquer finish and minimalist silhouette.',
  'Elegant walnut dressing table with hand-inlaid brass details and a rich natural oil finish.',
  'High-gloss white dressing table with chrome handles, LED mirror, and sleek contemporary design.',
  'Vintage-inspired dressing table with a distressed rubberwood finish, curved mirror, and ceramic knobs.',
  'Contemporary acacia wood dressing table with black metal legs, clean lines, and a warm natural grain.',
  'Heritage carved sheesham dressing table with traditional motifs, spacious drawers, and a rich walnut stain.'
];

const dressingDims = [
  '36"L x 18"W x 54"H', '40"L x 20"W x 56"H', '42"L x 20"W x 58"H', '38"L x 18"W x 52"H',
  '44"L x 22"W x 60"H', '36"L x 18"W x 50"H', '40"L x 20"W x 56"H', '42"L x 20"W x 54"H',
  '36"L x 18"W x 52"H', '30"L x 16"W x 48"H', '32"L x 32"W x 50"H', '40"L x 18"W x 54"H',
  '42"L x 20"W x 56"H', '38"L x 18"W x 52"H', '28"L x 16"W x 48"H', '48"L x 22"W x 60"H',
  '36"L x 18"W x 54"H', '40"L x 20"W x 56"H', '34"L x 18"W x 50"H', '42"L x 20"W x 58"H',
  '36"L x 18"W x 50"H', '40"L x 20"W x 54"H', '38"L x 18"W x 52"H', '44"L x 22"W x 58"H',
  '36"L x 18"W x 50"H', '42"L x 20"W x 56"H', '40"L x 20"W x 54"H', '38"L x 18"W x 52"H',
  '40"L x 18"W x 52"H', '44"L x 22"W x 58"H'
];

const dressingWeights = [
  '42 lbs', '38 lbs', '45 lbs', '35 lbs', '48 lbs', '32 lbs', '44 lbs', '52 lbs', '40 lbs',
  '28 lbs', '30 lbs', '36 lbs', '46 lbs', '34 lbs', '25 lbs', '58 lbs', '28 lbs', '42 lbs',
  '30 lbs', '50 lbs', '24 lbs', '45 lbs', '38 lbs', '40 lbs', '32 lbs', '48 lbs', '35 lbs',
  '38 lbs', '36 lbs', '50 lbs'
];

for (let i = 0; i < 30; i++) {
  products.push({
    id: nextProductId++,
    name: dressingNames[i],
    price: dressingPrices[i],
    currency: 'PKR',
    description: dressingDescriptions[i],
    category: 'dressing-tables',
    images: ['/assets/images/dressing_table_' + (i + 1) + '.png'],
    materials: dressingMaterials[i],
    dimensions: dressingDims[i],
    weight: dressingWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const showcaseNames = [
  'Grand Curio Showcase', 'Modern Glass Showcase', 'Rustic Wall Showcase', 'Art Deco Display Cabinet',
  'Corner Glass Showcase', 'Minimalist Floating Showcase', 'Victorian Glass Cabinet', 'LED Illuminated Showcase',
  'Tall Sliding Door Showcase', 'Tabletop Display Case', 'Curved Glass Showcase', 'Industrial Pipe Showcase',
  'French Provincial Display', 'Wall-Mounted Shadow Box', 'Jewelry Display Showcase',
  'Black Lacquer Showcase', 'Rattan Display Cabinet', 'Gold Leaf Showcase',
  'Scandinavian Display Shelf', 'Heritage China Cabinet', 'Modern Display Cabinet',
  'Marble Base Showcase', 'Bamboo Curio Cabinet', 'Corner Curio Cabinet',
  'Mid-Century Display Cabinet', 'Glass Dome Showcase', 'Modular Cube Showcase',
  'Chinese Lacquer Cabinet', 'Steel Mesh Showcase', 'Rotating Display Showcase'
];

const showcasePrices = [
  85000, 72000, 45000, 95000, 55000, 38000, 89000, 78000, 65000, 25000,
  92000, 48000, 82000, 22000, 35000, 68000, 42000, 110000, 32000, 98000,
  52000, 88000, 36000, 58000, 62000, 28000, 45000, 105000, 40000, 95000
];

const showcaseMaterials = [
  ['Solid Walnut', 'Glass Shelves', 'Mirrored Back'],
  ['Tempered Glass', 'Brushed Steel', 'LED Lighting'],
  ['Reclaimed Barn Wood', 'Wrought Iron', 'Glass Door'],
  ['Mahogany', 'Brass Inlay', 'Velvet Interior'],
  ['Engineered Wood', 'Curved Glass', 'Chrome Accents'],
  ['MDF', 'White Lacquer', 'Tempered Glass'],
  ['Solid Oak', 'Brass Hardware', 'Bevelled Glass'],
  ['Engineered Wood', 'LED Strips', 'Tempered Glass'],
  ['Rubberwood', 'Sliding Glass', 'Aluminum Track'],
  ['Mango Wood', 'Glass Lid', 'Velvet Lining'],
  ['Solid Walnut', 'Curved Glass', 'Brass Lock'],
  ['Black Iron Pipe', 'Reclaimed Wood', 'Steel Hardware'],
  ['Cherry Wood', 'Glass Panels', 'Antique Brass'],
  ['Bamboo', 'Acrylic Front', 'Floating Mount'],
  ['MDF', 'Velvet Interior', 'Glass Top'],
  ['MDF', 'Black Lacquer', 'Chrome Shelves'],
  ['Natural Rattan', 'Mango Wood', 'Glass Shelves'],
  ['Gold Leaf', 'MDF Core', 'Crystal Handles'],
  ['Birch Wood', 'White Lacquer', 'Floating Design'],
  ['Solid Mahogany', 'Glass Panels', 'Brass Hardware'],
  ['Engineered Wood', 'Tempered Glass', 'Chrome Accents'],
  ['Italian Marble', 'Tempered Glass', 'Gold Accents'],
  ['Bamboo', 'Glass Door', 'Natural Varnish'],
  ['Sheesham Wood', 'Mirrored Back', 'Glass Shelves'],
  ['Walnut Veneer', 'Brass Legs', 'Sliding Glass'],
  ['Glass Dome', 'Walnut Base', 'Velvet Platform'],
  ['Engineered Wood', 'White Laminate', 'Aluminum Connectors'],
  ['Wood Core', 'Red Lacquer', 'Hand-Painted Details'],
  ['Powder-Coated Steel', 'Mesh Panels', 'Wood Base'],
  ['MDF', 'Acrylic Shelves', 'Electric Motor']
];

const showcaseDescriptions = [
  'Majestic curio cabinet with glass shelves and mirrored back, perfect for displaying your finest collectibles.',
  'Sleek modern showcase with tempered glass panels and a brushed steel frame for contemporary interiors.',
  'Rustic wall-mounted showcase crafted from reclaimed barn wood with wrought iron brackets.',
  'Art deco inspired display cabinet with geometric brass inlay and a stepped silhouette.',
  'Space-saving corner showcase with curved glass shelves and a compact triangular footprint.',
  'Floating wall showcase with clean lines and hidden mounting system for a seamless look.',
  'Ornate Victorian glass cabinet with carved wood details, claw feet, and brass hardware.',
  'Premium showcase with integrated LED lighting, adjustable glass shelves, and lockable door.',
  'Tall showcase with sliding glass doors and multiple adjustable shelves for flexible display.',
  'Compact tabletop display case with hinged glass lid and velvet-lined interior for small treasures.',
  'Elegant curved glass showcase with a walnut base and lockable curved glass door.',
  'Industrial style showcase with black iron pipe frame and reclaimed wood shelves.',
  'French provincial display cabinet with carved details, glass doors, and antique white finish.',
  'Set of three wall-mounted shadow boxes for creating curated gallery displays.',
  'Specialized jewelry showcase with velvet-lined drawers, necklace hooks, and ring rolls.',
  'Striking black lacquer showcase with mirrored interior and chrome-finished adjustable shelves.',
  'Bohemian rattan display cabinet with woven doors and natural wood frame.',
  'Opulent gold leaf showcase with mirrored shelves and crystal handles for ultra-luxury displays.',
  'Clean-lined Scandinavian display shelf with asymmetrical compartments and light birch finish.',
  'Traditional china cabinet with glass upper doors, carved lower drawers, and rich mahogany finish.',
  'Sleek modern display cabinet with clean lines and ample storage for showcasing your treasured pieces.',
  'Luxury showcase with a polished marble base and tempered glass display case with gold accents.',
  'Eco-friendly bamboo curio cabinet with glass door and adjustable shelving.',
  'Elegant corner curio cabinet with mirrored back, glass shelves, and carved wood details.',
  'Mid-century modern display cabinet with walnut veneer, brass hairpin legs, and sliding glass doors.',
  'Vintage-inspired glass dome display on a wooden base, perfect for showcasing a single special item.',
  'Modular cube showcase system that can be arranged in multiple configurations to suit any space.',
  'Exquisite Chinese lacquer cabinet with hand-painted floral motifs and brass hardware.',
  'Contemporary steel mesh showcase with powder-coated frame and removable mesh panels.',
  'Motorized rotating showcase with mirrored interior and multi-tier display, perfect for high-end retail.'
];

const showcaseDims = [
  '36"L x 16"W x 72"H', '40"L x 14"W x 68"H', '32"L x 10"W x 36"H', '38"L x 18"W x 60"H',
  '28"L x 28"W x 64"H', '30"L x 8"W x 30"H', '40"L x 18"W x 78"H', '36"L x 14"W x 70"H',
  '34"L x 15"W x 74"H', '20"L x 12"W x 14"H', '42"L x 16"W x 66"H', '36"L x 14"W x 60"H',
  '38"L x 16"W x 72"H', '16"L x 4"W x 20"H', '24"L x 12"W x 32"H', '36"L x 14"W x 66"H',
  '32"L x 14"W x 58"H', '36"L x 16"W x 70"H', '40"L x 10"W x 24"H', '44"L x 20"W x 80"H',
  '36"L x 16"W x 66"H', '30"L x 14"W x 56"H', '28"L x 12"W x 60"H', '26"L x 26"W x 72"H',
  '40"L x 16"W x 50"H', '12"Dia x 18"H', '15"L x 15"W x 15"H', '36"L x 16"W x 72"H',
  '34"L x 14"W x 62"H', '30"Dia x 72"H'
];

const showcaseWeights = [
  '95 lbs', '78 lbs', '42 lbs', '110 lbs', '65 lbs', '28 lbs', '135 lbs', '72 lbs',
  '85 lbs', '15 lbs', '105 lbs', '55 lbs', '98 lbs', '8 lbs', '35 lbs', '60 lbs',
  '38 lbs', '85 lbs', '22 lbs', '145 lbs', '52 lbs', '120 lbs', '32 lbs', '75 lbs',
  '68 lbs', '12 lbs', '18 lbs', '95 lbs', '45 lbs', '110 lbs'
];

for (let i = 0; i < 21; i++) {
  products.push({
    id: nextProductId++,
    name: showcaseNames[i],
    price: showcasePrices[i],
    currency: 'PKR',
    description: showcaseDescriptions[i],
    category: 'showcase',
    images: ['/assets/images/showcase_' + (i + 1) + '.png'],
    materials: showcaseMaterials[i],
    dimensions: showcaseDims[i],
    weight: showcaseWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const doorNames = [
  'Classic Mahogany Door', 'Modern Oak Entry Door', 'Rustic Barn Door', 'French Panel Door',
  'Carved Walnut Door', 'Industrial Steel Door', 'Victorian Glass Door', 'Minimalist Flush Door',
  'Dutch Split Door', 'Arched Solid Door', 'Double Panel Door', 'Scandinavian Pine Door',
  'Ornate Bronze Door', 'Sliding Barn Door', 'Leaded Glass Door', 'Contemporary Pivot Door',
  'Traditional Brass Door', 'Reclaimed Wood Door'
];

const doorPrices = [
  85000, 72000, 45000, 95000, 110000, 68000, 88000, 35000,
  78000, 98000, 145000, 42000, 158000, 52000, 92000, 125000,
  75000, 58000
];

const doorMaterials = [
  ['Solid Mahogany', 'Brass Hardware', 'Polyurethane Finish'],
  ['Solid Oak', 'Steel Frame', 'Matte Finish'],
  ['Reclaimed Pine', 'Wrought Iron', 'Natural Varnish'],
  ['Solid Walnut', 'Tempered Glass', 'Brass Handles'],
  ['Solid Walnut', 'Hand-Carved Details', 'Natural Oil Finish'],
  ['Steel', 'Powder Coat Finish', 'Industrial Hardware'],
  ['Solid Oak', 'Bevelled Glass', 'Antique Brass'],
  ['MDF', 'Lacquer Finish', 'Concealed Hinges'],
  ['Solid Pine', 'Steel Hardware', 'Paint Finish'],
  ['Solid Mahogany', 'Brass Hinges', 'Shellac Finish'],
  ['Solid Cherry', 'Brass Hardware', 'Satin Finish'],
  ['Solid Pine', 'Natural Varnish', 'Steel Hinges'],
  ['Bronze', 'Steel Core', 'Patina Finish'],
  ['Reclaimed Wood', 'Steel Track', 'Industrial Rollers'],
  ['Solid Mahogany', 'Leaded Glass', 'Brass Details'],
  ['Engineered Wood', 'Aluminum Frame', 'Pivot Hinge'],
  ['Sheesham Wood', 'Brass Accents', 'Lacquer Finish'],
  ['Reclaimed Barn Wood', 'Steel Hardware', 'Natural Sealant']
];

const doorDescriptions = [
  'Solid mahogany door with rich grain patterns and traditional panel construction, offering timeless elegance for any entrance.',
  'Sleek modern oak door with clean lines and a minimalist design, perfect for contemporary homes.',
  'Sliding barn door crafted from reclaimed pine with wrought iron hardware for a rustic farmhouse look.',
  'Elegant French door with multiple glass panels framed in solid wood, flooding interiors with natural light.',
  'Hand-carved walnut door with intricate floral motifs and a deep hand-rubbed oil finish.',
  'Sturdy industrial steel door with a powder-coated matte black finish and minimalist hardware.',
  'Ornate Victorian-style door with bevelled glass inserts and decorative carved wood trim.',
  'Clean, seamless flush door with a smooth lacquered finish for a minimalist aesthetic.',
  'Charming Dutch door with independently opening top and bottom halves for ventilation and versatility.',
  'Grand arched doorway crafted from solid wood, making a dramatic architectural statement in any space.',
  'Impressive double door set with raised panels and matching hardware for grand entrances.',
  'Light Scandinavian-style door in natural pine with clean lines and a subtle grain pattern.',
  'Statement bronze door with ornate relief patterns and a rich patina finish for luxury properties.',
  'Modern sliding barn door with a sleek track system and minimalist wooden panel design.',
  'Elegant door with decorative leaded glass panels framed in rich mahogany for timeless appeal.',
  'Dramatic pivot door with a full-height design and concealed pivot hinge system for a floating effect.',
  'Classic wooden door with brass accents, raised panels, and traditional joinery craftsmanship.',
  'Eco-friendly door crafted from reclaimed barn wood with a distressed finish and character-rich patina.'
];

const doorDims = [
  '36"L x 80"H x 1.75"W', '36"L x 80"H x 1.75"W', '42"L x 84"H x 1.5"W', '60"L x 80"H x 1.75"W',
  '36"L x 80"H x 2"W', '36"L x 80"H x 1.5"W', '36"L x 80"H x 1.75"W', '36"L x 80"H x 1.5"W',
  '36"L x 80"H x 1.75"W', '40"L x 96"H x 2"W', '72"L x 80"H x 1.75"W', '36"L x 80"H x 1.5"W',
  '40"L x 90"H x 2.5"W', '42"L x 84"H x 1.5"W', '36"L x 80"H x 1.75"W', '48"L x 96"H x 2"W',
  '36"L x 80"H x 1.75"W', '36"L x 80"H x 2"W'
];

const doorWeights = [
  '85 lbs', '78 lbs', '65 lbs', '110 lbs', '95 lbs', '120 lbs', '90 lbs', '45 lbs',
  '72 lbs', '130 lbs', '165 lbs', '55 lbs', '220 lbs', '62 lbs', '88 lbs', '150 lbs',
  '82 lbs', '70 lbs'
];

for (let i = 0; i < 18; i++) {
  products.push({
    id: nextProductId++,
    name: doorNames[i],
    price: doorPrices[i],
    currency: 'PKR',
    description: doorDescriptions[i],
    category: 'doors',
    images: ['/assets/images/door_' + (i + 1) + '.png'],
    materials: doorMaterials[i],
    dimensions: doorDims[i],
    weight: doorWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const simpleTableNames = [
  'Oak Console Table', 'Walnut Writing Table', 'Minimalist White Table', 'Acacia Wood Side Table',
  'Scandinavian Desk', 'Industrial Pipe Table', 'Glass Top Coffee Table', 'Marble Accent Table',
  'Folding Utility Table', 'Teak Outdoor Table', 'Nesting Table Set', 'Bamboo Console Table',
  'Cherry Wood Desk', 'C-shaped Side Table', 'Live Edge Slab Table', 'Pedestal Breakfast Table',
  'Lacquered Console Table', 'Rustic Farmhouse Table'
];

const simpleTablePrices = [
  38000, 42000, 25000, 18000, 35000, 32000, 28000, 45000,
  12000, 55000, 22000, 15000, 48000, 16000, 65000, 34000,
  40000, 52000
];

const simpleTableMaterials = [
  ['Solid Oak', 'Natural Varnish', 'Steel Brackets'],
  ['Solid Walnut', 'Brass Accents', 'Oil Finish'],
  ['MDF', 'White Lacquer', 'Plastic Glides'],
  ['Acacia Wood', 'Steel Legs', 'Natural Sealant'],
  ['Birch Wood', 'White Laminate', 'Metal Handles'],
  ['Reclaimed Wood', 'Black Iron Pipe', 'Steel Hardware'],
  ['Tempered Glass', 'Chrome Frame', 'Rubber Pads'],
  ['Italian Marble', 'Brass Base', 'Felt Pads'],
  ['Pine Wood', 'Steel Hinges', 'Natural Finish'],
  ['Solid Teak', 'Stainless Steel', 'Teak Oil'],
  ['Mango Wood', 'Lacquer Finish', 'Brass Details'],
  ['Bamboo', 'Natural Varnish', 'Steel Brackets'],
  ['Solid Cherry', 'Brass Hardware', 'Shellac Finish'],
  ['Engineered Wood', 'Steel Frame', 'Matte Finish'],
  ['Reclaimed Elm', 'Epoxy Resin', 'Steel Legs'],
  ['Rubberwood', 'Pedestal Base', 'Natural Finish'],
  ['MDF', 'High-Gloss Lacquer', 'Gold Metal Legs'],
  ['Reclaimed Pine', 'Chalk Paint', 'Steel Hardware']
];

const simpleTableDescriptions = [
  'Sleek oak console table with clean lines and a natural finish, perfect for hallways and entryways.',
  'Elegant walnut writing table with a smooth worksurface and tapered legs for a timeless study piece.',
  'Clean white minimalist table with a matte lacquer finish, ideal for small spaces and modern interiors.',
  'Compact acacia wood side table with a live edge and hairpin legs for a touch of rustic charm.',
  'Light Scandinavian desk in birch wood with a clean silhouette and practical drawer storage.',
  'Rugged industrial table with a reclaimed wood top and black iron pipe legs for a workshop aesthetic.',
  'Modern coffee table with a tempered glass top and a chrome-finished base for contemporary living rooms.',
  'Luxurious marble accent table with a brass base, perfect as a statement piece in any room.',
  'Practical folding table with a lightweight design, ideal for temporary workspaces and gatherings.',
  'Weather-resistant teak outdoor table with a slatted top and sturdy construction for patio dining.',
  'Set of three nesting tables in graduated sizes, offering flexible surface space for any arrangement.',
  'Eco-friendly bamboo console table with a natural finish and open shelving for display and storage.',
  'Classic cherry wood desk with dovetail drawers and a warm hand-rubbed finish for traditional offices.',
  'Versatile C-shaped side table that slides over sofas and beds for convenient laptop and snack use.',
  'Stunning live edge slab table with natural bark edge and epoxy river inlay for a one-of-a-kind look.',
  'Space-saving pedestal table with a round top, perfect for breakfast nooks and small dining areas.',
  'High-gloss lacquered console table with a dramatic silhouette and gold-tipped legs for glam interiors.',
  'Charming farmhouse table in reclaimed pine with turned legs and a distressed painted finish.'
];

const simpleTableDims = [
  '40"L x 14"W x 30"H', '48"L x 24"W x 30"H', '36"L x 18"W x 28"H', '20"L x 18"W x 22"H',
  '44"L x 20"W x 30"H', '48"L x 24"W x 30"H', '42"L x 24"W x 18"H', '20"L x 20"W x 24"H',
  '48"L x 24"W x 29"H', '60"L x 36"W x 30"H', '18"L x 14"W x 20"H', '36"L x 12"W x 32"H',
  '48"L x 24"W x 30"H', '22"L x 14"W x 26"H', '60"L x 30"W x 30"H', '36"Dia x 30"H',
  '42"L x 16"W x 32"H', '48"L x 30"W x 30"H'
];

const simpleTableWeights = [
  '28 lbs', '35 lbs', '18 lbs', '12 lbs', '30 lbs', '42 lbs', '22 lbs', '38 lbs',
  '15 lbs', '55 lbs', '18 lbs', '14 lbs', '42 lbs', '10 lbs', '75 lbs', '32 lbs',
  '28 lbs', '48 lbs'
];

for (let i = 0; i < 18; i++) {
  products.push({
    id: nextProductId++,
    name: simpleTableNames[i],
    price: simpleTablePrices[i],
    currency: 'PKR',
    description: simpleTableDescriptions[i],
    category: 'simple-tables',
    images: ['/assets/images/simple_table_' + (i + 1) + '.png'],
    materials: simpleTableMaterials[i],
    dimensions: simpleTableDims[i],
    weight: simpleTableWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

const benchNames = [
  'Classic Wooden Bench', 'Upholstered Entry Bench', 'Rustic Farmhouse Bench', 'Modern Leather Bench',
  'Carved Wooden Bench', 'Garden Patio Bench', 'Velvet Accent Bench', 'Minimalist Oak Bench',
  'Industrial Metal Bench', 'Storage Bench with Cushion', 'Bamboo Garden Bench', 'Scandinavian Bench',
  'Tufted Ottoman Bench', 'Wrought Iron Bench', 'Folding Wooden Bench', 'Rattan Bench',
  'Marble Top Bench', 'Slatted Wood Bench'
];

const benchPrices = [
  28000, 35000, 22000, 45000, 38000, 18000, 32000, 25000,
  20000, 42000, 15000, 28000, 36000, 26000, 12000, 30000,
  55000, 16000
];

const benchMaterials = [
  ['Solid Teak', 'Natural Varnish', 'Steel Hardware'],
  ['Polyester Fabric', 'Rubberwood', 'Foam Padding'],
  ['Reclaimed Pine', 'Chalk Paint', 'Steel Hardware'],
  ['Top-Grain Leather', 'Steel Frame', 'High-Density Foam'],
  ['Solid Walnut', 'Hand-Carved Details', 'Shellac Finish'],
  ['Acacia Wood', 'Stainless Steel', 'Teak Oil'],
  ['Velvet', 'Gold Metal Frame', 'High-Resilience Foam'],
  ['Solid Oak', 'Natural Oil Finish', 'Plastic Glides'],
  ['Steel', 'Pine Wood', 'Powder Coat'],
  ['Engineered Wood', 'Polyester Cushion', 'Brass Handles'],
  ['Bamboo', 'Natural Varnish', 'Rope Details'],
  ['Birch Wood', 'White Lacquer', 'Steel Brackets'],
  ['Polyester Fabric', 'Rubberwood', 'Brass Nailheads'],
  ['Wrought Iron', 'Powder Coat', 'Steel Hardware'],
  ['Pine Wood', 'Steel Hinges', 'Natural Finish'],
  ['Natural Rattan', 'Mango Wood', 'Handwoven'],
  ['Italian Marble', 'Brass Frame', 'Felt Pads'],
  ['Rubberwood', 'Natural Varnish', 'Steel Brackets']
];

const benchDescriptions = [
  'Timeless wooden bench with a smooth finish and sturdy construction, perfect for entryways and gardens.',
  'Elegant upholstered bench with a padded seat and tapered wooden legs for a welcoming entryway.',
  'Charming farmhouse bench crafted from reclaimed pine with a distressed finish and turned legs.',
  'Sleek modern bench upholstered in premium leather with a black metal frame for contemporary interiors.',
  'Hand-carved wooden bench with intricate floral motifs and a rich walnut finish for traditional spaces.',
  'Weather-resistant garden bench in natural acacia wood with curved slats for outdoor comfort.',
  'Luxurious velvet bench with a gold metal frame and plush cushioning for glamorous interiors.',
  'Clean-lined oak bench with a minimalist design and natural grain finish for modern homes.',
  'Sturdy industrial bench with a steel frame and wooden slat seat, perfect for loft-style spaces.',
  'Multi-functional storage bench with a hinged seat and plush cushion for organized seating.',
  'Eco-friendly bamboo bench with a natural finish and lightweight design for outdoor relaxation.',
  'Light Scandinavian bench in birch wood with tapered legs and a clean silhouette.',
  'Elegant tufted ottoman bench with button detailing and brass nailhead trim for classic charm.',
  'Classic wrought iron bench with decorative scrollwork and a durable powder-coated finish.',
  'Practical folding bench that stores flat when not in use, ideal for extra seating at gatherings.',
  'Natural rattan bench with a handwoven seat and mango wood frame for bohemian-inspired spaces.',
  'Luxurious bench with a polished marble top and brass-finished base for opulent entryway seating.',
  'Simple slatted wood bench with a natural finish, perfect for mudrooms and casual seating areas.'
];

const benchDims = [
  '48"L x 14"W x 18"H', '42"L x 16"W x 20"H', '48"L x 14"W x 18"H', '48"L x 16"W x 19"H',
  '48"L x 15"W x 18"H', '54"L x 14"W x 18"H', '40"L x 16"W x 20"H', '48"L x 14"W x 18"H',
  '48"L x 14"W x 18"H', '44"L x 18"W x 22"H', '48"L x 14"W x 18"H', '48"L x 14"W x 18"H',
  '42"L x 16"W x 20"H', '48"L x 16"W x 36"H', '48"L x 12"W x 18"H', '44"L x 16"W x 20"H',
  '40"L x 14"W x 19"H', '48"L x 14"W x 18"H'
];

const benchWeights = [
  '22 lbs', '28 lbs', '24 lbs', '35 lbs', '32 lbs', '20 lbs', '25 lbs', '26 lbs',
  '30 lbs', '38 lbs', '16 lbs', '22 lbs', '30 lbs', '35 lbs', '14 lbs', '18 lbs',
  '55 lbs', '18 lbs'
];

for (let i = 0; i < 18; i++) {
  products.push({
    id: nextProductId++,
    name: benchNames[i],
    price: benchPrices[i],
    currency: 'PKR',
    description: benchDescriptions[i],
    category: 'bench',
    images: ['/assets/images/bench_' + (i + 1) + '.png'],
    materials: benchMaterials[i],
    dimensions: benchDims[i],
    weight: benchWeights[i],
    inStock: Math.random() > 0.1,
    featured: i < 5,
    threeDModel: false
  });
}

// Load persisted data (overrides hardcoded defaults if saved data exists)
const savedProducts = loadJSON('products.json', null);
if (savedProducts) {
  products.length = 0;
  products.push(...savedProducts);
  nextProductId = Math.max(...products.map(p => p.id), 0) + 1;
} else {
  saveJSON('products.json', products);
}

const reviews = [
  { id: 1, productId: 1, author: 'J. Kensington', rating: 5, text: 'Exceptional craftsmanship. The walnut grain is breathtaking.', date: '2025-11-15' },
  { id: 2, productId: 1, author: 'M. Hartfield', rating: 5, text: 'Worth every penny. A true heirloom piece.', date: '2025-10-28' },
  { id: 3, productId: 2, author: 'E. Rochester', rating: 4, text: 'Beautiful vase, though lighter than expected.', date: '2025-12-02' }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/products/category/:category', (req, res) => {
  const filtered = products.filter(p => p.category === req.params.category);
  res.json(filtered);
});

app.get('/api/reviews/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === parseInt(req.params.productId));
  res.json(productReviews);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  console.log(`Contact form submission from ${name} (${email}): ${message}`);
  res.json({ success: true, message: 'Thank you for your message. We will respond within 24 hours.' });
});

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency || 'usd',
        payment_method_types: ['card']
      });
      return res.json({ clientSecret: paymentIntent.client_secret });
    }
    res.json({ clientSecret: null, mock: true, message: 'Stripe not configured. Set STRIPE_SECRET_KEY in .env' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: isVercel ? 'vercel' : 'local', timestamp: Date.now(), vercel: !!process.env.VERCEL });
});

// ============== ADMIN PANEL API ==============

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    const token = Buffer.from(JSON.stringify({ username, time: Date.now() })).toString('base64');
    return res.json({ success: true, token, user: { username } });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const data = JSON.parse(Buffer.from(token, 'base64').toString());
    if (data.username !== adminUser.username) throw new Error('Invalid token');
    req.admin = data;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/api/admin/stats', adminAuth, (req, res) => {
  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    lowStock: products.filter(p => !p.inStock).length
  });
});

app.get('/api/admin/products', adminAuth, (req, res) => {
  res.json(products);
});

app.post('/api/admin/products', adminAuth, (req, res) => {
  const { name, price, category, description, images, materials, dimensions, weight, inStock, featured, threeDModel } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }
  const newProduct = {
    id: nextProductId++,
    name,
    price: Number(price),
    currency: 'PKR',
    description: description || '',
    category,
    images: images || ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800'],
    materials: materials || [],
    dimensions: dimensions || '',
    weight: weight || '',
    inStock: inStock !== false,
    featured: featured === true,
    threeDModel: threeDModel === true
  };
  products.push(newProduct);
  saveJSON('products.json', products);
  res.status(201).json(newProduct);
});

app.put('/api/admin/products/:id', adminAuth, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const { name, price, category, description, images, materials, dimensions, weight, inStock, featured, threeDModel } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price);
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (images !== undefined) product.images = images;
  if (materials !== undefined) product.materials = materials;
  if (dimensions !== undefined) product.dimensions = dimensions;
  if (weight !== undefined) product.weight = weight;
  if (inStock !== undefined) product.inStock = inStock;
  if (featured !== undefined) product.featured = featured;
  if (threeDModel !== undefined) product.threeDModel = threeDModel;
  saveJSON('products.json', products);
  res.json(product);
});

app.delete('/api/admin/products/:id', adminAuth, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  saveJSON('products.json', products);
  res.json({ success: true, message: 'Product deleted' });
});

app.post('/api/admin/orders', (req, res) => {
  const order = { id: orders.length + 1, ...req.body, date: new Date().toISOString(), status: 'pending' };
  orders.unshift(order);
  saveJSON('orders.json', orders);
  console.log(`New order #${order.id} received`);
  res.status(201).json(order);
});

app.get('/api/admin/orders', adminAuth, (req, res) => {
  res.json(orders);
});

app.put('/api/admin/orders/:id', adminAuth, (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status || order.status;
  res.json(order);
});

const users = loadJSON('users.json', []);
if (!isVercel && !fs.existsSync(path.join(DATA_DIR, 'users.json'))) saveJSON('users.json', users);

app.post('/api/users/register', (req, res) => {
  const { name, email, phone, address, city } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  const existing = users.find(u => u.email === email);
  if (existing) return res.json({ success: true, user: existing, message: 'User already registered' });
  const user = { id: users.length + 1, name, email, phone: phone || '', address: address || '', city: city || '', registeredAt: new Date().toISOString() };
  users.push(user);
  saveJSON('users.json', users);
  res.status(201).json({ success: true, user });
});

app.get('/api/admin/users', adminAuth, (req, res) => {
  res.json(users);
});

const appData = loadJSON('app-data.json', { announcementText: 'Complimentary shipping on orders over Rs. 140,000', salePopup: { text: '', enabled: false } });
if (!isVercel && !fs.existsSync(path.join(DATA_DIR, 'app-data.json'))) saveJSON('app-data.json', appData);

app.post('/api/admin/announcement', adminAuth, (req, res) => {
  const { text } = req.body;
  appData.announcementText = text || '';
  saveJSON('app-data.json', appData);
  res.json({ success: true, text: appData.announcementText });
});

app.get('/api/admin/announcement', (req, res) => {
  res.json({ text: appData.announcementText });
});

app.post('/api/admin/sale-popup', adminAuth, (req, res) => {
  const { text, enabled } = req.body;
  appData.salePopup.text = text || '';
  appData.salePopup.enabled = !!enabled;
  saveJSON('app-data.json', appData);
  res.json({ success: true, ...appData.salePopup });
});

app.get('/api/admin/sale-popup', (req, res) => {
  res.json(appData.salePopup);
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API endpoint not found' });
  if (req.path === '/admin' || req.path === '/admin/') return res.redirect('/admin-login.html');
  const filePath = req.path === '/' ? 'index.html' : req.path.slice(1);
  const fullPath = path.join(__dirname, '..', filePath);
  if (require('fs').existsSync(fullPath)) {
    res.sendFile(fullPath);
  } else {
    res.status(404).send('Not found');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n  ✦ Wood Style Furniture running at http://localhost:${PORT}`);
    console.log(`  ✦ Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
}

module.exports = (req, res) => {
  try {
    app(req, res);
  } catch (e) {
    console.error('Fatal:', e);
    res.status(500).json({ error: 'Internal server error', detail: e.message });
  }
};
