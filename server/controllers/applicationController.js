import Application from '../models/Application';

export async function createApplication(req, res) {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).send('Application saved successfully');
    } catch (error) {
        res.status(400).send('Error saving application: ' + error.message);
    }
}