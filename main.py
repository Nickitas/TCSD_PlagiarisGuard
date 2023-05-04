

from GoogleSearchParser import GoogleSearchParser

def main():
    parser = GoogleSearchParser('информационная+безопасность', 0)
    parser.set_query('курсовая+информационной+безопасности')
    parser.set_page(1)
    parser.get_results()
    parser.print_filtered_results()


if __name__ == '__main__':
    main()