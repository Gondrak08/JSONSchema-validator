import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid';

function IntergerContainer({ schema, schemaValue, valueType, k, content, property, handleChange }) {
    const unique_id = uuid();
    return (
        <div style={{ width: '3em' }}>
            {schema ? <p>{schema.type} </p> : 'null'}
            <input id={unique_id}
                type="number"
                placeholder="0"
                defaultValue={schemaValue.default ?? null}
                min={schemaValue.minimum ?? null}
                max={schemaValue.maximum ?? null}
                value={content}
                onChange={(e) => handleChange(
                    e,
                    schema,
                    content,
                    property,
                    e.target.valueAsNumber,
                    e.target.id,
                    k,
                    valueType
            )} />
        </div>
    )
}
export default IntergerContainer;
