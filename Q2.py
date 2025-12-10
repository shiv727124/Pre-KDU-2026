genres=[]
genre_set=set()

for i in range(10):
    x=input()
    genres.append(x)
    genre_set.add(x)

print(genres)
print(genre_set)
genre_count={}
for genre in genres:
    if genre in genre_count:
        genre_count[genre]+=1
    else:
        genre_count[genre]=1
print(genre_count)