export const brand = {
  name: "Sentara Group",
  tagline: "Where Land Meets Legacy",
  phone: "+91 99492 11371",
  phoneRaw: "+919949211371",
  email: "rajendarrangu@sentaraprojects.com",
  addressHQ: "6th Floor, G Square, Near Wells Fargo, Raidurg, Gachibowli, Hyderabad – 500032",
};

export const heroStats = [
  { value: "25+", label: "Years Combined Leadership" },
  { value: "8,50,000+", label: "Sq. Ft. Delivered" },
  { value: "11,24,000+", label: "Sq. Ft. Under Execution" },
  { value: "7+", label: "Project Categories" },
];

export const chairman = {
  name: "Rangu Rajendra Prasad",
  title: "Chairman & Managing Director — Sentara Group",
  subtitle: "Visionary Entrepreneur & Executive Leader",
  photo: "/images/team/chairman.jpg",
  phone: "9949211371",
  email: "rajendarrangu@sentaraprojects.com",
  education: {
    degree: "Master of Business Administration (MBA)",
    institution: "Osmania University, Hyderabad",
  },
  overview: [
    "Mr. Rangu Rajendra Prasad is a visionary entrepreneur and executive with over 25 years of combined leadership experience. He pairs a robust 20-year background in the banking sector with more than 5 years of high-growth leadership in real estate development. Known for his shrewd business acumen, digital transformation strategies, and unwavering commitment to institutionalising professionalism in real estate, he consistently scales ventures from inception through to high-value completion.",
    "His career reflects a rare balance: the risk discipline and financial rigour honed over two decades in banking, combined with the entrepreneurial agility and market instincts of a real estate developer who has repeatedly identified, structured, and delivered premium residential, healthcare, and hospitality assets across Hyderabad's high-growth corridors.",
    "As Chairman & Managing Director across the Sentara Group portfolio of entities, he continues to shape Hyderabad's premium residential, healthcare and hospitality landscape with a steady commitment to quality, timelines and long-term value for every stakeholder.",
  ],
  stats: [
    { value: "25+", label: "Years Combined Leadership" },
    { value: "20", label: "Years in the Banking Sector" },
    { value: "5+", label: "Years Leading Real Estate Ventures" },
    { value: "8,50,000+", label: "Sq. Ft. of Projects Executed" },
  ],
  roles: [
    { order: "01", title: "Chairman & Managing Director", org: "Sentara Group", since: "2026" },
    { order: "02", title: "Managing Partner", org: "Anvita & Landspace Developers", since: "2024" },
    { order: "03", title: "Managing Partner", org: "Landspace Group Housing Projects", since: "2022" },
    { order: "04", title: "Designated Partner", org: "Landspace Projects LLP", since: "2022" },
    { order: "05", title: "Managing Partner", org: "Landspace Projects — Palm Meadows Group", since: "2022" },
  ],
  strengths: [
    {
      title: "Strategic Growth",
      desc: "Long-term vision mapping, market positioning, and corporate restructuring.",
    },
    {
      title: "Business Scaling",
      desc: "Market expansion, venture capital fundraising, and strategic mergers.",
    },
    {
      title: "Financial Stewardship",
      desc: "Managing multi-million-rupee budgets, P&L responsibility, and resource allocation.",
    },
    {
      title: "Human Capital",
      desc: "Recruiting, mentoring, and leading cross-functional, high-performing executive teams.",
    },
  ],
};

export type ProjectStatus = "ongoing" | "completed" | "future";

export interface ProjectSummary {
  slug: string;
  name: string;
  location: string;
  status: ProjectStatus;
  statusLabel: string;
  description: string;
  image: string;
  stats: { value: string; label: string }[];
  accolade?: string;
}

export const projects: ProjectSummary[] = [
  {
    slug: "parkside-villas",
    name: "Anvita Parkside Villas",
    location: "Ravalkole, Medchal, Hyderabad",
    status: "ongoing",
    statusLabel: "Ongoing & Under Execution",
    description:
      "A masterplanned 50-acre eco-neighbourhood of 270 premium 4 BHK triplex villas, anchored by a resort-style clubhouse and over 75 amenities across five lifestyle zones.",
    image: "/images/parkside/street-view.jpg",
    stats: [
      { value: "50", label: "Acres" },
      { value: "270", label: "Premium Villas" },
      { value: "75%", label: "Open Spaces" },
    ],
    accolade: "Best Green Building Project — CREDAI, Hyderabad",
  },
  {
    slug: "landspace-elite",
    name: "Landspace Elite",
    location: "Medipally, Hyderabad",
    status: "completed",
    statusLabel: "Completed",
    description:
      "A premium 5-storied deluxe residential apartment complex offering open, natural ventilation on three sides, adjacent to a 56-acre Police Commissionerate site and 230-acre urban forest.",
    image: "/images/landspace/landspace-elite-building.jpg",
    stats: [
      { value: "600", label: "Sq. Yards Plot" },
      { value: "1,535", label: "Sq. Ft. — 3 BHK" },
      { value: "S+5", label: "Stilt + 5 Floors" },
    ],
  },
  {
    slug: "arunjyothi-hospitals",
    name: "Arunjyothi Hospitals",
    location: "Hayat Nagar, Hyderabad",
    status: "completed",
    statusLabel: "Completed",
    description:
      "A 30-bed multi-speciality healthcare facility built to deliver comprehensive, community-focused clinical care — extending the Group's quality commitment into essential public healthcare.",
    image: "/images/arunjyothi/arunjyothi-hospital.jpg",
    stats: [
      { value: "400", label: "Sq. Yards Plot" },
      { value: "30", label: "Bed Facility" },
    ],
  },
];

export const futureVentures = [
  {
    title: "High-Rise Residential Tower",
    location: "Vanasthali Hills, Nagole, Hyderabad",
    description:
      "A green, high-rise residential tower with 2 Cellars + 1 Stilt + 10 Upper Floors, comprising all 4 BHK ultra-luxurious flats, designed by the renowned FHD Group. Exclusive duplex Sky-Villas (5,000–6,000 sq. ft.) crown floors 9 & 10 with panoramic forest views.",
    stats: [
      { value: "3,50,000", label: "Sq. Ft. Built-up Area" },
      { value: "2+1+10", label: "Cellars + Stilt + Floors" },
      { value: "8,400", label: "Sq. Yds. Land Parcel" },
    ],
    highlights: [
      "Surrounded by a 500+ acre lush urban forest — natural microclimate & cleaner air",
      "Serene, premium residential pocket of East Hyderabad",
      "Dedicated clubhouse with premium health, wellness & social spaces",
      "Close proximity to Nagole Metro Station & ORR Interchange No. 10",
      "40 feet wide roads on all three sides for smooth traffic flow and ventilation",
    ],
  },
  {
    title: "Luxurious Resort",
    location: "Konapuram, M. Turkapally, Yadadri Bhuvanagiri",
    description:
      "A pioneering, lavish resort spread over 30 acres of lush green land east of Hyderabad, designed as the region's premier venue for destination weddings, corporate events, and leisure & adventure sports across all age groups.",
    stats: [
      { value: "30 AC", label: "Lush Green Resort Land" },
      { value: "3+", label: "Tourism Landmarks Nearby" },
      { value: "NH-163", label: "Major Highway Connectivity" },
    ],
    highlights: [
      "Proximity to the world-famous Yadadri Temple & Swarnagiri Temple",
      "Near Baswapur reservoir and the proposed Gandhamalla reservoir",
      "Well connected via NH-163, SH-1, RRR at Peerlapalli & ORR-8 at Keesara",
    ],
  },
  {
    title: "Residential Plots Layout",
    location: "Konapuram, M. Turkapally, Yadadri Bhuvanagiri",
    description:
      "A premium 100-acre, concept-based gated open-plot development as per HMDA planning norms, with elite plots of 1,000 sq. yards within a lush, eco-friendly ecosystem — complete with weekend homes and a themed clubhouse precinct.",
    stats: [
      { value: "100 AC", label: "Gated Plot Development" },
      { value: "1,000", label: "Sq. Yd. Each Plot" },
      { value: "10 AC", label: "Clubhouse & Theme Parks" },
    ],
    highlights: [
      "Every plot designed for ornamental & fruit-yielding trees",
      "Provision for ready-to-build houses",
      "Free clubhouse membership; 5 years of plot & road maintenance included",
      "Graded 40 ft / 60 ft / 100 ft wide road network",
    ],
  },
];

export const parksideAmenityZones = [
  {
    zone: "Greenery",
    color: "#4CAF6D",
    items: ["Herb / Medicinal Garden", "Trellis", "Aroma Garden", "Mandala Farming", "Orange Orchard", "Mango Orchard", "Vegetable Beds"],
  },
  {
    zone: "Community",
    color: "#1a8fa3",
    items: ["Family Dine / Community Dine", "Seating Spaces", "Temple", "Amphitheatre with Loft Nets", "Gazebo", "Pet Park"],
  },
  {
    zone: "Health",
    color: "#e0556b",
    items: ["Gym Arena", "Trim Trail", "Yoga Decks", "Meditation Lawn", "Sensory Walking Track", "Cycling Track", "Swimming Pool"],
  },
  {
    zone: "Outdoor Sports",
    color: "#e0a415",
    items: ["Tennis Court", "Volleyball Court", "Pickleball", "Badminton Court", "Half Basketball Court", "Cricket Practice Nets", "Golf Putting", "Skating Rink & Skateboard Park", "Kabaddi Court"],
  },
  {
    zone: "Leisure",
    color: "#2f6fe0",
    items: ["Retention Pond", "Miyawaki Forest", "Woods with Bird Watching Tower", "Stepped Well Seating", "Labyrinth", "Rain Garden"],
  },
];

export const parksideVillaTypes = [
  {
    name: "North Villa",
    image: "/images/parkside/villa-north.jpg",
    ground: "2,102",
    first: "1,324",
    second: "775",
    total: "4,201",
  },
  {
    name: "East Villa",
    image: "/images/parkside/villa-east.jpg",
    ground: "2,089",
    first: "1,324",
    second: "775",
    total: "4,188",
  },
  {
    name: "West Villa",
    image: "/images/parkside/villa-west.jpg",
    ground: "2,089",
    first: "1,324",
    second: "775",
    total: "4,188",
  },
];

export const parksideClubhouseFacilities = [
  { title: "Resort-like Clubhouse", desc: "A resort-style clubhouse spread over 2.5 acres, blending refined modern living with a natural backdrop.", image: "/images/parkside/clubhouse-approach.jpg" },
  { title: "Swimming Pool", desc: "A state-of-the-art pool and invigorating outdoor fitness areas for a complete wellness experience.", image: "/images/parkside/clubhouse-pool.jpg" },
  { title: "Reception", desc: "A warm, welcoming lobby that invites residents to be part of the Anvita Parkside lifestyle.", image: "/images/parkside/reception-lounge.jpg" },
  { title: "Banquet Hall", desc: "A lavish, expansive setting for celebrations and community events amidst nature.", image: "/images/parkside/banquet-hall.jpg" },
  { title: "Gymnasium", desc: "Weights, machines and cardio equipment in a stunning resort-like atmosphere.", image: "/images/parkside/gym.jpg" },
  { title: "Indoor Games", desc: "Entertaining games and activities for kids and adults of all ages.", image: "/images/parkside/indoor-games.jpg" },
  { title: "Yoga", desc: "The Yoga Lawn creates the right atmosphere for equilibrium of mind, body and soul.", image: "/images/parkside/yoga.jpg" },
  { title: "Alfresco", desc: "Large, light-filled spaces and open layouts that embrace the outdoors without leaving the luxury of home.", image: "/images/parkside/alfresco.jpg" },
];

export const parksideGallery = [
  "/images/parkside/hero-couple.jpg",
  "/images/parkside/entrance-road.jpg",
  "/images/parkside/community-garden-aerial.jpg",
  "/images/parkside/street-view.jpg",
  "/images/parkside/community-farming.jpg",
  "/images/parkside/community-dine.jpg",
  "/images/parkside/leisure-pool.jpg",
  "/images/parkside/sports-aerial.jpg",
];

export const parksideSpecs = [
  { label: "Project Area", value: "50 Acres" },
  { label: "No. of Units", value: "270" },
  { label: "Configuration", value: "4-BHK Triplex Villas with 20 ft front & backyard" },
  { label: "Type", value: "East, West & North facing" },
  { label: "Open Spaces", value: "75%" },
  { label: "Clubhouse", value: "Spread over 2.5 Acres" },
  { label: "RERA No.", value: "P02200009326" },
];

export const parksideLocationHighlights = [
  "05 min. drive to Rajiv Rahadaari Road",
  "10 min. drive to Medchal Check-post",
  "10 min. drive to Shamirpet Lake",
  "10 min. drive to Leonia, Alankrita & Celebrity Resorts",
  "10 min. drive to the IT Park at Kandlakoya",
  "15 min. drive from ORR Exit No. 6 & 7",
  "15 min. drive to Genome Valley",
];

export const landspaceSpecs = [
  { label: "Plot Size", value: "600 Sq. Yards" },
  { label: "Entrance", value: "East Facing" },
  { label: "Configuration", value: "All 3 BHK Delux Flats" },
  { label: "No. of Flats", value: "10 (2 per floor)" },
  { label: "Floors", value: "Stilt + 5" },
  { label: "Unit Area", value: "1,535 Sq. Ft." },
  { label: "RERA No.", value: "REA02200060913" },
];

export const landspaceHighlights = [
  "Open, natural ventilation along three sides of the apartment",
  "Adjacent to the 56-acre Rachakonda Police Commissionerate site",
  "Nearby to Bhagya Nagar Nandhanavanam — a 230-acre urban lung space",
  "1 min. drive to Warangal Highway (NH-163)",
  "10 min. drive to Uppal Metro Station",
  "8 min. drive to Outer Ring Road Exit No. 9 (Ghatkesar)",
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/future-ventures", label: "Future Ventures" },
  { href: "/contact", label: "Contact" },
];
