


class TextOriginalityChecker():
    def __init__(self, original_text):
        self.original_text = original_text
    

    def _levenshtein_distance(s, t):
        """ Подсчет расстояния Левенштейна """
        # Создаем матрицу размером (len(s) + 1) x (len(t) + 1), заполненную нулями
        d = [[0 for j in range(len(t) + 1)] for i in range(len(s) + 1)]

        # Заполняем первую строку и первый столбец матрицы значениями от 0 до len(s) и len(t)
        for i in range(1, len(s) + 1):
            d[i][0] = i
        for j in range(1, len(t) + 1):
            d[0][j] = j

        # Вычисляем значения в остальных ячейках матрицы
        for j in range(1, len(t) + 1):
            for i in range(1, len(s) + 1):
                if s[i-1] == t[j-1]:
                    cost = 0
                else:
                    cost = 1
                d[i][j] = min(d[i-1][j] + 1,        # удаление
                            d[i][j-1] + 1,          # вставка
                            d[i-1][j-1] + cost)     # замена

        # Возвращаем последнее значение матрицы как расстояние Левенштейна между s и t
        return d[-1][-1]


    def check_similarity(self, other_text):
        """ Подсчет оригинальности """
        print(
            f"""
                Text hash: 
                Levenshtein: {self._levenshtein_distance(self.original_text, other_text)}

            """
        )