import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  const confirmStyle = {
    color: 'white',
    background: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: 'white',
    background: 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  };

  if (type === 'valid') {
    return <div style={confirmStyle}>{message}</div>;
  } else if (type === 'error') {
    return (
      <div className='error' style={errorStyle}>
        {message}
      </div>
    );
  } else {
    return null;
  }
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
