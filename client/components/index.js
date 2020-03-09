/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
// export {default as UserHome} from './user-home'
// export {Login, Signup} from './auth-form'
export {default as LandingPage} from './LandingPage'
export {default as SignUp} from './SignUp'
export {default as Login} from './Login'
export {default as UserBoard} from './UserBoard'
export {default as UserProfile} from './UserProfile/UserProfile'
export {default as SideBar} from './SideBar'
export {default as Projects} from './Projects'
export {default as CompletedProjects} from './CompletedProjects'
// export {default as Analytics} from './Analytics'
export {default as AllUserProjects} from './AllUserProjects'
export {default as TeamAnalytics} from './TeamAnalytics'
export {default as ProjectModal} from './ProjectModal'
export {default as ChangePasswordModal} from './Modals/ChangePasswordModal'
export {default as ForgotPassword} from './ForgotPassord'
export {default as PasswordReset} from './PasswordReset'
export {default as AdminHome} from './AdminHome'
export {default as AdminSideBar} from './AdminSideBar'
export {default as AdminUsers} from './AdminUsers'
export {default as AdminTeams } from './AdminTeams'
export {default as AdminCompanies} from './AdminCompanies'
export {default as AdminUserModal} from './AdminUserModal'
export {default as AddUserModal} from './AddUserModal'
export {default as UserActiveProjects} from './Analytics/UserActiveProjects'
export {default as UserProjectTypes } from './Analytics/UserProjectTypes'
export {default as CompaniesHomePage} from './Company/CompanyHomePage'
export {default as UserCompletedTasks} from './Analytics/UserCompletedTasks'
export {default as PersistantDrawer} from './PersistantDrawer'
export {default as CircularLoading} from './Loading/CircularLoading'
export {default as MyPortfolio} from './Portfolio/MyPortfolio'
export {default as DefaultButton} from './Buttons/DefaultButton'
export {default as CompanyProfile} from './Company/CompanyProfile'
export {default as DefaultModal} from './Modals/DefaultModal'
