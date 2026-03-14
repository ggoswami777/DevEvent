import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://gauravgoswami1304_db_user:R4o0euNeqarofyvf@cluster0.di26mr1.mongodb.net/';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true },
  overview: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, required: true, enum: ['online', 'offline', 'hybrid'] },
  audience: { type: String, required: true, trim: true },
  agenda: { type: [String], required: true },
  organizer: { type: String, required: true, trim: true },
  tags: { type: [String], required: true },
}, { timestamps: true });

EventSchema.pre('save', function () {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
});

const Event = mongoose.model('Event', EventSchema);

const events = [
  {
    title: "React Conf 2025",
    description: "The official React conference returns with a bang. Join core team members and community leaders for two days of talks, workshops, and deep dives into the future of React including Server Components, the new compiler, and React 19 patterns. Network with thousands of frontend engineers from around the globe.",
    overview: "Two days of cutting-edge React talks, workshops, and networking with the core team.",
    image: "/images/banner1.png",
    venue: "Fort Mason Center",
    location: "San Francisco, CA",
    date: "May 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
    mode: "hybrid",
    audience: "Frontend Developers, React Engineers, UI Architects",
    agenda: ["Keynote: React 19 and Beyond", "Server Components Deep Dive", "Performance Optimization Workshop", "Lunch & Networking", "Lightning Talks", "Panel: State Management in 2025", "Closing Remarks & Afterparty"],
    organizer: "Meta Open Source",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    title: "Next.js Global Summit",
    description: "The largest Next.js event ever. Hear from Vercel engineers about the latest in App Router, server actions, and edge computing. Hands-on labs cover deployment strategies, ISR patterns, and building production-grade apps with the newest features.",
    overview: "Learn from Vercel engineers about the future of full-stack web development with Next.js.",
    image: "/images/banner2.png",
    venue: "Austin Convention Center",
    location: "Austin, TX",
    date: "June 22-23, 2025",
    time: "10:00 AM - 5:00 PM",
    mode: "offline",
    audience: "Full Stack Developers, Web Engineers",
    agenda: ["Welcome & Keynote", "App Router Masterclass", "Server Actions Workshop", "Edge Computing Patterns", "Lunch Break", "Community Showcase", "Closing Panel"],
    organizer: "Vercel",
    tags: ["Next.js", "Vercel", "Full Stack"],
  },
  {
    title: "AI/ML Innovators Hackathon",
    description: "48 hours to build something incredible with AI. Teams of up to 4 compete to build the most innovative AI-powered application. Mentors from Google DeepMind, OpenAI, and Anthropic will be on site. Prizes totaling $50,000 for top projects.",
    overview: "A 48-hour hackathon focused on building innovative AI/ML applications with $50K in prizes.",
    image: "/images/banner3.png",
    venue: "Seattle Convention Center",
    location: "Seattle, WA",
    date: "July 10-12, 2025",
    time: "48 Hours",
    mode: "offline",
    audience: "ML Engineers, Data Scientists, AI Researchers",
    agenda: ["Team Formation & Kickoff", "Hacking Begins", "Midnight Mentoring Sessions", "Day 2 Check-ins", "Final Submissions", "Demo Presentations", "Awards Ceremony"],
    organizer: "AI Builders Collective",
    tags: ["AI", "Machine Learning", "Hackathon"],
  },
  {
    title: "CyberSec World 2025",
    description: "The premier cybersecurity conference featuring live hacking demos, CTF competitions, and talks from industry legends. Topics range from zero-day exploits to enterprise security architecture. Ideal for both red team and blue team professionals.",
    overview: "Live hacking demos, CTF competitions, and talks from the top minds in cybersecurity.",
    image: "/images/banner4.png",
    venue: "Marriott Marquis",
    location: "Washington, D.C.",
    date: "August 5-7, 2025",
    time: "8:00 AM - 7:00 PM",
    mode: "offline",
    audience: "Security Engineers, Penetration Testers, CISOs",
    agenda: ["Opening Keynote", "Zero-Day Research Track", "CTF Competition Begins", "Enterprise Security Workshop", "Red Team vs Blue Team Panel", "Bug Bounty Stories", "Networking Reception"],
    organizer: "CyberSec Foundation",
    tags: ["Cybersecurity", "InfoSec", "Hacking"],
  },
  {
    title: "CloudNative Con",
    description: "Everything Kubernetes, Docker, and cloud infrastructure. Deep technical talks on service mesh, observability, and platform engineering. Featuring maintainers from CNCF projects and SREs from top tech companies sharing battle-tested production patterns.",
    overview: "Deep technical talks on Kubernetes, Docker, and modern cloud infrastructure patterns.",
    image: "/images/banner5.png",
    venue: "McCormick Place",
    location: "Chicago, IL",
    date: "September 18-19, 2025",
    time: "9:00 AM - 5:30 PM",
    mode: "hybrid",
    audience: "DevOps Engineers, SREs, Platform Engineers",
    agenda: ["Kubernetes 2.0 Keynote", "Service Mesh Deep Dive", "Observability Workshop", "Platform Engineering Panel", "Lunch & Sponsor Expo", "GitOps in Practice", "Closing & Community Awards"],
    organizer: "CNCF",
    tags: ["Kubernetes", "Docker", "Cloud Native"],
  },
  {
    title: "TypeScript Masters Conference",
    description: "Level up your TypeScript skills with talks from the TS compiler team and community experts. Topics include advanced generics, type-level programming, performance tuning, and migrating large codebases. Perfect for intermediate to advanced developers.",
    overview: "Advanced TypeScript patterns, compiler internals, and type-level programming techniques.",
    image: "/images/banner1.png",
    venue: "The Fillmore",
    location: "Denver, CO",
    date: "October 3, 2025",
    time: "9:30 AM - 6:00 PM",
    mode: "offline",
    audience: "TypeScript Developers, Library Authors",
    agenda: ["What's New in TypeScript 6.0", "Advanced Generics Workshop", "Type-Level Programming", "Lunch & Lightning Talks", "Migrating Million-Line Codebases", "Performance & Bundle Optimization", "Q&A with the TS Team"],
    organizer: "TypeScript Community",
    tags: ["TypeScript", "JavaScript", "Types"],
  },
  {
    title: "Web3 Builders Meetup",
    description: "A hands-on evening for blockchain developers building the decentralized web. Live coding sessions cover Solidity smart contracts, wallet integrations, and DeFi protocols. Beer and pizza provided while you hack on real projects.",
    overview: "Hands-on evening meetup for blockchain developers building on Ethereum and Solana.",
    image: "/images/banner3.png",
    venue: "Wynwood Walls Venue",
    location: "Miami, FL",
    date: "October 20, 2025",
    time: "6:00 PM - 10:00 PM",
    mode: "offline",
    audience: "Blockchain Developers, DeFi Engineers",
    agenda: ["Doors Open & Networking", "Solidity Live Coding", "Wallet Integration Demo", "Pizza Break", "DeFi Protocol Workshop", "Open Hacking Session", "Wrap Up"],
    organizer: "Miami Web3 Guild",
    tags: ["Web3", "Blockchain", "DeFi"],
  },
  {
    title: "DevOps Days Portland",
    description: "A community-organized conference covering DevOps culture, automation, and reliability. Open space discussions, ignite talks, and workshops on CI/CD pipelines, infrastructure as code, and incident management from practitioners who live it daily.",
    overview: "Community-driven DevOps conference with open spaces, ignite talks, and workshops.",
    image: "/images/banner2.png",
    venue: "Revolution Hall",
    location: "Portland, OR",
    date: "November 8-9, 2025",
    time: "8:30 AM - 5:00 PM",
    mode: "offline",
    audience: "DevOps Engineers, SREs, Engineering Managers",
    agenda: ["Ignite Talks", "CI/CD Pipeline Workshop", "Open Space Discussions", "Lunch & Networking", "Infrastructure as Code Lab", "Incident Management Stories", "Closing & Happy Hour"],
    organizer: "DevOpsDays Foundation",
    tags: ["DevOps", "CI/CD", "Infrastructure"],
  },
  {
    title: "Flutter Forward India",
    description: "Google's Flutter framework takes center stage in India's largest cross-platform development event. Build beautiful native apps for mobile, web, and desktop from a single codebase. Featuring talks from GDEs and hands-on codelabs.",
    overview: "India's largest Flutter event with GDE talks, codelabs, and cross-platform workshops.",
    image: "/images/banner4.png",
    venue: "Bangalore International Exhibition Centre",
    location: "Bangalore, India",
    date: "November 22, 2025",
    time: "10:00 AM - 6:00 PM",
    mode: "hybrid",
    audience: "Mobile Developers, Cross-Platform Engineers",
    agenda: ["Keynote: Flutter 4.0", "Dart Language Updates", "Building Adaptive UIs Codelab", "Lunch & Community Showcase", "Flutter for Web Deep Dive", "State Management Shootout", "GDE Panel & Closing"],
    organizer: "Google Developer Groups India",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    title: "Data Engineering Summit",
    description: "Explore the modern data stack from ingestion to analytics. Sessions on Apache Spark, dbt, data lakehouse architectures, and real-time streaming. Hands-on labs with real datasets and mentorship from senior data engineers at FAANG companies.",
    overview: "Modern data stack deep dives covering Spark, dbt, lakehouse, and streaming architectures.",
    image: "/images/banner5.png",
    venue: "Moscone West",
    location: "San Francisco, CA",
    date: "December 4-5, 2025",
    time: "9:00 AM - 6:00 PM",
    mode: "offline",
    audience: "Data Engineers, Analytics Engineers, Data Architects",
    agenda: ["Keynote: The Modern Data Stack", "Apache Spark Optimization", "dbt Best Practices", "Lunch & Expo Hall", "Real-Time Streaming Workshop", "Data Lakehouse Architecture", "Panel: Career Paths in Data Engineering"],
    organizer: "Data Council",
    tags: ["Data Engineering", "Spark", "Analytics"],
  },
  {
    title: "Rust Systems Conf",
    description: "For developers who care about performance and safety. Talks cover embedded systems, WebAssembly, async runtime internals, and building production services in Rust. Meet maintainers of popular crates and learn patterns used in production at Microsoft and AWS.",
    overview: "Systems programming conference covering Rust in production, embedded, and WebAssembly.",
    image: "/images/banner1.png",
    venue: "The Armory",
    location: "Minneapolis, MN",
    date: "January 16, 2026",
    time: "9:00 AM - 5:00 PM",
    mode: "offline",
    audience: "Systems Programmers, Embedded Engineers, Rust Developers",
    agenda: ["Keynote: Rust in 2026", "Async Runtime Internals", "Embedded Rust Workshop", "Lunch & Crate Showcase", "WebAssembly with Rust", "Production Rust at Scale", "Community Lightning Talks"],
    organizer: "Rust Foundation",
    tags: ["Rust", "Systems", "WebAssembly"],
  },
  {
    title: "Open Source Contributor Day",
    description: "Spend a day contributing to real open source projects. Mentors from popular repositories guide first-time and experienced contributors through issues, PRs, and the open source workflow. Great for building your portfolio and giving back.",
    overview: "Guided open source contribution day with mentors from popular projects.",
    image: "/images/banner3.png",
    venue: "GitHub HQ",
    location: "San Francisco, CA",
    date: "February 14, 2026",
    time: "10:00 AM - 4:00 PM",
    mode: "hybrid",
    audience: "All Developers, Open Source Enthusiasts",
    agenda: ["Welcome & Project Introductions", "Choose Your Project / Mentor Matching", "Contribution Sprint - Morning", "Lunch & Git Workshop", "Contribution Sprint - Afternoon", "PR Reviews & Merges", "Celebration & Swag Distribution"],
    organizer: "GitHub",
    tags: ["Open Source", "Git", "Community"],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Event.deleteMany({});
    console.log('Cleared existing events');

    for (const event of events) {
      await Event.create(event);
      console.log(`Created: ${event.title}`);
    }

    console.log(`Seeded ${events.length} events`);
    await mongoose.disconnect();
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
