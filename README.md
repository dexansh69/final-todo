backend/
│
├── src/
│
│   ├── config/
│   │   └── db.js              # MongoDB connection
│
│   ├── models/
│   │   ├── user.model.js      # User schema
│   │   └── todo.model.js      # Todo schema
│
│   ├── routes/
│   │   ├── auth.routes.js     # signup/login routes
│   │   └── todo.routes.js     # CRUD routes
│
│   ├── controllers/
│   │   ├── auth.controller.js # logic for signup/login
│   │   └── todo.controller.js # CRUD logic
│
│   ├── validators/
│   │   ├── auth.validator.js  # Zod schemas (signup/login)
│   │   └── todo.validator.js   # Zod schemas (todo)
│
│   ├── middleware/
│   │   ├── auth.middleware.js # JWT verify (later)
│   │   └── validate.js        # Zod reusable middleware
│
│   ├── utils/
│   │   ├── jwt.js             # token functions
│   │   └── hash.js            # password hashing (bcrypt)
│
│   ├── app.js                 # express app setup
│   └── server.js              # entry point
│
├── .env
├── package.json