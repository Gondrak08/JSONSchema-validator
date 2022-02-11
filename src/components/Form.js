import React,{useState, useEffect, useContext} from 'react'
import '../styles/ContentItem.scss'

import ObjectContainer from './values/ObjectContainer';
import ArrayContainer  from './values/ArrayContainer';
import FormContext from '../context/FormContext';

function Form({schema}) {
    const [schemaJson, setSechemaJson] = useState(null);
    useEffect(() => {
        setSechemaJson(schema)
    }, [schema])
    const context = useContext(FormContext);
    
    
    function handleSubmit(e) {
        alert(JSON.stringify(context.content, undefined, 12))
        e.preventDefault()

    }
    const { type, properties } = schemaJson  ?? {} ;
    
    return (
        <section className="content-display" >

            {type === 'object' ? (
                <form className="form" onSubmit={(e) => handleSubmit(e)} >
                    <ObjectContainer
                        content={context.content}
                        setContent={context.setContent}
                        properties={properties}
                        schema={schemaJson}
                    />
                    <button type="submit"  className="btn-submit"  >
                    Submit content
                    </button>
                </form>)
                : type === 'array' ? (
                    <form className="form" onSubmit={(e) => handleSubmit(e)} >
                        <ArrayContainer
                            content={context.content}
                            setContent={context.setContent}
                            properties={properties}
                            schema={schemaJson}
                            schemaValue={schemaJson}
                        />
                        <button type="submit" className="btn-submit"  >
                            Submit content
                        </button>
                    </form>)
                 :
                'não é objeto'
            }
            
        </section>
    )
}

export default Form;
