import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('634d924e260e0ee548943dc7'),
    name: 'TESTING',
    description: 'Project description example 2',
    startDate: '2020-01-01T00:00:00.000+00:00',
    endDate: '2020-01-02T00:00:00.000+00:00',
    clientName: 'Pedro Damiani',
    employees: mongoose.Types.ObjectId('634d1052010b0c589a0b8da1'),
  },
  /* {
    _id: mongoose.Types.ObjectId('634d924e260e0ee548943dc7'),
    name: 'Sharing mockaroo data',
    description: 'Typing with collegues new seeds for the team',
    startDate: '2021-02-02T00:00:00.000+00:00',
    endDate: '2021-02-03T00:00:00.000+00:00',
    clientName: 'Katarina Soraka',
    employees: mongoose.Types.ObjectId('634f281aca551819ef903f75'),
  },
  {
    _id: mongoose.Types.ObjectId('634f42d0409f09628b8a1479'),
    name: 'Updating seeds',
    description: 'Sharing with the team mockaroo data',
    startDate: '2022-03-03T00:00:00.000+00:00',
    endDate: '2022-03-04T00:00:00.000+00:00',
    clientName: 'Garen Nautilus',
    employees: mongoose.Types.ObjectId('634f281aca551819ef903f75'),
  }, */
];
