import React, { Component } from 'react';

class Results extends Component {
    render() {
        return(
            <ul className="list-group">
                {this.props.articleList.map(article => (
                    <li className="list-group-item" key={article._id}>
                        <a href={article.web_url} data-date={article.pub_date}>{article.headline.main}</a>
                        <button 
                            onClick={this.props.save} 
                            id={article._id}
                        >
                        Save
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Results;
