const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const { agenda, attendes, attendesLead, location, related, dateTime, notes, createBy } = req.body;

        // Validate required fields
        if (!agenda || !related || !dateTime || !createBy) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new meeting
        const meeting = new MeetingHistory({
            agenda,
            attendes,
            attendesLead,
            location,
            related,
            dateTime,
            notes,
            createBy,
        });

        // Save the meeting to the database
        await meeting.save();

        res.status(201).json({ message: 'Meeting created successfully', meeting });
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.status(500).json({ error: 'An error occurred while creating the meeting' });
    }
};

const index = async (req, res) => {
    try {
        // Fetch all meetings that are not deleted
        const meetings = await MeetingHistory.find({ deleted: false })
            .populate('attendes attendesLead createBy') // Populate referenced fields
            .exec();

        res.status(200).json({ meetings });
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({ error: 'An error occurred while fetching meetings' });
    }
};

const view = async (req, res) => {
    try {
        const meetingId = req.params.id;

        // Validate the meeting ID
        if (!mongoose.Types.ObjectId.isValid(meetingId)) {
            return res.status(400).json({ message: 'Invalid meeting ID' });
        }

        // Find the meeting by ID
        const meeting = await MeetingHistory.findById(meetingId)
            .populate('attendes attendesLead createBy') // Populate referenced fields
            .exec();

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        res.status(200).json({ meeting });
    } catch (error) {
        console.error('Error fetching meeting:', error);
        res.status(500).json({ error: 'An error occurred while fetching the meeting' });
    }
};

const deleteData = async (req, res) => {
    try {
        const meetingId = req.params.id;

        // Validate the meeting ID
        if (!mongoose.Types.ObjectId.isValid(meetingId)) {
            return res.status(400).json({ message: 'Invalid meeting ID' });
        }

        // Soft delete the meeting
        const meeting = await MeetingHistory.findByIdAndUpdate(
            meetingId,
            { deleted: true },
            { new: true } // Return the updated document
        );

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        res.status(200).json({ message: 'Meeting deleted successfully', meeting });
    } catch (error) {
        console.error('Error deleting meeting:', error);
        res.status(500).json({ error: 'An error occurred while deleting the meeting' });
    }
};

const deleteMany = async (req, res) => {
    try {
        const { meetingIds } = req.body;

        // Validate the meeting IDs
        if (!Array.isArray(meetingIds) || meetingIds.length === 0) {
            return res.status(400).json({ message: 'Invalid meeting IDs' });
        }

        // Soft delete multiple meetings
        const result = await MeetingHistory.updateMany(
            { _id: { $in: meetingIds } },
            { deleted: true }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'No meetings found to delete' });
        }

        res.status(200).json({ message: 'Meetings deleted successfully', result });
    } catch (error) {
        console.error('Error deleting meetings:', error);
        res.status(500).json({ error: 'An error occurred while deleting meetings' });
    }
};

module.exports = { add, index, view, deleteData, deleteMany }