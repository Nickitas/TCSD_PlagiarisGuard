import time
import requests
import re
from googlesearch import search
from bs4 import BeautifulSoup
import fake_useragent
import cloudscraper
import urllib.request 
from urllib import parse
import json



class GoogleSearchParser:
    def __init__(self, query, num=10, stop=10, pause=3):
        self.url = 'https://google-search72.p.rapidapi.com/search'
        self.query = query
        self.num = num
        self.stop = stop
        self.pause = pause
        self.api_key = '73cf160517msh410314fc5416cf9p1c33cajsnb6a1cdcd393c'
        self.api_host = 'google-search72.p.rapidapi.com'
        self.lang = 'ru'
        self.tld = 'com'
        self.user_agent = fake_useragent.UserAgent().random
        self.all_links = []

    
    def set_query(self, new_query):
        self.query = new_query


    def set_num(self, new_num):
        self.page = new_num


    def set_pause(self, new_pause):
        self.pause = new_pause


    def set_lang(self, new_lang):
        self.pause = new_lang


    def get_results(self):
        
        querystring = {'query':self.query, 'gl':'us', 'lr':self.lang, 'num':self.num, 'start':'0', 'stop': self.stop, 'sort': 'relevance'} # PAUSE TLD U_A
        headers = {
            'X-RapidAPI-Key': self.api_key,
            'X-RapidAPI-Host': self.api_host
        }
        response = requests.get(self.url, headers=headers, params=querystring)

        for item in response.json()['items']:
            self.all_links.append(item['link'])
    

    def download_files_from_links(self):
        f = open('downloaded.json')
        data = json.load(f)
        
        for link in self.all_links:
            if (link[-5:] == '.docx' or link[-4:] == '.pdf') and link not in data:
                unquoted_url = parse.unquote(link)
                path = parse.urlparse(unquoted_url).path
                filename = path.rstrip("/").split("/")[-1]
                urllib.request.urlretrieve(link, f'./downloaded/{filename}')
                data.append(link)
                
        with open('downloaded.json', 'w') as outfile:
            json_string = json.dumps(data)
            outfile.write(json_string)

    # def get_results(self):
    #     try:
    #         scraper = cloudscraper.create_scraper()
    #         headers = {'User-Agent': self.user_agent}
    #         response = requests.get(self.url, headers=headers)
    #         # response = scraper.get(self.url, headers=headers)
    #         time.sleep(5)
    #         response.raise_for_status()
            
    #     except requests.exceptions.RequestException as err:
    #         print(f'[ ERROR ] when requesting a page: {err}')
    #         return
        
    #     try:
    #         soup = BeautifulSoup(response.content, 'html.parser')
    #         links = soup.find_all('a')

    #         for link in links:
    #             self.all_links.append(link.get('href'))
                    
    #     except Exception as err:
    #         print(f'[ ERROR ] when parsing HTML code: {err}')

        
    # def filter_results(self, keyword=None, limit=10):
    #     filtered_urls = []
    #     for url in self.all_links:
    #         if url.startswith('http://') or url.startswith('https://'):
    #             try:
    #                 page = requests.get(url)
    #                 time.sleep(5)
    #                 soup = BeautifulSoup(page.content, 'html.parser')
                    
    #                 if keyword and (keyword not in soup.title.string.lower()):
    #                     continue
                    
    #                 filtered_urls.append(url)
    #                 if len(filtered_urls) == limit:
    #                     break
                        
    #             except Exception as err:
    #                 print(f'[ ERROR ] when processing a URL {url}: {err}')
                    
    #     return filtered_urls
    

    def _search_results_info(self, limit=10):
        results_info = []
        for url in self.filter_results(limit=limit):
            try:
                page = requests.get(url)
                time.sleep(1)
                soup = BeautifulSoup(page.content, 'html.parser')
                
                title = soup.find('title').text.strip()
                description = soup.find('meta', attrs={'name': 'description'})['content'].strip()

                results_info.append({
                    'url': url,
                    'title': title,
                    'description': description
                })

            except Exception as err:
                print(f'[ ERROR ] when processing a URL {url}: {err}')

        return results_info


    def _get_article_from_page(self, link):
        texts = []
        try:
            response = requests.get(link)
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            for tag in soup.find_all():
                text = tag.get_text().strip()
                if text:
                    # Удаляем все символы, кроме букв и цифр
                    text = re.sub(r'[^a-zA-Z0-9]+', '', text)
                    # Удаляем все пробельные символы
                    text = re.sub(r'\s+', '', text)
                    texts.append(text)
        except Exception as err:
            print(f'[ ERROR ] when parsing at URL {link}: {err}')

        return texts
        

    def print_logs(self):
        # filtered_urls = self.filter_results()
        print('\n\n#### Pages URL Links \n')
        for index, url in enumerate(self.all_links):
            print(f'\n\n№ {index:<3} -> {url}')
            # print(self._search_results_info(10))
            print(self._get_article_from_page(url))