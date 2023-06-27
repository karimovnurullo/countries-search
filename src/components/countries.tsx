import React, { Component, ChangeEvent, FormEvent } from "react";

interface AppState {
  input: string;
  country: string;
  capital: string;
  flag: string;
  error: string;
}

class Countries extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      input: "",
      country: "",
      capital: "",
      flag: "",
      error: "",
    };
  }

  getData = async () => {
    const { input } = this.state;
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${input}`
      );
      const [data] = await response.json();
      if (data) {
        const { name, capital, flags } = data;
        this.setState({
          country: name.common,
          capital: capital?.[0] || "",
          flag: flags?.png || "",
          error: "",
        });
      } else {
        this.setState({
          error: "Country not found",
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: "An error occurred",
      });
    }
  };

  handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ input: value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.getData();
  };

  render() {
    const { input, country, capital, flag, error } = this.state;

    return (
      <div className="bg-white p-8">
        <form onSubmit={this.handleSubmit} className="flex gap-4">
          <input
            type="text"
            className="h-10 outline-none border-b border-black text-black text-lg px-2"
            value={input}
            onChange={this.handleInput}
            placeholder="Search..."
          />
          <button type="submit" className="h-10 px-4 bg-black text-white">
            Search
          </button>
        </form>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          country && (
            <div className="mt-8">
              <img src={flag} alt="Flag" className="w-32 h-auto" />
              <h2 className="text-2xl font-bold mt-4">Country: {country}</h2>
              <p className="text-lg">Capital: {capital}</p>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Countries;
