import { useEffect } from 'react';
export const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
    useEffect(() => {
        if (ref === null) {

            return
        }

        const eventHandler = (event: Event) => {
            if (!ref.current?.contains(<Node>event.target)) {
                handler()
            }
        }

        document.addEventListener("mousedown", eventHandler)

        return () => {
            document.removeEventListener("mousedown", eventHandler)
        }

    }, [ref])
}