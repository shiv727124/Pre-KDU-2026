Tables created:

Content->
![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/1ae658720b9bd2115a864b63edf93d1940147d10/images/content%20table.png)

Category->
![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/5d52d5616f8ae8020c36f8bd3e952d5ee1b399da/images/category%20table.png)

Query 1: Basic JOIN - Show All Content with Categories
Write a query that displays: content_id, title, and category_name for all shows.

Expected Output Format:


content_id | title                    | category_name
-----------+--------------------------+---------------
1          | Stranger Adventures      | Series
2          | The Cosmic Heist         | Movies
...


![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/5d52d5616f8ae8020c36f8bd3e952d5ee1b399da/images/Q1.jpeg)


Query 2: Top Performers - Sorted by Popularity
Write a query that shows all content (title, rating, views) sorted by views in descending order (most viewed first).

Business Context: This helps StreamFlix identify trending content for homepage recommendations.

![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/87228831733199ca78edde9f0fbf5bd901f8a8a5/images/Q2.jpeg)


Query 3: Category Analytics - Average Rating per Category
Write a query that calculates the average rating for each category, showing category_name and average_rating.

Business Context: This helps executives understand which content types perform best with audiences.

![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/87228831733199ca78edde9f0fbf5bd901f8a8a5/images/Q3.jpeg)

Query 4: High-Rated Content with Filters
Find all content with a rating above 8.5 AND views greater than 100 million. Display title, rating, views, and category_name.

![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/87228831733199ca78edde9f0fbf5bd901f8a8a5/images/Q4.jpeg)

Query 5: Index Demonstration
1) Run EXPLAIN ANALYZE on your Query 1 to see query execution time

![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/87228831733199ca78edde9f0fbf5bd901f8a8a5/images/Q5%20(1).jpeg)

2) Create an index: CREATE INDEX idx_category_id ON content(category_id);

![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/87228831733199ca78edde9f0fbf5bd901f8a8a5/images/Q5%20(2).jpeg)

3) Run EXPLAIN ANALYZE again and compare the execution time

![image alt](https://github.com/shiv727124/Pre-KDU-2026/blob/87228831733199ca78edde9f0fbf5bd901f8a8a5/images/Q5%20(3).jpeg)

4) Write 2-3 sentences explaining: Why did the index improve (or not improve) performance?

A-> Because the JOIN between content and category is performed using category_id, the database normally scans the entire content table to match rows. After creating the index, PostgreSQL/MySQL can locate matching category_id values much faster using indexed lookups instead of scanning all rows.
If the table is very small, the performance improvement may be minimal — but on real streaming platforms with millions of rows, the speedup is significant.

--------------------------------------------------------------------------------------------------------------------------------------------------------------


Why #1: Why do we use Foreign Keys?
Think about what would happen if someone tried to insert a content record with category_id = 999 (which doesn't exist).

A-> I rely on keys to maintain the data integrity in the setup. Foreign keys block the system from adding any row that has a category_id which does not already exist in the table.

Now, if a person attempts to insert a row where category_id equals 999, the database simply rejects that action. This keeps things from getting broken with bad data.

---------------------------------
Why #2: Why is ACID important for this database?
Imagine 1000 users trying to watch "Stranger Adventures" at the same time, and the system needs to update the view count. What could go wrong without ACID properties?

A-> Suppose a hundred users all tune into the same show right around the same time. If the system handles those view count updates without ACID properties in place, plenty of them could end up lost or simply overwritten by others. That might even corrupt the whole thing.

ACID steps in to make sure every update stays consistent and isolated from the rest. It keeps things correct no matter what. So the view counter holds up accurately, even with all that heavy traffic hitting at once.

------------------------------------------------------------
Why #3: Why would we create an index on category_id?
When StreamFlix homepage loads, it runs hundreds of queries filtering by category. How does an index help?

A-> Usually, categories like movies, series, anime, and such are used to sort content within the homepage.  
That index based on the category_id allows the database to grab everything belonging to a given category very quickly, without having to check every single row of the table. It gives a performance boost, especially during peak traffic hours.
