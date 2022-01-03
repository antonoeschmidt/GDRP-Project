import React from "react"
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react"

const TablePermissionComponent = () => {

    return(
        <Table striped>
            <TableHeader>
            <TableRow>
                <TableHeaderCell>Data ID</TableHeaderCell>
                <TableHeaderCell>Retention</TableHeaderCell>
                <TableHeaderCell>Test</TableHeaderCell>
            </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Test</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Test</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default TablePermissionComponent