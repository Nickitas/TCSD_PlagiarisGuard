import docx
import PyPDF2


ALLOWED_EXTENSIONS = {'doc', 'pdf', 'docx'}

def get_text_from_docx(filename):
    doc = docx.Document(filename)
    text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
    return text

def get_text_from_pdf(filename):
    text = ''
    with open(filename, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS