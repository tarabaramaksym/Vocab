import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const App = () => {
  const [vocabulary, setVocabulary] = useState([]);

  useEffect(() => {
    const fetchVocabulary = async () => {
      const { data } = await axios.get('http://localhost:81/words');
      setVocabulary(data)
    }
    fetchVocabulary();
  }, []);

  const renderWordPair = (wordPair, i) => {
    const { word, translation } = wordPair;

    return (
      <tr >
        <td>{word}</td>
        <td>{translation}</td>
      </tr>
    )
  }

  const addWord = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const word = formData.get('word')
    const translation = formData.get('translation')

    if (!word || !translation) {
      return;
    }

    const res = await axios.post('http://localhost:81/words', { word, translation })

    if (res.status === 200) {
      setVocabulary([...vocabulary, { word, translation }])
    }
  }

  return (
    <div>
      안녕하세요
      <div>
        <form onSubmit={addWord}>
          <Input name="word" label="Word" />
          <Input name="translation" label="Translation" />
          <Button>Submit</Button>
        </form>
      </div>
      <table>
        {vocabulary.map(renderWordPair)}
      </table>
    </div>
  );
}

export default App;
