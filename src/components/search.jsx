
const CityInput = ({ city, setCity }) => {

    return (
      <input
        style={{
          
          height: "70px",
          width: "30%",
          background: "transparent",
          border: "1px solid",
          display: "block",
          margin: "20px auto",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ffffff",
          fontSize: "2em"
        }}
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    );
  };

  export default CityInput;