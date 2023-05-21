import Image from "next/image";
import { useId, useRef, useState } from "react";

export default function Form({ onSubmit }) {
  const [inputs, setInputs] = useState({});

  const pictureInputId = useId();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // lets just make sure we don't have empty fields
    if (inputs.firstname && inputs.lastname && inputs.contact && inputs.genre && inputs.birthdateday && inputs.birthdatemonth && inputs.birthdateyear && inputs.pictureURI) {
      onSubmit(inputs);
    } else {
      alert("all fields required");
    }
  };

  const handlePictureInputChange = (event) => {
    event.preventDefault();

    const file = event.target.files.length && event.target.files[0];
    if (file) {
      // lets store an object url for the file together with the file name
      const pictureURI = URL.createObjectURL(file)
      setInputs((values) => ({ ...values, picture: event.target.value, pictureURI }))
    }
  }

  const handlePictureDrop = (event) => {
    event.preventDefault();

    let file = undefined;

    if (event.dataTransfer.items) {
      const item = event.dataTransfer.items[0];
      // If dropped item isn't a file, reject it
      if (item.kind === "file") {
        file = item.getAsFile();
      }
    } else {
      file = event.dataTransfer.files[0];
    }

    if (file) {
      const pictureURI = URL.createObjectURL(file);
      setInputs((values) => ({ ...values, pictureURI }));
    }
  };

  const renderDayDateSelector = () => {
    const currentDay = new Date().getUTCDate();
    let options = [];
    for (let index = 1; index <= 31; index++) {
      const option = <option key={index} value={index}>{index}</option>;
      options = [...options, option];
    }


    return (
      <select name="birthdateday" className="form-select" defaultValue={currentDay} value={inputs.birthdateday} onChange={handleChange}>
        {options}
      </select>
    );
  }

  const renderMonthDateSelector = () => {
    const months = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    const currentMonth = new Date().getUTCMonth();
    let options = [];
    for (let index = 0; index < months.length; index++) {
      const option = <option key={index} value={months[index]}>{months[index]}</option>;
      options = [...options, option];
    }

    return (
      <select name="birthdatemonth" className="form-select" defaultValue={months[currentMonth]} value={inputs.birthdatemonth} onChange={handleChange}>
        {options}
      </select>
    );
  }

  const renderYearDateSelector = () => {
    let options = [];
    const currentYear = new Date().getUTCFullYear();
    for (let index = 100; index >= 0; index--) {
      const value = currentYear - index;
      const option = <option key={index} value={value}>{value}</option>
      options = [...options, option];
    }

    return (
      <select name="birthdateyear" className="form-select" defaultValue={currentYear} value={inputs.birthdateyear} onChange={handleChange}>
        {options}
      </select>
    );
  }

  return (
    <>
      <h2 className="fw-bold">S&apos;inscrire</h2>
      <h6 className="mb-3">C&apos;est rapide et facile.</h6>
      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col">
            <input
              type="text"
              className="form-control bg-light"
              name="firstname"
              placeholder="Prénom"
              value={inputs.firstname || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control bg-light"
              name="lastname"
              placeholder="Nom de famille"
              value={inputs.lastname || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
            <input
              type="text"
              className="form-control bg-light"
              name="contact"
              placeholder="Numéro de mobile ou e-mail"
              value={inputs.contact || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        Date de naissance
        <div className="row mb-2">
          <div className="col">
            {renderDayDateSelector()}
          </div>
          <div className="col">
            {renderMonthDateSelector()}
          </div>
          <div className="col">
            {renderYearDateSelector()}
          </div>
        </div>

        Genre
        <div className="row mb-3">
          <div className="col-auto">
            <div className="form-control">
              <div className="form-check form-check-reverse">
                <label className="form-check-label">
                  Femme
                  <input
                    type="radio"
                    className="form-check-input ms-4"
                    name="genre"
                    value={"Femme"}
                    id="femme"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-control">
              <div className="form-check form-check-reverse">
                <label className="form-check-label">
                  Homme
                  <input
                    type="radio"
                    className="form-check-input ms-4"
                    name="genre"
                    value={"Homme"}
                    id="homme"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <label htmlFor={pictureInputId}>Photo</label>
        <div className="mb-3 card border-info bg-light" id="picture" onDrop={handlePictureDrop} onDragOver={e => e.preventDefault()} >
          <div className="card-body">
            <input className="btn btn-outline-secondary border-0 p-0 mb-4" id={pictureInputId} type="file" name="picture" value={inputs.picture || ""} accept="image/*" onChange={handlePictureInputChange} />
            {!inputs.pictureURI && (<p className="card-text">or drop files here</p>)}
            {inputs.pictureURI && <Image alt="user photo" width={50} height={50} src={inputs.pictureURI} />}
          </div>
        </div>

        <p className="lh-1 disclaimer">
          En cliquant sur sinscrece, vous acceptex nos conditions generales.
          decouvrez comment nous recueillons, utilisson bla bla bla
        </p>

        <div className="row">
          <div className="text-center">
            <input className="btn btn-success px-5 fw-semibold" type="submit" value="S'inscrire" />
          </div>
        </div>
      </form >
    </>
  );
}
