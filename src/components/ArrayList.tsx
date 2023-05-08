import { useState } from 'react';
import Input from "./FormInputs/Input";
import ObjectProperties from "./ObjectProperties";
import { IJSONSchema } from "@/utils/interfaces/JsonSchema.interface";
import { useDispatch } from 'react-redux';
import { removeFieldFromFormData } from '@/redux/reducer';

const ArrayList = ({ schema, name }: { schema: IJSONSchema, name: string }) => {
  const [updatedSchema, setUpdatedSchema] = useState<IJSONSchema>(schema);
  const [fieldCount, setFieldCount] = useState<number[]>([]);
  const dispatch = useDispatch();

  const handleAddField = (e: any) => {
    e.preventDefault();
    setFieldCount([...fieldCount, fieldCount.length]);
  }

  const removeField = (e: any, name: any, index: number) => {
    e.preventDefault();
    const itemIndex = fieldCount.indexOf(index);
    if (itemIndex > -1) {
      dispatch(removeFieldFromFormData({ name, itemIndex }));
      setFieldCount([...fieldCount.slice(0, itemIndex), ...fieldCount.slice(itemIndex + 1)]);
    }
  }

  const renderSwitch = () => {
    const items = updatedSchema.items as IJSONSchema;
    switch (items.type) {
      case 'string':
        return (
          <section className='flex flex-col justify-center gap-5 mb-2 ' >
            <div className='border-t-[1px] h-none border-gray-100 border-solid' />
            {
              fieldCount.map((index) => {
                return (
                  <div>
                    <h4>{schema.title}-{index + 1}*</h4>
                    <div key={`string-${index}`} className='flex gap-2 items-center' >
                      <Input arrPrefix={index} name={name} title={items.title ?? ''} />
                      <button className='p-1 rounded border-1 border-red-500 bg-red-500 text-2xl text-white  w-[2.5em] ' onClick={(e: any) => removeField(e, name, index)}>x</button>
                    </div>
                  </div>
                )
              })
            }
          </section>
        )

      case 'object':
        if (items.properties) {
          const properties: IJSONSchema = items.properties;
          return fieldCount.map((index) => {
            return (
              <div key={`object-${index}`} className='flex gap-2 items-center mb-2  ' >
                <ObjectProperties objectListIndex={index} schema={properties} />
                <button className='p-1 rounded border-1 border-red-500 bg-red-500 text-2xl text-white  w-[2.5em]' onClick={(e: any) => removeField(e, name, index)}>x</button>
              </div>
            )
          });
        }
        break;
      default:
        return null;
    }
  }

  if (updatedSchema && updatedSchema.type === 'array') {
    return (
      <>
        {renderSwitch()}
        <button
          className='w-[5em] self-end rounded border-1 border-blue-200 bg-blue-500 p-1 text-white text-4xl '
          onClick={handleAddField}>+</button>
      </>
    );
  }
  return null;

};

export default ArrayList;
