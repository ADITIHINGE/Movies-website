import React from "react";
import axios from "axios";
import "./Movies.css";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterData: [],
      searchElemant: ""
    };
  }
  async componentDidMount() {
    console.clear();
    let result = await axios.get(
      "https://www.omdbapi.com/?apikey=45f0782a&s=war"
    );
    this.setState({
      data: result.data.Search,
      filterData: result.data.Search
    });
  }
  Search = async data => {
    console.log(data);
    let search = await axios.get(
      `https://www.omdbapi.com/?apikey=45f0782a&s=${data === "" ? "war" : data}`
    );
    this.setState({ filterData: search.data.Search, searchElemant: data });
    console.log("after fetchinng the data");
  };
  render() {
    let data = this.state.filterData;
    console.log(data);
    return (
      <div className="body--wrapper">
        <h1>Movie App</h1>
        <div className="section-body">
          <div className="searchBar--wrapper">
            <input
              type="text"
              className="searchBar"
              placeholder="Search For Movie Title ……"
              onChange={e => this.Search(e.target.value)}
            />
          </div>
          {data !== undefined && (
            <div>
              <h2 className="movie-heading">Movies</h2>

              <br></br>
              <div className="moviePosters--wrapper">
                {data.map(i => (
                  <div className="poster--pack">
                    <div className="poster--img--wrapper">
                      <img className="poster--img" src={i.Poster} alt="img" />
                    </div>
                    <div className="poster--name">
                      <p>{i.Title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data === undefined && (
            <div className="error--wrapper">
              <span className="error404">{this.state.searchElemant} </span>
              Not Found!
            </div>
          )}
          <div className="main-footer">
            <footer>© 2022 Aditi Hinge </footer>
          </div>
        </div>
      </div>
    );
  }
}
export default Movies;
