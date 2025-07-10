import { useState } from "react"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "./firebase" // Adjust path as needed

const SeedCounselors = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const counselorsData = [
    {
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma", "Mindfulness"],
      experience: 12,
      rating: 4.9,
      totalReviews: 127,
      pricePerSession: 150,
      availability: "Available Today",
      bio: "Dr. Johnson specializes in cognitive behavioral therapy and mindfulness-based interventions. She has over 12 years of experience helping individuals overcome anxiety, depression, and trauma.",
      education: ["PhD in Clinical Psychology - Stanford University", "MA in Psychology - UC Berkeley"],
      credentials: ["Licensed Clinical Psychologist", "Certified CBT Therapist"],
      languages: ["English", "Spanish"],
      sessionTypes: ["Individual", "Couples", "Group"],
      location: "San Francisco, CA (Online Available)"
    },
    {
      name: "Dr. Michael Chen",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Couples Therapy", "Family Therapy"],
      experience: 8,
      rating: 4.8,
      totalReviews: 89,
      pricePerSession: 130,
      availability: "Available This Week",
      bio: "Dr. Chen focuses on relationship dynamics and family systems. He uses evidence-based approaches to help couples and families build stronger, healthier connections.",
      education: ["PhD in Marriage & Family Therapy - USC", "MS in Counseling Psychology - UCLA"],
      credentials: ["Licensed Marriage & Family Therapist", "Certified Gottman Therapist"],
      languages: ["English", "Mandarin"],
      sessionTypes: ["Couples", "Family", "Individual"],
      location: "Los Angeles, CA (Online Available)"
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Licensed Clinical Social Worker",
      specialties: ["Trauma", "PTSD", "Addiction", "Mindfulness"],
      experience: 15,
      rating: 4.9,
      totalReviews: 203,
      pricePerSession: 140,
      availability: "Available Today",
      bio: "Dr. Rodriguez is a trauma specialist with extensive experience in EMDR and somatic therapy. She helps clients heal from trauma and develop healthy coping strategies.",
      education: ["PhD in Clinical Social Work - Columbia University", "MSW - NYU"],
      credentials: ["Licensed Clinical Social Worker", "EMDR Certified Therapist"],
      languages: ["English", "Spanish"],
      sessionTypes: ["Individual", "Group"],
      location: "New York, NY (Online Available)"
    },
    {
      name: "Dr. James Wilson",
      title: "Licensed Professional Counselor",
      specialties: ["Depression", "Anxiety", "Men's Issues", "Career Counseling"],
      experience: 10,
      rating: 4.7,
      totalReviews: 156,
      pricePerSession: 120,
      availability: "Available This Week",
      bio: "Dr. Wilson specializes in working with men's mental health issues and career-related stress. He provides a supportive environment for personal growth and development.",
      education: ["PhD in Counseling Psychology - University of Texas", "MA in Psychology - Rice University"],
      credentials: ["Licensed Professional Counselor", "Career Development Facilitator"],
      languages: ["English"],
      sessionTypes: ["Individual", "Group"],
      location: "Austin, TX (Online Available)"
    },
    {
      name: "Dr. Lisa Thompson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "OCD", "Phobias", "Mindfulness"],
      experience: 14,
      rating: 4.8,
      totalReviews: 178,
      pricePerSession: 160,
      availability: "Available Next Week",
      bio: "Dr. Thompson specializes in anxiety disorders and OCD treatment using exposure and response prevention therapy combined with mindfulness techniques.",
      education: ["PhD in Clinical Psychology - Harvard University", "BA in Psychology - Yale University"],
      credentials: ["Licensed Clinical Psychologist", "OCD Specialist"],
      languages: ["English", "French"],
      sessionTypes: ["Individual"],
      location: "Boston, MA (Online Available)"
    },
    {
      name: "Dr. Robert Kim",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Cultural Issues", "Identity", "Depression"],
      experience: 9,
      rating: 4.6,
      totalReviews: 94,
      pricePerSession: 135,
      availability: "Available Today",
      bio: "Dr. Kim helps individuals and couples navigate cultural identity issues and relationship challenges with cultural sensitivity and understanding.",
      education: ["PhD in Marriage & Family Therapy - Pepperdine University", "MA in Psychology - UCLA"],
      credentials: ["Licensed Marriage & Family Therapist", "Multicultural Counseling Certificate"],
      languages: ["English", "Korean"],
      sessionTypes: ["Individual", "Couples"],
      location: "Seattle, WA (Online Available)"
    }
  ]

  const seedDatabase = async () => {
    setLoading(true)
    setMessage("")

    try {
      const counselorsCollection = collection(db, "counselors")
      let successCount = 0

      for (const counselor of counselorsData) {
        await addDoc(counselorsCollection, {
          ...counselor,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        successCount++
      }

      setMessage(`✅ Successfully added ${successCount} counselors to the database!`)
    } catch (error) {
      console.error("Error seeding counselors:", error)
      setMessage(`❌ Error seeding database: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Seed Counselors Database</h1>
            <p className="text-gray-600">
              Click the button below to populate your database with sample counselor data.
              This should only be done once.
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl ${
              message.includes('✅') 
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={seedDatabase}
              disabled={loading}
              className={`px-8 py-4 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Seeding Database...
                </div>
              ) : (
                "Seed Counselors Database"
              )}
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <h3 className="font-semibold mb-2">What this will add:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>6 sample counselors with detailed profiles</li>
              <li>Various specialties (Anxiety, Depression, Trauma, etc.)</li>
              <li>Ratings, reviews, and availability status</li>
              <li>Professional credentials and education</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeedCounselors