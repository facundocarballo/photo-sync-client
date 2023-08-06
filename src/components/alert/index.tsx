import React from "react";
import { AlertDialog, Button } from "native-base";
import { useProvider } from "../../context";
import { IAlert } from "./interface";


export const Alert = ({title, info, isOpen, setIsOpen}: IAlert) => {
    // Context
    const {  } = useProvider();

    // Attributes
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    // Component
    return (
        <>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>{title}</AlertDialog.Header>
                    <AlertDialog.Body>{info}</AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button colorScheme="green" onPress={onClose}>
                            OK
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
};