import { useEffect, useState } from "react";
import s from "./Popup.module.scss";

interface Pokemon {
  name: string;
  id: number;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
  stats: {
    stat: {
      name: string;
    };
    base_stat: number;
  }[];
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, pokemon }) => {
  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className={s.popup}>
      <div className={s.popup_inner} onClick={handlePopupClick}>
        <div className={s.center}>
          <div className={s.container}>
            <button className={s.close_button} onClick={onClose}>
              X
            </button>
            <div className={s.nameContainer}>
              <h2 className={s.TextNameContainer}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </div>
            <div className={s.contentContainer}>
              <div className={s.imageContainer}>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className={s.pokemonImage}
                />
              </div>
              <div className={s.textContainer}>
                <p>ID: {pokemon.id}</p>
                <p>Вага: {pokemon.weight} кг</p>
                <p>Ріст: {pokemon.height} м</p>
                <p>
                  Типи:{" "}
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={s[type.type.name]}
                      style={{ marginRight: "5px" }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3 className={s.center}>Статистика</h3>
        <div>
          <ul>
            {pokemon.stats.map((stat) => {
              const [barWidth, setBarWidth] = useState(0);

              // const maxStat = Math.max(
              //   ...pokemon.stats.map((s) => s.base_stat)
              // );

              setTimeout(() => {
                setBarWidth((stat.base_stat / 300) * 100);
              }, 100);

              return (
                <div key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                  <hr
                    className={s.statBar}
                    style={{ width: `${barWidth}%` }}
                  ></hr>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Popup;
