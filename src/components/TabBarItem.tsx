interface TabBarItemProps {
  name: string;
  image?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isMobile?: boolean;
}

const TabBarItem: React.FC<TabBarItemProps> = ({
  name,
  image,
  onClick,
  buttonRef,
  isMobile = false,
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        ref={buttonRef}
        className={`tabBarItem__button ${
          isMobile ? "tabBarItem__button--mobile" : ""
        }`}
      >
        {!isMobile && image && <img src={image} alt={name} />}
        <p className={isMobile ? "tabBarItem__text--mobile" : ""}>{name}</p>
      </button>
    </li>
  );
};

export default TabBarItem;
