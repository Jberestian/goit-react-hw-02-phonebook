import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactBook from './ContactBook/ContactBook';
import Filter from './Filter/Filter';
import Form from './Form/Form';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = items => {
    console.log('addContact');

    if (this.isDublicate(items)) {
      return alert(
        `${items.name}: ${items.number} contact already in your list`
      );
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...items,
      };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      item =>
        item.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
        item.number === number
    );
    return result;
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return {
        contacts: newContacts,
      };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContact() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) || number.includes(filter);
      return result;
    });
    return filteredContacts;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contasts = this.getFilteredContact();
    return (
      <>
        <h2>Phonebook</h2>
        <Form onSubmit={addContact} />
        <Filter onChange={handleFilter} />

        <h2>Contacts</h2>

        <ContactBook contacts={contasts} removeContact={removeContact} />
      </>
    );
  }
}

export default App;
