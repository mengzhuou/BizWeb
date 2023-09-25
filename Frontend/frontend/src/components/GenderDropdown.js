function GenderDropdown({ setGender, gender }) {
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <select
      id="gender"
      name="gender"
      value={gender}
      onChange={handleGenderChange}
    >
      <option value="">Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  );
}

export default GenderDropdown;
