import React from 'react'
import './../../styles/values/OptionsBox.scss'
import { v4 as uuid } from 'uuid';

function OptionsBox({ k, schema, schemaValue, valueType, content, property, handleChange }) {
    const unique_id = uuid();
  
    return (
        <div className="options-box" >
            {valueType ? (<p> {valueType} </p>) : null}
            <select id={unique_id} className="options-box" style={{ width: '10%' }}
                defaultValue={content}
                selected={content ? content : null}
                name="" id=""
                onChange={(e) => handleChange(
                e,
                schema,
                content,
                property,
                e.target.value,
                e.target.id,
                k,
                valueType
            )} >
                
                {
                    schemaValue.enum.length > 0 ?
                    schemaValue.enum.map((option, key) =>
                    
                    (
                        <option id={unique_id} key={key} >{option}</option> )
                    )
                    : ''
                }
            </select>
        </div>
    )
}

export default OptionsBox
