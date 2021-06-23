import classes from "./Notes.module.css";
import { useAuth, useVideo } from "../../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Notes = ({ name, note, id, noteId, videoId }) => {
  const { token, userId } = useAuth();
  const { deleteNote, setVideoLoading, videoDispatch } = useVideo();
  return (
    <div className={classes["note"]}>
      <div className={classes["name-delete-container"]}>
        <h3>{name}</h3>
        {userId === id && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              deleteNote({
                noteId: noteId,
                videoId: videoId,
                setLoading: setVideoLoading,
                token: token,
                dispatch: videoDispatch,
              });
            }}
          />
        )}
      </div>
      <p>{note}</p>
      <hr />
    </div>
  );
};
