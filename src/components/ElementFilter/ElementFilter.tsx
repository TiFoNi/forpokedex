import { useState } from "react";
import s from "./ElementFilter.module.scss";

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

const pokemonTypes = [
  "water",
  "fire",
  "electric",
  "grass",
  "dark",
  "flying",
  "ice",
  "poison",
  "rock",
  "dragon",
  "ghost",
  "steel",
  "ground",
  "fighting",
  "normal",
  "bug",
];

interface ElementFilterProps {
  pokemon: Pokemon[];
  handleSortedPokemon: (sortedPokemon: Pokemon[] | null) => void;
  pokemonList: Pokemon[];
  updateSelectedTypes: (types: string[]) => void;
}

const ElementFilter: React.FC<ElementFilterProps> = ({
  pokemon,
  handleSortedPokemon,
  pokemonList,
  updateSelectedTypes,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSortByType = (type: string) => {
    let newSelectedTypes = [...selectedTypes];

    if (newSelectedTypes.includes(type)) {
      newSelectedTypes = newSelectedTypes.filter(
        (selectedType) => selectedType !== type
      );
    } else {
      newSelectedTypes.push(type);
    }

    setSelectedTypes(newSelectedTypes);
    updateSelectedTypes(newSelectedTypes);

    let sortedPokemon = null;
    if (newSelectedTypes.length === 0) {
      handleSortedPokemon(null);
    } else {
      sortedPokemon = pokemon.filter((onepokemon) =>
        newSelectedTypes.some((selectedType) =>
          onepokemon.types.some((t) => t.type.name === selectedType)
        )
      );
    }

    handleSortedPokemon(sortedPokemon);
  };

  return (
    <div className={s.SecondRightMenu}>
      <div className={s.center}>
        {pokemonTypes.map((type, index) => (
          <button
            key={index}
            className={`${s.button} ${
              selectedTypes.includes(type) ? s.activeButton : ""
            }`}
            onClick={() => handleSortByType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElementFilter;
