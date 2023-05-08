export interface IFormData {
    [key: string]: string;
};
export type JSONSchema = Record <string, any>;
export default function generateFormData(schema:JSONSchema):IFormData{
    const formData: IFormData =  {};
    for(const key in schema.properties){
        formData[key] = '';
    }

    return formData;

};
