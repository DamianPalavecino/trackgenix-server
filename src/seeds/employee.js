import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6352b5e596170b594dc07cf2'),
    name: 'Lucas',
    lastName: 'Salame',
    phone: '555555555',
    email: 'salamelucas@gmail.com',
    password: 'pacoelflaco123',
    project: mongoose.Types.ObjectId('634d73ca260e0ee548943dc3'),
  },
  {
    _id: mongoose.Types.ObjectId('635317372535a3c0f85955eb'),
    name: 'Pedro',
    lastName: 'Salchichon',
    phone: '555555555',
    email: 'pedrosalchicha@gmail.com',
    password: 'pacoelflaco123',
    project: mongoose.Types.ObjectId('634f42d0409f09628b8a1479'),
  },
  {
    _id: mongoose.Types.ObjectId('635326e0531b3bfdf5a64ba9'),
    name: 'Luis',
    lastName: 'Pepperonni',
    phone: '555555555',
    email: 'pepepecas@gmail.com',
    password: 'pacoelflaco123',
    project: mongoose.Types.ObjectId('634f42d0409f09628b8a1479'),
  },
];
