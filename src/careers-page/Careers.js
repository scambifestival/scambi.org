import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import Example from './Example.md'
import NavbarGlobal from '../global-components/NavbarGlobal';
import "./Careers.scss";

class Careers extends Component {
    constructor(props) {
        super(props)
        this.state = { content : "Hello"};
    }

    componentDidMount(){
        fetch(Example)
          .then((res) => res.text())
          .then((text) => {
            console.log(this.state.content)
            this.setState({content: text});
            console.log(this.state.content)
          });
    };

    render() {
        return <div>
                    <NavbarGlobal />
                    <ReactMarkdown className="carrer-container" children={this.state.content} />
                </div>
    }
}
export default Careers;