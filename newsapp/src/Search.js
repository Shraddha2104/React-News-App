import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

//importing views
import Detailed from "./Detailed";
import Loader from "./Loader";
import Share from "./Share";

//implementing search bar functionality
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      g_results: [], //guardian news
      n_results: [], //nyt news
      isLoading: false,
      error: null,
      showComponent: false,
      showCards: true,
    };
    this.linkToGuardian = this.linkToGuardian.bind(this);
    this.linkToNYT = this.linkToNYT.bind(this);
    this.renderGuardian = this.renderGuardian.bind(this);
    this.renderNYT = this.renderNYT.bind(this);
    this.rendering = this.rendering.bind(this);
  }
  linkToGuardian(id, category) {
    localStorage.setItem("id", id);
    this.setState({
      showComponent: true,
      showCards: false,
      category: category,
    });
  }
  linkToNYT(id, sectionId, category) {
    localStorage.setItem("id", id);
    localStorage.setItem("sectionId", sectionId);

    this.setState({
      showComponent: true,
      showCards: false,
      category: category,
    });
  }
  renderGuardian(category) {
    this.props.search(false);
    var retrievedObject = localStorage.getItem("id");

    if (this.state.showComponent)
      return (
        <Router>
          <Redirect to={"/article/" + retrievedObject} href="/article" />
          <Route
            path="/article"
            render={() => <Detailed id={retrievedObject} category={category} />}
          />
        </Router>
      );
  }
  renderNYT(category) {
    this.props.search(false);
    var retrievedObject = localStorage.getItem("id");
    var sectionId = localStorage.getItem("sectionId");

    if (this.state.showComponent)
      return (
        <Router>
          <Redirect to={"/article/" + retrievedObject} href="/article" />
          <Route
            path="/article"
            render={() => (
              <Detailed
                id={retrievedObject}
                sectionId={sectionId}
                category={category}
              />
            )}
          />
        </Router>
      );
  }
  rendering() {
    if (this.state.category == "guardian")
      return this.renderGuardian("guardian");
    else return this.renderNYT("NYT");
  }
  componentDidMount() {
    this.props.search(true);

    this.setState({
      isLoading: true,
      showCards: true,
    });
    //API calls
    axios
      .post("https://usc6352156.wl.r.appspot.com/search-nyt", {
        id: this.props.selectedResult,
      })
      .then((res) =>
        this.setState({
          n_results: res.data.response.docs,
          isLoading: false,
        })
      )
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
    axios
      .post("https://usc6352156.wl.r.appspot.com/search-guardian", {
        id: this.props.selectedResult,
      })
      .then((res) =>
        this.setState({
          g_results: res.data.response.results,
          isLoading: false,
        })
      )
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }
  componentDidUpdate(previousProps, previousState) {
    if (previousProps.selectedResult !== this.props.selectedResult) {
      this.setState({ isLoading: true });
      axios
        .post("https://usc6352156.wl.r.appspot.com/search-nyt", {
          id: this.props.selectedResult,
        })
        .then((res) =>
          this.setState({
            n_results: res.data.response.docs,
            isLoading: false,
            showCards: true,
          })
        )
        .catch((error) =>
          this.setState({
            error,
            isLoading: false,
          })
        );
      axios
        .post("https://usc6352156.wl.r.appspot.com/search-guardian", {
          id: this.props.selectedResult,
        })
        .then((res) =>
          this.setState({
            g_results: res.data.response.results,
            isLoading: false,
            showCards: true,
          })
        )
        .catch((error) =>
          this.setState({
            error,
            isLoading: false,
          })
        );
    }
  }
  componentWillUnmount() {
    this.props.search(false);
    this.setState({
      showComponent: false,
      showCards: true,
    });
  }
  render() {
    var { g_results, n_results } = this.state;

    function setSectionColor(sectionId) {
      var color;
      if (sectionId == "sport" || sectionId == "SPORTS")
        color = "rgb(243,191,78)";
      else if (sectionId == "business" || sectionId == "BUSINESS")
        color = "rgb(80,157,234)";
      else if (sectionId == "technology" || sectionId == "TECHNOLOGY")
        color = "rgb(206,220,75)";
      else if (sectionId == "politics" || sectionId == "POLITICS")
        color = "rgb(63,148,137)";
      else if (sectionId == "world" || sectionId == "WORLD")
        color = "rgb(124,79,251)";
      else color = "rgb(110,117,124)";
      return color;
    }
    function defineSectionStyles(sectionId) {
      var section_style;
      if (
        sectionId == "technology" ||
        sectionId == "sport" ||
        sectionId == "TECHNOLOGY" ||
        sectionId == "SPORTS"
      ) {
        section_style = {
          paddingRight: "2%",
          paddingLeft: "2%",
          fontSize: "12px",
          backgroundColor: color,
          marginRight: "16px",
          textAlign: "center",
          float: "right",
          color: "black",
          borderRadius: "5px",
        };
      } else {
        section_style = {
          paddingRight: "2%",
          paddingLeft: "2%",
          fontSize: "12px",
          backgroundColor: color,
          marginRight: "16px",
          textAlign: "center",
          float: "right",
          color: "white",
          borderRadius: "5px",
        };
      }
      return section_style;
    }
    let cardtitle = {
      margin: "0 auto",
      padding: "10px",
      width: "90%",
    };
    let cardtext = {
      margin: "0 auto",
      paddingLeft: "20px",
      fontSize: "13px",
      float: "left",
    };

    let final_articles = [];
    for (var i = 0; i < Math.min(5, g_results.length); i++) {
      var assets = g_results[i].blocks.main.elements[0].assets;
      var img_url;
      var assets_len = assets.length;
      if (assets_len == 0)
        //provide default image if not returned by API
        img_url =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      else img_url = assets[assets_len - 1].file;
      var title = g_results[i].webTitle;
      var pdate = g_results[i].webPublicationDate.substring(0, 10);
      var sectionId = g_results[i].sectionId;
      var color = setSectionColor(sectionId);
      var webUrl = g_results[i].webUrl;
      var id = g_results[i].id;
      let section_style = defineSectionStyles(sectionId);

      final_articles.push(
        <div className="col-sm-3 search">
          <div
            className="card"
            onClick={function (id) {
              return function () {
                this.linkToGuardian(id, "guardian");
              }.bind(this);
            }.bind(this)(id, "guardian")}
          >
            <div className="card1-title" style={cardtitle}>
              <b>
                <i>{title}</i>
              </b>
              {/* call the share component */}
              <Share url={webUrl} title={title} category={"GUARDIAN"} />
            </div>
            <img
              className="card-img-top img-fluid"
              src={img_url}
              alt="Card image cap"
            />
            <div className="card-block">
              <div className="card-text" style={cardtext}>
                <i>{pdate}</i>
              </div>
              <div className="section" style={section_style}>
                <b>{sectionId.toUpperCase()}</b>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (n_results.length != 0) {
      for (var i = 0; i < 5; i++) {
        var multiCheck = n_results[i].multimedia;
        //missing keys handling
        if (Object.keys(multiCheck).length != 0)
          img_url = "https://www.nytimes.com/" + n_results[i].multimedia[0].url;
        else
          img_url =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

        var pdate = n_results[i].pub_date.substring(0, 10);
        var sectionId = n_results[i].sectionId;
        if (sectionId === undefined) sectionId = "NONE";
        var color = setSectionColor(sectionId);
        var webUrl = n_results[i].web_url;
        let section_style = defineSectionStyles(sectionId);

        final_articles.push(
          <div className="col-sm-3 search">
            <div
              className="card"
              onClick={function (webUrl, sectionId) {
                return function () {
                  this.linkToNYT(webUrl, sectionId, "NYT");
                }.bind(this);
              }.bind(this)(webUrl, sectionId, "NYT")}
            >
              <div className="card1-title" style={cardtitle}>
                <b>
                  <i>{n_results[i].headline.main}</i>
                </b>
                <Share
                  url={webUrl}
                  title={n_results[i].headline.main}
                  category={"NYTimes"}
                />
              </div>
              <img className="card-img-top img-fluid" src={img_url} />
              <div className="card-block">
                <div className="card-text" style={cardtext}>
                  <i>{pdate}</i>
                </div>
                <div className="section" style={section_style}>
                  <b>{sectionId}</b>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    if (this.state.isLoading) {
      return <Loader />;
    }
    if (this.state.showCards)
      return (
        <div>
          {/* conditional rendering based on search results length */}
          {final_articles.length ? (
            <div>
              <h1 className="fav">Results</h1>
              <div className="container-bk">
                <div className="row">{final_articles}</div>
              </div>
            </div>
          ) : (
            <div>
              <h3>
                <b>
                  <center>You have no search results</center>
                </b>
              </h3>
            </div>
          )}
        </div>
      );
    else return <div>{this.rendering()}</div>;
  }
}

export default Search;
