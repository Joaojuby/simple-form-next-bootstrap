import Image from "next/image";

function stringifyBirthdate(day, month, year) {
  const months = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

  const monthNumber = months.findIndex((value) => value === month) + 1;

  return `${day}/${monthNumber}/${year}`;
}

export default function User(props) {
  const { firstname, lastname, birthdateday, birthdatemonth, birthdateyear, genre, pictureURI } = props;

  const randomOnlineStatusColor = (() => {
    const colors = ['red', 'green', 'orange'];
    return colors[Math.floor(Math.random() * 3)];
  })();

  return (
    <li className="list-group-item border-0">
      <div className="card border-0">
        <div className="row">
          <div className="col-auto d-flex align-items-center position-relative">
            <Image className="border user-list-img" alt="user photo" src={pictureURI} width={75} height={75} />
            <div className="status-indicator" style={{ backgroundColor: randomOnlineStatusColor }} />
          </div>
          <div className="col">
            <div className="card-body" >
              <h5 className="card-title fw-semibold">{`${firstname} ${lastname}`}</h5>
              <p className="card-text">{`${genre} ${stringifyBirthdate(birthdateday, birthdatemonth, birthdateyear)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}