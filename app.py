from flask import Flask, request, flash, redirect, jsonify, url_for
from werkzeug.utils import secure_filename
import os
from time import time
from nlp_rake import Rake
from datetime import datetime
# from KeywordExtractor import KeywordExtractor
from GoogleSearchParser import GoogleSearchParser
from TextOriginalityChecker import TextOriginalityChecker
import nltk
import urllib.request 
from urllib import parse
from nltk.corpus import stopwords

nltk.download("stopwords")

UPLOAD_FOLDER = './uploaded_files'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/api/v1/check_doc', methods=['POST', 'GET'])
def check_doc():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'no file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': 'no file part'})
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'success': True})

@app.route('/api/v1/check_text', methods=['POST'])
def check_text():
    content = request.get_json()
    return content


if __name__ == "__main__":
    app.run()