## Backend Structure

```
backend/
├── src/
│   ├── routes/           # Routing Layer
│   │   ├── guestRoutes.ts
│   │   ├── roomRoutes.ts
│   │   └── reservationRoutes.ts
│   ├── controllers/      # Business Logic Layer
│   │   ├── guestController.ts
│   │   ├── roomController.ts
│   │   └── reservationController.ts
│   ├── services/         # Business Logic Services
│   │   ├── guestService.ts
│   │   ├── roomService.ts
│   │   └── reservationService.ts
│   ├── models/           # Data Layer
│   │   ├── guestModel.ts
│   │   ├── roomModel.ts
│   │   ├── reservationModel.ts
│   │   └── reservationRoomsModel.ts
│   ├── db/               # Database Configuration
│   │   ├── knexfile.ts
│   │   └── connection.ts
│   ├── middlewares/      # Middleware (e.g., validation, error handling)
│   │   └── validateRequest.ts
│   ├── utils/            # Utility functions (e.g., date utilities, constants)
│   │   └── dateUtils.ts
│   ├── app.ts            # App entry point
│   └── server.ts         # Server initialization
├── tests/                # Unit and integration tests
│   ├── controllers/
│   ├── services/
│   └── models/
├── .env                  # Environment variables
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration

```


# API Documentation

## Overview
This API supports managing guests, reservations, and rooms for a hotel reservation system. Each route is validated using schemas defined with Typebox.

---

## **Guest Management**

### **1. Get All Guests**
- **Endpoint:** `GET /guests`
- **Query Parameters:**
  - `page` (optional, number, minimum: 1)
  - `limit` (optional, number, minimum: 1)
- **Description:** Retrieves a paginated list of all guests.
- **Response:** List of guests.

---

### **2. Get Guest By ID**
- **Endpoint:** `GET /guests/:id`
- **Path Parameters:**
  - `id` (string): Guest ID.
- **Description:** Fetches details of a specific guest.
- **Response:** Guest details.

---

### **3. Create Guest**
- **Endpoint:** `POST /guests`
- **Body Parameters:**
  - `name` (string): Guest's name.
  - `email` (string): Guest's email.
  - `phone` (string): Guest's phone number.
- **Description:** Creates a new guest.
- **Response:** Created guest details.

---

### **4. Update Guest**
- **Endpoint:** `PUT /guests/:id`
- **Path Parameters:**
  - `id` (string): Guest ID.
- **Body Parameters:** Same as `POST /guests`.
- **Description:** Updates details of a specific guest.
- **Response:** Updated guest details.

---

### **5. Delete Guest**
- **Endpoint:** `DELETE /guests/:id`
- **Path Parameters:**
  - `id` (string): Guest ID.
- **Description:** Deletes a specific guest.
- **Response:** Confirmation of deletion.

---

## **Room Management**

### **1. Get All Rooms**
- **Endpoint:** `GET /rooms`
- **Query Parameters:**
  - `page` (optional, number, minimum: 1)
  - `limit` (optional, number, minimum: 1)
- **Description:** Retrieves a paginated list of all rooms.
- **Response:** List of rooms.

---

### **2. Get Room Count**
- **Endpoint:** `GET /rooms/count`
- **Description:** Fetches the total count of rooms.
- **Response:** Total room count.

---

### **3. Get Room By ID**
- **Endpoint:** `GET /rooms/:id`
- **Path Parameters:**
  - `id` (string): Room ID.
- **Description:** Fetches details of a specific room.
- **Response:** Room details.

---

### **4. Create Room**
- **Endpoint:** `POST /rooms`
- **Body Parameters:**
  - `name` (optional, string): Room name.
  - `room_number` (number, minimum: 100): Room number.
  - `capacity` (number, minimum: 1): Room capacity.
- **Description:** Creates a new room.
- **Response:** Created room details.

---

### **5. Update Room**
- **Endpoint:** `PUT /rooms/:id`
- **Path Parameters:**
  - `id` (string): Room ID.
- **Body Parameters:** Same as `POST /rooms`.
- **Description:** Updates details of a specific room.
- **Response:** Updated room details.

---

### **6. Delete Room**
- **Endpoint:** `DELETE /rooms/:id`
- **Path Parameters:**
  - `id` (string): Room ID.
- **Description:** Deletes a specific room.
- **Response:** Confirmation of deletion.

---

## **Reservation Management**

### **1. Get All Reservations**
- **Endpoint:** `GET /reservationss`
- **Query Parameters:**
  - `page` (optional, number, minimum: 1)
  - `limit` (optional, number, minimum: 1)
- **Description:** Retrieves a paginated list of all reservations.
- **Response:** List of reservations.

---

### **2. Get Upcoming Reservations**
- **Endpoint:** `GET /reservations/upcoming`
- **Query Parameters:**
  - `page`, `limit`, `guestId`, `roomId` (optional): Pagination and filtering parameters.
- **Description:** Fetches upcoming reservations.
- **Response:** List of upcoming reservations.

---

### **3. Get Past Reservations**
- **Endpoint:** `GET /reservations/past`
- **Query Parameters:** Same as `/reservations/upcoming`.
- **Description:** Fetches past reservations.
- **Response:** List of past reservations.

---

### **4. Get Current Reservations**
- **Endpoint:** `GET /reservations/current`
- **Query Parameters:** Same as `/reservations/upcoming`.
- **Description:** Fetches current reservations.
- **Response:** List of current reservations.

---

### **5. Get Reservation By ID**
- **Endpoint:** `GET /reservationss/:id`
- **Path Parameters:**
  - `id` (string): Reservation ID.
- **Description:** Fetches details of a specific reservation.
- **Response:** Reservation details.

---

### **6. Create Reservation**
- **Endpoint:** `POST /reservationss`
- **Body Parameters:**
  - `guestId` (string): Guest ID.
  - `roomIds` (array of strings): IDs of rooms being reserved.
  - `checkIn` (string, ISO 8601 datetime): Check-in date.
  - `checkOut` (string, ISO 8601 datetime): Check-out date.
- **Description:** Creates a new reservation.
- **Response:** Created reservation details.

---

### **7. Update Reservation**
- **Endpoint:** `PUT /reservationss/:id`
- **Path Parameters:**
  - `id` (string): Reservation ID.
- **Body Parameters:** Same as `POST /reservationss`.
- **Description:** Updates details of a specific reservation.
- **Response:** Updated reservation details.

---

### **8. Cancel Reservation**
- **Endpoint:** `DELETE /reservationss/:id`
- **Path Parameters:**
  - `id` (string): Reservation ID.
- **Description:** Cancels a specific reservation.
- **Response:** Confirmation of cancellation.

---
