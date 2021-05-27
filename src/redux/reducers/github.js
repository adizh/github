import axios from "axios";
import actions from "./actions";



const initialState = {
    userName: '',
    repoName: '',
    readme: '',
    gitHubData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_GITHUB :{
            return {
                ...state, gitHubData: action.gitHubData
            }
        }
        case actions.UPDATE_REPO :{
            return {
                ...state, repoName: action.repoName
            }
        }
        case actions.UPDATE_USER :{
            return {
                ...state, userName: action.userName
            }
        }
        case actions.GET_README :{
            return {
                ...state, readme: action.readme
            }
        }
        default:
            return state

    }
}

export const getHubData = (name) => {
    return (dispatch) => {
        axios(`https://api.github.com/users/${name}/repos`)
            .then(({data}) => {
                dispatch({type: actions.GET_GITHUB, gitHubData: data})
            })
    }
};


export const getReadme = (userName, repoName) => {
    return (dispatch) => {
        axios(`https://raw.githubusercontent.com/${userName}/${repoName}/master/README.md`)
            .then(({data}) => {
                dispatch({type: actions.GET_README, readme: data})
            })
            .catch((err) => {
                dispatch({type: actions.GET_README, readme: 'No Such README.md file'})
            })
    }
};

export const  updateUserName = (name) => {
    return{type:actions.UPDATE_USER, userName: name}
};

export const  updateRepoName = (name) => {
    return{type:actions.UPDATE_REPO, repoName: name}
}