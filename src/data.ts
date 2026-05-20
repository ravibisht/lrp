import { ManifestoItem, MemePoster } from "./types";

export const CUSTOM_AVATARS = [
  { id: "hero-1", name: "The Chalk Warrior", icon: "🛡️", desc: "A pure-breed border soldier" },
  { id: "hero-2", name: "Chappal Sniper", icon: "🩴", desc: "Equipped with tactical leather footwear" },
  { id: "hero-3", name: "The Spotter", icon: "🔦", desc: "Shines high-beam lighting into dark corners" },
  { id: "hero-4", name: "Mr. Baygon", icon: "💨", desc: "Armed with pressure spray nozzles" },
  { id: "hero-5", name: "The Disciplined Student", icon: "📚", desc: "Wakes up at 6 AM, works on proper desk" },
  { id: "hero-6", name: "Noodle Inspector", icon: "🥣", desc: "Stops midnight damp-corner instant noodle rituals" },
];

export const MANIFESTO_ITEMS: ManifestoItem[] = [
  {
    id: 1,
    unhumorousTitle: "Eradication of Corner Crawling",
    comedyDetail: "Lying in bed in a dark corners scrolling infinite short-videos is classified as Level 4 Infestation. LRP pledges to install focus-lights and motivational mirrors in every bedroom corner of youth.",
    punishment: "Failure results in 2 hours of forced sitting on a wooden chair with zero back support."
  },
  {
    id: 2,
    unhumorousTitle: "The Desk Alignment Act",
    comedyDetail: "Every work table must have a physical line drawn in chalk dividing 'productivity' from 'junk snacks'. No snack plate shall cross the border into the laptop zone.",
    punishment: "Impounding of the half-eaten snack plate by the local LRP Block President."
  },
  {
    id: 3,
    unhumorousTitle: "National Sleeping Hours Regularization",
    comedyDetail: "Sleeping at 5 AM and waking up at 3 PM claiming you are 'thinking about your future' is prohibited. LRP will introduce automated alarms chanting Vedic high-tempo chants at 7:30 AM.",
    punishment: "Automatic shutdown of home Wi-Fi and router starting from 1:00 AM."
  },
  {
    id: 4,
    unhumorousTitle: "Instant Noodle Customs Inspection",
    comedyDetail: "Cooking Maggi noodles specifically in the darkness of 2 AM without turning on the kitchen light is standard CJP behavior. Dark-cooking is banned.",
    punishment: "Forced to eat sugar-free wheat biscuits instead of masala instant noodles."
  },
  {
    id: 5,
    unhumorousTitle: "Mandatory Chalk Borders",
    comedyDetail: "All PG rooms, hostel rooms, and youth apartments will receive a yearly ration of 5 boxes of Lakshman Rekha premium non-dusting chalk of extreme boundaries.",
    punishment: "None. It's a benefit! However, eating the chalk is strictly prohibited."
  },
  {
    id: 6,
    unhumorousTitle: "Chappal Defense Readiness",
    comedyDetail: "Every citizen under 30 is mandated to keep a single heavy rubber slipper (Bata brand preferred) within 1.5 meters of their vicinity for instant kinetic dispatch operations.",
    punishment: "A citation for 'Defeasance of Perimeter Security'."
  }
];

export const MEME_POSTERS: MemePoster[] = [
  {
    id: 1,
    title: "The Great Wall of Chalk",
    slogan: "He cannot cross, because he has no discipline!",
    hindiSlogan: "CHALK KI REKHA, DEKHA NAHI JO DEKHA!",
    type: "warning",
    vibe: "Dramatic Border Security"
  },
  {
    id: 2,
    title: "Chappal Strike force",
    slogan: "High-velocity defense against lazy corner crawlers.",
    hindiSlogan: "CJP KORNER KA EK HI JAWAB... CHAPPAL!",
    type: "guerilla",
    vibe: "Tactical Gen-Z Action"
  },
  {
    id: 3,
    title: "Anti-Moisture Campaign",
    slogan: "Dampness breeds lazy cockroaches. Open your curtains!",
    hindiSlogan: "KHOLE RAHO KHIDKI, COCKROACH SE MUKTI!",
    type: "motivational",
    vibe: "Household Revolution"
  },
  {
    id: 4,
    title: "Abki Baar Border Sarkar",
    slogan: "Choose lines, not laziness. Claim your desk space today.",
    hindiSlogan: "ABKI BAAR, CHALK SARKAR!",
    type: "rally",
    vibe: "Grand Election Chant"
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Where do you spend most of your time when studying/working?",
    options: [
      { text: "On a proper table and chair under a highly-illuminated white light.", points: 10, label: "LRP Soldier" },
      { text: "Huddled under a blanket in the darkest corner of the bed, phone screen brightness set to 2%.", points: 0, label: "Cockroach" },
      { text: "Slightly slouched on a sofa, looking at the ceiling thinking about dinner.", points: 5, label: "Borderline Case" }
    ]
  },
  {
    id: 2,
    question: "Your friend says: 'Bhai, standard 3-course dinner boring hai, corner me baith ke cold leftover pizza khate hain.' What do you do?",
    options: [
      { text: "Immediately hit them with a rubber chappal. Boundaries must be respected!", points: 10, label: "LRP Soldier" },
      { text: "Join them immediately, turning off the lights to feel ultimate comfort in the shadows.", points: 0, label: "Cockroach" },
      { text: "Tell them to put it on a plate first, then sit near a window.", points: 6, label: "Borderline Case" }
    ]
  },
  {
    id: 3,
    question: "What is your reaction to seeing an active, white chalk line drawn across a threshold?",
    options: [
      { text: "Extreme respect. It represents law, order, and absolute space division.", points: 10, label: "LRP Soldier" },
      { text: "Intense anxiety. My body physically refuses to cross it; I feel a magnetic force pushing me into damp crevices.", points: 0, label: "Cockroach" },
      { text: "I wonder who left their chalk box open, let's play tic-tac-toe.", points: 5, label: "Borderline Case" }
    ]
  },
  {
    id: 4,
    question: "At what time do your daily 'planning session for the next 5 years' occur?",
    options: [
      { text: "9:00 AM, with coffee and a clean journal.", points: 10, label: "LRP Soldier" },
      { text: "3:15 AM, while staring at the moist ceiling fan after scrolling standard 150 reels.", points: 0, label: "Cockroach" },
      { text: "During the afternoon shower while wasting water.", points: 5, label: "Borderline Case" }
    ]
  }
];
