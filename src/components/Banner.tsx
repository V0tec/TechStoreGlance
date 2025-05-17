import bannerImage from "../assets/bannerImage.png";

function Banner() {
  return (
    <div className="banner">
      <div className="banner__text">
        <h2>Смарт колонка</h2>
        <p className="banner__accent">знижка 30%</p>
        <p>при покупці другого товару</p>
      </div>
      <img className="banner__image" src={bannerImage} alt="Колонка" />
    </div>
  );
}

export default Banner;
