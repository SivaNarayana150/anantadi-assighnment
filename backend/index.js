import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(cors());

// Set up multer for file uploads (without file type restriction)
const upload = multer({
  dest: 'uploads/',
});

// Database path and initialization
const dbPath = 'c://Users//kolla//Video-App-Anantadi-NextWave//backend//videos.db';
let db;

const initializeDatabaseServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const port = 3001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(`Database Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDatabaseServer();

// Route to create a new user
app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const selectUserQuery = `SELECT * FROM users WHERE username = ?`;
  const dbUser = await db.get(selectUserQuery, [username]);

  if (dbUser) {
    return res.status(400).send({ message: 'User already exists' });
  }

  const createUserQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
  try {
    const result = await db.run(createUserQuery, [username, hashedPassword]);
    res.status(201).send({ success: true, id: result.lastID, username });
  } catch (e) {
    console.error(`Error creating user: ${e.message}`);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route to log in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const selectUserQuery = `SELECT * FROM users WHERE username = ?`;
  const dbUser = await db.get(selectUserQuery, [username]);

  if (!dbUser) {
    return res.status(400).send({ message: 'User does not exist' });
  }

  const passwordMatch = await bcrypt.compare(password, dbUser.password);

  if (passwordMatch) {
    res.send({ success: true, message: 'Login successful', id: dbUser.id });
  } else {
    res.status(400).send({ message: 'Invalid password' });
  }
});

// Route to fetch videos with optional filters (title, tags, description)
app.get('/videos', async (req, res) => {
  const { title, tags, description } = req.query;
  let query = `SELECT id, title, description, tags, duration, file_size, uploaded_at, video_link FROM videos`;

  const queryParams = [];
  if (title) {
    query += ` WHERE title LIKE ?`;
    queryParams.push(`%${title}%`);
  }

  if (tags) {
    query += query.includes('WHERE') ? ` AND tags LIKE ?` : ` WHERE tags LIKE ?`;
    queryParams.push(`%${tags}%`);
  }

  if (description) {
    query += query.includes('WHERE') ? ` AND description LIKE ?` : ` WHERE description LIKE ?`;
    queryParams.push(`%${description}%`);
  }

  try {
    const videos = await db.all(query, queryParams);
    res.send(videos);
  } catch (e) {
    console.error(`Error fetching videos: ${e.message}`);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route to add a new video
app.post('/videos', async (req, res) => {
    const { title, description, tags, duration, uploaded_at, video_link } = req.body;
  
    if (!title || !description || !tags || !duration || !uploaded_at || !video_link) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    const insertVideoQuery = `
      INSERT INTO videos (title, description, tags, duration, uploaded_at, video_link)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    try {
      const result = await db.run(insertVideoQuery, [
        title,
        description,
        tags,
        duration,
        uploaded_at,
        video_link,
      ]);
  
      const insertedVideo = {
        id: result.lastID,
        title,
        description,
        tags,
        duration,
        uploaded_at,
        video_link,
      };
  
      res.status(201).send({ success: true, video: insertedVideo });
    } catch (e) {
      console.error(`Error inserting video: ${e.message}`);
      res.status(500).send({ message: 'Internal Server Error' });
    }
});

  

// Route to fetch a video by ID
app.get('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, title, description, tags, duration, file_size, uploaded_at, video_link FROM videos WHERE id = ?`;

  try {
    const video = await db.get(query, [id]);
    if (video) {
      res.send(video);
    } else {
      res.status(404).send({ message: 'Video not found' });
    }
  } catch (e) {
    console.error(`Error fetching video: ${e.message}`);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route to update a video by ID
app.put('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, duration, file_size, uploaded_at, video_link } = req.body;

  const updateQuery = `UPDATE videos SET title = ?, description = ?, tags = ?, duration = ?, file_size = ?, uploaded_at = ?, video_link = ? WHERE id = ?`;

  try {
    const result = await db.run(updateQuery, [
      title,
      description,
      tags,
      duration,
      file_size,
      uploaded_at,
      video_link,
      id,
    ]);

    if (result.changes === 0) {
      return res.status(404).send({ message: 'Video not found' });
    }

    res.send({ success: true, id, title, description, tags, duration, file_size, uploaded_at, video_link });
  } catch (e) {
    console.error(`Error updating video: ${e.message}`);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route to delete a video by ID 
app.delete('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM videos WHERE id = ?`;

  try { 
    const result = await db.run(deleteQuery, [id]);
    if (result.changes === 0) {
      return res.status(404).send({ message: 'Video not found' });
    }
    res.send({ success: true, message: 'Video deleted' });
  } catch (e) {
    console.error(`Error deleting video: ${e.message}`);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
