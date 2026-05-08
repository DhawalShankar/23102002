````md id="t7v2xp"
# Campus Hiring Evaluation - Backend

This repository contains solutions for the backend evaluation assignment.

## Folder Structure

```txt
logging_middleware/
notification_app_be/
vehicle_maintenance_scheduler/
notification_system_design.md
````

---

# Stage 1

Implemented a notification backend system using Node.js and Express.

Features:

* REST APIs
* protected routes
* custom logging middleware
* modular folder structure
* real time notification approach

APIs:

* GET /notifications
* GET /notifications/:id
* POST /notifications
* PATCH /notifications/:id/read
* PATCH /notifications/mark-all-read
* DELETE /notifications/:id

Logging middleware integrated with external logging API.

---

# Stage 2

Implemented Vehicle Maintenance Scheduler.

Approach:

* Dynamic Programming
* 0/1 Knapsack Algorithm

Features:

* fetched depots from API
* fetched vehicles from API
* calculated maximum impact within mechanic hours

Output:

* maximum impact score

---

# Stage 3

Designed database schema for notification system.

Used:

* PostgreSQL
* indexing
* pagination
* optimized schema structure

---

# Stage 4

Performed query optimization.

Used:

* composite indexing
* optimized filtering
* reduced full table scan

---

# Stage 5

Designed scalable notification delivery architecture.

Concepts used:

* queues
* workers
* batching
* retry mechanism

---

# Stage 6

Implemented priority inbox logic.

Features:

* top 10 notifications
* priority based sorting
* recency based ranking

Notification priority:
Placement > Result > Event

---

# Tech Stack

* Node.js
* Express.js
* JavaScript (ES6+)
* Axios
* Dynamic Programming

---

# Run Project

## Notification Backend

```bash
cd notification_app_be
npm install
npm start
```

---

## Vehicle Scheduler

```bash
cd vehicle_maintenance_scheduler
npm install
node scheduler.js
```

---

## Priority Inbox

```bash
cd notification_app_be
node utils/priorityInbox.js
```

```
```
