# Anti-plagiarismAPI

Anti-plagiarismAPI is a web tool for checking texts for uniqueness in the electronic library of Dnipropetrovsk State Technical University (DSTU).

## Installation

To run the application, you will need to install the following packages using pip:

<pre>
  pip install requests
  pip install nltk
  pip install pymystem3
  pip install beautifulsoup4
  pip install fake-useragent
</pre>

## Usage

You can use Anti-plagiarismAPI to check the uniqueness of any text against the electronic library of DSTU. To do this, simply run the anti_plagiarism.py file and input the text you want to check. The application will return a percentage of how unique the text is and, if plagiarism is detected, a list of sources where similar text was found.

python anti_plagiarism.py
