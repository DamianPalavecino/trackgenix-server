import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6352b5e596170b594dc07cf2'),
    name: 'marcus',
    lastName: 'postgirl',
    phone: '1234567890',
    email: 'lorlor0@furl.net',
    password: 'pacoelflaco123',
    projects: [
      { _id: mongoose.Types.ObjectId('634d73ca260e0ee548943dc3') },
      { _id: mongoose.Types.ObjectId('634f42d0409f09628b8a1479') },
      { _id: mongoose.Types.ObjectId('634d924e260e0ee548943dc7') },
    ],
  },
  {
    _id: mongoose.Types.ObjectId('635317372535a3c0f85955eb'),
    name: 'maria laura',
    lastName: 'canoura',
    phone: '9876543210',
    email: 'laucan@furl.net',
    password: 'lalalala2',
    projects: [
      { _id: mongoose.Types.ObjectId('634d924e260e0ee548943dc7') },
      { _id: mongoose.Types.ObjectId('634f42d0409f09628b8a1479') },
    ],
  },
  {
    _id: mongoose.Types.ObjectId('635326e0531b3bfdf5a64ba9'),
    name: 'laura',
    lastName: 'lorenz',
    phone: '1521651210',
    email: 'lorlor0@furl.net',
    password: 'apgOdpXFw',
    projects: [
      { _id: mongoose.Types.ObjectId('6634f42d0409f09628b8a1479') },
    ],
  },
];
