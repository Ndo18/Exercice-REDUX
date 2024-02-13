import React, { useState } from "react";
import Like from "./Like";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { deletePost, editPost } from "../actions/post.action";

const Post = ({ post }) => {
  const [editToggle, setEditToggle] = useState(false);
  const user = useSelector((state) => state.userReducer)
  // STATE POUR EDITER LE CONTENU DE NOTRE POST AVEC VALEUR PAR DEFAUT LE TEXT DE NOTRE POST
  const [editContent, setEditContent] = useState(post.content)
  //LE USE DISPATCH POUR AFFICHER LES ELEMENTS
  const dispatch = useDispatch()
  //ECRIRE LE CODE QUI EST A L'ECRAN SUR YOUTUBE ET LE COMMENTER POUR EXPLICATION

  const handleEdit = (e) => {
    e.preventDefault()
    //CE QUI VA ÊTRE PUBLIER LORS DU POST
    const postData = {
      title: post.title,
      author: user.pseudo,
      likes: post.likes,
      id: post.id,
      content: editContent
    }

    dispatch(editPost(postData))
    //ON VEUT QU'APRES L'EDITION DE TEXT QUE LE TEXTAREA REDEVIENNE UN PARAGRAPHE
    setEditToggle(false)
  }

  return (
    <div className="post">
    {!isEmpty(user) && user.pseudo === post.author && (
      <div className="edit-delete">
      <img
      src="./icons/edit.svg"
      alt="edit"
      onClick={() => setEditToggle(!editToggle)}
      />
      <img
      src="./icons/delete.svg"
      alt="delete"
      onClick={() => dispatch(deletePost(post.id))}
      />
      </div>
      )}
      
      <h2>{post.title}</h2>
      <img
      src="https://picsum.photos/1500/400"
      className="post-img"
      alt="img-post"
      />
      
      {editToggle ? (
        <form onSubmit={e => handleEdit(e)}>
        <textarea autoFocus={true} defaultValue={post.content} onChange={e => setEditContent(e.target.value)}></textarea>
        <input type="submit" value="Valider modification" />
        </form>
        ) : (
          <p>{post.content}</p>
          )}
          
          <div className="author">
          <h5>{post.author}</h5>
          <Like post={post} />
          </div>
          </div>
          );
        };
        
        export default Post;
