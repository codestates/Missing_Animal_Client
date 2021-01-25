import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import SearchBar from "../searchBar/SearchBar";
import "./board.css";
import axios from "axios";

function Board() {
  const [state, setState] = useState({
    get: {
      petsList: [],
    },
    search: {
      query: "",
      petsList: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get('http://localhost:8080/pets/petslist');
      const res = await axios.get("https://missinganimals.ml/pets/petslist");
      if (res.status === 200) {
        console.log(res.status, res.statusText);
        setState((prevState) => ({
          ...prevState,
          get: {
            petsList: res.data.petslist,
          },
        }));
      } else {
        console.log(res.status, res.statusText);
      }
    };
    fetchData();
  }, []);

  const searchPets = async (keyword) => {
    // const res = await axios.post('http://localhost:8080/pets/search', { search: keyword });
    const res = await axios.post("https://missinganimals.ml/pets/search", {
      search: keyword,
    });
    if (res.status === 200) {
      console.log(res.status, res.statusText);
      setState((prevState) => ({
        ...prevState,
        search: {
          query: keyword,
          petsList: res.data.filteredList,
        },
      }));
    } else {
      console.log(res.status, res.statusText);
    }
  };

  let _petsList;
  if (state.search.query === "") {
    _petsList = state.get.petsList;
  } else if (state.search.query !== "") {
    _petsList = state.search.petsList;
  }
  return (
    <div className="board">
      <SearchBar searchPets={searchPets}></SearchBar>
      <div className="boardTitle">Board - Missing Pets</div>
      <div className="petCards">
        {_petsList.map((pet) => (
          <PetCard
            key={pet.id}
            title={pet.title}
            petname={pet.petname}
            thumbnail={pet.petsImages[0].imagePath}
            description={pet.description}
            petsImages={pet.petsImages}
            species={pet.species}
            sex={pet.sex}
            missingDate={pet.missingDate}
            area={pet.area}
            reward={pet.reward}
            username={pet.user.username}
            email={pet.user.email}
            contact={pet.user.mobile}
            createdAt={pet.createdAt}
          ></PetCard>
        ))}
      </div>
    </div>
  );
}

export default Board;

