with open("list.txt", "r") as file:
    content = file.read()
    words = [word.lower() for word in content.split()]

    counts = [[0 for _ in range(26)] for _ in range(5)]
    for word in words:
        for i in range(5):
            counts[i][ord(word[i])-ord('a')]+=1
    
    def score(w):
        return len(set(w))
    
    def cmp(s1, s2):
        return score(s1) - score(s2)

    from functools import cmp_to_key
    sortedList = sorted(words, key=cmp_to_key(cmp), reverse=True)

    with open("word-list-sorted.txt", "w") as file2:
        for item in sortedList:
            file2.write("%s\n" % item)