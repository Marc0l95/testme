// utils.js
export const handleInputChange = (setter, setError, sendDataToBackend, state) => (e) => {
  const value = e.target.value;
  if (/^\d*$/.test(value)) { // Only allow digits
    setter(value);
    setError('');
    const data = {
      ...state,
      [e.target.id]: value,
    };
    sendDataToBackend(data);
  } else {
    setError('Invalid input: Only non-negative digits are allowed.');
  }
};
