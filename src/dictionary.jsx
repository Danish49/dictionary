import Play from "./assets/play-circle.svg";
export default function Dictionary({meanings , error }) {
return(
      <div className="form-container">
    
    {meanings.length > 0 ? (
        meanings.map((meaning, index) => {
          const voice = new Audio(meaning.phonetics[0].audio);
          return (
            <div key={index}  className="content-box">
              <div  className="result-container">
                <div  className="word">
                  <div  className="phonetics">
                    <h1 className="word">{meaning.word.toLowerCase()}</h1>
                    <div  className="play-icon">
                      <img onClick={() => voice.play()} src={Play} alt="" />
                    </div>
                  </div>
                  <h2  className="POS">{meaning.meanings[0].partOfSpeech}</h2>
                  <p className="meaning">Meaning:</p>
                </div>
                <div className="defination">
                  {meaning.meanings[0].definitions.map((def, idx) => {
                    return (
                     
                        <ul key={idx}>
                          <li key={idx+12}>{def.definition}</li>
                          {def.example && (
                            <p  className="eg">eg:{def.example}</p>
                          )}
                        </ul>
                      
                    );
                  })}
                  <a className="link" target="blank" href={meaning.sourceUrls}>
                    {meaning.sourceUrls}
                  </a>
                </div>
              </div>
            </div>
          );
        })
      ) : error ? (
        <p className="no-result">{error}</p>
      ) : null
    }
</div>
      
)
}