

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import pickle
import numpy as np
import re
import warnings

# Suppress sklearn version warnings for production
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# Load .env variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API keys
MOVIE_API_KEY = os.getenv("MOVIE_API")

# Load the trained emotion classification model
try:
    with open('emotion_classifier.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    # Handle different model formats
    if isinstance(model_data, dict):
        emotion_model = model_data.get('model')
        vectorizer = model_data.get('vectorizer')
        label_encoder = model_data.get('label_encoder')
    else:
        # If it's just the model
        emotion_model = model_data
        vectorizer = None
        label_encoder = None
    
    print("✅ Emotion classification model loaded successfully!")
    print(f"📊 Model type: {type(emotion_model).__name__}")
    if vectorizer:
        print(f"🔤 Vectorizer type: {type(vectorizer).__name__}")
    if label_encoder:
        print(f"🏷️  Label encoder available")
    
    MODEL_LOADED = True
except Exception as e:
    print(f"❌ Error loading model: {e}")
    print("Using fallback keyword-based emotion detection")
    MODEL_LOADED = False
    emotion_model = None
    vectorizer = None
    label_encoder = None

# Fallback emotion keywords if model fails
EMOTION_KEYWORDS = {
    'happy': ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'good', 'awesome', 'love', 'perfect', 'brilliant', 'excellent', 'cheerful', 'delighted', 'elated'],
    'sad': ['sad', 'depressed', 'down', 'upset', 'crying', 'hurt', 'broken', 'lonely', 'empty', 'hopeless', 'miserable', 'blue', 'gloomy', 'melancholy', 'sorrowful'],
    'angry': ['angry', 'mad', 'furious', 'annoyed', 'irritated', 'frustrated', 'rage', 'hate', 'disgusted', 'outraged', 'livid', 'fuming', 'enraged'],
    'anxious': ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic', 'stress', 'overwhelmed', 'tense', 'fearful', 'uneasy', 'restless', 'concerned'],
    'calm': ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'balanced', 'centered', 'quiet', 'still', 'zen', 'composed', 'mellow']
}

# Emotion label mapping (flexible for different model outputs)
EMOTION_LABELS = {
    0: 'happy',
    1: 'sad', 
    2: 'angry',
    3: 'anxious',
    4: 'calm',
    # Alternative mappings
    'joy': 'happy',
    'sadness': 'sad',
    'anger': 'angry',
    'fear': 'anxious',
    'neutral': 'calm'
}

def preprocess_text(text):
    """Clean and preprocess text for emotion classification"""
    try:
        # Convert to lowercase
        text = text.lower()
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    except Exception as e:
        print(f"Text preprocessing error: {e}")
        return text.lower()

def classify_emotion_with_model(text):
    """Classify emotion using the trained model"""
    try:
        if not MODEL_LOADED or emotion_model is None:
            print("Model not loaded, using fallback")
            return classify_emotion_fallback(text)
        
        # Preprocess the text
        processed_text = preprocess_text(text)
        print(f"Processed text: {processed_text}")
        
        # Transform text using vectorizer
        if vectorizer:
            text_vector = vectorizer.transform([processed_text])
        else:
            # If no vectorizer, try to use the model directly (might fail)
            print("No vectorizer available, using fallback")
            return classify_emotion_fallback(text)
        
        # Predict emotion
        prediction = emotion_model.predict(text_vector)[0]
        print(f"Raw prediction: {prediction} (type: {type(prediction)})")
        
        # Handle different prediction formats
        emotion = None
        
        # If prediction is numeric
        if isinstance(prediction, (int, np.integer)):
            emotion = EMOTION_LABELS.get(int(prediction))
        # If prediction is string
        elif isinstance(prediction, (str, np.str_)):
            emotion_str = str(prediction).lower()
            emotion = EMOTION_LABELS.get(emotion_str, emotion_str)
        # If prediction is numpy array
        elif isinstance(prediction, np.ndarray):
            if len(prediction) > 0:
                pred_val = prediction[0]
                if isinstance(pred_val, (int, np.integer)):
                    emotion = EMOTION_LABELS.get(int(pred_val))
                else:
                    emotion = str(pred_val).lower()
        
        # Fallback if emotion not recognized
        if not emotion or emotion not in ['happy', 'sad', 'angry', 'anxious', 'calm']:
            print(f"Unrecognized emotion: {emotion}, using fallback")
            return classify_emotion_fallback(text)
        
        # Get prediction probabilities for confidence
        confidence = 75  # Default confidence
        if hasattr(emotion_model, 'predict_proba'):
            try:
                probabilities = emotion_model.predict_proba(text_vector)[0]
                confidence = float(max(probabilities)) * 100
                print(f"Confidence from probabilities: {confidence}")
            except Exception as e:
                print(f"Error getting probabilities: {e}")
                confidence = 75
        
        print(f"Final emotion: {emotion}, confidence: {confidence}")
        return emotion, min(float(confidence), 95.0)
        
    except Exception as e:
        print(f"Model prediction error: {e}")
        import traceback
        traceback.print_exc()
        return classify_emotion_fallback(text)

def classify_emotion_fallback(text):
    """Fallback emotion classification using keywords"""
    print("Using keyword-based fallback classification")
    text_lower = text.lower()
    emotion_scores = {}
    
    for emotion, keywords in EMOTION_KEYWORDS.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        if score > 0:
            emotion_scores[emotion] = score
    
    if emotion_scores:
        predicted_emotion = max(emotion_scores, key=emotion_scores.get)
        confidence = min((emotion_scores[predicted_emotion] / len(text_lower.split())) * 100, 85)
        print(f"Fallback result: {predicted_emotion}, confidence: {confidence}")
        return predicted_emotion, float(confidence)
    else:
        print("No keywords matched, defaulting to calm")
        return 'calm', 60.0

# === EMOTION CLASSIFICATION ENDPOINT ===
@app.route('/api/classify-emotion', methods=['POST'])
def classify_emotion_endpoint():
    """Classify emotion from user input text"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "Text is required"}), 400
        
        user_text = data['text'].strip()
        
        if not user_text:
            return jsonify({"error": "Text cannot be empty"}), 400
        
        if len(user_text) > 1000:
            return jsonify({"error": "Text too long (max 1000 characters)"}), 400
        
        print(f"\n=== EMOTION ANALYSIS ===")
        print(f"Input text: {user_text}")
        
        # Classify emotion using trained model or fallback
        emotion, confidence = classify_emotion_with_model(user_text)
        
        # Ensure all values are JSON serializable
        emotion = str(emotion)
        confidence = float(confidence)
        
        print(f"Final result: {emotion} ({confidence}% confidence)")
        print(f"Method: {'model' if MODEL_LOADED else 'keywords'}")
        print("========================\n")
        
        return jsonify({
            "emotion": emotion,
            "confidence": round(confidence, 1),
            "method": "model" if MODEL_LOADED else "keywords",
            "success": True
        })
            
    except Exception as e:
        print(f"Emotion classification error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

# === MEDIA ENDPOINTS ===
@app.route('/api/books', methods=['GET'])
def get_books():
    emotion = request.args.get("emotion", "")
    print(f"Fetching books for emotion: {emotion}")
    
    # Emotion-based search queries
    emotion_queries = {
        'happy': 'happiness motivation success inspiration positive thinking',
        'sad': 'healing hope inspiration comfort self help recovery',
        'angry': 'mindfulness meditation peace calm anger management',
        'anxious': 'anxiety relief mindfulness calm peace stress management',
        'calm': 'mindfulness philosophy wisdom peace meditation zen'
    }
    
    query = emotion_queries.get(emotion, 'self help mindfulness')
    max_results = 15
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&maxResults={max_results}&printType=books"

    try:
        res = requests.get(url, timeout=15)
        res.raise_for_status()
        books = res.json().get("items", [])
        print(f"Found {len(books)} books")

        results = []
        for book in books:
            info = book.get("volumeInfo", {})
            
            # Skip books without proper titles
            if not info.get("title"):
                continue
            
            # Get the best available thumbnail
            image_links = info.get("imageLinks", {})
            thumbnail = (
                image_links.get("large") or 
                image_links.get("medium") or 
                image_links.get("small") or 
                image_links.get("thumbnail") or 
                image_links.get("smallThumbnail") or
                ""
            )
            
            # Create better preview links
            preview_link = (
                info.get("previewLink") or 
                info.get("infoLink") or
                f"https://www.google.com/search?q={info.get('title', '').replace(' ', '+')}"
            )
            
            # Clean description
            description = info.get("description", "No description available.")
            if len(description) > 300:
                description = description[:300] + "..."
            
            results.append({
                "title": info.get("title", "Unknown Title"),
                "authors": info.get("authors", ["Unknown Author"]),
                "description": description,
                "categories": info.get("categories", ["General"]),
                "previewLink": preview_link,
                "thumbnail": thumbnail,
                "publishedDate": info.get("publishedDate", ""),
                "pageCount": info.get("pageCount", ""),
                "averageRating": info.get("averageRating", ""),
                "emotion_match": emotion
            })
            
        print(f"Returning {len(results)} processed books")
        return jsonify(results)

    except Exception as e:
        print(f"Books API error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/songs', methods=['GET'])
def get_songs():
    emotion = request.args.get("emotion", "")
    print(f"Fetching songs for emotion: {emotion}")
    
    # Emotion-based search queries
    emotion_queries = {
        'happy': 'upbeat pop dance celebration energetic happy',
        'sad': 'healing hope acoustic soul inspirational emotional',
        'angry': 'calm meditation ambient peaceful relaxing chill',
        'anxious': 'relaxing ambient meditation calm peaceful soothing',
        'calm': 'ambient classical peaceful meditation nature zen'
    }
    
    query = emotion_queries.get(emotion, 'calm')
    url = f"https://api.deezer.com/search?q={query}&limit=20"

    try:
        res = requests.get(url, timeout=15)
        res.raise_for_status()
        results = res.json().get("data", [])
        print(f"Found {len(results)} songs")

        songs = []
        seen_tracks = set()  # Avoid duplicates
        
        for song in results:
            track_key = f"{song.get('title', '')}-{song.get('artist', {}).get('name', '')}"
            if track_key in seen_tracks:
                continue
            seen_tracks.add(track_key)
            
            # Get the best available artwork
            album_info = song.get("album", {})
            artwork = (
                album_info.get("cover_xl") or
                album_info.get("cover_big") or
                album_info.get("cover_medium") or
                album_info.get("cover_small") or
                ""
            )
            
            # Create links to listen to the song
            deezer_link = song.get("link", "")
            search_query = f"{song.get('title', '')} {song.get('artist', {}).get('name', '')}"
            spotify_search = f"https://open.spotify.com/search/{search_query.replace(' ', '%20')}"
            youtube_search = f"https://www.youtube.com/results?search_query={search_query.replace(' ', '+')}"
            
            songs.append({
                "trackName": song.get("title", "Unknown Track"),
                "artistName": song.get("artist", {}).get("name", "Unknown Artist"),
                "album": album_info.get("title", "Unknown Album"),
                "artwork": artwork,
                "previewUrl": song.get("preview", ""),  # 30-second preview
                "previewLink": deezer_link or spotify_search,  # Full song link
                "duration": song.get("duration", 0),
                "youtubeLink": youtube_search,
                "spotifyLink": spotify_search,
                "emotion_match": emotion
            })
            
            if len(songs) >= 15:  # Limit results
                break

        print(f"Returning {len(songs)} processed songs")
        return jsonify(songs)

    except Exception as e:
        print(f"Songs API error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies', methods=['GET'])
def get_movies():
    emotion = request.args.get("emotion", "")
    print(f"Fetching movies for emotion: {emotion}")
    
    # Emotion-based search queries
    emotion_queries = {
        'happy': 'comedy adventure feel good romantic comedy musical',
        'sad': 'inspirational drama uplifting hope healing emotional',
        'angry': 'peaceful nature meditation calm zen documentary',
        'anxious': 'calm peaceful nature meditation relaxing family',
        'calm': 'documentary nature peaceful philosophical calm meditation'
    }
    
    query = emotion_queries.get(emotion, 'calm')
    
    if not MOVIE_API_KEY:
        print("Movie API key not configured")
        return jsonify({"error": "Movie API key not configured"}), 500
        
    url = f"https://api.themoviedb.org/3/search/movie?api_key={MOVIE_API_KEY}&query={query}&include_adult=false"

    try:
        res = requests.get(url, timeout=15)
        res.raise_for_status()
        results = res.json().get("results", [])
        print(f"Found {len(results)} movies")

        movies = []
        for movie in results:
            # Skip movies without proper titles or posters
            if not movie.get("title") or not movie.get("poster_path"):
                continue
                
            # Get high-quality poster
            poster_path = movie.get("poster_path")
            poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else ""
            
            # Create viewing links
            tmdb_link = f"https://www.themoviedb.org/movie/{movie.get('id', '')}"
            imdb_search = f"https://www.imdb.com/find?q={movie.get('title', '').replace(' ', '+')}"
            netflix_search = f"https://www.netflix.com/search?q={movie.get('title', '').replace(' ', '%20')}"
            
            # Clean overview
            overview = movie.get("overview", "No description available.")
            if len(overview) > 300:
                overview = overview[:300] + "..."
            
            movies.append({
                "id": movie.get("id", ""),
                "title": movie.get("title", "Unknown Movie"),
                "overview": overview,
                "poster": poster_url,
                "backdrop": f"https://image.tmdb.org/t/p/w1280{movie.get('backdrop_path')}" if movie.get('backdrop_path') else "",
                "release_date": movie.get("release_date", "Unknown"),
                "rating": movie.get("vote_average", "N/A"),
                "vote_count": movie.get("vote_count", 0),
                "popularity": movie.get("popularity", 0),
                "previewLink": tmdb_link,
                "imdbLink": imdb_search,
                "netflixLink": netflix_search,
                "emotion_match": emotion
            })
            
            if len(movies) >= 12:  # Limit results
                break

        print(f"Returning {len(movies)} processed movies")
        return jsonify(movies)

    except Exception as e:
        print(f"Movies API error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "MindBloom API",
        "version": "3.1.0",
        "model_loaded": MODEL_LOADED,
        "model_type": type(emotion_model).__name__ if emotion_model else None,
        "vectorizer_available": vectorizer is not None,
        "features": ["emotion_classification", "media_recommendations"]
    })

if __name__ == "__main__":
    print("🧠 MindBloom Emotion Classification API Starting...")
    print(f"🤖 Model Status: {'Loaded' if MODEL_LOADED else 'Using Fallback'}")
    if MOVIE_API_KEY:
        print("🎬 Movie API Key loaded")
    else:
        print("⚠️  Movie API Key not found - movie recommendations will be limited")
    print("🌐 Server running on http://localhost:5000")
    print("✨ Features: Emotion Classification, Media Recommendations")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
