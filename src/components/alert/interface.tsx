export interface IAlert {
    title: string,
    info: string,
    isOpen: boolean,
    setIsOpen: (_isOpen: boolean) => void
}