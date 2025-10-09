const handleRegister = async (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json('Incomplete registration');

  const hash = bcrypt.hashSync(password, 10);

  try {
    const [user] = await db('users')
      .insert({ name, email, hash, entries: 0, joined: new Date() })
      .returning(['id', 'name', 'email', 'entries', 'joined']);

    res.json(user);
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json('Error registering user');
  }
};

module.exports = { handleRegister };
