import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('634d73ca260e0ee548943dc3'),
    name: 'Trying mockaroo populate',
    description: 'Saving new dummy data to begin testing',
    startDate: '2020-01-01T00:00:00.000+00:00',
    endDate: '2020-01-02T00:00:00.000+00:00',
    clientName: 'Graves Braum',
    project: mongoose.Types.ObjectId('6352b5e596170b594dc07cf2'),
  },
  {
    _id: mongoose.Types.ObjectId('634d924e260e0ee548943dc7'),
    name: 'Sharing mockaroo data',
    description: 'Typing with collegues new seeds for the team',
    startDate: '2021-02-02T00:00:00.000+00:00',
    endDate: '2021-02-03T00:00:00.000+00:00',
    clientName: 'Katarina Soraka',
    project: mongoose.Types.ObjectId('635317372535a3c0f85955eb'),
  },
  {
    _id: mongoose.Types.ObjectId('634f42d0409f09628b8a1479'),
    name: 'Updating seeds',
    description: 'Sharing with the team mockaroo data',
    startDate: '2022-03-03T00:00:00.000+00:00',
    endDate: '2022-03-04T00:00:00.000+00:00',
    clientName: 'Garen Nautilus',
    project: mongoose.Types.ObjectId('635326e0531b3bfdf5a64ba9'),
  },
];
