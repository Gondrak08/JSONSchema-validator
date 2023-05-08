import { TypedUseSelectorHook,useSelector, useDispatch } from "react-redux";
import { setFormData } from "@/redux/reducer";
import { RootState } from "@/redux/store";
import { IJSONSchema, JSONPrimitive } from "@/utils/interfaces/JsonSchema.interface";

interface IInput{
    name:string,
    title:string
    arrPrefix?:number|string|null
    objectListIndex?:number | string |null
}

const usedTypeSelector:TypedUseSelectorHook< RootState> = useSelector

const Input = ({title, name,  arrPrefix,objectListIndex}:IInput) => {
    const state = usedTypeSelector(state=>state.formData.formData);
    const dispatch = useDispatch();
    const schema:IJSONSchema = usedTypeSelector((state) => state.formData.schema);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        let fieldName = name;
        // If the field is within an array, add the prefix to the name
        if (arrPrefix !== null && arrPrefix !== undefined) {
          fieldName = `${fieldName}`;
        }
        dispatch(setFormData({ name: fieldName, value, arrPrefix, objectListIndex }));
        // If the value is an array, update form data recursively
        const fieldSchema = schema.properties && schema.properties[name];
        // console.log('hi', {value, fieldName});
        if (fieldSchema?.type === "array" && typeof value === "string") {
          const newPrefix = arrPrefix !== undefined ? `${name}.${arrPrefix}.` : name;
           const fieldName =name;
          dispatch(setFormData({ name: fieldName, value, arrPrefix: arrPrefix,objectListIndex:objectListIndex }));
        }
    };
    
    return <input className="px-1 py-2 rounded border-1 border-gray-200 drop-shadow  "  type="text" placeholder={title} name={name} onChange={handleInput} />
};

export default Input;