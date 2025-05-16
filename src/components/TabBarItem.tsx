import { RefObject, MutableRefObject } from "react";

type TabBarItemProps = {
    name: string
    image: string
    onClick?: () => void;
    buttonRef?: RefObject<HTMLButtonElement> | MutableRefObject<HTMLButtonElement | null>;
};

function TabBarItem ({ name, image, onClick, buttonRef } : TabBarItemProps) {
    return (
        <li>
            <button type="button" ref={buttonRef} onClick={onClick}>
                <img src={image} alt={name} />
                <p>{name}</p>
            </button>
        </li>
    )
}

export default TabBarItem