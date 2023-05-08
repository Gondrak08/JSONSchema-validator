import { IJSONSchema } from "./interfaces/JsonSchema.interface";

const validateSchemaInterface=<T extends IJSONSchema>(schema:T):T=>{
    return schema;
}
export default validateSchemaInterface;