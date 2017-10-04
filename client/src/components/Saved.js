import React, { Component } from 'react';

class Saved extends Component {
  render() {
    return(
        <ul className="list-group">
            {this.props.saved.map(article => (
                <li className="list-group-item" key={article._id}>
                    <a href={article.web_url} data-date={article.pub_date}>{article.headline}</a>
                    <button 
                        onClick={this.props.remove} 
                        id={article._id}
                    >
                    remove
                    </button>
                </li>
            ))}
        </ul>
    )
}
}

export default Saved;
