import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Projects from './Projects'
import ProjectModal from './ProjectModal.js'
import Button from '@material-ui/core/Button';
// import Smiley from '../public/img/smiley.png'
import store, { fetchUsers, fetchUserTeamMates, me, fetchAllCompanies, createNewProject, fetchUserProjects, fetchAllProjects } from '../store'
import firebase from '../firebase'
import Quill from 'quill'
import TextField from '@material-ui/core/TextField';

const taskType = [
  {
    label: 'Client Call',
    value: 'Client Call'
  },
  {
    label: 'Client Inquiry',
    value: 'Client Inquiry'
  },
  {
    label: 'Client Issue',
    value: 'Client Issue'
  },
  {
    label: 'Exception Pricing',
    value: 'Exception Pricing'
  },
  {
    label: 'Implementation Request',
    value: 'Implementation Request'
  },
  {
    label: 'Pricing Proforma',
    value: 'Pricing Proforma'
  },
  {
    label: 'Refund Request',
    value: 'Refund Request'
  },
  {
    label: 'RFP',
    value: 'RFP'
  },
  {
    label: 'TMR',
    value: 'TMR'
  },
  {
    label: 'Special Project',
    value: 'Special Project'
  }
]




class UserBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      newProject: false,
      redirect: false,
      page: this.props.page
    }
    this.showProjectModal = this.showProjectModal.bind(this)
    this.loadOptions = this.loadOptions.bind(this)
    this.filterCompanies = this.filterCompanies.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.clickOutside = this.clickOutside.bind(this)
    // this.forceUpdate = this.forceUpdate.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.clickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.newProject != nextState.newProject) {
      if (nextProps.page != nextState.page) {
        return window.location.reload();
      }
      return true
    }
    else return false;
  }


  clickOutside(e) {
    const modal = document.getElementById('modal-component')
    if (e.target === modal) {
      this.setState({
        newProject: false
      })
    }
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  filterCompanies(companyName) {
    return this.props.companies.filter(i =>
      i.label.toLowerCase().includes(companyName.toLowerCase())
    );
  };

  loadOptions(companyName, callback) {
    setTimeout(() => {
      callback(this.filterCompanies(companyName));
    }, 500);
  }

  showProjectModal() {
    if (this.state.newProject === false) {
      console.log("showProjectModal", this.state.newProject)
      this.setState({
        newProject: true,
      })

    } else {
      console.log("showProjectModal", this.state.newProject)
      this.setState({
        newProject: false,
      })
    }
  }

  getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  }

  handleDueDateChange = (evt) => this.setState({ departure: evt.target.value })

  fileSelectedHandler = e => {
    // this.setState({
    //   selectedFile: e.target.files[0]
    // })

    // const fd = new FormData()
    // fd.append('image', e.target.files[0], e.target.files[0].name);
    // let storageRef = firebase.storage().ref(`hone/${e.target.files[0].name}`)
    // let file = new File([''], e.target.files[0].name, {
    //   type: e.target.files[0].type
    // })
    // storageRef.put(file)
    //   .then(snapshot => {
    //     console.log("Uploaded a file?")
    //   })
  }


  render() {
    return (
      <div id="user-board-container">
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <div id="new-project-container">
          {
            this.state.newProject === false ?
              <div className='new-project-button-container'>
                <Button color='primary' variant='contained' className='material-primary-button' style={{ backgroundColor: 'rgb(0, 151, 131)' }} onClick={this.showProjectModal} className='new-project-button'>Create Project</Button>
              </div>
              :
              <div className='new-project-button-container'>
              <img src={"/img/smiley_2.png"} alt="Smiley face" className="smiley" height="50" width="50"  />
              {/*<Button color='primary' variant='contained' className='material-primary-button' style={{ backgroundColor: 'rgb(0, 151, 131)' }} onClick={this.showProjectModal} className='new-project-button'>Great!</Button>*/}
              </div>
          }
          <div className='show-project-form'>

          </div>
          <div>
            <hr />
          </div>
          <div>
            <Projects page={this.props.page} />
          </div>
        </div>
        {
          this.state.newProject === true ?

            <div id='modal-component'>
              <ProjectModal showProjectModal={this.showProjectModal} type="CREATE NEW PROJECT"/>
            </div>
            :
            null


        }

      </div>
    )
  }
}

//<Link className='nav-links' to={`/user/${user.personId}/projects`}>Your Projects</Link>

const mapState = state => {
  return {
    user: state.user,
    teamMates: state.teamMates,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { fetchUserTeamMates, createNewProject }

const UserBoardContainter = connect(mapState, mapDispatch)(UserBoard)

export default UserBoardContainter
