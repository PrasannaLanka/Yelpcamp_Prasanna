const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 400; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
		const camp = new Campground({
			author: "62aacbef8a2494a9fe82eba6",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			//image: 'https://picsum.photos/200',
			images: [
				{
				  url: 'https://res.cloudinary.com/da2xklfpz/image/upload/v1655637796/YelpCamp/xcwhg4bhjmz3tdx4sizq.jpg',
				  filename: 'YelpCamp/xcwhg4bhjmz3tdx4sizq',
				 
				},
				{
				  url: 'https://res.cloudinary.com/da2xklfpz/image/upload/v1655637797/YelpCamp/q7ywdn2nbaypnqmmrm4y.jpg',
				  filename: 'YelpCamp/q7ywdn2nbaypnqmmrm4y',
				 
				},
				{
				  url: 'https://res.cloudinary.com/da2xklfpz/image/upload/v1655637797/YelpCamp/awyhzatqjycmgdbi9csd.jpg',
				  filename: 'YelpCamp/awyhzatqjycmgdbi9csd',
				 
				}
			  ],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ipsa eos beatae numquam repellendus culpa excepturi sapiente sit earum distinctio nobis veniam quos officia omnis, commodi dignissimos odio nesciunt! Recusandae!',
            price, geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
				    cities[random1000].latitude,
				],
			  },


		});
		await camp.save();
	}
};
seedDB().then(() => {
	mongoose.connection.close();
});
