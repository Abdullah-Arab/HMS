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
