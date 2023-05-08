import {useState,useEffect} from 'react';
import Schema from '@/data/Schema.json'

import { IJSONSchema } from '@/utils/interfaces/JsonSchema.interface';
import FieldsDynamicGenerator from './FieldsDynamicGenerator';

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@/redux/store';
import { getSchema } from '@/redux/reducer';

const useTypedSelector: TypedUseSelectorHook<RootState>=useSelector;

export default()=>{
    const dispatch = useDispatch();

    const [schema, setSchema]= useState<IJSONSchema | null >(null);
    useEffect(()=>{
        const fetchSchema = ()=>{
            const data =  dispatch(getSchema(Schema));
            setSchema(data);
        }
        fetchSchema();
    },[Schema]);

   return(
    <form className='box-content h-[fit-content] w-[fit-content] mx-auto rounded shadow-lg py-5 px-5 bg-blue-200  text-black  '>
        {schema !=null && (<FieldsDynamicGenerator schema={schema} />)}
    </form>
    );
}