import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return (
        <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <h1 className="navbar-brand" style={{marginLeft: "10%"}}>Employee Manager</h1>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent