import './App.css';
import { Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Project from './components/Project';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';
import UpdateProject from './components/UpdateProject';

function App() {
  return (
    <div>
        <Header/>
        <Route exact path="/projects" component={ProjectList}/>
        <Route path="/projects/:id" component={Project}/>
        <Route path="/create" component={CreateProject}/>
        <Route path="/update" component={UpdateProject}/>
        <Footer/>
    </div>
  );
}

export default App;
