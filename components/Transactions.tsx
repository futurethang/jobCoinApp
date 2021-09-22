import React from 'react';
import { DateTime } from 'luxon';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

export default function Transactions(props: any) {
  return (
    <Table variant="simple" size="sm">
      <TableCaption>Latest Transactions</TableCaption>
      <Thead>
        <Tr>
          <Th>Amount</Th>
          <Th>TimeStamp</Th>
          <Th>Sent To</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.transactions
          .slice(0)
          .reverse()
          .map((transaction: any) => {
            return (
              <Tr key={transaction.timeStamp}>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.timestamp}</Td>
                <Td>{transaction.toAddress}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
}
