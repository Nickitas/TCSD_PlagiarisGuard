import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from pymystem3 import Mystem
from nlp_rake import Rake

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')


class KeywordExtractor:
    def __init__(self, text, keywords_count=7, max_words=10) -> None:
        self.text = text.lower()
        self.keywords_count = keywords_count
        self.max_words = max_words


    def get_keywords(self):
        result = []
        stops = list(set(stopwords.words('russian')))
        rake = Rake(stopwords = stops, max_words = self.max_words)
        keywords_list = rake.apply(self.text)[:self.keywords_count]
        for phrase in keywords_list:
            result.append(phrase[0])
        return result


    def _tokenize(self):
        """ Токенезация текста (разбиение текста на слова и предложения) """
        return word_tokenize(self.text)
    

    def _remove_stop_words(self, words, lang='english'):
        """ Исключение стоп-слов из текста """
        stop_words = set(stopwords.words(lang))
        return [w for w in words if not w in stop_words]


    def _lemmatize(self, words, lang='english'):
        """ Лемматизация слов (приведение слов к их базовой форме) """
        if lang == 'russian':
            lemmatizer = Mystem()
            return [lemmatizer.lemmatize(w)[0] for w in words]
        else:
            lemmatizer = WordNetLemmatizer()
            return [lemmatizer.lemmatize(w) for w in words]
        

    def _filter_nouns(self, tagged_words):
        """ Определение частей речи и фильтрация существительных """
        return [word for (word, pos) in tagged_words if pos[:2] == 'NN']
    

    def extract_keywords(self, num_keywords=10, lang='english'):
        words = self._tokenize()
        words = self._remove_stop_words(words, lang=lang)
        words = self._lemmatize(words, lang=lang)

        tagged_words = nltk.pos_tag(words)
        nouns = self._filter_nouns(tagged_words)

        freq_dist = nltk.FreqDist(nouns) # подсчет частоты встречаемости каждого слова

        # Вывод num_keywords самых часто встречающихся слов
        return freq_dist.most_common(num_keywords)

