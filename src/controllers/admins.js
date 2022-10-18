import Admins from '../models/admins';

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(201).json({
      message: `Admin id  ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Admin not edited',
      error: true,
    });
  }
};

export default {
  editAdmin,
};
