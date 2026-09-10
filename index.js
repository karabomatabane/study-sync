require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const connectionString = process.env.CONNECTION_STRING
const pgp = require('pg-promise')(/* options */);

const db = pgp(connectionString);

// Connect to postgres
db.connect().then(() => {
  console.log('Connected to PostgreSQL database');
}).catch(err => {
  console.error('Failed to connect to PostgreSQL database', err)
});

app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/questions', async function (req, res) {
  try {
    const data = await db.one(`
      SELECT
        (SELECT count(CASE WHEN is_correct THEN 1 END) FROM answers) as score,
        (SELECT COUNT(true) FROM answers) as answers_total,
        (
          SELECT next_q.id 
          FROM questions as next_q
          WHERE NOT EXISTS (
            SELECT 1
            FROM answers AS a
            WHERE a.question_id = next_q.id
          )
          ORDER BY next_q.created_at
          LIMIT 1
        ) AS question_index,
        COALESCE(json_agg(to_jsonb(q) - 'correct_answer'), '[]'::json) AS questions
      FROM questions AS q
    `);

    res.json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: 'Unable to fetch questions' });
  }
});

app.put('/reset', async function (req, res) {
  try {
    await db.none('TRUNCATE answers');

    data = await db.one(`
      SELECT
        (SELECT count(CASE WHEN is_correct THEN 1 END) FROM answers) as score,
        (SELECT count(true) FROM answers) as answers_total,
        (
          SELECT next_q.id 
            FROM questions as next_q
            WHERE NOT EXISTS (
              SELECT 1
              FROM answers AS a
              WHERE a.question_id = next_q.id
            )
            ORDER BY next_q.created_at
            LIMIT 1
        ) AS question_index
    `);
    res.json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: 'Failed to reset session' });
  }
});

app.put('/submit', async function (req, res) {
  try {
    const choice = req.body.choice;
    const questionId = req.body.question_id;
    let data = await db.oneOrNone(
      'SELECT correct_answer FROM questions WHERE id = $1',
      questionId
    );

    const is_correct = data.correct_answer === choice;

    await db.none(`
      INSERT INTO answers (question_id, choice, is_correct) VALUES ($1, $2, $3)`,
      [req.body.question_id, req.body.choice, is_correct]
    );

    data = await db.one(`
      SELECT
        (SELECT count(CASE WHEN is_correct THEN 1 END) FROM answers) as score,
        (SELECT count(true) FROM answers) as answers_total,
        (
          SELECT next_q.id 
            FROM questions as next_q
            WHERE NOT EXISTS (
              SELECT 1
              FROM answers AS a
              WHERE a.question_id = next_q.id
            )
            ORDER BY next_q.created_at
            LIMIT 1
        ) AS question_index
    `);
    res.json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: 'Failed to record answer' });
  }
});


app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/style.css'));
});

app.get('/app.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app.js'));
});

console.log(`PLANNING TO USE PORT: ${port}`)
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`))
