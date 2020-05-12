import React, { Component } from 'react';
import axios from 'axios';
import Share from './Share'
import BounceLoader from 'react-spinners/BounceLoader';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Detailed from './Detailed'
class Search extends Component {	 
    constructor(props) {
        super(props);
        this.state = {
          g_results1: [],
          g_results2: [],
          isLoading: false,
          error: null,
          showComponent: false,
          showCards: true,
        };
        this.linktoArticles = this.linktoArticles.bind(this);
        this.linktoArticles1 = this.linktoArticles1.bind(this);
        this.renderDet = this.renderDet.bind(this);
        this.renderDet1 = this.renderDet1.bind(this);
        this.rendering=this.rendering.bind(this);
    }
    linktoArticles(id, category) {
        // console.log("in link")
        localStorage.setItem('id', id);

        // console.log(id)
        this.setState({
            showComponent: true,
            showCards: false,
            category: category,

        });
    }
    linktoArticles1(id, sectionId, category) {
        
        localStorage.setItem('id', id);
        localStorage.setItem('sectionId', sectionId);
        // console.log(id)
        this.setState({
            showComponent: true,
            showCards: false,
            category: category,

        });
    }
    renderDet(category) {
        console.log('in render detail')
        this.props.search(false);
        var retrievedObject = localStorage.getItem('id');
        console.log("heyy")
        console.log(this.props.selectedResult)
        // this.props.func(false);
        // this.props.callback();
        
        if (this.state.showComponent)
            return (<Router>
                <Redirect to={"/article/" + retrievedObject} href="/article" />
                <Route path="/article" render={() => <Detailed id={retrievedObject} category={category} />} />
            </Router>);
    }
    renderDet1(category) {
        console.log("in render det 1")
        this.props.search(false);
        var retrievedObject = localStorage.getItem('id');
        var sectionId = localStorage.getItem('sectionId');
        // this.props.func(false);
        console.log("heyy")
       
        console.log(this.props.selectedResult )
        // this.props.callback();
        if (this.state.showComponent )
            return (<Router>
                <Redirect to={"/article/" + retrievedObject} href="/article" />
                <Route path="/article" render={() => <Detailed id={retrievedObject} sectionId={sectionId} category={category} />} />
            </Router>);
    }
    rendering() {
        console.log("in rendering")
        console.log(this.state.category)
        if (this.state.category == 'guardian')
            return this.renderDet('guardian');
        else
            return this.renderDet1('NYT');
    }
      componentDidMount()
      {
          console.log("in search render")
          this.props.search(true);
        console.log(this.props)
        this.setState({ isLoading: true,
        showCards:true });
        axios.post('https://usc6352156.wl.r.appspot.com/search-nyt', {
            id: this.props.selectedResult

        })
            .then(res => this.setState({
                g_results2: res.data.response.docs,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
        axios.post('https://usc6352156.wl.r.appspot.com/search-guardian', {
            id: this.props.selectedResult

        })
            .then(res => this.setState({
                g_results1: res.data.response.results,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));

      }
      componentDidUpdate(previousProps,previousState){
        console.log("in update")
        if(previousProps.selectedResult!==this.props.selectedResult)
        {
            console.log("in did update")
            this.setState({ isLoading: true });
        axios.post('https://usc6352156.wl.r.appspot.com/search-nyt', {
            id: this.props.selectedResult

        })
            .then(res => this.setState({
                g_results2: res.data.response.docs,
                isLoading: false,
                showCards:true
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
        axios.post('https://usc6352156.wl.r.appspot.com/search-guardian', {
            id: this.props.selectedResult

        })
            .then(res => this.setState({
                g_results1: res.data.response.results,
                isLoading: false,
                showCards:true
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));

        }

      }
      componentWillUnmount()
      {
        //   console.log(this.props.id.label+"unmount")
        this.props.search(false);
            this.setState({
                showComponent:false,
                showCards:true
            })
          //this.props.id.label=" ";
      }
    render()
    {   console.log("in search")
        var { g_results1,g_results2,isLoading } = this.state;

        //console.log(g_results2)
        function setSectionColor(sectionId) {
            var color;
            if (sectionId == 'sport')
                color = 'rgb(243,191,78)';
            else if (sectionId == 'business')
                color = 'rgb(80,157,234)';
            else if (sectionId == 'technology')
                color = 'rgb(206,220,75)';
            else if (sectionId == 'politics')
                color = 'rgb(63,148,137)';
            else if (sectionId == 'world')
                color = 'rgb(124,79,251)';
            else
                color = 'rgb(110,117,124)';
            return color;
        }
        function setSectionColorNYT(sectionId) {
            var color;
            if (sectionId == 'SPORTS')
                color = 'rgb(243,191,78)';
            else if (sectionId == 'BUSINESS')
                color = 'rgb(80,157,234)';
            else if (sectionId == 'TECHNOLOGY')
                color = 'rgb(206,220,75)';
            else if (sectionId == 'POLITICS')
                color = 'rgb(63,148,137)';
            else if (sectionId == 'WORLD')
                color = 'rgb(124,79,251)';
            else
                color = 'rgb(110,117,124)';
            return color;
        }
        let carder = {
            margin: '0 auto',
            padding: '10px',
            width: '90%',
        };
        let cardtext = {
            margin: '0 auto',
            paddingLeft: '20px',
            // marginLeft:'10px',
            fontSize: '13px',
            // width: '90%',
            // height:'90%',
            float: 'left',
            // display: 'inline-block',

        };
        let category = {
            width: '70px',
            fontSize: '12px',
            backgroundColor: 'rgb(20,40,73)',
            textAlign: 'center',
            float: 'left',
            marginLeft: '10%',
            color: 'white',
            // display: 'inline-block',
            borderRadius: '5px',
            margin: '0 auto',

        }
        // console.log(g_results1)
        let final_articles = []
        for(var i=0;i<Math.min(5,g_results1.length);i++){
                    // console.log(g_results1[i])
                    //console.log("in loop")
                    var assets =g_results1[i].blocks.main.elements[0].assets;
                    var img_url;
                    var assets_len = assets.length;
                    if (assets_len == 0)
                        img_url = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                    else
                        img_url = assets[assets_len - 1].file;
                    var title = g_results1[i].webTitle;
                    var pdate = g_results1[i].webPublicationDate.substring(0, 10);
                    var sectionId = g_results1[i].sectionId;
                    var color = setSectionColor(sectionId);
                    var webUrl = g_results1[i].webUrl;
                    var id = g_results1[i].id;
                    let section_style;
                    if (sectionId == 'technology' || sectionId == 'sport') {
                        section_style = {
                            // width: '70px',
                            paddingRight:'2%',
                            paddingLeft:'2%',
                            fontSize: '12px',
                            backgroundColor: color,
                            marginRight: '16px',
                            textAlign: 'center',
                            float: 'right',
                            
                            color: 'black',
                            // display: 'inline-block',
                            borderRadius: '5px',

                        }
                    }
                    else {
                        section_style = {
                            //width: '70px',
                            paddingRight:'2%',
                            paddingLeft:'2%',
                            // maxWidth:'100px',
                            fontSize: '12px',
                            backgroundColor: color,
                            marginRight: '16px',
                            textAlign: 'center',
                            float: 'right',
                            // display: 'inline-block',
                            // marginLeft: '35%',
                            color: 'white',
                            borderRadius: '5px',

                        }
                    }

                    final_articles.push(

                        <div className="col-sm-3 search" >
                            <div className="card" onClick={function (id) {
                                return function () {
                                    this.linktoArticles(id, "guardian");
                                }.bind(this)
                            }.bind(this)(id, "guardian")}>
                                <div className="card1-title" style={carder}><b><i>{title}</i></b><Share url={webUrl} title={title} category={"GUARDIAN"} />
                                    
                                   
                                </div>
                               <img className="card-img-top img-fluid" src={img_url} alt="Card image cap" />
                                <div className="card-block" >
                                    <div className="card-text" style={cardtext}><i>{pdate}</i></div>
                                    <div className="section" style={section_style}><b>{sectionId.toUpperCase()}</b></div>
                                    {/* <div className="category" style={category}><b>GUARDIAN</b></div> */}
                                </div>
                            </div>
                        </div>);
        }
        // console.log(g_results2)
        if(g_results2.length!=0){
        for(var i=0;i<5;i++)
        {
            var multiCheck = g_results2[i].multimedia

                    if (Object.keys(multiCheck).length != 0)
                        img_url = 'https://www.nytimes.com/' + g_results2[i].multimedia[0].url;
                    else
                        img_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

                    var pdate = g_results2[i].pub_date.substring(0, 10);
                    var sectionId = g_results2[i].sectionId;
                    console.log(sectionId+"sectionID")
                    if(sectionId===undefined)
                        sectionId='NONE'
                    var color = setSectionColorNYT(sectionId);
                    var webUrl = g_results2[i].web_url;
                    let section_style;
                    if (sectionId == 'TECHNOLOGY' || sectionId == 'SPORTS') {
                        section_style = {
                            // width: '70px',
                            fontSize: '12px',
                            paddingRight:'2%',
                            paddingLeft:'2%',
                            backgroundColor: color,
                            marginRight: '16px',
                            textAlign: 'center',
                            float: 'right',
                            // marginRight: '14px',
                            color: 'black',
                            // display: 'inline-block',
                            borderRadius: '5px',

                        }
                    }
                    else {
                        section_style = {
                            //width: '70px',
                            // maxWidth:'100px',
                            paddingRight:'2%',
                            paddingLeft:'2%',
                            fontSize: '12px',
                            backgroundColor: color,
                            marginRight: '16px',
                            textAlign: 'center',
                            float: 'right',
                            // display: 'inline-block',
                            // marginRight: '10px',
                            color: 'white',
                            borderRadius: '5px',

                        }
                    }
                    final_articles.push(
                        <div className="col-sm-3 search">
                            <div className="card" onClick={function (webUrl, sectionId) {
                                return function () {
                                    this.linktoArticles1(webUrl, sectionId, "NYT");

                                }.bind(this)
                            }.bind(this)(webUrl, sectionId, "NYT")}>
                                <div className="card1-title" style={carder}><b><i>{g_results2[i].headline.main}</i></b>
                                    <Share url={webUrl} title={g_results2[i].headline.main} category={"NYTimes"} />
                                   
                                </div>
                                <img className="card-img-top img-fluid" src={img_url} alt="Card image cap" />
                                <div className="card-block" >
                                    <div className="card-text" style={cardtext}><i>{pdate}</i></div>
                                    <div className="section" style={section_style}><b>{sectionId}</b></div>
                                    {/* <div className="category" style={category}><b>NYTIMES</b></div> */}
                                </div>
                            </div>
                        </div>);
        }
    }
    console.log(this.state.showCards+ "cardssss")
    console.log(final_articles)

        if (this.state.isLoading) {
            return (<div className="class-loading">
                <BounceLoader css="display: block;margin: 0 auto;border-color: red;position:absolute;top:50%;left:50%"
                    size={40} color="#123ABC" />
            </div>);
        }
        if (this.state.showCards)
            return (
                <div>
                    {final_articles.length ? (
                        <div>
                            <h1 className="fav">Results</h1>
                            <div className="container-bk"><div className="row">{final_articles}</div></div></div>
                    ) : (
                            <div>
                                <h3><b><center>You have no search results</center></b></h3>
                            </div>
                        )}
                </div>
            );
        else
            return (
                <div>
                    {this.rendering()}

                </div>);
    }
}

export default Search;