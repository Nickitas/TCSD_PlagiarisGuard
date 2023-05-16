import time
import requests
import re
from googlesearch import search
from bs4 import BeautifulSoup
import fake_useragent
import cloudscraper



class GoogleSearchParser:
    def __init__(self, query, num=10, stop=10, pause=3):
        self.query = query
        self.num = num
        self.stop = stop
        self.pause = pause
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
        for link in search(self.query, user_agent=self.user_agent, lang=self.lang, tld=self.tld, num=self.num, stop=self.stop, pause=self.pause):
            self.all_links.append(link)
        
        

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