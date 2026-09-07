import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
    setSuccessMessage(`Added ${newName}`);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>

      {successMessage && <div style={notificationStyle}>{successMessage}</div>}

      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
};

export default App;