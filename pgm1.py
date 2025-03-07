import gensim.downloader as api
from gensim.models import KeyedVectors

# Step 1: Load a pre-trained Word2Vec model (using Gensim API for easy access)
# You can also load a local model by providing the path to the .bin file
# For example, Word2Vec Google News model:
# model = KeyedVectors.load_word2vec_format('path_to_your_model.bin', binary=True)

# Load a smaller pre-trained model via Gensim API
model = api.load("word2vec-google-news-300")  # Loading the Google News model

# Step 2: Perform vector arithmetic (example: "King" - "Man" + "Woman" = "Queen")
king_vector = model['king']
man_vector = model['man']
woman_vector = model['queen']

# Perform the vector operation: King - Man + Woman
result_vector = king_vector - man_vector + woman_vector

# Step 3: Find the word closest to the resulting vector (e.g., Queen)
result_word = model.most_similar([result_vector], topn=1)
print("Resulting word: ", result_word)
