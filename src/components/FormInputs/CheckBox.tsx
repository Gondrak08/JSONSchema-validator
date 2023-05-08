import { useDispatch } from "react-redux"
import { setFormData } from "@/redux/reducer"

interface ICheckBox{
    title?:string,
    name?:string,
    objectListIndex?:string|number|null
}
const CheckBox=({title, name, objectListIndex}:ICheckBox)=>{
    const dispatch = useDispatch();
    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.checked;
        const name = e.target.name;
        dispatch(setFormData({name,value, objectListIndex}));
    };

    return <input type="checkbox" name={name} title={title} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleInput(e)}  />
}
export default CheckBox;