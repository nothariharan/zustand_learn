import { useState, type ChangeEvent } from "react"
import useFormStore from "../store/store_5"
import FormField from "./FormField";
interface NewField {
    label: string;
    type: 'text' | 'number' | 'password' | 'textarea' | 'data' | 'file';
    value: string;

}


const FormBuilder = () => {
    const { formFields, addField, removeField, updateField, resetForm } = useFormStore()
    const [newField,setNewField] = useState<NewField>({
        label: "",
        type: "text",
        value: "",
    })

    
  const handleAddField = () => {
    addField(newField);
    setNewField({ label: "", type: "text", value: "" });
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldUpdate = (index: number, updatedField: NewField) => {
    updateField(index, updatedField);
  };

  const handleFieldRemove = (index: number) => {
    removeField(index);
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Form Builder</h1>
        <div className="flex flex-col mb-6">
            <input type="text" name="label" placeholder="Field Label" value={newField.label} onChange={handleFieldChange} className="py-2 mb-2 border border-gray-300 rounded-lg"/>
            <select name="type" value={newField.type} onChange={handleFieldChange}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="textarea">Textarea</option>
                <option value="date">Date</option>
                <option value="field">Field</option>
            </select>

            <div className="flex justify-between">
                <button type="button" onClick={handleAddField} className="bg-blue-500 text-white py-2 px-2 rounded-lg">Add Field</button>
                <button type="button" onClick={resetForm} className="bg-red-500 text-white py-2 px-2 rounded-lg">Reset Form</button>
            </div>
        </div>

        <form>
        {formFields.map((field, index) => (
          <FormField
            key={index}
            field={field}
            index={index}
            onUpdate={handleFieldUpdate}
            onRemove={handleFieldRemove}
          />
        ))}
      </form>
    </div>
  )
}
export default FormBuilder