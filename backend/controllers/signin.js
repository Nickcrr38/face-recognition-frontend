const handleSignin = async (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json('Missing credentials');

  try {
    const user = await db('users').where({ email }).first();
    if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userData } = user;
      res.json(userData);
    } else {
      res.status(400).json('Invalid credentials');
    }
  } catch (err) {
    console.error('❌ Signin error:', err);
    res.status(500).json('Error signing in');
  }
};

module.exports = { handleSignin };
