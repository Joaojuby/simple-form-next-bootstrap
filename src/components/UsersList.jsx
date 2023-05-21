import User from "./UsersListItem";

export default function UsersList({ usersList }) {
  return (
    <>
      <h2 className="fw-bold mb-3">List of Users:</h2>
      <div className="list-group list-group-flush">
        {usersList.map((user) => {
          const { id, firstname, lastname, birthdateday, birthdatemonth, birthdateyear, genre, pictureURI } = user;

          return <User key={id} {...{ firstname, lastname, birthdateday, birthdatemonth, birthdateyear, genre, pictureURI }} />
        })}
      </div>
    </>
  );
}