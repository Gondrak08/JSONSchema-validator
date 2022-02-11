import React, {useRef, useContext,useState, useEffect} from 'react'
import '../../styles/ContentObject.scss'

import FormContext from '../../context/FormContext';

import StringContainer from './StringContainer';
import Checkbox from './CheckBox';
import OptionsBox from './OptionsBox';
import ArrayContainer from './ArrayContainer';
import IntergerContainer from './IntergerContainer';


import { v4 as uuid } from 'uuid';

function ObjectContainer({
    k,
    properties,
    property,
    content,
    schema,
    valueType,
    // handleDragStart,
    // handleDragEnter,
    // handleDragDrop,
    // dragging
}) {
    

   

    const unique_id = uuid();
    const context = useContext(FormContext);
    const indexRef = useRef();
    const [objList, setObjList] = useState({});
    
    useEffect(() => {
        if (property) {
            context.setObjProperty(property);
        }  
    },[property])


    function handleChange(e, schema, content, prop, value, id, key, type) {
    let old = { ...context.content }
    Object.keys(schema).map(i => {
        let obj = schema[i]
        if (obj instanceof Object) Object.keys(obj).map(label => {
            
            // Objects and Objectlist:        
            if (property) {
                if (obj[label].type === 'object') {
                    // if content is null
                    if (Object.keys(context.content).length == 0) {
                        if (label == property) {
                            context.setContent((state) => {
                                let newVal = {
                                    ...state, [property]: {
                                        ...state[property], [prop]: value || value
                                    }
                                }
                                return (newVal)
                            })
                            console.log('hehheh', label, property)
                        }
                        if (label !== property) {
                            context.setContent([label][property] = {
                                [label]: {
                                    [property]: [{}]
                                }
                            })
                            console.log(context.content)
                        }
                        
                        
                    }
                    if (Object.keys(context.content).length > 0){
                        if (label !== property && context.content[label][property] ) {
                         
                            if (property && label && prop) {
                                if (context.content[label][property].length > 0) {
                                    context.setContent((prevState) => {
                                        prevState[label][property][k][prop] =  value
                                        return ({
                                            ...prevState
                                        })
                                    })
                                    console.log(context.content[label][property]);
                                } else {
                                    
                                    context.setContent((prevState) => {
                                        prevState[label][property][prop] = value
                                        return ({
                                            ...prevState
                                        })
                                    })
                                    
                                }
                            }
                        }
                        else {
                            
                            context.setContent((state) => {
                                let newVal = {
                                    ...state, [property]: {
                                        ...state[property], [prop]: value
                                    }
                                }
                                return (newVal)
                            })
                            // context.setContent((state) => {
                            //     state[property][prop] = value || value;
                            //     return ({ ...state })
                            // });
                            
                        }
                        
                    }


                }
            }


            if (!property) {
                // Arrays List
                // console.log('hellooooOOOo')
                if (context.content[prop] instanceof Object) {
                    context.setContent((state) => {
                        state[prop][key] = value;
                        return ({ ...state });
                    })
                    // console.log(context.content, 'array');
                    // console.log(type, e.target.value)
                } else {
                    switch (type) {
                        case 'boolean':
                            return context.setContent((state) => {
                                state[prop] = value;
                                return ({ ...state })
                            }),
                            console.log(context.content)
                            
                        case 'string':
                            return context.setContent((state) => {
                                state[prop] = value;
                                return ({ ...state });
                            }),
                            console.log(context.content)
                                
                            
                        case 'integer':
                            return context.setContent((state) => {
                                state[prop] = e.target.valueAsNumber;
                                return ({ ...state });
                            })
                            
                        default:
                            break;
                    }
                }
            }

        })
    })

    return console.log(context.content)
        
    }

   async function addField(e, cont, prop, maxItems) {
        const newField = cont ? cont : [];
       let obj = { ...context.content };
       console.log(property)
        if (property) {
            if (objList) {
                let str;
                let bool;
                let boolValue;
                let int;
                let label;
                Object.keys(objList).map((l, i) => {
                    switch (objList[l].type) {
                        case 'string':
                            return str = l;
                        case 'boolean':
                            return bool = l,
                                boolValue = objList[l].default;
                        case 'integer':
                            return int = l;
                        default:
                            label = l;
                            break;
                    }
                }
                )

                if (Object.keys(obj).length === 0) { // obj is empty?
                    if (str || bool || label) {
                        context.setContent((state) => {
                            return {
                                ...state,
                                [property]: {
                                    [prop]: [{
                                        [bool ?? null]: boolValue ?? null,
                                        [str ?? null]: null,
                                        [int ?? null]: null
                                    }]
                                }
                            }
                        }
                        )
                    } 
                } else if (obj[property]) {
                    newField.push({
                        [bool ?? null]: boolValue ?? null,
                        [str ?? null]: null,
                        [int ?? null]: null,
                    })
                    obj[property][prop] = newField;
                    context.setContent(obj);
                    // console.log(obj);

                } else {
                    context.setContent((state) => {
                        return {
                            ...state,
                            [property]: {
                                [prop]: [{
                                    [bool ?? null]: boolValue ?? null,
                                    [str ?? null]: null,
                                    [int ?? null]: null
                                }]
                            }
                        }
                    }
                    )
                }
            }
            
        } 
        
        if (!property) {
            if (maxItems && newField.length < maxItems) {
                newField.push('');
                obj[prop] = newField;
                context.setContent(obj);
                // console.log('maxItems')
            }
            if (!maxItems) {
                newField.push(['']);
                obj[prop] = newField;
                context.setContent(obj);
                // console.log('no maxItems')
            }
        }
       

    }
    
    function removeField(e, cont, prop,) {
        const field = cont;
        let obj = { ...context.content };

        if (Object.keys(obj).length <= 0) {
            console.log('no item to delete')
        } else {
            field.splice(indexRef.current, 1)
            if (property) {
                obj[property][prop] = field;
                context.setContent(obj)
                console.log(
                    obj
                )
            } else {
                obj[prop] = field;
                context.setContent(obj)
                console.log(obj)
            }
            
        }

    }

    


    return (
        <div className="object-container" key={k}  >
            <div className="container"
                // draggable={handleDragStart ? true : false}
                // onDragStart={handleDragStart ? (e) => handleDragStart(e, k) : null}
                // onDragEnter={dragging ? (e)=>{ handleDragEnter(e, k)} : null}
            >
            {
                properties ? Object.keys(properties).map((value, key) => {
                    // console.log({
                    //     content: content,
                    //     value: value,
                    //     item: content[value],
                    //     key: key,
                    // })
    
                switch (properties[value].type) {  
                    case 'string':
                        return properties[value].enum ?
                            <OptionsBox
                                key={key}
                                k={key}
                                schema={schema}
                                schemaValue={properties[value]}
                                valueType={properties[value].type}
                                content={content ? content[value] : null}
                                fullContent={content ? content : null}
                                property={value}
                                handleChange={handleChange}

                            />
                            :
                        <StringContainer
                            key={key}
                            k={key}
                            schema={schema}
                            schemaValue={properties[value]}
                            valueType={properties[value].type}
                            content={content ? content[value] : null}
                            fullContent={content ? content : null}
                            property={value}
                            handleChange={handleChange}
                        />

                    case 'boolean':
                    return <Checkbox
                            id={unique_id}
                            key={key}
                            k={key}
                            schema={schema}
                            schemaValue={properties[value]}
                            valueType={properties[value].type}
                            content={content ? content[value] : properties[value].default}
                            property={value}
                            handleChange={handleChange}
                        />

                    case 'array':
                        return <>
                        {value ? <p>{value}</p>:null}
                        <span className="line-w" />
                        <ArrayContainer
                        key={key}
                        k={key}
                        indexRef={indexRef}
                        id={unique_id}
                        schema={schema}
                        schemaValue={properties[value]}
                        maxItems={properties[value].maxItems ?? null}
                        valueType={properties[value].type}
                        content={content ? content[value] : null}
                        property={value}
                        handleChange={handleChange}
                        addField={addField}
                        removeField={removeField}
                        objList={objList}
                        setObjList={setObjList}
                            />
                            </>
                    
                    case 'integer':
                        return <IntergerContainer
                            key={key}
                            k={key}
                            schema={schema}
                            schemaValue={properties[value]}
                            valueType={properties[value].type}
                            content={content ? content[value] : null}
                            property={value}
                            handleChange={handleChange}
                        />
                    case 'number':
                        return <IntergerContainer
                            key={key}
                            k={key}
                            schema={schema}
                            schemaValue={properties[value]}
                            valueType={properties[value].type}
                            content={content ? content[value] : null}
                            property={value}
                            handleChange={handleChange}
                        />
                    case 'object':
                        return <>
                        {value ? (<p>{ value}</p>):null}
                        <span className="line-w"/>
                        <ObjectContainer
                            key={key}
                            k={key}
                            id={unique_id}
                            schemaValue={properties[value]}
                            schema={schema}
                            properties={properties[value].properties}
                            valueType={properties[value].type}
                            content={content[value] ? content[value] :  null}
                            property={value}
                            handleChange={handleChange}    
                        />
                        </>
                    default:
                        return null;
                    
                }
                    
                }) : null
                }
                
            </div>
            
        </div>
    )
}

export default ObjectContainer
