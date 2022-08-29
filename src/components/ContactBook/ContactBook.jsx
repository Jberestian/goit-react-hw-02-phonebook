import PropTypes from 'prop-types';

import s from './contactBook.module.css';

const ContactBook = ({ contacts, removeContact }) => {
  const elements = contacts.map(({ id, name, number }) => (
    <li className={s.item} key={id}>
      {name}: {number}
      <button
        onClick={() => removeContact(id)}
        type="button"
        className={s.button}
      >
        remove
      </button>
    </li>
  ));
  return <ul>{elements}</ul>;
};

export default ContactBook;

ContactBook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
