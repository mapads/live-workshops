const mongoose = require('mongoose');
const Goals = require('./models/Goals');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/liveWorkshopDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

async function removeOldGoals() {
    try {
        // Delete goals that do not have a `date` field
        const result = await Goals.deleteMany({ date: { $exists: false } });
        console.log(`Deleted ${result.deletedCount} old goals without a date`);
    } catch (error) {
        console.error('Error deleting old goals:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Connect to the database and run the deletion
connectDB().then(removeOldGoals);
