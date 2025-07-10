import { collection, addDoc } from "firebase/firestore"
import { db } from "../pages/firebase.js"

const sampleCounselors = [
  {
    name: "Dr. Sarah Chen",
    title: "Licensed Clinical Psychologist",
    bio: "Dr. Chen specializes in cognitive-behavioral therapy and mindfulness-based interventions. She has extensive experience helping clients manage anxiety and develop healthy coping strategies.",
    specialties: ["Anxiety", "Depression", "Mindfulness", "Stress Management"],
    credentials: ["PhD in Clinical Psychology", "Licensed in CA, NY", "Certified Mindfulness Instructor"],
    languages: ["English", "Mandarin"],
    experience: 12,
    pricePerSession: 120,
    rating: 4.9,
    totalReviews: 156,
    availability: "Available Today",
    courses: [
      {
        title: "Anxiety Management Techniques",
        description: "Learn practical strategies to manage anxiety in daily life",
        duration: "45 minutes",
        videoId: "1Evwgu369Jw",
      },
      {
        title: "Mindfulness for Beginners",
        description: "Introduction to mindfulness meditation practices",
        duration: "30 minutes",
        videoId: "ZToicYcHIOU",
      },
    ],
  },
  {
    name: "Michael Rodriguez, LMFT",
    title: "Licensed Marriage & Family Therapist",
    bio: "Michael focuses on helping couples and families improve communication and resolve conflicts. He uses evidence-based approaches to strengthen relationships.",
    specialties: ["Relationships", "Family Therapy", "Communication", "Conflict Resolution"],
    credentials: ["MA in Marriage & Family Therapy", "Licensed LMFT", "Gottman Method Certified"],
    languages: ["English", "Spanish"],
    experience: 8,
    pricePerSession: 100,
    rating: 4.8,
    totalReviews: 203,
    availability: "Available This Week",
    courses: [
      {
        title: "Healthy Communication Skills",
        description: "Learn effective communication techniques for relationships",
        duration: "40 minutes",
        videoId: "8-JXOnFOXQk",
      },
      {
        title: "Conflict Resolution Strategies",
        description: "Tools for resolving conflicts constructively",
        duration: "35 minutes",
        videoId: "v4-dibJw1N4",
      },
    ],
  },
  {
    name: "Dr. Aisha Patel",
    title: "Psychiatrist & Meditation Teacher",
    bio: "Dr. Patel combines traditional psychiatry with mindfulness and meditation practices. She specializes in integrative approaches to mental health.",
    specialties: ["Meditation", "ADHD", "Bipolar Disorder", "Holistic Mental Health"],
    credentials: ["MD Psychiatry", "Board Certified", "500-Hour Yoga Teacher Training"],
    languages: ["English", "Hindi", "Gujarati"],
    experience: 15,
    pricePerSession: 150,
    rating: 4.9,
    totalReviews: 89,
    availability: "Available This Week",
    courses: [
      {
        title: "Meditation for Mental Health",
        description: "Using meditation as a tool for mental wellness",
        duration: "50 minutes",
        videoId: "86HUcX8ZtAk",
      },
      {
        title: "ADHD Management Strategies",
        description: "Practical approaches to managing ADHD symptoms",
        duration: "45 minutes",
        videoId: "JiwZQNYlGQI",
      },
    ],
  },
]

export const seedCounselors = async () => {
  try {
    console.log("Seeding counselors...")

    for (const counselor of sampleCounselors) {
      await addDoc(collection(db, "counselors"), counselor)
      console.log(`Added counselor: ${counselor.name}`)
    }

    console.log("✅ All counselors seeded successfully!")
  } catch (error) {
    console.error("❌ Error seeding counselors:", error)
  }
}

// Uncomment the line below and run this file to seed the database
 seedCounselors()
