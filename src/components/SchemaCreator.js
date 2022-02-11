const SchemaCreator = ({data, setData}) => {
    
    const HandlingData = (e) => {
        if (e.target.value.length > 0) {
            setData(JSON.parse(e.target.value))
        }
        if (e.target.value.length <= 0) {
            setData(e.target.value)
        }
        
    }   
    // console.log(data)
    return (
        <>
            <div className="schema-box">
                <div className="tag">
                    <span>JsonSchema</span>
                </div>
                <textarea id="schemaCreator" onChange={(e) => HandlingData(e)} name="schemaCreator" cols="auto" rows="auto" placeholder="{ ...Put your schema here }" >
                </textarea> 
            </div>
        </>
    )
}

export default SchemaCreator;