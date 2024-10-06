import members from './members.js';
import './Member.css';
 
const Member = () => {
  return (
    <div className="member-container">
      <h1 className="member-heading">Notable Nads</h1>
      <div className="member-cards">
        {members.map((member) => {
          const { id, name, image, link } = member;
          return (
            <article key={id} className="member-article">
              <div>
                <img src={image} alt={name} className="member-image" />
              </div>
              <div>
                <h1 className="member-name">{name}</h1>
              </div>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <button className="btn">Visit on X</button>
                </a>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Member;
