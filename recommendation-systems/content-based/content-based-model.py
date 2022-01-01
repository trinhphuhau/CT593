import pandas as pd
import pickle
import re
import string
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction import text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

with open('vietnamese-stopwords.txt', encoding="utf8") as file:
    vietnamese_stopwords=[file.read().replace('\n', ',')]

stop = stopwords.words('english')
stop_words_ = set(stopwords.words('english'))
stop_words_ = stop_words_.union(vietnamese_stopwords)
wn = WordNetLemmatizer()

def black_txt(token):
    return token not in stop_words_ and token not in list(string.punctuation)  and len(token)>2

def clean_txt(text):
  clean_text = []
  clean_text2 = []
  text = re.sub("'", "",text)
  text = re.sub("(\\d|\\W)+"," ",text) 
  text = text.replace("nbsp", "")
  clean_text = [ wn.lemmatize(word, pos="v") for word in word_tokenize(text.lower()) if black_txt(word)]
  clean_text2 = [word for word in clean_text if black_txt(word)]
  return " ".join(clean_text2)

books = pd.read_csv('./books.csv')

books["title"] = books["title"].apply(clean_txt)
books["description"] = books["description"].apply(clean_txt)
books['tags'] = books['title'] +" "+ books['description']

new = books.drop(columns=['authors', 'title', 'genre_id', 'description', 'price',  'price_tag', 'publisher', 'average_rating', 'work_ratings_count', 'ratings_1', 'ratings_2', 'ratings_3', 'ratings_4', 'ratings_5', 'image_url', 'modified_date', 'deleted_date', 'status'])

book_id_list = books.drop(columns=['authors', 'genre_id', 'description', 'title', 'price',  'price_tag', 'publisher', 'average_rating', 'work_ratings_count', 'ratings_1', 'ratings_2', 'ratings_3', 'ratings_4', 'ratings_5', 'image_url', 'modified_date', 'deleted_date', 'status', 'tags'])

tfidf = TfidfVectorizer()

vector = tfidf.fit_transform(new['tags']).toarray()

similarity = cosine_similarity(vector)

pickle.dump(book_id_list,open('books_list.pkl','wb'))

pickle.dump(similarity,open('similarity.pkl','wb'))