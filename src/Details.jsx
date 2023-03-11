import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPet } from "./fetchPet";
import { ErrorBoundary } from "./ErrorBoundary";
import Carousel from "./Carousel";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  const result = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);

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
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </div>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
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
