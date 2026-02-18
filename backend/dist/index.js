"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("./middleware/cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
// Import and use auth routes
const auth_1 = __importDefault(require("./routes/auth"));
app.use('/api/auth', auth_1.default);
// Import and use service routes
const services_1 = __importDefault(require("./routes/services"));
app.use('/api/services', services_1.default);
// Import and use category routes
const categories_1 = __importDefault(require("./routes/categories"));
app.use('/api/categories', categories_1.default);
// Import and use review routes
const reviews_1 = __importDefault(require("./routes/reviews"));
app.use('/api/reviews', reviews_1.default);
// Import and use user routes
const users_1 = __importDefault(require("./routes/users"));
app.use('/api/users', users_1.default);
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
// Error handling middleware
const errorHandler_1 = require("./middleware/errorHandler");
// Basic health check route
app.get('/', (_req, res) => {
    res.send('Service Marketplace API is running');
});
// Connect to MongoDB and start server only after successful connection
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
// Use error handler (should be after all routes)
app.use(errorHandler_1.errorHandler);
exports.default = app;
