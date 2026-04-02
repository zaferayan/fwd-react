import { MyButton } from "./MyButton";

type Props = {
  basHarfler: string;
  isim: string;
};

// props: properties: özellikler
const Card = ({ basHarfler, isim }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        margin: 16,
        border: "1px solid #666",
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#222",
      }}
    >
      <img
        src={`https://placehold.co/100x100?text=${basHarfler}`}
        style={{
          width: 32,
          height: 32,
          borderRadius: 32,
        }}
      />
      <span>{isim}</span>
      <MyButton />
    </div>
  );
};

export default Card;
