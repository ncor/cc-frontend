import { ReactNode } from "react";


export type ContainerProps = {
    children: ReactNode
};

export type ModalProps = {
    children: ReactNode,
    onSubmit?: Function
};
