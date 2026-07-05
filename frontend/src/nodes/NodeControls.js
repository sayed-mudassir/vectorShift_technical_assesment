export const NodeField = ({ label, children }) => (
  <label className="node-field">
    <span>{label}</span>
    {children}
  </label>
);

export const TextInput = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    className="node-input"
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
  />
);

export const SelectInput = ({ value, onChange, options }) => (
  <select
    className="node-input node-select"
    value={value}
    onChange={(event) => onChange(event.target.value)}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
