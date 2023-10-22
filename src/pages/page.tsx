"use client";
import { useEffect, useState } from "react";
import s from "./page.module.scss";
import axios from "axios";
import { Card } from "react-bootstrap";
import SearchPokemon from "@/components/SearchPokemon";
import PageButtons from "@/components/PagesButtons/PagesButtons";
import Placeholder from "react-bootstrap/Placeholder";
import ElementFilter from "@/components/ElementFilter/ElementFilter";
import Popup from "@/components/Popup";
import TabsButtons from "@/components/TabsButtons/TabsButtons";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

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

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[] | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [isButtonsLocked, setIsButtonsLocked] = useState(false);

  const loadAllPokemon = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemonCount}`
    );
    const data = response.data.results;

    const allPokemonDataPromises = data.map(
      (pokemon: { name: string; url: string }) =>
        axios.get(pokemon.url).then((res) => res.data)
    );
    const allPokemonData = await Promise.all(allPokemonDataPromises);
    setAllPokemon(allPokemonData);
  };
  const [PokemonsCount, setPokemonsCount] = useState(18);
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth < 768) {
        handleColumnsChange(2);
        setIsButtonsLocked(true);
      } else {
        setIsButtonsLocked(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    setDataLoading(true);

    const fetchData = async () => {
      const offset = (currentPage - 1) * PokemonsCount;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${PokemonsCount}&offset=${offset}`
      );
      const data = response.data.results;

      const pokemonDataPromises = data.map(
        (pokemon: { name: string; url: string }) =>
          axios.get(pokemon.url).then((res) => res.data)
      );

      const pokemonData = await Promise.all(pokemonDataPromises);
      setPokemonList(pokemonData);
      setDataLoading(false);
    };

    fetchData();

    if (allPokemon.length === 0) {
      handleColumnsChange(3);
      loadAllPokemon();
      handleResize();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage, PokemonsCount, allPokemon.length]);

  const [searchPokemons, setsearchPokemons] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);

    let searchResults: Pokemon[] = [];
    if (filteredPokemon) {
      if (filteredPokemon.length !== 0) {
        searchResults = filteredPokemon.filter((pokemon) => {
          return (
            String(pokemon.id) === searchText ||
            pokemon.name.toLowerCase().includes(searchText.toLowerCase())
          );
        });
      }
    } else {
      searchResults = allPokemon.filter((pokemon) => {
        return (
          String(pokemon.id) === searchText ||
          pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    setsearchPokemons(searchResults);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchText("");
  };

  const totalPokemonCount = 1000;

  const [columnCount, setColumnCount] = useState(3);

  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  const handleColumnsChange = (cols: number) => {
    setColumnCount(cols);
    setActiveButtonIndex(cols);
  };

  const [activeButtonIndexPCount, setActiveButtonIndexPCount] = useState(18);

  const handlePokemonsCountChange = (Count: number) => {
    setPokemonsCount(Count);
    setActiveButtonIndexPCount(Count);
    setCurrentPage(1);
  };

  const handleSortedPokemon = (sortedPokemon: Pokemon[] | null) => {
    if (searchText) {
      const searchResults = (sortedPokemon || allPokemon).filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setsearchPokemons(searchResults);
    } else {
      setFilteredPokemon(sortedPokemon);
    }
  };

  const [dataLoading, setDataLoading] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [pokemonToShow, setPokemonToShow] = useState<Pokemon | null>(null);

  const openPopup = (pokemon: Pokemon) => {
    setPokemonToShow(pokemon);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const [isRightMenuVisible, setIsRightMenuVisible] = useState(false);

  return (
    <div className={s.BGcontainer}>
      <div className={s.pagesContainer}>
        <div className={s.UpMenu}>
          <SearchPokemon onSearch={handleSearch} searchText={searchText} />
          <button
            className={s.UpMenuButton}
            onClick={() => setIsRightMenuVisible(!isRightMenuVisible)}
          >
            Menu
          </button>
        </div>
        <div className={s.forButtons}>
          <PageButtons
            totalPagesCount={Math.ceil(totalPokemonCount / PokemonsCount)}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <div className={s.pageContainer}>
        <div className={s.leftColumn}></div>
        <div className={s.middleColumn}>
          <div className={s.container}>
            {(searchText ? searchPokemons : filteredPokemon || pokemonList).map(
              (pokemon) => (
                <div
                  key={pokemon.id}
                  className={s.mone}
                  style={{ width: `calc(${100 / columnCount}% - 1rem)` }}
                >
                  <Card
                    border="secondary"
                    style={{ width: "18rem", borderColor: "darkgreen" }}
                  >
                    <Card.Header className={s.CardHeader}>
                      <div>
                        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                      </div>
                      <div className={s.IdCardHeader}>Id: {pokemon.id}</div>
                    </Card.Header>

                    <Card.Body>
                      <div>
                        <Image
                          src={pokemon.sprites.front_default}
                          alt={pokemon.name}
                          style={{ cursor: "pointer" }}
                          onClick={() => openPopup(pokemon)}
                          width={100}
                          height={100}
                          className={s.pokemonImage}
                        />
                      </div>
                      <hr />
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
                    </Card.Body>
                  </Card>
                </div>
              )
            )}
          </div>
          <div onClick={closePopup}>
            {pokemonToShow && (
              <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                pokemon={pokemonToShow}
              />
            )}
          </div>
        </div>
        <div
          className={`${s.rightMenuBackground} ${
            isRightMenuVisible ? s.active : ""
          }`}
          onClick={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.classList.contains(s.rightMenuBackground)
            ) {
              setIsRightMenuVisible(false);
            }
          }}
        >
          <div
            className={`${s.rightMenuContainer} ${
              isRightMenuVisible ? s.active : ""
            }`}
          >
            <div className={s.rightColumn}>
              <div className={s.rightMenu}>
                <div>
                  <TabsButtons
                    activeButtonIndex={activeButtonIndex}
                    isButtonsLocked={isButtonsLocked}
                    handleColumnsChange={handleColumnsChange}
                    activeButtonIndexPCount={activeButtonIndexPCount}
                    handlePokemonsCountChange={handlePokemonsCountChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <ElementFilter
                pokemon={allPokemon}
                handleSortedPokemon={handleSortedPokemon}
                pokemonList={pokemonList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
