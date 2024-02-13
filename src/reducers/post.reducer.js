import { ADD_POST, ADD_POST_LIKE, DELETE_POST, EDIT_POST, GET_POSTS } from "../actions/post.action";

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        //Ajouter les nouveaux objets dans le state
        case ADD_POST:
            return [action.payload, ...state]
        //Afficher le nouveau paragraphe édité
        case EDIT_POST:
        //Récupérer les données du state grâce au map
            return state.map((post) => {
        //Si l'id du state correspond à l'id de l'action alors on peut renvoyer les données initiales + données modifiées
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        content: action.payload.content
                    }
                } else return post
            })
            case DELETE_POST:
                return state.filter((post) => post.id !== action.payload)
            //Ajouter Like sur le front
            case ADD_POST_LIKE:
                return state.map((post) => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            likes: action.payload.likes
                        }
                    } else return post
                })
        default:
            return state
    }
}