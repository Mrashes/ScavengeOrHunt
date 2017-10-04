import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
        <div className="jumbotron">
            <h1 className="text-center">
                <strong><i className="fa fa-newspaper-o" aria-hidden="true"></i>NYT Search App</strong>
            </h1>
            <h4 className="text-center">The only search that's fit to print</h4>
        </div>
    );
  }
}

export default Title;

