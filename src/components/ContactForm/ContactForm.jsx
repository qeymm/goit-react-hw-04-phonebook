import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import style from './ContactFormStyle.module.css';

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    const { addContact, contacts } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    });
    // Reset form
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <form className={style.form_container} onSubmit={this.handleSubmit}>
          <label>
            <p>Name</p>
            <input
              className={style.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
              required
              // Should always be paired (value and onChange)
              value={name}
              onChange={this.handleNameChange}
            />
          </label>

          <label>
            <p>Number</p>
            <input
              className={style.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              // Should always be paired (value and onChange)
              value={number}
              onChange={this.handleNumberChange}
            />
          </label>

          <button className={style.submitBtn} type="submit">
            Add Contact
          </button>
        </form>
      </>
    );
  }
}
