
import Input from './FormInputs/Input';
import OptionSelector from './FormInputs/OptionSelector';
import Numbers from './FormInputs/Numbers';
import CheckBox from './FormInputs/CheckBox';
import ArrayList from './ArrayList';

import { IJSONSchema } from "@/utils/interfaces/JsonSchema.interface";

type objectListIndex = number | string | null;

const ObjectProperties = ({ schema, objectListIndex }: { schema: IJSONSchema, objectListIndex: objectListIndex }) => {
  const schemaKeys = Object.keys(schema);
  return (
    <section className='flex flex-col gap-5 max-w-[25em] w-full ' >
      {schemaKeys
        .map(key => {
          switch (schema[key].type) {
            case 'string':
              if (schema[key].enum) {
                return (
                  <section className='flex flex-col'>
                    <span className='m-none' >{schema[key].title ?? key}</span>
                    <OptionSelector key={key} title={schema[key].title} name={key} options={schema[key].enum} />
                  </section>
                );
              } else
                return (
                  <section className='flex flex-col' >
                    <span className='m-none' >{schema[key].title ?? key}</span>
                    <Input key={key} objectListIndex={objectListIndex} title={schema[key].title} name={key} />
                  </section>
                )
              break;
            case 'integer':
              return (
                <section className='flex flex-col'>
                  <span className='m-none' >{schema[key].title ?? key}</span>
                  <Numbers key={key} title={schema[key].title} name={key} />
                </section>
              );
              break;
            case 'boolean':
              return (
                <section className='flex flex-col'>
                  <CheckBox key={key} objectListIndex={objectListIndex} title={schema[key].title} name={key} />
                  <span className='m-none' >{schema[key].title ?? key}</span>
                </section>
              ) 
              break;
            case 'array':
              return(
                <section className='flex flex-col'>
                <span className='m-none text-xl' >{schema[key].title ?? key}</span>
                <ArrayList key={key} schema={schema[key]} name={key} />
              </section>
              ) 
              
              break;
            case 'object':
              return <ObjectProperties key={key} objectListIndex={key} schema={schema[key].properties} />
              break;
            default:
              return null;
          }
        })
      }
    </section>
  );
}

export default ObjectProperties;