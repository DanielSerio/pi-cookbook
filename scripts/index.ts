import { createTables } from './create-tables'

export * from './create-tables'

const tableCreateResult = createTables()
  .then((data:null|Error) => {
    console.log(data)
    return data
  })

export default tableCreateResult