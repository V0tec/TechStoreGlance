interface CatalogMenuCardProps {
  name: string;
  image: string;
}

function CatalogMenuCard({ name, image }: CatalogMenuCardProps) {
  return (
    <div className="catalogMenu__card">
      <div className="catalogMenu__card-image">
        <img src={image} alt={name} />
      </div>
      <div className="catalogMenu__card-title">{name}</div>
    </div>
  );
}

export default CatalogMenuCard;
