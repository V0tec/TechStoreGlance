type CatalogCardProps = {
    name: string;
    image: string;
  };

function CatalogCard ({ name, image }: CatalogCardProps) {
    return (
        <li className="catalogMenu__card">
            <div className="catalogMenu__card-image">
            <img src={image} alt={name} />
            </div>
            <p>{name}</p>
        </li>
    )
}

export default CatalogCard