# Stage 1

Created a simple notification system for students.

Notifications can be related to:
- placements
- results
- events

Students can:
- view notifications
- mark notifications as read
- receive live updates

Base URL:
/api/v1

Authentication:
Bearer Token used for protected routes.

APIs created:

GET /notifications

GET /notifications/:id

POST /notifications

PATCH /notifications/:id/read

PATCH /notifications/read-all

DELETE /notifications/:id

Notification object contains:
- id
- studentId
- type
- title
- message
- isRead

Used WebSocket approach for real time notifications.

Event:
notification:new

Custom logging middleware used in routes for logging API activity.

Example:

await logger.log(
 "backend",
 "info",
 "controller",
 "Fetched notifications"
);

Used:
- REST APIs
- pagination
- modular folder structure

---

# Stage 2

Vehicle maintenance scheduling system.

Problem:
Every depot has limited mechanic hours, so all vehicles cannot be serviced in one day.

Goal:
Choose vehicles in such a way that total impact is maximum and available mechanic hours are not exceeded.

Approach:
Used Dynamic Programming with 0/1 Knapsack approach.

Where:
- duration = weight
- impact = value
- mechanic hours = capacity

Fetched:
- depots data from API
- vehicles data from API

Then calculated maximum possible impact.

Example:

Vehicle A -> 2 hours -> impact 30

Vehicle B -> 4 hours -> impact 70

Vehicle C -> 6 hours -> impact 90

Available hours = 8

Selected:
- Vehicle A
- Vehicle B

Total impact = 100

---

# Stage 3

For storing notifications reliably, PostgreSQL can be used.

Reason:
- structured data
- indexing support
- good query performance
- reliable transactions

Basic Schema:

CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  studentID INT,
  notificationType VARCHAR(50),
  title TEXT,
  message TEXT,
  isRead BOOLEAN,
  createdAt TIMESTAMP
);

Problems when data grows:
- slow queries
- high read load
- table scan issues

Solutions:
- indexing
- pagination
- caching
- partitioning

Example Index:

CREATE INDEX idx_student_read
ON notifications(studentID, isRead);

---

# Stage 4

Query used:

SELECT * FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;

Reason for slowness:
- large notification table
- filtering and sorting together
- missing composite indexes

Better Solution:

CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);

Using index on every column is not good because:
- inserts become slower
- updates become slower
- storage increases

Query for placement notifications in last 7 days:

SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;

---

# Stage 5

For handling very large notification traffic:

Used:
- queue based processing
- async workers
- retry mechanism
- batching

Flow:
1. notification request received
2. message added to queue
3. workers process notifications
4. email and in-app notifications sent

Benefits:
- better scalability
- faster processing
- avoids blocking main server

Technologies that can be used:
- RabbitMQ
- Kafka
- Redis Queue

---

# Stage 6

Priority inbox system created for showing most important unread notifications.

Priority based on:
- notification type
- recency

Priority Order:
Placement > Result > Event

Approach:
Used heap / priority queue approach for maintaining top notifications efficiently.

Benefits:
- faster retrieval
- efficient sorting
- scalable for large notification volume

Notification API used for fetching notifications dynamically.