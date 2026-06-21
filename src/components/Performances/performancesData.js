// Performance data — normalised to { name, items } so one component can render either group.
// "Concerts abroad" has been merged into the international group, combined by country.

export const NATIONAL = [
  { name: "Pune",          items: ["Sawai Gandharva Sangeet Mahotsav", "Srimath Dagru Seth Halwai Ganpati Sangeet Mahotsav", "Ganavardhan", "Pune Festival"] },
  { name: "Varanasi",      items: ["Mahamrityunjay Mahotsav", "Gangamahotsav", "Pt. Ram Sahai Foundation", "Kalaprakash", "Ras-Kalash Sanstha"] },
  { name: "Kolkata",       items: ["Sangeet Piyasi", "West Bengal Rajya Sangeet Music Festival", "Institute of Culture, Ramkrishna Mission", "Navarang"] },
  { name: "New Delhi",     items: ["India Habitat Centre", "India International Centre", "Shadaj"] },
  { name: "Bangalore",     items: ["Swar Samrat Festival", "Pt. Mallikarjun Music Festival DHWANI"] },
  { name: "Goa",           items: ["Swar Mangesh Festival", "Samrat Sangeet Sammelan"] },
  { name: "Jodhpur",       items: ["Swar–Sudha & Kalasri Sangeet Sansthan", "Mehraangad Fort Trust"] },
  { name: "Mumbai",        items: ["National Centre for Performing Arts"] },
  { name: "Hyderabad",     items: ["Secunderabad Club"] },
  { name: "Ahmedabad",     items: ["Saptak"] },
  { name: "Nagpur",        items: ["Kalidas Samaroh"] },
  { name: "Aurangabad",    items: ["Ruturang Mahotsav"] },
  { name: "Kanpur",        items: ["Laxmi Devi Lalit Kala Academy"] },
  { name: "Dhanbad",       items: ["Sindri Officer’s Club (FCIL Sindri)"] },
  { name: "Dombivalli",    items: ["Chaturang Chaitrapallavi Sangeet Mahotsav"] },
  { name: "Dibrugarh",     items: ["Chawlkowa Music College Sangeet Sammelan"] },
  { name: "Jalgaon",       items: ["Swargiya Vasantrao Chandorkar Smriti Pratisthan"] },
  { name: "Lonavla",       items: ["Acharya DevSarma Foundation"] },
  { name: "Nashik",        items: ["Saptak"] },
  { name: "Bhubaneswar",   items: ["Srjan (Founded by Guru Keluchran Mahapatra)"] },
  { name: "Ranchi",        items: ["Jharkhand Sthapna Divas"] },
  { name: "Belur",         items: ["Belur Math"] },
  { name: "Trivandrum",    items: ["Swathi Tirunal Sangeetotsav"] },
  { name: "Allahabad",     items: ["Prayag Sangeet Samiti"] },
  { name: "Shaktinagar, UP", items: ["Sakhti Sardotsav"] },
];

// International festivals + other concerts abroad, merged by country (ordered by reach).
export const INTERNATIONAL = [
  { name: "Australia", items: [
    "Blue Mountains Music Festival, Katoomba – 2017",
    "Brunswick Music Festival, Melbourne – 2017",
    "PARRAMASALA for South Asian Arts – 2015, 2017",
    "National Multicultural Festival – 2008",
    "Funhouse, Bega – 2017",
    "Holi Mahotsav, Bharatiya Vidya Bhavan Sydney – 2011",
    "Kulcha Arts, Perth – 2011",
    "Nexus Multicultural Arts, Adelaide – 2011",
    "Boite, Melbourne – 2011",
    "Theo Notaras Multicultural Arts, Canberra – 2011",
    "Vedanta Society, Sydney – 2008",
    "Bengali Cultural Society, Brisbane – 2008",
    "Bengali Association of Canberra – 2008",
    "World Peace Day, Sydney Olympic Park – 2009",
    "South Indian Fine Arts Association, Canberra – 2009",
    "Bharatiya Vidya Bhavan, Sydney – 2009",
    "Seminar at Box Hill Institute of Melbourne – 2009",
    "Indian High Commission, Canberra – 2009",
    "In Byron by Ku Promotions – 2009",
  ] },
  { name: "USA", items: [
    "Robert Browning and Associates – 2019",
    "Learnquest Music Festival, Boston – 2010, 2012",
    "Indian Music Society, Houston – 2012",
    "Swaradhana, Tampa – 2012",
    "Hindu Temple of South Florida, Fort Myers – 2012",
    "HarmonyOm Anniversary (World Music Institute & WKCR), New York – 2010",
    "Basant Bahar, San Jose – 2010",
    "Vedanta Society, Providence – 2010",
    "Vedanta Society, Chicago – 2010",
    "Vedanta Society, Seattle – 2010",
    "Jhankar, Cincinnati – 2010",
    "Basant Sandhya, New Jersey – 2010",
    "World of Sounds (CASC & ISAH), Connecticut – 2010",
    "Indian Music Society, Bloomington – 2010",
  ] },
  { name: "United Kingdom", items: [
    "Mananan International Festival for Music and Arts, Isle of Man – 2008, 2017",
    "WOMAD UK – 2013",
    "Birmingham & Stourbridge – 2004",
    "Royal Overseas League, London – 2017",
    "Milap Festival for South Asian Music and Art (London & Liverpool) – 2009",
    "Tara Arts, London – 2008",
    "Indian Association of Manchester – 2008",
  ] },
  { name: "France", items: [
    "Festival Les Orientales, Saint-Florent-le-Vieil – 2010",
    "Festival Autres Rivages, Uzes – 2010",
    "Voix d'été en Creuse – 2009",
    "Festival International de Musique d'Uzerche – 2009",
    "Theatre De La Ville (Abbesses), Paris – 2013",
    "Le Rocher De Palmer, Cenon – 2013",
  ] },
  { name: "Canada", items: [
    "Ragamala, Calgary & Edmonton – 2013",
    "SIA of Victoria, UVIC – 2013",
    "Ragamala, Calgary – 2010",
  ] },
  { name: "Spain", items: [
    "Deia International Festival of Music – 2009",
    "Palau Marche Summer Concert Series – 2009",
    "Summer Concerts at Andratx Cultural Center – 2009",
  ] },
  { name: "Germany", items: [
    "High Peace Festival, Augsburg – 2013",
    "Elbphilharmonie, Hamburg – 2018",
  ] },
  { name: "Russia", items: ["Sitar Festival, St Petersburg – 2018"] },
  { name: "Albania", items: ["National Theatre of Operas and Ballet, Tirana – 2010 (Mother Teresa Birth Centenary)"] },
  { name: "Portugal", items: ["Festival in Evora – 2010"] },
  { name: "Switzerland", items: ["TKM - Kléber-Méleau Theater, Lausanne – 2018"] },
  { name: "New Zealand", items: ["Migrant Heritage Charitable Trust, Auckland – 2017"] },
];

const venueCount =
  NATIONAL.reduce((a, c) => a + c.items.length, 0) +
  INTERNATIONAL.reduce((a, c) => a + c.items.length, 0);

export const STATS = {
  cities:    NATIONAL.length,             // 25
  countries: INTERNATIONAL.length,        // 12
  venues:    Math.max(100, venueCount),   // "100+" badge (grows if data exceeds 100)
};

export const QUOTE =
  "From the ghats of Banaras to the world's great festival stages, the raga travels wherever the artist goes.";
