import React from 'react';
import Transactions from './Transactions';
import {
  Button,
  Heading,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { sendApiAction } from 'actions/actions';
import Chart from './Chart';

export const Profile = (props: any): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addressValue, setAddressValue] = React.useState('');
  const [amountValue, setAmountValue] = React.useState(0);
  const handleAddresChange = (event: any) =>
    setAddressValue(event.target.value);
  const handleAmountChange = (event: any) => setAmountValue(event.target.value);
  const sendJobCoin = async () => {
    await sendApiAction(props.user, addressValue, amountValue);
    props.txnComplete();
    onClose();
  };

  return (
    <div className="profile-wrapper">
      <Heading as="h2">Welcome, {props.user}</Heading>
      <Heading as="h3">Account Balance:</Heading>
      <Heading as="h4">{props.userData.balance} JBC</Heading>
      <Button onClick={onOpen}>Send jobCoin</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send JobCoin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              id="address"
              placeholder="Send to:"
              size="sm"
              value={addressValue}
              onChange={handleAddresChange}
            />
            <NumberInput>
              <NumberInputField
                id="amount"
                defaultValue={0}
                value={amountValue}
                onChange={handleAmountChange}
              />
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={() => sendJobCoin()}>
              SEND
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Transactions transactions={props.userData.transactions} />
      <Chart transactions={props.userData.transactions} />
    </div>
  );
};
