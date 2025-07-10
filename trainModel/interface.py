import pickle
import re

def load_model(filepath='emotion_classifier.pkl'):
    """Load the trained model"""
    try:
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        model = model_data['model']
        vectorizer = model_data['vectorizer']
        label_encoder = model_data['label_encoder']
        
        print(f"✅ Model loaded successfully from {filepath}")
        print(f"Available emotions: {list(label_encoder.classes_)}")
        return model, vectorizer, label_encoder
    
    except FileNotFoundError:
        print(f"❌ Error: {filepath} not found!")
        return None, None, None
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None, None, None

def preprocess_text(text):
    """Clean and preprocess text data"""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s\']', '', text)
    text = ' '.join(text.split())
    return text

def predict_emotion(text, model, vectorizer, label_encoder):
    """Predict emotion for a single text"""
    # Preprocess text
    processed_text = preprocess_text(text)
    
    # Vectorize
    text_vector = vectorizer.transform([processed_text])
    
    # Predict
    prediction = model.predict(text_vector)[0]
    probabilities = model.predict_proba(text_vector)[0]
    
    # Get emotion name
    emotion = label_encoder.inverse_transform([prediction])[0]
    
    # Get top 3 probabilities
    emotion_probs = {}
    for i, prob in enumerate(probabilities):
        emotion_name = label_encoder.inverse_transform([i])[0]
        emotion_probs[emotion_name] = prob
    
    return emotion, emotion_probs

def main():
    print("🔍 Testing Emotion Classifier Model")
    print("=" * 40)
    
    # Load model
    model, vectorizer, label_encoder = load_model()
    
    if model is None:
        return
    
    print("\n📝 Enter text to analyze (or 'quit' to exit):")
    print("-" * 40)
    
    while True:
        text = input("\nEnter text: ").strip()
        
        if text.lower() in ['quit', 'exit', 'q']:
            print("👋 Goodbye!")
            break
        
        if not text:
            print("⚠️ Please enter some text")
            continue
        
        try:
            # Predict emotion
            emotion, probs = predict_emotion(text, model, vectorizer, label_encoder)
            
            print(f"\n🎯 Predicted Emotion: {emotion.upper()}")
            print("📊 Confidence scores:")
            
            # Sort by probability and show top 3
            sorted_probs = sorted(probs.items(), key=lambda x: x[1], reverse=True)
            for i, (emo, prob) in enumerate(sorted_probs[:3]):
                percentage = prob * 100
                bar = "█" * int(percentage / 5)  # Simple bar chart
                print(f"   {emo:12} {percentage:5.1f}% {bar}")
        
        except Exception as e:
            print(f"❌ Error predicting emotion: {e}")

if __name__ == "__main__":
    main()