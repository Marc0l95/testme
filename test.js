 return (
    <div className="MainApp">
      <Navbar resetInputs={resetInputs} showDetailedCalculations={() => setShowDetailedCalculations(true)} />
      {showDetailedCalculations ? (
        <DetailedCalculations data={result} />
      ) : (
        <div className="container">
          <div className="input-container">
            <InputContainer
              input1={input1} setInput1={setInput1}
              input2={input2} setInput2={setInput2}
              dropdown1={dropdown1} setDropdown1={setDropdown1}
              dropdown2={dropdown2} setDropdown2={setDropdown2}
              dropdown3={dropdown3} setDropdown3={setDropdown3}
              resetInputs={resetInputs}
            />
          </div>
          <div className="values-container">
            {result && <ValuesContainer data={result} />}
          </div>
        </div>
      )}
    </div>
  );
}
