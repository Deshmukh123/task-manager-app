import PropTypes from 'prop-types';

const Input = ({ 
  type = 'text', 
  label, 
  value, 
  onChange, 
  required = false, 
  placeholder = '', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary';

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`${baseClasses} min-h-[100px]`}
          {...props}
        />
      );
    }
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={baseClasses}
        {...props}
      />
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;