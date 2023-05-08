import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJSONSchema } from "@/utils/interfaces/JsonSchema.interface";
import { FormData, FlattenedFormData, } from "@/utils/types/types";
import flattenFormData from "@/utils/flattenFormData";
import getFormData from "@/utils/getFormData"
import createFlattenObject from "@/utils/createFlattenObject";


export interface IFormState {
    formData: FormData;
    flattenFormData: FlattenedFormData;
    schema: IJSONSchema;
    error: Error | null;
}

const initialState: IFormState = {
    formData: {},
    flattenFormData: {} as FlattenedFormData,
    schema: {} as IJSONSchema,
    error: null
}




export const FormDataSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setFormData: (state: any, action: PayloadAction<{ name: string; value: string | boolean; arrPrefix?: any; objectListIndex?: any }>) => {
            const schema = state.schema;
            const { name, value, arrPrefix, objectListIndex } = action.payload;
            const formData = { ...state.formData, [name]: value };
            const properties: IJSONSchema = schema.properties
            const flattenedObject: any = {}

            for (const [key, prop] of Object.entries(properties || {})) {
                flattenedObject[key] = createFlattenObject(name, state.formData, formData, prop, `${key}.`, arrPrefix, objectListIndex);
            }
            state.formData = flattenedObject;
        },
        removeFieldFromFormData: (state: any, action: PayloadAction<{
            name: string;
            itemIndex: any
        }>) => {
            const schema: IJSONSchema = state.schema;
            const { name, itemIndex } = action.payload;

            const removeData = (name: string, form: any, schema: IJSONSchema, itemIndex: number, arrPrefix = '') => {
                const formData = form && JSON.parse(JSON.stringify(form));

                if(formData && formData !=undefined){
                    for (const [key, prop] of Object.entries(schema.properties || {})) {
                        const propName = arrPrefix ? `${arrPrefix}.${key}` : key;
                
                        if (prop.type === 'object' && prop.properties) {
                            formData[key] = removeData(name, formData[key], prop, itemIndex, propName);
                        } else if (prop.type === 'array' && prop.items && prop.items?.type !== "object") {
                            const arr = [...(formData[key] || [])];
                
                            if (key === name && itemIndex !== undefined && arr.length > 0) {
                                arr.splice(itemIndex, 1);
                                formData[key] = arr;
                
                                return formData;
                            }
                
                        } else {
                            const items: IJSONSchema = prop.items;
                            if (items?.type === "object" && items?.properties) {
                                const nestedArr = formData[key];
                                const arr = [...nestedArr];
                                            
                                if (name === key && arr.length > 0) {
                                    arr.splice(itemIndex, 1);
                                                
                                    return { ...formData, [key]: arr };
                                }
                            } else if (name !== key  ) {
                                formData[key] =  form[key];
                            }
                        }
                    }
                }
            
                return formData;
            };
            

            const clonedFormData = removeData(name, state.formData , schema, itemIndex);


            return {
                ...state,
                formData: clonedFormData
            };




        },
        getSchema: (state: IFormState, action: PayloadAction<IJSONSchema>) => {
            state.schema = action.payload;
        },
        setError: (state: any, action: PayloadAction<Error | null>) => {
            state.error = action.payload
        },
        submitForm: (state: IFormState, action: PayloadAction<HTMLFormElement>) => {
            const formData = getFormData(action.payload);
            state.formData = formData;
            state.flattenFormData = flattenFormData(formData);
        },

    }
});

export const { setFormData, removeFieldFromFormData, getSchema, setError, submitForm } = FormDataSlice.actions;
export default FormDataSlice.reducer;