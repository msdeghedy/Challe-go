import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";

const ChallengeComment = ({ comment, challenger }) => {
  if (!challenger) {
    return (
      <div>
        <ContentLoader
          width={1000}
          height={100}
          viewBox="0 0 1000 100"
          backgroundColor="#ccc"
          foregroundColor="#000"
        >
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-md-1 col-2">
          <Link to={`/${challenger.username}`}>
            <img
              src={challenger.photoUrl}
              alt={challenger.name}
              className="img-fluid rounded-circle"
            />
          </Link>
        </div>
        <div className="col-md-11  col-10">
          <div
            className={`${
              comment.progress == 100 ? "fw-bold text-success" : ""
            }`}
          >
            {challenger.name} has finished {comment.progress}% of the challenge
          </div>
          <div className="comment text-muted">{comment.comment}</div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ChallengeComment;
