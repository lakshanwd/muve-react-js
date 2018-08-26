import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      items: []
    };
  }

  onLoginClicked() {
    var self = this;
    fetch("http://localhost:8080/authenticate", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ "username": "admin", "password": "123" }),
    })
      .then(function (result) {
        console.log(result);
        console.log(result.token);
        self.state.auth = result.token;
      })
      .catch(function (err) {
        self.state.auth = null;
      })
  }

  onLoadClicked() {
    var self = this;
    console.log( self.state.auth);
    fetch('http://localhost:8080/booking?from=0&count=10', {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiQWRtaW5pc3RyYXRvciIsIlJvbGUiOiJhZG1pbiIsIlVzZXJJRCI6MSwiZXhwIjoxNTM1MzA2MTczLCJpYXQiOjE1MzUzMDYxNTgsImlzcyI6ImF1dGhfc2VydmVyIiwibmJmIjoxNTM1MzA2MTg4fQ.iw7ML_FQfMttz8RwhiOYx_R1bVtIz2G4LwFIx4nECj4"
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(JSON.stringify(myJson));
      });
  }

  render() {
    return (<div>
      <div>
      <div>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />

        <button onClick={() => this.onLoginClicked()}>Login</button>
      </div>
      </div>
      <div>
        <div>
          <button onClick={() => this.onLoadClicked()}>Load Data</button>
          <table>
            <thead>
              <tr>
                <td>Booking ID</td>
                <td>Pick Up Address</td>
                <td>Drop Address</td>
                <td>Driver Name</td>
                <td>Customer Name</td>
                <td>Phone</td>
                <td>Total Distance</td>
                <td>Bill Amount</td>
                <td>Created</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.items.forEach(element => {
                  <tr>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                    <td>{element.bookingID}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>)
  }
}

// ========================================

ReactDOM.render(<Page />, document.getElementById('root'));
