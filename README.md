# Hotel Management System (HMS) - Monorepo

This project represents my implementation of a Hotel Management System (HMS). The project is divided into three parts:

1. **Frontend**: Built using Angular with TypeScript.
2. **Backend**: Built using Node.js, Express.js, and PostgreSQL.
3. **Documentation**: Available in the `docs` folder, written in Markdown.

---

## My Journey

This project was an exciting challenge. I successfully designed and implemented the backend with a clean, layered architecture and integrated it with a PostgreSQL database. The backend is robust, scalable, and well-structured to handle all the requirements.

However, I encountered significant challenges in the frontend development due to limited dedicated time. Despite this, I implemented key concepts and ensured the frontend communicates effectively with the backend. I have additional ideas and improvements for the frontend that I couldn't implement within the given timeframe.

I chose to deliver the project in its current state to highlight the progress made and demonstrate my approach, while recognizing there are areas for further development and improvement.

---

## Task Breakdown

Here is a detailed overview of the project tasks, categorized by completion status:

### **Completed**
- **Guests Management**
  - Paginated view of all guests.
  - View guest details, including the total amount of past reservations.
  - Create and edit guest information (name, email, phone number).

- **Rooms Management**
  - Paginated view of all rooms with the total amount of upcoming reservations.
  - View room details, including current and upcoming reservations sorted by most recent.
  - Create and edit room information.

- **Technical Guidelines**
  - Fully implemented the backend using TypeScript with a layered architecture:
    - Routing Layer: Handles API routes, validation, and response.
    - Business Logic Layer: Processes and manages transactions.
    - Data Layer: Manages database queries using Knex.js.
  - PostgreSQL database integration.
  - Dockerized setup for the backend and database.

- **Deployment**
  - Docker Compose setup to run the frontend, backend, and database.

---

### **Partially Completed**
- **Rooms Management**
  - Sorting by total reservations, room number, or name (sorting logic partially implemented).

- **Reservations Management**
  - Paginated view of reservations.
  - Reservation date validation (no past dates or negative ranges).
  - Race condition handling for overlapping reservations using transactions/locks.

---

### **Not Completed**
- Calendar view of reservations with busy days highlighted.
- Create a reservation:
  - Select room(s), guest, and date range.
  - Ensure no overlapping reservations.
- Cancel reservations to free rooms for future use.
- Unit and API integration tests.

---

## Running the Project

To run the entire project (frontend, backend, and database), ensure you have Docker installed. Then, use the following command:

```bash
docker compose up --build
