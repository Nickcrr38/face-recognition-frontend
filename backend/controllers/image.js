const handleImage = async (req, res, db) => {
  const { id } = req.body;
  if (!id) return res.status(400).json('Missing user id');

  try {
    const [updatedUser] = await db('users')
      .where({ id })
      .increment('entries', 1)
      .returning(['id', 'name', 'email', 'entries', 'joined']);

    if (!updatedUser) return res.status(400).json('User not found');
    res.json(updatedUser);
  } catch (err) {
    console.error('❌ Image update error:', err);
    res.status(500).json('Unable to update entries');
  }
};

module.exports = { handleImage };
