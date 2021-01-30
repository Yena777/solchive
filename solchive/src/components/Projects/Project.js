import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Projects.module.css';
import DeleteProject from './DeleteProject/DeleteProject';
import Question from './Question/Question';
import QuestionIndex from './QuestionIndex/QuestionIndex';
import ImpressionList from './Impression/ImpressionList';

class Project extends Component {
    state = {
        projects: [],
        loginresult: false,
    }

    componentDidMount() {
        this.callAPI().then((res) => {
            this.setState({projects: res[0]});
            console.log(this.state.projects);
        }).catch((error) => {
            console.log(error);
        });

        this.chkId().catch(
            error => { console.log(error);
        });
    }

    callAPI = async () => {
        const { id } = this.props.match.params;
        const res = await fetch('/api/project/' + id);
        const body = await res.json();
        return body;
    }

    chkId = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("http://localhost:5000/chkserver", requestOptions)
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(responseData => {
            // console.log(responseData);
            this.setState({
                loginresult: responseData.loginresult,
            });
        }).catch(error => { console.log(error);
        });

    }

    render() {
        return (
            <div className={style.main_wrapper}>
                <div className={style.wrapper}>
                    <div className="description--section">
                        <div className={style.title}>
                            <h1>{this.state.projects.title}</h1>
                        </div>
                        <div className={style.subinfo}>
                            <span className={style.team}>{this.state.projects.team}</span>
                            <div className={style.spacer}></div>
                            <span className={style.period}>{this.state.projects.period}</span>
                        </div>
                        <div>
                            <img className={style.image} src={'/upload/' + this.state.projects.body_images}/>
                        </div>
                        <Question question={"👷🏻 어떤 프레임워크를 사용했나요?"} answer={this.state.projects.framework}/>
                        <Question question={"👀 프로젝트에 대해 간단하게 설명해 주세요!"} answer={this.state.projects.summary}/>
                        <Question question={"😇 개발하면서 가장 힘들었던 점은 무엇이었나요?"} answer={this.state.projects.body_text}/>
                        <Question question={"💬 프로젝트 참여 후기를 들려주세요!"} answer={null}/>
                        <ImpressionList id={this.props.match.params.id}/>
                    </div>
                    <div>{ 
                        this.state.loginresult === true ?
                        <div>
                            <Link to={{
                                pathname: `/update/${this.state.projects.id}`,
                            }}>
                            <button className={"btn " + style.modify_btn}>수정</button>
                        </Link>
                        <DeleteProject id = {this.props.match.params.id}>삭제</DeleteProject>
                        </div>
                    : 
                    <></>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;