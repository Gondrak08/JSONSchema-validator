import React, { useRef, useState, useContext, useEffect } from 'react'

import FormContext from '../../context/FormContext';
import {DragDropContext, Droppable, } from 'react-beautiful-dnd'

import StringContainer from './StringContainer';
import IntergerContainer from './IntergerContainer'
import ObjectContainer from './ObjectContainer';
import './../../styles/values/ListContainer.scss'

import { v4 as uuid } from 'uuid';
import { MdAdd, MdDelete } from 'react-icons/md'



function ArrayContainer({ k, indexRef, schema, schemaValue, maxItems, valueType, property, content, handleChange, addField, removeField,  objList, setObjList }) {
    
    const [data, setData] = useState(null);
    const context = useContext(FormContext);
    const unique_id = uuid();
    
    useEffect(() => {
        if (!data) {
            setData(schemaValue)
        }
    }, [schemaValue])
    
   
    
    // if (data) {
    //     Object.keys(data).map(i => {
    //         let newVal = data[i];
    //         Object.keys(newVal).map(i => {
    //             console.log(newVal[i])
    //         })
    //     })
    // }




    // const [keyList, setKeyList] = useState(null)
    // const [dragging, setDragging] = useState(false);
    // const dragItem = useRef();
    // const dragNode = useRef();

    // const handleDragStart = (e, params) => {
        
    //     dragNode.current = e.target;
    //     dragNode.current.addEventListener('dragend', handleDragDrop)
    //     dragItem.current = params;
    //     // console.log(dragItem.current, dragNode.current)
    //     setTimeout(() => {
    //         setDragging(true);
    //     }, 0)
    // }
    
    // const handleDragEnter = (e, targetItem) => {
    //     const obj = {...context.content}
       
    //     if (dragNode.current !== e.target) {
    //         context.setContent((state) => {
    //             let newList = JSON.parse(JSON.stringify(state[property]))
    //             newList.splice(targetItem.item, 0, newList.splice(dragItem.current, 1)[0])
                
    //             obj[property] = newList
    //             dragItem.current = targetItem;
    //             return {...obj}
    //         })
    //             // let newList = JSON.parse(JSON.stringify(content));
    //             // newList.splice(targetItem, 0, newList.splice(dragItem.current, 1)[0])
    //             // obj[property] = newList
    //             // context.setContent(obj)
    //         }
        
    //     console.log(context.content)
        
    // }

    // const handleDragDrop = (e, params) => {
    //     setDragging(false);
    //     dragItem.current = null;
    //     dragNode.current.removeEventListener('dragend', handleDragDrop)
    //     dragNode.current = null;
        
    // }

    

    return (
        <section className="array-container">
            {
                content && maxItems ?
                    content.length < maxItems ? (
                        <>
                            <button type="button"
                                className="add-button"
                                onClick={(e) => addField(e, content, property, schemaValue.maxItems)}
                            ><MdAdd size={24} color="#fff" />
                            </button>

                        </>
                    ) : null
                    : (
                        <>
                            <button type="button"
                                className="add-button"
                                onClick={(e) => addField(e, content, property, schemaValue.maxItems)}
                            ><MdAdd size={24} color="#fff" />
                            </button>

                        </>
                    )
            }
        <div className="list-row" >
            {/* <p>
                {
                    schemaValue.title ? schemaValue.title : schemaValue.type ? schemaValue.type : null
                }
            </p> */}
            {
                content && content.length > 0 ? (
                    <button type="button"
                        className="delete-button"
                        onClick={(e) => removeField(e, content, property)}
                    > <MdDelete size={24} color="#fff" />
                    </button>
                ) : null
            }
                
                <form className="list-values" id={content && content.length > 0 ? "active" : null}
                    // onDragEnter={dragging && [content].length ? (e) => { handleDragEnter(e, k) } : null}
                >
                {
                    
                        data ? Object.keys(data).map((item, key) => {

                            switch (data[item].type) {
                                case 'string':
                                    return content instanceof Object ? Object.keys(content).map(cont => (
                                        indexRef.current = cont,
                                        <StringContainer
                                            key={key}
                                            id={unique_id}
                                            k={cont}
                                            schema={schema}
                                            schemaValue={data[item]}
                                            valueType={data[item].type}
                                            content={content[cont]}
                                            property={property}
                                            handleChange={handleChange}
                                        // handleDragStart={handleDragStart}
                                        // handleDragEnter={handleDragEnter}
                                        // handleDragDrop={handleDragDrop}
                                        // dragging={dragging}


                                        />
                                    )) : null
                                case 'number':
                                    return  content instanceof Object ? Object.keys(content).map(cont => (
                                        indexRef.current = cont,
                                        <IntergerContainer
                                            key={key}
                                            id={unique_id}
                                            k={cont}
                                            schema={schema}
                                            schemaValue={data[item]}
                                            valueType={data[item].type}
                                            content={content[cont]}
                                            property={property}
                                            handleChange={handleChange}
                                        // handleDragStart={handleDragStart}
                                        // handleDragEnter={handleDragEnter}
                                        // handleDragDrop={handleDragDrop}
                                        // dragging={dragging}


                                        />
                                    )) : null
                                case 'object':
                                    return content instanceof Object ? Object.keys(content).map((cont, index) => (
                                        indexRef.current = index,
                                        <ObjectContainer
                                            properties={data[item].properties}
                                            key={index}
                                            k={index}
                                            schema={schema}
                                            valueType={data[item].type ?? null}
                                            content={content[cont] ?? null}
                                            property={property}
                                        // handleDragStart={handleDragStart}
                                        // handleDragEnter={handleDragEnter}
                                        // handleDragDrop={handleDragDrop}
                                        // dragging={dragging}
                                        />
                                    )) :
                                        (
                                            setObjList(data[item].properties),
                                            null
                                        )
                                default:
                                    return null;

                            }
                        }): null
                 }
            </form>
               
        </div>
        </section>
    )
}

export default ArrayContainer

  