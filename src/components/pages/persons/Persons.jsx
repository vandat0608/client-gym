import React, { useEffect, useState } from "react";
import "./Persons.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Persons = () => {
  const [persons, setPersons] = useState();

  //
  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/persons")
      .then((res) => {
        setPersons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main>
      <div class="bottom-data">
        <div class="orders">
          <div class="header">
            <i class="bx bx-receipt"></i>
            <h3>Data khách hàng</h3>
            {/* <details>
              <summary>Ingredients</summary>
              <p>bhdsaa</p>
              <p>bhdsaa</p>
              <p>bhdsaa</p>
            </details> */}
            <i class="bx bx-filter"></i>
            <i class="bx bx-search"></i>
          </div>

          <table class="table-secondary">
            <thead>
              <tr>
                <th className="col">
                  <input class="form-check-input" type="checkbox" value="" />
                </th>

                <th className="col-2">Name</th>
                <th className="col-5">Email</th>
                <th className="col-3">Phone</th>
                <th className="col-">Date</th>
              </tr>
            </thead>
            <tbody>
              {persons?.map((person, i) => (
                <tr key={i}>
                  <th className="">
                    <input class="form-check-input" type="checkbox" value="" />
                  </th>

                  <td>{person.username}</td>
                  <td>{person.email}</td>
                  <td>{person.phone}</td>
                  <td>{new Date(person.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
export default Persons;
