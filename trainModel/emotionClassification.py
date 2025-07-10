# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>Emotion Classification Model</title>
#     <script src="https://cdnjs.cloudflare.com/ajax/libs/tensorflow/4.10.0/tf.min.js"></script>
#     <style>
#         * {
#             margin: 0;
#             padding: 0;
#             box-sizing: border-box;
#         }

#         body {
#             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
#             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
#             min-height: 100vh;
#             padding: 20px;
#         }

#         .container {
#             max-width: 1200px;
#             margin: 0 auto;
#             background: rgba(255, 255, 255, 0.95);
#             border-radius: 20px;
#             padding: 30px;
#             box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
#             backdrop-filter: blur(10px);
#         }

#         h1 {
#             text-align: center;
#             color: #333;
#             margin-bottom: 30px;
#             font-size: 2.5em;
#             background: linear-gradient(45deg, #667eea, #764ba2);
#             -webkit-background-clip: text;
#             -webkit-text-fill-color: transparent;
#             background-clip: text;
#         }

#         .section {
#             margin-bottom: 30px;
#             padding: 25px;
#             background: white;
#             border-radius: 15px;
#             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
#             border: 1px solid rgba(102, 126, 234, 0.1);
#         }

#         .section h2 {
#             color: #444;
#             margin-bottom: 20px;
#             font-size: 1.5em;
#             display: flex;
#             align-items: center;
#             gap: 10px;
#         }

#         .section h2::before {
#             content: '';
#             width: 4px;
#             height: 25px;
#             background: linear-gradient(45deg, #667eea, #764ba2);
#             border-radius: 2px;
#         }

#         .controls {
#             display: grid;
#             grid-template-columns: 1fr auto;
#             gap: 15px;
#             align-items: end;
#         }

#         button {
#             background: linear-gradient(45deg, #667eea, #764ba2);
#             color: white;
#             border: none;
#             padding: 12px 24px;
#             border-radius: 10px;
#             cursor: pointer;
#             font-size: 16px;
#             font-weight: 600;
#             transition: all 0.3s ease;
#             box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
#         }

#         button:hover {
#             transform: translateY(-2px);
#             box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
#         }

#         button:disabled {
#             opacity: 0.6;
#             cursor: not-allowed;
#             transform: none;
#         }

#         textarea {
#             width: 100%;
#             padding: 15px;
#             border: 2px solid #e0e0e0;
#             border-radius: 10px;
#             font-size: 16px;
#             font-family: inherit;
#             resize: vertical;
#             transition: border-color 0.3s ease;
#         }

#         textarea:focus {
#             outline: none;
#             border-color: #667eea;
#             box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
#         }

#         .status {
#             padding: 15px;
#             margin: 15px 0;
#             border-radius: 10px;
#             font-weight: 500;
#             text-align: center;
#             transition: all 0.3s ease;
#         }

#         .status.info {
#             background: linear-gradient(45deg, #3498db, #2980b9);
#             color: white;
#             animation: pulse 2s infinite;
#         }

#         .status.success {
#             background: linear-gradient(45deg, #2ecc71, #27ae60);
#             color: white;
#         }

#         .status.error {
#             background: linear-gradient(45deg, #e74c3c, #c0392b);
#             color: white;
#         }

#         @keyframes pulse {
#             0%, 100% { opacity: 1; }
#             50% { opacity: 0.8; }
#         }

#         .metrics {
#             display: grid;
#             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
#             gap: 15px;
#             margin-top: 20px;
#         }

#         .metric {
#             background: linear-gradient(45deg, #f8f9fa, #e9ecef);
#             padding: 20px;
#             border-radius: 10px;
#             text-align: center;
#             border: 1px solid rgba(102, 126, 234, 0.1);
#         }

#         .metric-value {
#             font-size: 2em;
#             font-weight: bold;
#             color: #667eea;
#             margin-bottom: 5px;
#         }

#         .metric-label {
#             color: #666;
#             font-size: 0.9em;
#         }

#         .prediction-result {
#             background: linear-gradient(45deg, #667eea, #764ba2);
#             color: white;
#             padding: 25px;
#             border-radius: 15px;
#             margin-top: 20px;
#             text-align: center;
#             box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
#         }

#         .prediction-result h3 {
#             font-size: 1.5em;
#             margin-bottom: 10px;
#             text-transform: capitalize;
#         }

#         .confidence {
#             font-size: 1.2em;
#             opacity: 0.9;
#         }

#         .data-preview {
#             max-height: 300px;
#             overflow-y: auto;
#             background: #f8f9fa;
#             padding: 15px;
#             border-radius: 10px;
#             font-family: 'Courier New', monospace;
#             font-size: 14px;
#             border: 1px solid #e0e0e0;
#         }

#         .emotion-stats {
#             display: grid;
#             grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
#             gap: 10px;
#             margin-top: 15px;
#         }

#         .emotion-count {
#             background: white;
#             padding: 15px;
#             border-radius: 10px;
#             text-align: center;
#             border: 2px solid;
#             transition: transform 0.3s ease;
#         }

#         .emotion-count:hover {
#             transform: scale(1.05);
#         }

#         .emotion-joy { border-color: #f39c12; }
#         .emotion-sadness { border-color: #3498db; }
#         .emotion-anger { border-color: #e74c3c; }
#         .emotion-fear { border-color: #9b59b6; }
#         .emotion-love { border-color: #e91e63; }
#         .emotion-surprise { border-color: #00bcd4; }

#         .progress-bar {
#             width: 100%;
#             height: 10px;
#             background: #e0e0e0;
#             border-radius: 5px;
#             overflow: hidden;
#             margin: 10px 0;
#         }

#         .progress-fill {
#             height: 100%;
#             background: linear-gradient(45deg, #667eea, #764ba2);
#             width: 0%;
#             transition: width 0.3s ease;
#         }
#     </style>
# </head>
# <body>
#     <div class="container">
#         <h1>🤖 Emotion Classification Model</h1>
        
#         <div class="section">
#             <h2>📊 Dataset Information</h2>
#             <div id="datasetInfo">
#                 <div class="data-preview" id="dataPreview">Loading dataset...</div>
#                 <div class="emotion-stats" id="emotionStats"></div>
#             </div>
#         </div>

#         <div class="section">
#             <h2>🏋️‍♂️ Model Training</h2>
#             <div class="controls">
#                 <div>
#                     <label>Training Parameters:</label>
#                     <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px;">
#                         <div>
#                             <label>Epochs: <input type="number" id="epochs" value="50" min="10" max="200" style="width: 60px; padding: 5px;"></label>
#                         </div>
#                         <div>
#                             <label>Batch Size: <input type="number" id="batchSize" value="16" min="8" max="64" style="width: 60px; padding: 5px;"></label>
#                         </div>
#                         <div>
#                             <label>Learning Rate: <input type="number" id="learningRate" value="0.001" step="0.0001" min="0.0001" max="0.01" style="width: 80px; padding: 5px;"></label>
#                         </div>
#                     </div>
#                 </div>
#                 <button onclick="trainModel()" id="trainBtn">Train Model</button>
#             </div>
#             <div id="trainingStatus"></div>
#             <div class="progress-bar">
#                 <div class="progress-fill" id="progressFill"></div>
#             </div>
#             <div class="metrics" id="trainingMetrics"></div>
#         </div>

#         <div class="section">
#             <h2>🧪 Test Your Model</h2>
#             <div class="controls">
#                 <div>
#                     <label for="testInput">Enter a sentence to classify:</label>
#                     <textarea id="testInput" rows="3" placeholder="e.g., I'm feeling really happy today because I got promoted at work!"></textarea>
#                 </div>
#                 <button onclick="classifyText()" id="classifyBtn" disabled>Classify</button>
#             </div>
#             <div id="predictionResult"></div>
#         </div>
#     </div>

#     <script>
#         // Dataset from the uploaded file
#         const rawData = `im feeling rather rotten so im not very ambitious right now;sadness
# im updating my blog because i feel shitty;sadness
# i never make her separate from me because i don t ever want her to feel like i m ashamed with her;sadness
# i left with my bouquet of red and yellow tulips under my arm feeling slightly more optimistic than when i arrived;joy
# i was feeling a little vain when i did this one;sadness
# i cant walk into a shop anywhere where i do not feel uncomfortable;fear
# i felt anger when at the end of a telephone call;anger
# i explain why i clung to a relationship with a boy who was in many ways immature and uncommitted despite the excitement i should have been feeling for getting accepted into the masters program at the university of virginia;joy
# i like to have the same breathless feeling as a reader eager to see what will happen next;joy
# i jest i feel grumpy tired and pre menstrual which i probably am but then again its only been a week and im about as fit as a walrus on vacation for the summer;anger
# i don t feel particularly agitated;fear
# i feel beautifully emotional knowing that these women of whom i knew just a handful were holding me and my baba on our journey;sadness
# i pay attention it deepens into a feeling of being invaded and helpless;fear
# i just feel extremely comfortable with the group of people that i dont even need to hide myself;joy
# i find myself in the odd position of feeling supportive of;love
# i was feeling as heartbroken as im sure katniss was;sadness
# i feel a little mellow today;joy
# i feel like my only role now would be to tear your sails with my pessimism and discontent;sadness
# i feel just bcoz a fight we get mad to each other n u wanna make a publicity n let the world knows about our fight;anger
# i feel like reds and purples are just so rich and kind of perfect;joy
# im not sure the feeling of loss will ever go away but it may dull to a sweet feeling of nostalgia at what i shared in this life with my dad and the luck i had to have a dad for years;sadness
# i feel like ive gotten to know many of you through comments and emails and for that im appreciative and glad you are a part of this little space;joy
# i survey my own posts over the last few years and only feel pleased with vague snippets of a few of them only feel that little bits of them capture what its like to be me or someone like me in dublin in the st century;joy
# i also tell you in hopes that anyone who is still feeling stigmatized or ashamed of their mental health issues will let go of the stigma let go of the shame;sadness
# i don t feel guilty like i m not going to be able to cook for him;sadness
# i hate it when i feel fearful for absolutely no reason;fear
# i am feeling outraged it shows everywhere;anger
# i stole a book from one of my all time favorite authors and now i feel like a rotten person;sadness
# i do feel insecure sometimes but who doesnt;fear
# i highly recommend visiting on a wednesday if youre able because its less crowded so you get to ask the farmers more questions without feeling rude for holding up a line;anger
# ive been missing him and feeling so restless at home thinking of him;fear
# i posted on my facebook page earlier this week ive been feeling a little grumpy and out of sorts the past few days;anger
# i start to feel emotional;sadness
# i feel so cold a href http irish;anger
# i feel like i m defective or something for not having baby fever;sadness
# i feel more virtuous than when i eat veggies dipped in hummus;joy
# i feel very honoured to be included in a magzine which prioritises health and clean living so highly im curious do any of you read magazines concerned with health and clean lifestyles such as the green parent;joy
# i spent the last two weeks of school feeling miserable;sadness
# im feeling very peaceful about our wedding again now after having;joy
# i had been talking to coach claudia barcomb and coach ali boe for a long time and they both made me feel very welcomed at union;joy
# i feel if i completely hated things i d exercise my democratic right speak my mind in what ever ways possible and try to enact a change;anger
# i feel humiliated embarrassed or foolish i will remember that others have felt the same way because of the same kinds of things and i will be kind and helpful and accepting;sadness
# i feel reassured that i am dealing with my diet in the right way and that all is good;joy
# i feel i have to agree with her even though i can imagine some rather unpleasant possible cases;sadness
# im in such a happy mood today i feel almost delighted and i havent done anything different today then i normally have it is wonderful;joy
# im feeling really out of place and irritated;anger
# i also know that i feel nothing than a friendly affection to them too;joy
# i feel like i had a rather productive weekend and i cant always say that no matter how much i get done;joy
# im feeling insecure at the moment;fear
# i was feeling pretty anxious all day but my first day at work was a very good day and that helped a lot;fear
# i stood up to you i finally stood up to you and now i feel like im being punished if i could go back and do it again;sadness
# i feel a little nervous i go to the gym;fear
# i feel like i could go into any situation and become successful because i ve been competing all my life explained schaub in an interview with the a href http bleacherreport;joy
# i can t stop the anxiety i feel when i m alone when i ve got no distractions;sadness
# im trying to feel out my house style now that im living on my own and have creative carte blanche;joy
# i have tried to see what it would be like if i liked one of my girl friends but it has never really worked and i can only ever feel an emotional connection to them because they are my friends;sadness
# i had every intention of doing more gardening this morning while it was still cool but i was just feeling so rotten;sadness
# i have a good feeling about this so i am excited;joy
# i feel like i am just starting to understand the blessings that come from being submissive to the will of the father;sadness
# i think about the things ive said and the stuff i have done it makes me feel disgusted in myself when i should be making you happy and smile which i was far from doing;anger
# i woke up yesterday monday morning feeling a little depressed;sadness
# i feel so embarrassed;sadness
# i spent wandering around still kinda dazed and not feeling particularly sociable but because id been in hiding for a couple for days and it was getting to be a little unhealthy i made myself go down to the cross and hang out with folks;joy
# i can honestly say that after each sistahs chat i feel invigorated and blessed;joy
# i still feel stupid to be in that class this is all cause off pbss fault;sadness
# i feel a little stunned but can t imagine what the folks who were working in the studio up until this morning are feeling;surprise
# i admit im feeling a little bit unloved at this point;sadness
# i feel a bit stressed even though all the things i have going on are fun;anger
# im feeling pretty anxious;fear
# i feel shocked and sad at the fact that there are so many sick people;surprise
# i think they have always been proponents of the idea and it is just slightly possible that his feelings for a particularly charming new england girl have brought him around to their way of thinking;joy
# i feel like a naughty school girl because i am falling behind;love
# i am right handed however i play billiards left handed naturally so me trying to play right handed feels weird;surprise
# i can feel that they are kind friendly and can understand my feelings;joy
# i were to go overseas or cross the border then i become a foreigner and will feel that way but never in my beloved land;love
# i feel disgusted in any man in power who talks about electricity being a problem in his area and says even my own house has similar problems;anger
# i feel transcendant and splendid;joy
# i finally arrived home a couple of hours later feeling somewhat exhausted dehydrated and even sun burnt;sadness
# i am feeling totally relaxed and comfy;joy
# i want each of you to feel my gentle embrace;love
# i feel privileged in my world;joy`.trim();

#         let model;
#         let tokenizer;
#         let labelEncoder;
#         let maxSequenceLength = 100;

#         // Parse dataset
#         function parseDataset() {
#             const lines = rawData.split('\n');
#             const data = [];
#             const labels = [];
            
#             lines.forEach(line => {
#                 const parts = line.split(';');
#                 if (parts.length === 2) {
#                     data.push(parts[0].trim());
#                     labels.push(parts[1].trim());
#                 }
#             });
            
#             return { data, labels };
#         }

#         // Simple tokenizer
#         function createTokenizer(texts) {
#             const wordIndex = { '<PAD>': 0, '<UNK>': 1 };
#             let currentIndex = 2;
            
#             texts.forEach(text => {
#                 const words = text.toLowerCase().split(/\s+/);
#                 words.forEach(word => {
#                     word = word.replace(/[^\w]/g, '');
#                     if (word && !wordIndex[word]) {
#                         wordIndex[word] = currentIndex++;
#                     }
#                 });
#             });
            
#             return {
#                 wordIndex,
#                 textsToSequences: function(texts) {
#                     return texts.map(text => {
#                         const words = text.toLowerCase().split(/\s+/);
#                         return words.map(word => {
#                             word = word.replace(/[^\w]/g, '');
#                             return this.wordIndex[word] || 1; // Use UNK token for unknown words
#                         }).filter(index => index > 0);
#                     });
#                 }
#             };
#         }

#         // Pad sequences
#         function padSequences(sequences, maxLength) {
#             return sequences.map(seq => {
#                 if (seq.length > maxLength) {
#                     return seq.slice(0, maxLength);
#                 } else {
#                     return [...seq, ...Array(maxLength - seq.length).fill(0)];
#                 }
#             });
#         }

#         // Initialize dataset display
#         function initializeDataset() {
#             const { data, labels } = parseDataset();
            
#             // Show data preview
#             const preview = data.slice(0, 10).map((text, i) => 
#                 `${i + 1}. "${text}" → ${labels[i]}`
#             ).join('\n');
            
#             document.getElementById('dataPreview').textContent = 
#                 `Dataset contains ${data.length} samples\n\nSample entries:\n${preview}\n\n...and ${data.length - 10} more entries`;
            
#             // Show emotion statistics
#             const emotionCounts = {};
#             labels.forEach(label => {
#                 emotionCounts[label] = (emotionCounts[label] || 0) + 1;
#             });
            
#             const statsHTML = Object.entries(emotionCounts)
#                 .sort(([,a], [,b]) => b - a)
#                 .map(([emotion, count]) => 
#                     `<div class="emotion-count emotion-${emotion}">
#                         <div style="font-weight: bold; font-size: 1.2em;">${count}</div>
#                         <div style="text-transform: capitalize; color: #666;">${emotion}</div>
#                     </div>`
#                 ).join('');
            
#             document.getElementById('emotionStats').innerHTML = statsHTML;
#         }

#         // Train model
#         async function trainModel() {
#             const trainBtn = document.getElementById('trainBtn');
#             const classifyBtn = document.getElementById('classifyBtn');
#             const statusDiv = document.getElementById('trainingStatus');
#             const progressFill = document.getElementById('progressFill');
#             const metricsDiv = document.getElementById('trainingMetrics');
            
#             trainBtn.disabled = true;
#             classifyBtn.disabled = true;
            
#             try {
#                 statusDiv.innerHTML = '<div class="status info">🚀 Preparing dataset...</div>';
                
#                 const { data, labels } = parseDataset();
                
#                 // Create tokenizer
#                 tokenizer = createTokenizer(data);
#                 const sequences = tokenizer.textsToSequences(data);
#                 const paddedSequences = padSequences(sequences, maxSequenceLength);
                
#                 // Create label encoder
#                 const uniqueLabels = [...new Set(labels)];
#                 labelEncoder = {};
#                 uniqueLabels.forEach((label, index) => {
#                     labelEncoder[label] = index;
#                 });
                
#                 const encodedLabels = labels.map(label => labelEncoder[label]);
                
#                 // Convert to tensors
#                 const xs = tf.tensor2d(paddedSequences);
#                 const ys = tf.oneHot(encodedLabels, uniqueLabels.length);
                
#                 statusDiv.innerHTML = '<div class="status info">🏗️ Building neural network...</div>';
                
#                 // Create model
#                 model = tf.sequential({
#                     layers: [
#                         tf.layers.embedding({
#                             inputDim: Object.keys(tokenizer.wordIndex).length,
#                             outputDim: 128,
#                             inputLength: maxSequenceLength
#                         }),
#                         tf.layers.lstm({ units: 64, dropout: 0.5, recurrentDropout: 0.5 }),
#                         tf.layers.dense({ units: 32, activation: 'relu' }),
#                         tf.layers.dropout({ rate: 0.5 }),
#                         tf.layers.dense({ units: uniqueLabels.length, activation: 'softmax' })
#                     ]
#                 });
                
#                 // Compile model
#                 const learningRate = parseFloat(document.getElementById('learningRate').value);
#                 model.compile({
#                     optimizer: tf.train.adam(learningRate),
#                     loss: 'categoricalCrossentropy',
#                     metrics: ['accuracy']
#                 });
                
#                 statusDiv.innerHTML = '<div class="status info">🎯 Training model...</div>';
                
#                 const epochs = parseInt(document.getElementById('epochs').value);
#                 const batchSize = parseInt(document.getElementById('batchSize').value);
                
#                 // Train model
#                 const history = await model.fit(xs, ys, {
#                     epochs: epochs,
#                     batchSize: batchSize,
#                     validationSplit: 0.2,
#                     shuffle: true,
#                     callbacks: {
#                         onEpochEnd: (epoch, logs) => {
#                             const progress = ((epoch + 1) / epochs) * 100;
#                             progressFill.style.width = progress + '%';
                            
#                             metricsDiv.innerHTML = `
#                                 <div class="metric">
#                                     <div class="metric-value">${epoch + 1}/${epochs}</div>
#                                     <div class="metric-label">Epoch</div>
#                                 </div>
#                                 <div class="metric">
#                                     <div class="metric-value">${(logs.loss * 100).toFixed(2)}%</div>
#                                     <div class="metric-label">Loss</div>
#                                 </div>
#                                 <div class="metric">
#                                     <div class="metric-value">${(logs.accuracy * 100).toFixed(1)}%</div>
#                                     <div class="metric-label">Accuracy</div>
#                                 </div>
#                                 <div class="metric">
#                                     <div class="metric-value">${(logs.val_accuracy * 100).toFixed(1)}%</div>
#                                     <div class="metric-label">Val Accuracy</div>
#                                 </div>
#                             `;
#                         }
#                     }
#                 });
                
#                 statusDiv.innerHTML = '<div class="status success">✅ Model trained successfully!</div>';
#                 classifyBtn.disabled = false;
                
#                 // Cleanup tensors
#                 xs.dispose();
#                 ys.dispose();
                
#             } catch (error) {
#                 statusDiv.innerHTML = `<div class="status error">❌ Training failed: ${error.message}</div>`;
#                 console.error('Training error:', error);
#             } finally {
#                 trainBtn.disabled = false;
#             }
#         }

#         // Classify text
#         async function classifyText() {
#             const input = document.getElementById('testInput').value.trim();
#             const resultDiv = document.getElementById('predictionResult');
            
#             if (!input) {
#                 resultDiv.innerHTML = '<div class="status error">Please enter some text to classify.</div>';
#                 return;
#             }
            
#             if (!model) {
#                 resultDiv.innerHTML = '<div class="status error">Please train the model first.</div>';
#                 return;
#             }
            
#             try {
#                 // Tokenize input
#                 const sequences = tokenizer.textsToSequences([input]);
#                 const paddedSequences = padSequences(sequences, maxSequenceLength);
                
#                 // Make prediction
#                 const inputTensor = tf.tensor2d(paddedSequences);
#                 const prediction = model.predict(inputTensor);
#                 const probabilities = await prediction.data();
                
#                 // Get predicted class
#                 const maxProbIndex = probabilities.indexOf(Math.max(...probabilities));
#                 const predictedLabel = Object.keys(labelEncoder).find(key => labelEncoder[key] === maxProbIndex);
#                 const confidence = (probabilities[maxProbIndex] * 100).toFixed(1);
                
#                 // Display result
#                 resultDiv.innerHTML = `
#                     <div class="prediction-result">
#                         <h3>Predicted Emotion: ${predictedLabel}</h3>
#                         <div class="confidence">Confidence: ${confidence}%</div>
#                     </div>
#                 `;
                
#                 // Cleanup tensors
#                 inputTensor.dispose();
#                 prediction.dispose();
                
#             } catch (error) {
#                 resultDiv.innerHTML = `<div class="status error">❌ Classification failed: ${error.message}</div>`;
#                 console.error('Classification error:', error);
#             }
#         }

#         // Initialize when page loads
#         document.addEventListener('DOMContentLoaded', function() {
#             initializeDataset();
            
#             // Add some example sentences for testing
#             const examples = [
#                 "I'm so excited about my vacation next week!",
#                 "I feel really down today and don't want to do anything.",
#                 "This movie is making me so angry, the plot makes no sense!",
#                 "I'm scared about the job interview tomorrow.",
#                 "I love spending time with my family on weekends.",
#                 "I can't believe she actually said yes to marry me!"
#             ];
            
#             document.getElementById('testInput').placeholder = 
#                 "Try one of these examples:\n" + examples.join("\n") + "\n\nOr write your own sentence...";
#         });

#         // Add keyboard shortcut for classification
#         document.getElementById('testInput').addEventListener('keydown', function(e) {
#             if (e.ctrlKey && e.key === 'Enter') {
#                 classifyText();
#             }
#         });
#     </script>
# </body>
# </html>