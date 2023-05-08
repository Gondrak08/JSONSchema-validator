import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { setFormData } from "@/redux/reducer";
import { RootState } from "@/redux/store";

interface IOptionSelector{
    title:string;
    name:string;
    options:string[];
};
const usedTypeSelector:TypedUseSelectorHook< RootState> = useSelector

const OptionSelector =({title,name, options}:IOptionSelector)=>{
    const dispatch = useDispatch();
    // const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    //     e.preventDefault();
    //     const {value} = e.target;
    //     dispatch(setFormData({name, value}));  
    // }
    const schema = usedTypeSelector((state)=>state.formData.schema)
    const formData = usedTypeSelector((state)=>state.formData.flattenFormData)
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();

        const { value } = e.target;
        let fieldName = name;
      
      
        dispatch(setFormData({ name: fieldName, value  }));
      

      };

      console.log(formData)

    return(
        <select onChange={(e:any)=> handleInput(e)} >
            {
                options.map((option:string, index:number )=>(
                    <option key={index} value={option}  >{option}</option>
                ))
            }
        </select>
    )
};

export default OptionSelector;