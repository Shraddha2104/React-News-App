import React from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { ScrollTo } from "react-scroll-to";
//toggle detailed sections
class ToggleBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
        this.myRef = React.createRef();
        this.toggleBox = this.toggleBox.bind(this);
    }
    scroll(ref) {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }
    toggleBox() {
        const { opened } = this.state;
        this.setState({
            opened: !opened,
        });
    }

    render() {
        var { title, children } = this.props;
        const { opened } = this.state;

        if (opened) {
            title = 'Hide Vehicles';
        } else {
            title = 'Show Vehicles';
        }
        var sentence_list = reactElementToJSXString(children);
        var index = sentence_list.indexOf("=")
        sentence_list = sentence_list.substring(index + 2);
        sentence_list = sentence_list.substring(0, sentence_list.length - 4)
        var fin = sentence_list.replace(/([.?!])\s*(?=[A-Z])/g, "$1| ").split("|")
        var collapse_text = fin.slice(0, 4);
        return (
            <div className="box">
                {opened
                    ? (<div><div class="boxContent" ref={this.myRef}>
                        {children}
                    </div>
                        
                        <div>< ScrollTo >
                            {({ scroll }) => (
                                <FaChevronUp className="boxTitle" onClick={() => { scroll({ x: 0, y: 0, smooth: true }); this.toggleBox(); }} />
                            )
                            }</ScrollTo></div>
                    </div>)
                    : fin.length <= 4
                        ? (<div><div class="boxContent">
                            {children}
                        </div>
                        </div>)
                        : (<div><div class="boxContent"

                            ref={this.myRef} >
                            {collapse_text}
                        </div> <FaChevronDown className="boxTitle" onClick={() => { this.scroll(this.myRef); this.toggleBox(); }} />
                        </div>)
                }
            </div>
        );
    }
}

export default ToggleBox;