const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow digits
      setter(value);
      setError('');
      const data = {
        input1,
        input2,
        dropdown1,
        dropdown2,
        dropdown3,
        [e.target.id]: value,
      };
      sendDataToBackend(data);
    } else {
      setError('Invalid input: Only non-negative digits are allowed.');
    }
  };
