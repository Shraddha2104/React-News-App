import './App.css';
import './index.css';
import { Navbar, Nav } from 'react-bootstrap';
import Switch from "react-switch";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import AsyncSelect from "react-select/lib/Async";
import _ from "lodash";
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Category from './Category'
//views

import Bookmark from './Bookmark'
import Search from './Search';
export * from "react-router";

class Main extends Component {
  constructor() {
    super();
    var chk;
    
    if (JSON.parse(localStorage.getItem('check')) === null)
      chk = true;
    else
      chk = JSON.parse(localStorage.getItem('check'));
    var category;
    if (chk == true)
      category = 'guardian';
    else
      category = 'nyt'
    this.state = {
      checked: chk,
      
      category: category,
      switch_visible: true,
      bookmarked: false,
      results: [],
      selectedResult: null,
      search_check: false,
      g_results1: [],
      g_results2: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.child_to_parent = this.child_to_parent.bind(this)
    this.getAsyncOptions = this.getAsyncOptions.bind(this);
    this.search = this.search.bind(this);
  }

  child_to_parent(switch_visible) {
    if (this.state.switch_visible != switch_visible) {
      this.setState({
        switch_visible: !this.state.switch_visible
      });
    }
  }
  search(search_check) {
    if (this.state.search_check != search_check) {
      this.setState({
        search_check: !this.state.search_check
      });
    }
  }

  handleChange(checked) {
    var cat;
    localStorage.setItem('check', JSON.stringify(checked));
    if (checked)
      cat = 'guardian';
    else
      cat = 'nyt';
    this.setState({
      checked,
      category: cat,

    });
  }

  getAsyncOptions(inputValue) {
    let val = 4;
    return new Promise((resolve) => {
      if (inputValue == "") resolve([]);
      function rec() {
        val -= 1;
        const timer = setTimeout(() => {
          try {
            fetch("https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=" + inputValue, {
              headers: {
                "Ocp-Apim-Subscription-Key": "40eb7ee2a9c347fb8fb8c190a56574cc"
              }
            })
              .then(res => res.json())
              .then(
                (result) => {
                  try {
                    let suggestions = result.suggestionGroups[0].searchSuggestions
                    let filtered = []
                    for (let i = 0; i < suggestions.length; i++) {
                      filtered.push({ label: suggestions[i].displayText })
                    }
                    resolve(filtered);
                  }
                  catch (err) {
                    if (val) rec();
                  }

                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
          }
          catch (err) { }
        }, 1000);
        return () => clearTimeout(timer);
      }
      rec();
    });
  }

  handleSearch = selectedresult => {
    this.setState(
      { selectedResult: selectedresult },
      () => {
        console.log(`Option selected:`, this.state.selectedResult);

      }
    );
  };

  render() {

    let iconize = {
      fontSize: '28px',
      color: 'white',
      marginRight: '20px'
    };
    let nytimes = {
      color: 'white',
      fontSize: '18px',
    }
    let guardian = {
      color: 'white',
      fontSize: '18px',
    }
    return (<div>

      <Router>
        <div className="container-fluid pl-0 pr-0">
          <Navbar variant="dark" expand="lg">

            {this.state.search_check ?
              (<div className="searchbar ">
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  isClearable
                  className="basic-single "
                  classNamePrefix="select"
                  name="search"
                  placeholder="Enter keyword .."
                  loadOptions={_.debounce(this.getAsyncOptions, 1000, {
                    leading: true
                  })}
                  onChange={this.handleSearch}
                  value={this.state.selectedResult}
                  noOptionsMessage={() => "No Match"}

                />
              </div>) :
              (<AsyncSelect
                cacheOptions
                defaultOptions
                isClearable
                className="searchbar"
                classNamePrefix="select"
                name="search"
                placeholder="Enter keyword .."
                loadOptions={_.debounce(this.getAsyncOptions, 1000, {
                  leading: true
                })}
                onChange={this.handleSearch}
                value={''}
                noOptionsMessage={() => "No Match"}

              />)

            }
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">


              {!this.state.switch_visible ?
                (<Nav className="mr-auto " defaultActiveKey='/'>
                  <Nav.Link as={Link} to='/' href="/" active={false} >Home</Nav.Link>
                  <Nav.Link as={Link} to='/world' href="/world" active={false}>World</Nav.Link>
                  <Nav.Link as={Link} to='/politics' href="/politics" active={false}>Politics</Nav.Link>
                  <Nav.Link as={Link} to='/business' href="/business" active={false}>Business</Nav.Link>
                  <Nav.Link as={Link} to='/technology' href="/technology" active={false} >Technology</Nav.Link>
                  <Nav.Link as={Link} to='/sports' href="/sports" active={false}>Sports</Nav.Link>
                </Nav>) :
                (<Nav className="mr-auto  " defaultActiveKey='/'>
                  <Nav.Link as={Link} to='/' href="/"   >Home</Nav.Link>
                  <Nav.Link as={Link} to='/world' href="/world"  >World</Nav.Link>
                  <Nav.Link as={Link} to='/politics' href="/politics" >Politics</Nav.Link>
                  <Nav.Link as={Link} to='/business' href="/business">Business</Nav.Link>
                  <Nav.Link as={Link} to='/technology' href="/technology" >Technology</Nav.Link>
                  <Nav.Link as={Link} to='/sports' href="/sports" >Sports</Nav.Link>
                </Nav>)


              }
              <div className="bk">
                <Link to="/favorites/" href="/favorites" data-tip="Bookmark" data-effect="solid" data-for='global' >
                  {this.state.bookmarked
                    ? <i className="fa fa-bookmark" style={iconize} />
                    : <i className="fa fa-bookmark-o" style={iconize} />
                  }
                </Link>
                <ReactTooltip place="bottom" id='global' />
              </div>

              {this.state.switch_visible
                ? (<div ><Navbar.Text className="Nytimes" style={nytimes}>NYTimes</Navbar.Text>
                  <div className="switcher "><Switch onChange={this.handleChange} checked={this.state.checked} offColor="#DDDDDD" uncheckedIcon={false} checkedIcon={false} onColor="#44ABF7" /></div>
                  <Navbar.Text className="guard " style={guardian}>Guardian</Navbar.Text></div>)
                : <div></div>
              }
               </Navbar.Collapse>
          </Navbar>
        </div>
        <ToastContainer position="top-center"
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Zoom}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Route exact path="/" render={() => {

          if (this.state.bookmarked)
            this.setState({ bookmarked: false });

          return <Category {...this.state} category_type={"home"} func={this.child_to_parent} />
        }} />

        <Route path="/world" render={() => {

          if (this.state.bookmarked)
            this.setState({ bookmarked: false });

          return <Category {...this.state} category_type={"world"} func={this.child_to_parent} />
        }} />
        <Route path="/politics" render={() => {

          if (this.state.bookmarked)
            this.setState({ bookmarked: false });
          return <Category {...this.state} category_type={"politics"} func={this.child_to_parent} />
        }} />
        <Route path="/business" render={() => {

          if (this.state.bookmarked)
            this.setState({ bookmarked: false });

          return <Category {...this.state} category_type={"business"} func={this.child_to_parent} />
        }} />
        <Route path="/technology" render={() => {

          if (this.state.bookmarked)
            this.setState({ bookmarked: false });
          return <Category {...this.state} category_type={"technology"} func={this.child_to_parent} />
        }} />
        <Route path="/sports" render={() => {

          if (this.state.bookmarked)
            this.setState({ bookmarked: false });
          return <Category {...this.state} category_type="sports" func={this.child_to_parent} />
        }} />
        <Route path="/favorites" render={() => {

          if (!this.state.bookmarked)
            this.setState({ bookmarked: true });
          return <Bookmark {...this.state} func={this.child_to_parent} />
        }} />
        {this.state.selectedResult && <Redirect to={"/search?q=" + this.state.selectedResult.label} href="/search?q=" />}

        <Route path="/search" render={() => {
          if (this.state.switch_visible)
            this.setState({ switch_visible: false });

          return <Search {...this.state} search={this.search} />
        }} />

      </Router>
    </div> );

  }
};
export default Main;

