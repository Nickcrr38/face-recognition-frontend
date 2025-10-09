const handleProfile = async (req, res, db) => {
  const { id } = req.params;
  if (!id) return res.status(400).json('Missing user id');

  try {
    const user = await db('users').where({ id }).first();
    if (!user) return res.status(404).json('User not found');
    res.json(user);
  } catch (err) {
    console.error('❌ Profile error:', err);
    res.status(500).json('Unable to fetch user profile');
  }
};

module.exports = { handleProfile };
