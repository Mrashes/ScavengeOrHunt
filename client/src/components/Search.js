import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
        <div className="row">
            {/* <p>Search Parameters</p> */}
            <form>
                <div>
                    <label>Search Term:</label>
                    <input 
                        type="text" 
                        name="query" 
                        onChange={this.props.change}  
                        value={this.props.query} 
                        id="search"
                        placeholder="required"
                    />
                </div>
                <div>
                    <label>Start Year:</label>
                    <input 
                        type="text" 
                        name="start" 
                        onChange={this.props.change} 
                        value={this.props.start} 
                        id="start"
                        placeholder="required" 
                    />
                </div>
                <div>
                    <label>End Year:</label>
                    <input 
                        type="text" 
                        name="end" 
                        onChange={this.props.change}  
                        value={this.props.end} 
                        id="end"
                        placeholder="required"
                    />
                </div>
                <div>
                    <input 
                        onClick={this.props.submit} 
                        type="submit" 
                        id="submit" 
                    />
                </div>
            </form>
        </div>
    );
  }
}

export default Search;
