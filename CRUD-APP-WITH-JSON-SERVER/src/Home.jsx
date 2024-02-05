import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  const fetchData = () => {
    // debugger;
    axios
      .get("http://localhost:3030/users")
      .then((res) => {
        setColumns(Object.keys(res.data[0]));
        setRecords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleAddData = () => {
    navigate("/add");
  };
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    const conf = window.confirm("Do you want to delete");
    if (conf) {
      axios
        .delete("http://localhost:3030/users/" + id)
        .then((res) => {
          alert("Record has deleted");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddData}
          >
            ADD DATA
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={(e) => handleEdit(d.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger ms-1"
                    onClick={(e) => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
