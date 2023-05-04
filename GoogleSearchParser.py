import requests
from bs4 import BeautifulSoup
import fake_useragent
from prettytable import PrettyTable
import time


class GoogleSearchParser:
    def __init__(self, query, page=0):
        self.query = query
        self.page = page
        self.url = f'https://www.google.com/search?q={self.query}&start={self.page}'
        self.user_agent = fake_useragent.UserAgent().random
        self.all_links = []

    
    def set_query(self, new_query):
        self.query = new_query
        self.url = f'https://www.google.com/search?q={self.query}&start={self.page}'


    def set_page(self, new_page):
        self.page = new_page
        self.url = f'https://www.google.com/search?q={self.query}&start={self.page}'
        

    def get_results(self):
        try:
            headers = {'User-Agent': self.user_agent}
            response = requests.get(self.url, headers=headers)
            time.sleep(5)
            response.raise_for_status()
            
        except requests.exceptions.RequestException as err:
            print(f'[ ERROR ] when requesting a page: {err}')
            return
        
        try:
            soup = BeautifulSoup(response.content, 'html.parser')
            links = soup.find_all('a')

            for link in links:
                self.all_links.append(link.get('href'))
                    
        except Exception as err:
            print(f'[ ERROR ] when parsing HTML code: {err}')

        
    def filter_results(self, keyword=None, limit=10):
        filtered_urls = []
        for url in self.all_links:
            if url.startswith('http://') or url.startswith('https://'):
                try:
                    page = requests.get(url)
                    time.sleep(5)
                    soup = BeautifulSoup(page.content, 'html.parser')
                    
                    if keyword and (keyword not in soup.title.string.lower()):
                        continue
                    
                    filtered_urls.append(url)
                    if len(filtered_urls) == limit:
                        break
                        
                except Exception as err:
                    print(f'[ ERROR ] when processing a URL {url}: {err}')
                    
        return filtered_urls
    

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


    def print_filtered_results(self):
        filtered_urls = self.filter_results()
        print('\n\n#### Pages URL Links \n')
        for index, url in enumerate(filtered_urls):
            print(f'№ {index:<3} -> {url}')
            print(self._search_results_info(10))
