import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import SmallButton from './SmallButton';

const ProviderModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <SmallButton text={"Add"} color={"#5DB075"} />
    </Provider>
  );
};

export default ProviderModal;