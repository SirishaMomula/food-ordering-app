import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addorder, resetfilter, resttablenumber } from "../Action";

const Card = ({ filter_name, addorder, table_number }) => {
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState([]);

  useEffect(() => {
    fetch("https://food-ea8da-default-rtdb.firebaseio.com/data.json")


    .then((response) => {
      console.log("Firebase Response Status:", response.status); 
      return response.json();
    })
      .then((json) => { 
        if (json && json.items) {
          setData(json.items);
          setCloneData(json.items);
        } else {
          setData([]);
          setCloneData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
        setCloneData([]);
      });
  }, []); 

  useEffect(() => {
    if (filter_name !== "All Items") {
      let specific = cloneData.filter((item) => item.category === filter_name);
      setData(specific);
    } else {
      setData(cloneData);
    }
  }, [filter_name, cloneData]); 

  const Handler = async (id, name, prize, url) => {
    if (table_number) {
        await addorder(id, name, prize, url, table_number);
        alert("Order Placed Successfully");
    } else {
        alert("Please Select Table Number");
    }
};

  return (
    <div>
      <center>
        {data.length > 0 ? (
          <div className="container">
            <div className="row">
              {data.map((item) => (
                <div className="col-md-4" key={item.id} style={{ padding: "5px" }}>
                  <div className="card" style={{ width: "18rem", padding: "3px" }}>
                    <img src={item.url} className="card-img-top" alt={item.name} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <div className="card-text">Rs.{item.prize}</div>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => Handler(item.id, item.name, item.prize, item.url, table_number)}

                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="spinner-border text-primary"></div>
        )}
      </center>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter_name: state.filterreducer.filter_name,
  table_number: state.tablereducer.table_number,
});

export default connect(mapStateToProps, { addorder, resetfilter, resttablenumber })(Card);
