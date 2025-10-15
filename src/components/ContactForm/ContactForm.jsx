import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import style from './ContactFormStyle.module.css';

export const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = useCallback(e => {
    setName(e.target.value);
  }, []);

  const handleNumberChange = useCallback(e => {
    setNumber(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

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

      setName('');
      setNumber('');
    },
    [addContact, contacts, name, number]
  );

  return (
    <>
      <form className={style.form_container} onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            className={style.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={handleNameChange}
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
            value={number}
            onChange={handleNumberChange}
          />
        </label>

        <button className={style.submitBtn} type="submit">
          Add Contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
