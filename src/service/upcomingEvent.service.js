const httpStatus = require('http-status');
const UpcomingEvent = require('../model/upcomingEvent.model');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const path = require('path');


const createUpcomingEvent = async (upcomingEventData) => {
    try {
        const createdUpcomingEvent = await UpcomingEvent.create(upcomingEventData);
        return createdUpcomingEvent;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create upcoming event: ${error.message}`);
    }
};

const updateUpcomingEvent = async (id, updateData) => {
    try {
        let upcomingEvent = await UpcomingEvent.findById(id);

        if (!upcomingEvent) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Upcoming event not found');
        }

        const { title, description, dateTime, contactPerson, images } = updateData;

        if (title !== undefined) {
            upcomingEvent.title = title;
        }

        if (description !== undefined) {
            upcomingEvent.description = description;
        }

        if (dateTime !== undefined) {
            if (dateTime.date !== undefined) {
                upcomingEvent.dateTime.date = dateTime.date;
            }
            if (dateTime.time !== undefined) {
                upcomingEvent.dateTime.time = dateTime.time;
            }
        }

        if (contactPerson !== undefined) {
            if (contactPerson.name !== undefined) {
                upcomingEvent.contactPerson.name = contactPerson.name;
            }
            if (contactPerson.number !== undefined) {
                upcomingEvent.contactPerson.number = contactPerson.number;
            }
        }

        if (images !== undefined && images.length > 0) {
            upcomingEvent.images = images;
        }

        const updatedUpcomingEvent = await upcomingEvent.save();

        return updatedUpcomingEvent;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to update upcoming event: ${error.message}`);
    }
};





    const deleteUpcomingEvent = async (id) => {
        try {
        
            const upcomingEvent = await UpcomingEvent.findById(id);

        
            if (!upcomingEvent) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Upcoming event not found');
            }

    
            for (const image of upcomingEvent.images) {
                const imagePath = path.resolve(image.path);
                if (fs.existsSync(imagePath)) {
                    try {
                        fs.unlinkSync(imagePath);
                        console.log(`Deleted image: ${imagePath}`);
                    } catch (error) {
                        console.error(`Failed to delete image: ${imagePath}. Error: ${error.message}`);
                    }
                }
            }

            const deletedUpcomingEvent = await UpcomingEvent.findByIdAndDelete(id);

        
            if (!deletedUpcomingEvent) {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete upcoming event');
            }

            return deletedUpcomingEvent;
        } catch (error) {
            console.error(`Error deleting upcoming event: ${error.message}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to delete upcoming event: ${error.message}`);
        }
    };



const getAllUpcomingEvents = async () => {
    try {
       
        const upcomingEvents = await UpcomingEvent.find();
        return upcomingEvents;
    } catch (error) {
        
        throw new Error(`Failed to retrieve upcoming events: ${error.message}`);
    }
};

module.exports = {
    createUpcomingEvent,
    updateUpcomingEvent,
    deleteUpcomingEvent,
    getAllUpcomingEvents
};
