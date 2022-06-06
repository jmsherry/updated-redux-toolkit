import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCars,
  selectCars,
  selectError,
  selectStatus,
  addCars,
  updateCars,
  removeCars,
} from "./carsSlice";
import styles from "./Cars.module.css";


export function Cars() {
  const cars = useSelector(selectCars);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [bhp, setBHP] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  const reset = () => {
    setName("");
    setBHP("");
    setAvatarURL("");
  };

  const populateForm = (_id, name, bhp, avatar_url) => {
    setId(_id);
    setName(name);
    setBHP(bhp);
    setAvatarURL(avatar_url);
  };


  const onSubmit = ($e) => {
    $e.preventDefault();
    const carData = {
      name,
      bhp: Number(bhp),
      avatar_url: avatarURL,
    };

    if(Number.isNaN(carData.bhp)) throw new Error(`Bad value for bhp`);
    console.log("carData", carData);

    if (id) {
      console.log(`updating ${id}`, carData);
      dispatch(updateCars([id, carData]));
      setId('');
    } else {
      console.log("adding");
      dispatch(addCars(carData));
    }

    reset();
  };

  if (error) return <p className={styles.error}>Error: {error}</p>;

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={onSubmit} onReset={reset}>
        <div className={styles.formRow}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="name">BHP</label>
          <input
            type="text"
            value={bhp}
            onChange={(e) => setBHP(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="name">Avatar</label>
          <input
            type="text"
            value={avatarURL}
            onChange={(e) => setAvatarURL(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className={styles.row}></div>
      <div className={styles.row}>
        <ul>
          {cars.map(({ _id, name, bhp, avatar_url }) => (
            <li key={_id} className={styles.car}>
              <img className={styles.avatar} src={avatar_url} alt="" />
              <p>
                {name} ({bhp} bhp)
              </p>
              <button onClick={() => populateForm(_id, name, bhp, avatar_url)}>
                Update
              </button>
              <button onClick={() => dispatch(removeCars(_id))}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
