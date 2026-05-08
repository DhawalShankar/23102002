````md id="c1i0d7"
# Stage 1

## Notification System REST API Design

The notification platform supports real-time campus notifications related to:

- Placements
- Results
- Events

The system allows students to:

- View notifications
- Mark notifications as read
- Receive real-time updates
- Filter notifications by type
- Paginate notifications efficiently

---

# Base URL

```http
/api/v1
````

---

# Authentication

All APIs are protected routes.

Authorization Header:

```http
Authorization: Bearer <token>
```

---

# Notification Object Schema

```json
{
  "id": "uuid",
  "studentId": 1042,
  "type": "Placement",
  "title": "Microsoft Internship Drive",
  "message": "Applications are now open",
  "isRead": false,
  "createdAt": "2026-05-08T10:30:00Z"
}
```

---

# 1. Get All Notifications

## Endpoint

```http
GET /notifications
```

## Query Parameters

| Parameter  | Type    | Description                 |
| ---------- | ------- | --------------------------- |
| page       | number  | Page number                 |
| limit      | number  | Notifications per page      |
| type       | string  | Filter by notification type |
| unreadOnly | boolean | Fetch unread notifications  |

---

## Example Request

```http
GET /notifications?page=1&limit=10&type=Placement
```

---

## Response

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 120,
  "data": [
    {
      "id": "uuid",
      "studentId": 1042,
      "type": "Placement",
      "title": "Google Hiring Challenge",
      "message": "Registration closes tomorrow",
      "isRead": false,
      "createdAt": "2026-05-08T10:30:00Z"
    }
  ]
}
```

---

# 2. Get Notification By ID

## Endpoint

```http
GET /notifications/:id
```

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "studentId": 1042,
    "type": "Result",
    "title": "Mid Sem Result",
    "message": "Your result has been published",
    "isRead": true,
    "createdAt": "2026-05-08T10:30:00Z"
  }
}
```

---

# 3. Mark Notification As Read

## Endpoint

```http
PATCH /notifications/:id/read
```

---

## Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

# 4. Mark All Notifications As Read

## Endpoint

```http
PATCH /notifications/read-all
```

---

## Response

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

# 5. Delete Notification

## Endpoint

```http
DELETE /notifications/:id
```

---

## Response

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

# 6. Real-Time Notification Delivery

## Approach

The system uses WebSockets for real-time communication.

Whenever a new notification is created:

1. Notification is stored in database
2. Event is published to WebSocket server
3. Connected students receive instant updates

---

## WebSocket Event

### Event Name

```txt
notification:new
```

### Payload

```json
{
  "id": "uuid",
  "type": "Placement",
  "title": "Amazon Hiring Drive",
  "message": "Test scheduled tomorrow",
  "createdAt": "2026-05-08T10:30:00Z"
}
```

---

# Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Notification not found"
  }
}
```

---

# HTTP Status Codes

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

# Logging Middleware Usage

The custom logging middleware is integrated throughout the application for:

* API request tracking
* Error monitoring
* Database failures
* Authentication events
* Notification delivery events

Example:

```js
await logger.log(
  "backend",
  "info",
  "service",
  "Fetched notifications successfully"
);
```

---

# Design Decisions

* RESTful predictable API design
* UUID based notification IDs
* Pagination support for scalability
* WebSocket support for real-time updates
* Structured error responses
* Filter support for optimized frontend rendering
* Modular backend architecture

```
```
