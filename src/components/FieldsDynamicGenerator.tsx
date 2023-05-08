import React from 'react';
// components
import ArrayList from './ArrayList';
import ObjectProperties from './ObjectProperties';
import { IJSONSchema } from '@/utils/interfaces/JsonSchema.interface';

export const FieldsDynamicGenerator =({ schema }:{schema:IJSONSchema}) => {; 
  const schemaKeys = Object.keys(schema);  
  return(
    <>
    {schemaKeys.map((key)=>{
      switch(schema[key].type){
        case 'object':
          return <ObjectProperties key={key} objectListIndex={key}  schema={schema[key].properties} />
          break;
        case 'array':
          return  <ArrayList key={key} schema={schema[key]} name={key} />
          break;
        default:
          return null
          break;
      }
    })}
    </>
  )
};

export default FieldsDynamicGenerator;
