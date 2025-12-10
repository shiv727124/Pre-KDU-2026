password = input()
confirm = input()

len1 = len(password)
len2 = len(confirm)

print("Length 1:", len1)
print("Length 2:", len2)

print("Lengths match:", len1 == len2)

print("Strings match:", password == confirm)