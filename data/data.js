const camelcaseKeys = require('camelcase-keys')
const { pool, poolPromise } = require('../config/mssql.connect')

module.exports = {
    sqlQuery: async (guid) => {
        await poolPromise;
        const query = await pool.request()
            .query(`SELECT [guid] FROM [Node].[Users] WHERE guid = '${guid}'`)

        return camelcaseKeys(query.recordset)
    },
    sqlStoredProcedure: async (guid) => {
        await poolPromise;
        const storedProcedure = await pool.request()
            // .input('guid', sql.NVarChar(50), guid) // Add SQL Data Type for validation
            .input('guid', guid)
            .execute(`[Node].[spGetAppUsers]`)

        return camelcaseKeys(storedProcedure.recordset)
    }
}
