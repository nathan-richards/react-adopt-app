import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPet } from "./fetchPet";
import { ErrorBoundary } from "./ErrorBoundary";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();
  const result = useQuery(["details", id], fetchPet);

  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (result.isError) {
    return <h2>Wooops</h2>;
  }

  if (result.isSuccess) {
    const pet = result.data.pets[0];
    return (
      <div className="details">
        <Carousel images={pet.images} />
        <div>
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </div>
      </div>
    );
  }
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export { DetailsErrorBoundary };
