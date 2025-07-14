const Session = require('../models/Session');

const createSession = async (req, res) => {
  try {
    const userId = req.user.id; 

    const newSession = new Session({
      createdBy: userId,
      participants: [
        {
          user: userId,
          role: 'admin'
        }
      ]
    });

    await newSession.save();

    res.status(201).json({
      message: 'Session created successfully',
      session: newSession,
      guestJoinLink: `${process.env.CLIENT_URL}/studio/${newSession._id}?role=guest`
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

const updateSessionTitle = async (req, res) => {
    const sessionId = req.params.sessionId;
    const { title } = req.body;
  
    try {
      const session = await Session.findById(sessionId);
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      if (session.createdBy.toString() !== req.user.id.toString()) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      session.title = title || 'Untitled Session';
      await session.save();
  
      res.status(200).json({ message: 'Title updated', session });
    } catch (err) {
      console.error('Error updating title:', err);
      res.status(500).json({ error: 'Failed to update session title' });
    }
};
  
const joinAsGuest = async (req, res) => {
  const { sessionId } = req.params;
  const guestName = req.body.guestName;

  if (!guestName) {
    return res.status(400).json({ error: 'Guest name is required' });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    session.participants.push({
      guestName,
      role: 'guest',
      user: null
    });

    await session.save();

    res.status(200).json({ message: 'Joined as guest', sessionId });
  } catch (err) {
    console.error('Guest join failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSession,
  updateSessionTitle,
  joinAsGuest
};

  
