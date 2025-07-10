import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../pages/firebase"; // adjust if your path is different
import { doc, getDoc } from "firebase/firestore";

const CounselorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchCounselorDetails();
  }, [id]);

  const fetchCounselorDetails = async () => {
    try {
      const counselorRef = doc(db, "counselors", id);
      const docSnap = await getDoc(counselorRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCounselor({
          id: docSnap.id,
          name: data.name || "Unknown Counselor",
          title: data.title || "Licensed Therapist",
          specialties: Array.isArray(data.specialties) ? data.specialties : [],
          rating: typeof data.rating === "number" ? data.rating : 0,
          experience: data.experience || "0 years",
          price_per_session: typeof data.price_per_session === "number" ? data.price_per_session : 0,
          available: data.available || false,
          bio: data.bio || "No bio available",
          education: data.education || "Education information not available",
          languages: Array.isArray(data.languages) ? data.languages : ["English"],
          session_types: Array.isArray(data.session_types) ? data.session_types : [],
          profile_image: data.profile_image || "/placeholder.svg?height=200&width=200",
          availability: data.availability || {},
        });
      } else {
        console.log("No such counselor found!");
      }
    } catch (error) {
      console.error("Error fetching counselor details:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDay = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const getAvailableDays = () => {
    if (!counselor?.availability) return [];
    return Object.keys(counselor.availability).filter(
      (day) => Array.isArray(counselor.availability[day]) && counselor.availability[day].length > 0
    );
  };

  const handleBookSession = () => {
    if (!selectedDay || !selectedTime) {
      alert("Please select a day and time for your session");
      return;
    }
    
    // Here you would typically handle the booking logic
    alert(`Booking session with ${counselor.name} on ${formatDay(selectedDay)} at ${selectedTime}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/30 to-blue-50/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading counselor details...</p>
        </div>
      </div>
    );
  }

  if (!counselor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/30 to-blue-50/30">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Counselor not found</h3>
          <p className="text-gray-600 mb-4">The counselor you're looking for doesn't exist</p>
          <button
            onClick={() => navigate("/connect-counselors")}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Back to Counselors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/connect-counselors")}
          className="flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Counselors
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                {counselor.profile_image.includes("placeholder") ? (
                  <span className="text-4xl text-white font-bold">
                    {counselor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                ) : (
                  <img
                    src={counselor.profile_image}
                    alt={counselor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{counselor.name}</h1>
                <p className="text-xl text-white/90 mb-3">{counselor.title}</p>
                <div className="flex items-center justify-center md:justify-start mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(counselor.rating) ? "fill-current" : "text-white/30"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-white/90">{counselor.rating.toFixed(1)} Rating</span>
                </div>
                <p className="text-white/90">{counselor.experience} Experience</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                {/* About Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{counselor.bio}</p>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
                  <p className="text-gray-600">{counselor.education}</p>
                </div>

                {/* Specialties */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {counselor.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Session Types */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Types</h2>
                  <div className="flex flex-wrap gap-2">
                    {counselor.session_types.map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {counselor.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Pricing */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Pricing</h2>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${counselor.price_per_session}
                  </div>
                  <p className="text-gray-600">per session</p>
                </div>

                {/* Availability Status */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Availability Status</h2>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${
                      counselor.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        counselor.available ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    {counselor.available ? "Available for new clients" : "Not currently available"}
                  </span>
                </div>

                {/* Schedule */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly Schedule</h2>
                  <div className="space-y-3">
                    {getAvailableDays().map((day) => (
                      <div key={day} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{formatDay(day)}</h3>
                        <div className="flex flex-wrap gap-2">
                          {counselor.availability[day].map((time, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Section */}
                {counselor.available && (
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
                    <h2 className="text-xl font-bold mb-4">Book a Session</h2>
                    
                    {/* Day Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Select Day:</label>
                      <select
                        value={selectedDay}
                        onChange={(e) => {
                          setSelectedDay(e.target.value);
                          setSelectedTime(""); // Reset time when day changes
                        }}
                        className="w-full p-2 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-white/50"
                      >
                        <option value="">Choose a day</option>
                        {getAvailableDays().map((day) => (
                          <option key={day} value={day}>
                            {formatDay(day)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Time Selection */}
                    {selectedDay && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Select Time:</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full p-2 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-white/50"
                        >
                          <option value="">Choose a time</option>
                          {counselor.availability[selectedDay].map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button
                      onClick={handleBookSession}
                      disabled={!selectedDay || !selectedTime}
                      className="w-full bg-white text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Book Session - ${counselor.price_per_session}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorProfile;