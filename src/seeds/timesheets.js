import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6354cffefc13ae548b000190'),
    description: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius..',
    date: '2022-02-24',
    task: mongoose.Types.ObjectId('634f281aca551819ef903f75'),
    hours: 36,
    project: mongoose.Types.ObjectId('634f42d0409f09628b8a1479'),
    employee: mongoose.Types.ObjectId('634d795e0e4d452e827183e6'),
  },
  {
    _id: mongoose.Types.ObjectId('6354d16dfc13ae65b20000dd'),
    description: 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem..',
    date: '2022/02/24',
    task: mongoose.Types.ObjectId('6353177e414b58f4591599e0'),
    hours: 36,
    project: mongoose.Types.ObjectId('634d924e260e0ee548943dc7'),
    employee: mongoose.Types.ObjectId('6353177e414b58f4591599e0'),
  },
  {
    _id: mongoose.Types.ObjectId('6354d08efc13ae65b2000076'),
    description: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    date: '2022/09/05',
    task: mongoose.Types.ObjectId('634f281aca551819ef903f75'),
    hours: 13,
    project: mongoose.Types.ObjectId('634d73ca260e0ee548943dc3'),
    employee: mongoose.Types.ObjectId('634f281aca551819ef903f75'),
  },
];
