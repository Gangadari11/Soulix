


//********************Just to check****************************** */
"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, query, where, getDocs, orderBy, doc, deleteDoc, updateDoc, arrayRemove, collectionGroup } from "firebase/firestore"
import { auth, db } from "./firebase"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [userMessages, setUserMessages] = useState([])
  const [userLikes, setUserLikes] = useState([])
  const [userComments, setUserComments] = useState([])
  const [userWishes, setUserWishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const [actionLoading, setActionLoading] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        fetchUserData(currentUser.uid)
      } else {
        navigate("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const fetchUserData = async (userId) => {
    try {
      // Fetch user's messages
      const messagesRef = collection(db, "kindness_messages")
      const messagesQuery = query(messagesRef, where("authorId", "==", userId), orderBy("createdAt", "desc"))
      const messagesSnapshot = await getDocs(messagesQuery)
      const messagesData = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setUserMessages(messagesData)

      // Fetch user's wishes
      const wishesRef = collection(db, "wish_candles")
      const wishesQuery = query(wishesRef, where("authorId", "==", userId), orderBy("createdAt", "desc"))
      const wishesSnapshot = await getDocs(wishesQuery)
      const wishesData = wishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setUserWishes(wishesData)

      // Fetch messages user has liked
      const likedMessagesRef = collection(db, "kindness_messages")
      const likedMessagesQuery = query(likedMessagesRef, where("likedBy", "array-contains", userId))
      const likedMessagesSnapshot = await getDocs(likedMessagesQuery)
      const likedMessagesData = likedMessagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setUserLikes(likedMessagesData)

      // Fetch user's comments using collectionGroup query
      const commentsQuery = query(
        collectionGroup(db, "comments"), 
        where("authorId", "==", userId),
        orderBy("createdAt", "desc")
      )
      const commentsSnapshot = await getDocs(commentsQuery)
      const commentsData = commentsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        messageId: doc.ref.parent.parent.id, // Get the parent message ID
        ...doc.data() 
      }))
      setUserComments(commentsData)

    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return
    
    setActionLoading(prev => ({ ...prev, [`delete-message-${messageId}`]: true }))
    
    try {
      await deleteDoc(doc(db, "kindness_messages", messageId))
      setUserMessages(prev => prev.filter(msg => msg.id !== messageId))
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Failed to delete message. Please try again.")
    } finally {
      setActionLoading(prev => ({ ...prev, [`delete-message-${messageId}`]: false }))
    }
  }

  const handleDeleteWish = async (wishId) => {
    if (!window.confirm("Are you sure you want to delete this wish?")) return
    
    setActionLoading(prev => ({ ...prev, [`delete-wish-${wishId}`]: true }))
    
    try {
      await deleteDoc(doc(db, "wish_candles", wishId))
      setUserWishes(prev => prev.filter(wish => wish.id !== wishId))
    } catch (error) {
      console.error("Error deleting wish:", error)
      alert("Failed to delete wish. Please try again.")
    } finally {
      setActionLoading(prev => ({ ...prev, [`delete-wish-${wishId}`]: false }))
    }
  }

  const handleDeleteComment = async (commentId, messageId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return
    
    setActionLoading(prev => ({ ...prev, [`delete-comment-${commentId}`]: true }))
    
    try {
      await deleteDoc(doc(db, "kindness_messages", messageId, "comments", commentId))
      setUserComments(prev => prev.filter(comment => comment.id !== commentId))
    } catch (error) {
      console.error("Error deleting comment:", error)
      alert("Failed to delete comment. Please try again.")
    } finally {
      setActionLoading(prev => ({ ...prev, [`delete-comment-${commentId}`]: false }))
    }
  }

  const handleRemoveLike = async (messageId) => {
    if (!window.confirm("Are you sure you want to remove your like?")) return
    
    setActionLoading(prev => ({ ...prev, [`remove-like-${messageId}`]: true }))
    
    try {
      const messageRef = doc(db, "kindness_messages", messageId)
      const message = userLikes.find(msg => msg.id === messageId)
      
      await updateDoc(messageRef, {
        likes: Math.max(0, (message.likes || 0) - 1),
        likedBy: arrayRemove(user.uid)
      })
      
      setUserLikes(prev => prev.filter(msg => msg.id !== messageId))
    } catch (error) {
      console.error("Error removing like:", error)
      alert("Failed to remove like. Please try again.")
    } finally {
      setActionLoading(prev => ({ ...prev, [`remove-like-${messageId}`]: false }))
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white font-bold">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.displayName || "User"}</h1>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Member since{" "}
                  {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {userMessages.length} messages
                </span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Info
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "messages"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Your Messages ({userMessages.length})
              </button>
              <button
                onClick={() => setActiveTab("likes")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "likes"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Your Likes ({userLikes.length})
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "comments"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Your Comments ({userComments.length})
              </button>
              <button
                onClick={() => setActiveTab("wishes")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "wishes"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Your Wishes ({userWishes.length})
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                      <p className="text-gray-900">{user?.displayName || "Not set"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                      <p className="text-gray-900">
                        {user?.metadata?.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
                      <p className="text-gray-900">
                        {user?.metadata?.lastSignInTime
                          ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{userMessages.length}</div>
                      <div className="text-sm text-green-700">Messages Shared</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{userLikes.length}</div>
                      <div className="text-sm text-blue-700">Messages Liked</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{userComments.length}</div>
                      <div className="text-sm text-purple-700">Comments Made</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{userWishes.length}</div>
                      <div className="text-sm text-orange-700">Wishes Made</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Messages</h3>
                  <button
                    onClick={() => navigate("/theworldyouneed")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Share New Message
                  </button>
                </div>

                {userMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-600 mb-4">Share your first message of kindness with the world</p>
                    <button
                      onClick={() => navigate("/theworldyouneed")}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Share a Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userMessages.map((message) => (
                      <MessageCard 
                        key={message.id} 
                        message={message} 
                        onDelete={handleDeleteMessage}
                        actionLoading={actionLoading}
                        showDelete={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "likes" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages You Liked</h3>
                {userLikes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No liked messages yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring and like messages that inspire you</p>
                    <button
                      onClick={() => navigate("/theworldyouneed")}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Explore Messages
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userLikes.map((message) => (
                      <MessageCard 
                        key={message.id} 
                        message={message} 
                        onRemoveLike={handleRemoveLike}
                        actionLoading={actionLoading}
                        showRemoveLike={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "comments" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Comments</h3>
                {userComments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💭</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No comments yet</h3>
                    <p className="text-gray-600 mb-4">Start commenting on messages that inspire you</p>
                    <button
                      onClick={() => navigate("/theworldyouneed")}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Explore Messages
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userComments.map((comment) => (
                      <CommentCard 
                        key={comment.id} 
                        comment={comment} 
                        onDelete={handleDeleteComment}
                        actionLoading={actionLoading}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishes" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Wishes</h3>
                  <button
                    onClick={() => navigate("/theworldyouneed")}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Make New Wish
                  </button>
                </div>

                {userWishes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🕯️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No wishes yet</h3>
                    <p className="text-gray-600 mb-4">Light your first candle and make a wish</p>
                    <button
                      onClick={() => navigate("/theworldyouneed")}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Make a Wish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userWishes.map((wish) => (
                      <WishCard 
                        key={wish.id} 
                        wish={wish} 
                        onDelete={handleDeleteWish}
                        actionLoading={actionLoading}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const MessageCard = ({ message, onDelete, onRemoveLike, actionLoading, showDelete = false, showRemoveLike = false }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">
              {message.isAnonymous ? "Anonymous" : message.authorName}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
            {message.category && (
              <>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-blue-600 capitalize">{message.category}</span>
              </>
            )}
          </div>
          <p className="text-gray-800 leading-relaxed">{message.content}</p>
        </div>
        <div className="flex gap-2 ml-4">
          {showDelete && (
            <button
              onClick={() => onDelete(message.id)}
              disabled={actionLoading[`delete-message-${message.id}`]}
              className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
              title="Delete message"
            >
              {actionLoading[`delete-message-${message.id}`] ? (
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
          {showRemoveLike && (
            <button
              onClick={() => onRemoveLike(message.id)}
              disabled={actionLoading[`remove-like-${message.id}`]}
              className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
              title="Remove like"
            >
              {actionLoading[`remove-like-${message.id}`] ? (
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          ❤️ {message.likes || 0} likes
        </span>
        <span className="flex items-center gap-1">
          💬 {message.commentCount || 0} comments
        </span>
      </div>
    </div>
  )
}

const CommentCard = ({ comment, onDelete, actionLoading }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <div className="border border-purple-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-purple-50/30">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💭</span>
            <span className="text-sm font-medium text-gray-600">
              {comment.authorName}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="text-gray-800 leading-relaxed">{comment.content}</p>
          <p className="text-xs text-gray-500 mt-2">On message ID: {comment.messageId}</p>
        </div>
        <button
          onClick={() => onDelete(comment.id, comment.messageId)}
          disabled={actionLoading[`delete-comment-${comment.id}`]}
          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50 ml-4"
          title="Delete comment"
        >
          {actionLoading[`delete-comment-${comment.id}`] ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

const WishCard = ({ wish, onDelete, actionLoading }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <div className="border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-orange-50/30">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🕯️</span>
            <span className="text-sm font-medium text-gray-600">
              {wish.isAnonymous ? "Anonymous wish" : `${wish.authorName}'s wish`}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{formatDate(wish.createdAt)}</span>
          </div>
          <p className="text-gray-800 leading-relaxed">{wish.message}</p>
        </div>
        <button
          onClick={() => onDelete(wish.id)}
          disabled={actionLoading[`delete-wish-${wish.id}`]}
          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50 ml-4"
          title="Delete wish"
        >
          {actionLoading[`delete-wish-${wish.id}`] ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          🙏 {wish.blessCount || 0} blessings
        </span>
      </div>
    </div>
  )
}

export default Profile