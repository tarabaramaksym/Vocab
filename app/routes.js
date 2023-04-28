
const { getAllWords, addWord } = require('./db-functions');
const data = require('./data/vocab.json');

module.exports = function (app) {
  app.get('/words', async (req, res) => {
    try {
      const words = await getAllWords();
      res.json(words);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve words.' });
    }
  });

  app.post('/words', async (req, res) => {
    try {
      const { word, translation } = req.body;
      await addWord(word, translation);
      res.status(200)
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Something went wrong :(' });
    }
  })
}