import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      searchInput,
      isShow,
    } = this.state

    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-bg-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="inner-con-1">
          <div className="add-new-pass-con">
            <h1 className="add-new-head">Add New Password</h1>
            <form className="form-con" onSubmit={this.addContent}>
              <div className="input-holder">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.listenWebsite}
                  value={website}
                  type="text"
                />
              </div>

              <div className="input-holder">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.listenUsername}
                  value={username}
                />
              </div>

              <div className="input-holder">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.listenPassword}
                />
              </div>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <div>
            <img
              className="password-manager-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
        </div>

        <div className="inner-con-2">
          <div className="first-div">
            <div className="your-password-div">
              <h1 className="password-head">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>

            <div className="search-holder">
              <img
                className="input-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
              />
              <input
                className="input-element"
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-con">
            <input id="check" type="checkbox" onChange={this.showPassword} />
            <label className="show-password" htmlFor="check">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state-con">
              <img
                className="empty-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="ul-list-con">
              {newList.map(eachValue => (
                <li
                  className="li-list-con"
                  id={eachValue.id}
                  key={eachValue.id}
                >
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content-con">
                    <p className="website-name">{eachValue.websiteName}</p>
                    <p>{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        className="star-img"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{eachValue.Password}</p>}
                  </div>
                  <button
                    data-testid="delete"
                    className="del-btn"
                    type="button"
                    onClick={() => this.deleteItem(eachValue.id)}
                  >
                    <img
                      className="del-img"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
