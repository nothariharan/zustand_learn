import React from 'react';

// 1. Define the Field shape ONCE to avoid repetition
interface FieldData {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
  // Allow value to be a FileList or File for uploads, not just string
  value: string | FileList | null; 
}

interface FormFieldProps {
  field: FieldData;
  index: number;
  onUpdate: (index: number, updatedField: FieldData) => void;
  onRemove: (index: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, index, onUpdate, onRemove }) => {
  
  // 2. Render the specific input based on type
  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={field.value as string}
            onChange={(e) => onUpdate(index, { ...field, value: e.target.value })}
          />
        );
      
      case "file":
        return (
          <input
            type="file"
            // File inputs should not have a 'value' prop controlled by React (unless empty string)
            onChange={(e) => onUpdate(index, { ...field, value: e.target.files })} 
          />
        );

      default:
        return (
          <input
            type={field.type}
            value={field.value as string}
            onChange={(e) => onUpdate(index, { ...field, value: e.target.value })}
          />
        );
    }
  };

  // 3. Single render structure for the layout
  return (
    <div className="form-field-container">
      <label>
        <span className="label-text">{field.label}</span>
        {renderInput()}
      </label>
      
      <button type="button" onClick={() => onRemove(index)}>
        Remove
      </button>
    </div>
  );
};

export default FormField;