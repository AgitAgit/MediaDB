import sys
import json
import io
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Get the book_id and the file path from the command-line arguments
book_id = sys.argv[1]
file_path = sys.argv[2]

# Load the book data from the JSON file
with open(file_path, 'r', encoding='utf-8') as f:
    all_books = json.load(f)

# Convert the list of books to a DataFrame
df_books = pd.DataFrame(all_books)

# Fill NaN values with an empty string to avoid JSON parsing errors
df_books = df_books.fillna('')

# Combine the title, authors, categories, and language into one feature (handling missing values)
df_books['combined_features'] = df_books.apply(
    lambda row: ' '.join(filter(None, [row.get('title', ''), ' '.join(row.get('authors', [])), ' '.join(row.get('categories', [])), row.get('language', '')])),
    axis=1
)

# Create the TF-IDF vectorizer and transform the combined features
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df_books['combined_features'])

# Calculate cosine similarity matrix
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Find the index of the input book
try:
    input_book_index = df_books.index[df_books['_id'] == book_id][0]
except IndexError:
    print(json.dumps({"error": "Book not found"}))
    sys.exit(1)

# Get similarity scores for all books with the input book
similarity_scores = list(enumerate(cosine_sim[input_book_index]))

# Sort the books by similarity score (excluding the input book itself)
similar_books = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

# Drop the 'combined_features' column before returning the final results
df_books = df_books.drop(columns=['combined_features', "__v"])

# Get the top 10 most similar books, excluding the input book itself, and return full book data
top_similar_books = [df_books.iloc[i].to_dict() for i, score in similar_books if i != input_book_index][:10]

# Return the result as a JSON-encoded list of book objects
print(json.dumps(top_similar_books, ensure_ascii=False))
