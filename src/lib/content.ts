// Every figure on this page is taken from the public Google Play listings (checked September 2026).
// Update these numbers here, not in the components.

export const site = {
  name: "Ruhi IT Hub",
  email: "info@ruhiithub.com",
  city: "Lahore",
  country: "Pakistan",
  url: "https://ruhiithub.com",
  checkedOn: "September 2026",
  privacyUpdated: "September 2026",
} as const;

export const apps = {
  qalbify: {
    name: "Qalbify",
    arabic: "قلب",
    meaning: "qalb, the heart",
    tagline: "A music free home for Quran, nasheeds and lectures.",
    icon: "/apps/qalbify/icon.png",
    store: "https://play.google.com/store/apps/details?id=com.ruhiithub.qalbify",
    rating: "5.0",
    reviews: 17,
    installs: "500+",
    updated: "Sep 2026",
  },
  ayyami: {
    name: "Ayyami",
    arabic: "أيامي",
    meaning: "ayyami, my days",
    tagline: "Cycle tracking that answers the fiqh question too.",
    icon: "/apps/ayyami/icon.png",
    store: "https://play.google.com/store/apps/details?id=com.ruhiithub.ayyami",
    installs: "10+",
    updated: "Jul 2026",
  },
} as const;

export const qalbifySteps = [
  {
    id: "home",
    title: "Featured today",
    body: "Curated recitations by renowned Qaris, with listening progress that picks up exactly where you stopped.",
    screen: "/apps/qalbify/screen-home.jpg",
    alt: "Qalbify home screen showing Surah Al Kahf as the featured recitation, a continue listening list and top creators.",
  },
  {
    id: "filters",
    title: "Find the right voice",
    body: "Filter by reciter, language and category. Arabic, Urdu, English, Turkish, Malay and Indonesian sit side by side.",
    screen: "/apps/qalbify/screen-filters.jpg",
    alt: "Qalbify advanced filters listing reciters, six languages and categories such as Quran, Duas and Nasheeds.",
  },
  {
    id: "library",
    title: "A library that works offline",
    body: "Favourites and downloads live on the device, so a Surah plays on a flight or in a basement masjid with no signal.",
    screen: "/apps/qalbify/screen-favourites.jpg",
    alt: "Qalbify favourites screen with 24 saved tracks filtered by Quran, Duas and Nasheeds.",
  },
  {
    id: "studio",
    title: "A studio for scholars",
    body: "Creators upload, tag and publish their own audio, then earn through a transparent model that never relies on ad revenue.",
    screen: "/apps/qalbify/screen-editor.jpg",
    alt: "Qalbify creator screen for editing an audio title, language, category, tags and published status.",
  },
] as const;

export const ayyamiNotes = [
  {
    n: 1,
    title: "Every interval classified",
    body: "Menses, lochia, istihada and valid tuhr are worked out from the logged history using Hanafi rulings.",
  },
  {
    n: 2,
    title: "Hijri and Gregorian together",
    body: "Each month reads in both calendars, so dates line up with the questions women actually ask.",
  },
  {
    n: 3,
    title: "Your full history",
    body: "Step back through every past month, in calendar or list view, each interval with its ruling.",
  },
] as const;

export const services = [
  {
    title: "Mobile apps",
    body: "Offline audio, background playback, reminders and secure sign in with email, phone OTP, Google or Apple.",
    shipped: ["qalbify", "ayyami"],
  },
  {
    title: "Product and interface design",
    body: "Calm screens for daily worship: Hijri dates, prayer schedules, Arabic and Urdu content set with care.",
    shipped: ["qalbify", "ayyami"],
  },
  {
    title: "Backends and creator tools",
    body: "Upload pipelines, metadata editing, publishing states and progress tracking for the people who supply your content.",
    shipped: ["qalbify"],
  },
  {
    title: "Monetization without ad networks",
    body: "Revenue models that keep earnings clean for creators and keep interruptions out of worship.",
    shipped: ["qalbify"],
  },
  {
    title: "Fiqh logic and privacy",
    body: "Rulings encoded from one clearly stated madhab, data encrypted at rest and never sold or shared.",
    shipped: ["ayyami"],
  },
] as const;

const qalbifyUpdatedLong = "September 2026"; // keep in step with apps.qalbify.updated

export const process = [
  {
    title: "Intention",
    icon: "compass",
    body: "We start with who the app serves and what it must never do. Ads, dark patterns and data flows get ruled out on day one.",
  },
  {
    title: "Design",
    icon: "pen-new-square",
    body: "Flows and screens in your users' languages and calendars, reviewed with people from the community they are for.",
  },
  {
    title: "Build",
    icon: "code",
    body: "App, backend and admin tools built together, with privacy and offline use designed in from the first screen.",
  },
  {
    title: "Launch and care",
    icon: "rocket-2",
    body: `Store listing, release and steady updates after launch. Qalbify shipped its latest update in ${qalbifyUpdatedLong}.`,
  },
] as const;

export const faqs = [
  {
    q: "Do you only build Islamic apps?",
    a: "Our live products serve Muslim audiences, and that is where our depth is. We also take on projects outside the faith space when they share the same values: no dark patterns, privacy by default and respect for the user's time.",
  },
  {
    q: "What does a project with you include?",
    a: "Product and interface design, the mobile app, the backend and admin tools it needs, the store listing and release, and updates after launch. You can also bring us in for one part, such as design only.",
  },
  {
    q: "How do you handle fiqh and religious content?",
    a: "We work from a clearly stated school and clearly stated sources, present rulings as guidance and point users to a qualified scholar for complex cases, the way Ayyami does. For new domains we bring the scholars you trust into the review loop.",
  },
  {
    q: "How can an app earn without ads?",
    a: "Subscriptions, one time purchases, donations and creator revenue shares all work. Qalbify offers creators a transparent monetization model that avoids the uncertainty of ad based revenue.",
  },
  {
    q: "What happens to our users' data?",
    a: "We collect the minimum the features need, encrypt what we store and never sell or share it. That is the standard Ayyami ships with for some of the most sensitive data a person has.",
  },
  {
    q: "Do you build for iOS as well as Android?",
    a: "Our live apps are on Google Play today. We plan every project for both Android and iOS and release to the stores your users are on.",
  },
] as const;
