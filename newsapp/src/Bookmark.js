import React, { Component } from 'react';
import Share from './Share';
import { IoMdTrash } from "react-icons/io";
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import { css } from 'glamor';

import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Detailed from './Detailed'
import 'react-toastify/dist/ReactToastify.css';
//rendering bookmarks
class Bookmark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            showComponent: false,
            showCards: true,
            category: 'guardian',
            n_results: [],
        };
        this.deleteBookmark = this.deleteBookmark.bind(this);
        this.linktoArticles = this.linktoArticles.bind(this);
        this.linktoArticles1 = this.linktoArticles1.bind(this);
        this.renderDet = this.renderDet.bind(this);
        this.renderDet1 = this.renderDet1.bind(this);
        this.rendering = this.rendering.bind(this);
    }


    notify = (title) => {
        toast.dismiss(); toast("Removing " + title, {
            delay: 180, autoClose: 2200,

            className: css({
                background: "white !important",
                color: "black",
                textAlign: "left",
                fontSize: "15px"
            })
        });
    }
    linktoArticles(id, category) {
       
        localStorage.setItem('id', id);
        this.setState({
            showComponent: true,
            showCards: false,
            category: category,

        });
    }
    linktoArticles1(id, sectionId, category) {
       
        localStorage.setItem('id', id);
        localStorage.setItem('sectionId', sectionId);
        this.setState({
            showComponent: true,
            showCards: false,
            category: category,

        });
    }
    renderDet(category) {
        var retrievedObject = localStorage.getItem('id');

        if (this.state.showComponent)
            return (<Router>
                <Redirect to={"/article/" + retrievedObject} href="/article" />
                <Route path="/article" render={() => <Detailed id={retrievedObject} category={category} />} />
            </Router>);
    }
    renderDet1(category) {
       
        var retrievedObject = localStorage.getItem('id');
        var sectionId = localStorage.getItem('sectionId');

        if (this.state.showComponent)
            return (<Router>
                <Redirect to={"/article/" + retrievedObject} href="/article" />
                <Route path="/article" render={() => <Detailed id={retrievedObject} sectionId={sectionId} category={category} />} />
            </Router>);
    }
    componentDidMount() {
        this.props.func(false);
    }
    rendering() {
        
        if (this.state.category == 'guardian')
            return this.renderDet('guardian');
        else
            return this.renderDet1('NYT');
    }
    deleteBookmark(event, i) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (localStorage) {
            var articles;
            if (!localStorage['articles'])
                articles = [];
            else
                articles = JSON.parse(localStorage['articles']);
            if (!(articles instanceof Array))
                articles = [];
            articles.splice(i, 1);
            localStorage.setItem('articles', JSON.stringify(articles));

        }
        this.forceUpdate();

    }
    render() {
       
        var arr = localStorage.getItem('articles');
        var articles_list = JSON.parse(arr);

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
        let final_articles = []
        if (articles_list != null) {
           
            this.state.isLoading = false;
            for (var i = 0; i < articles_list.length; i++) {

                if (articles_list[i].category == 'guardian') {
                    var assets = articles_list[i].obj.content.blocks.main.elements[0].assets;
                    var img_url;
                    var assets_len = assets.length;
                    if (assets_len == 0)
                        img_url = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                    else
                        img_url = assets[assets_len - 1].file;
                    var title = articles_list[i].obj.content.webTitle;
                    var pdate = articles_list[i].obj.content.webPublicationDate.substring(0, 10);
                    var sectionId = articles_list[i].obj.content.sectionId;
                    var color = setSectionColor(sectionId);
                    var webUrl = articles_list[i].obj.content.webUrl;
                    var id = articles_list[i].obj.content.id;
                    let section_style;
                    if (sectionId == 'technology' || sectionId == 'sport') {
                        section_style = {
                            // width: '70px',
                            paddingRight: '2%',
                            paddingLeft: '2%',
                            fontSize: '12px',
                            backgroundColor: color,
                            marginRight: '10px',
                            textAlign: 'center',
                            float: 'left',
                            marginLeft: '12%',
                            color: 'black',
                            // display: 'inline-block',
                            borderRadius: '5px',

                        }
                    }
                    else {
                        section_style = {
                            //width: '70px',
                            paddingRight: '2%',
                            paddingLeft: '2%',
                            // maxWidth:'100px',
                            fontSize: '12px',
                            backgroundColor: color,
                            marginRight: '10px',
                            textAlign: 'center',
                            float: 'left',
                            // display: 'inline-block',
                            marginLeft: '12%',
                            color: 'white',
                            borderRadius: '5px',

                        }
                    }

                    final_articles.push(

                        <div className="col-sm-3 card-cmp" >
                            <div className="card" onClick={function (id) {
                                return function () {
                                    this.linktoArticles(id, "guardian");
                                }.bind(this)
                            }.bind(this)(id, "guardian")}>
                                <div className="card1-title" style={carder}><b><i>{title}</i></b><Share url={webUrl} title={title} category={"GUARDIAN"} />
                                    <IoMdTrash className="trash" onClick={function (i) {
                                        return function (event) {
                                            this.deleteBookmark(event, i);
                                            this.notify(title);
                                            //this.stopPropagation();
                                        }.bind(this)
                                    }.bind(this)(i)} />

                                </div>
                                {/* <div className="image-container"> */}
                                <img className="card-img-top img-fluid" src={img_url} alt="Card image cap" />


                                {/* </div> */}
                                <div className="card-block" >
                                    <div className="card-text" style={cardtext}><i>{pdate}</i></div>
                                    <div className="section" style={section_style}><b>{sectionId.toUpperCase()}</b></div>
                                    <div className="category" style={category}><b>GUARDIAN</b></div>
                                </div>
                            </div>
                        </div>);
                }
                else {
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
                    console.log(articles_list[i])
                    console.log("in bookmakers")
                    var multiCheck = articles_list[i].obj.docs[0].multimedia

                    if (Object.keys(multiCheck).length != 0)
                        img_url = 'https://www.nytimes.com/' + articles_list[i].obj.docs[0].multimedia[0].url;
                    else
                        img_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

                    var pdate = articles_list[i].obj.docs[0].pub_date.substring(0, 10);
                    var sectionId = articles_list[i].sectionId;
                    var color = setSectionColorNYT(sectionId);
                    var webUrl = articles_list[i].obj.docs[0].web_url;
                    let section_style;
                    if (sectionId == 'TECHNOLOGY' || sectionId == 'SPORTS') {
                        section_style = {
                            // width: '70px',
                            fontSize: '12px',
                            paddingRight: '2%',
                            paddingLeft: '2%',
                            backgroundColor: color,
                            marginRight: '10px',
                            textAlign: 'center',
                            float: 'left',
                            marginLeft: '12%',
                            color: 'black',
                           
                            borderRadius: '5px',

                        }
                    }
                    else {
                        section_style = {
                          
                            paddingRight: '2%',
                            paddingLeft: '2%',
                            fontSize: '12px',
                            backgroundColor: color,
                            marginRight: '10px',
                            textAlign: 'center',
                            float: 'left',
                            marginLeft: '12%',
                            color: 'white',
                            borderRadius: '5px',

                        }
                    }
                    final_articles.push(
                        <div className="col-sm-3 card-cmp">
                            <div className="card" onClick={function (webUrl, sectionId) {
                                return function () {
                                    this.linktoArticles1(webUrl, sectionId, "NYT");

                                }.bind(this)
                            }.bind(this)(webUrl, sectionId, "NYT")}>
                                <div className="card1-title" style={carder}><b><i>{articles_list[i].obj.docs[0].headline.main}</i></b>
                                    <Share url={webUrl} title={articles_list[i].obj.docs[0].headline.main} category={"NYTimes"} /><IoMdTrash className="trash" onClick={function (i) {
                                        return function (event) {
                                            this.deleteBookmark(event, i);
                                            this.notify(articles_list[i].obj.docs[0].headline.main);
                                        }.bind(this)
                                    }.bind(this)(i)} />

                                </div>
                                <img className="card-img-top img-fluid" src={img_url} alt="Card image cap" />
                                <div className="card-block" >
                                    <div className="card-text" style={cardtext}><i>{pdate}</i></div>
                                    <div className="section" style={section_style}><b>{articles_list[i].sectionId}</b></div>
                                    <div className="category" style={category}><b>NYTIMES</b></div>
                                </div>
                            </div>
                        </div>);



                }
            }

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
                                <h1 className="fav">Favorites</h1>
                                <div className="container-bk"><div className="row">{final_articles}</div></div></div>
                        ) : (
                                <div>
                                    <h3><b><center>You have no saved articles</center></b></h3>
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
        else {
            return (<div><h3><b><center>You have no saved articles</center></b></h3></div>)
        }





    }
}
export default Bookmark;