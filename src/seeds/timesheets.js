import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6354cffefc13ae548b000190'),
    description: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius..',
    date: '2022-02-24',
    task: mongoose.Types.ObjectId('6354d16dfc13ae65b20000de'),
    hours: 36,
    project: mongoose.Types.ObjectId('6354d08efc13ae65b200006c'),
    employee: mongoose.Types.ObjectId('6354d08efc13ae65b2000071'),
  },
  {
    _id: mongoose.Types.ObjectId('6354d16dfc13ae65b20000dd'),
    description: 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem..',
    date: '2022/02/24',
    task: mongoose.Types.ObjectId('6354d08efc13ae65b2000072'),
    hours: 36,
    project: mongoose.Types.ObjectId('6354d08efc13ae65b2000075'),
    employee: mongoose.Types.ObjectId('6354d08efc13ae65b2000074'),
  },
  {
    _id: mongoose.Types.ObjectId('6354d08efc13ae65b2000076'),
    description: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    date: '2022/09/05',
    task: mongoose.Types.ObjectId('6354d08efc13ae65b2000077'),
    hours: 13,
    project: mongoose.Types.ObjectId('6354d08efc13ae65b2000078'),
    employee: mongoose.Types.ObjectId('6354d08efc13ae65b200007e'),
  },
  {
    _id: mongoose.Types.ObjectId('6354d08efc13ae65b200007a'),
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    date: '2022/03/08',
    task: mongoose.Types.ObjectId('6354d08efc13ae65b200007b'),
    hours: 100,
    project: mongoose.Types.ObjectId('6354d16dfc13ae65b20000d9'),
    employee: mongoose.Types.ObjectId('6354d08efc13ae65b200007d'),
  },
  {
    _id: mongoose.Types.ObjectId('6354d16dfc13ae65b20000d1'),
    description: 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    date: '2022/04/26',
    task: mongoose.Types.ObjectId('6354d16dfc13ae65b20000d7'),
    hours: 97,
    project: mongoose.Types.ObjectId('6354d16dfc13ae65b20000d6'),
    employee: mongoose.Types.ObjectId('6354d08efc13ae65b200007d'),
  },
];
