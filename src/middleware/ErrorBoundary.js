// errorBoundary.js
class GlobalErrorBoundary {
    static handleError(err, req, res, next) {
        console.error('Global Error:', err);

        // Check if the error is a Mongoose validation error
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ status: 'error', message: 'Validation Error', errors });
        }

        // Handle other errors
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

module.exports = GlobalErrorBoundary;
