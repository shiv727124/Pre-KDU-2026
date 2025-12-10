file = open("watchlist.csv", "r")
data = file.read()
file.close()

movies = data.split(",")

movie_count = {}
for i in range(len(movies)):
    movie = movies[i]
    if movie in movie_count:
        movie_count[movie] += 1
    else:
        movie_count[movie] = 1

top1 = top2 = top3 = None
c1 = c2 = c3 = 0

for movie in movie_count:
    count = movie_count[movie]
    if count > c1:
        c3 = c2; top3 = top2
        c2 = c1; top2 = top1
        c1 = count; top1 = movie
    elif count > c2:
        c3 = c2; top3 = top2
        c2 = count; top2 = movie
    elif count > c3:
        c3 = count; top3 = movie

print("Top 3 most watched movies:")
print(top1, "=", c1)
print(top2, "=", c2)
print(top3, "=", c3)
