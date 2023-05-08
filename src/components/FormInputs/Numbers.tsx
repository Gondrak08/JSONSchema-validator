import { useDispatch } from "react-redux"
import { setFormData } from "@/redux/reducer"

interface INumbers{
    title:string,
    name:string
};
const Numbers = ({title,name}:INumbers) => {
    const dispatch = useDispatch();
    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name, value} = e.target;
        dispatch(setFormData({name,value}));
    }

    return <input type="number" name={name}  placeholder={name} title={title}  onChange={ handleInput} />
}

export default Numbers;
