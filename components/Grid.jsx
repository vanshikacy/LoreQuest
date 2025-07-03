
import bookData from "../utils/index.js";
import BookCard from "./BookCard.jsx";
import { useState } from "react";

export default function Grid(){
    //marked as read books 
    const [readBooks, setReadBooks] = useState(() => {
    const stored = localStorage.getItem("readBooks");
    return stored ? JSON.parse(stored) : [];
     });
     
     //clicked book 
    const [selectedBook, setSelectedBook]=useState(null);
    const bookIDs = Object.keys(bookData);
    
    //next book to read 
    const nextBookToRead=readBooks.length;

    //mark as read button logic
    const [showCongrats, setShowCongrats] = useState(false);
    function markBookAsRead(bookId){
        if(!readBooks.includes(bookId)){
            const updated=[...readBooks, bookId];
            setReadBooks(updated);
            localStorage.setItem("readBooks", JSON.stringify(updated));

            if (updated.length === Object.keys(bookData).length) {
            setShowCongrats(true);}
        }
    }

    
    
    return (
        <div className="gridContainer">

           {bookIDs.map((id)=>{
            const numericId=parseInt(id);
            const book =bookData[id];
            const isLocked= numericId!==0 && (!readBooks.includes(numericId) && numericId >nextBookToRead); //no skipping books 

            return(
                <button
                key={id}
                onClick={()=>{
                    if(!isLocked){
                        setSelectedBook(book);
                    }
                }}>

                <p className="book"> Book {numericId+1}</p> 
                {isLocked? ( <i className="fa-solid fa-lock"></i>) : 
                ( <i className="fa-solid fa-trophy"></i> )}
                </button>
            );
           })}

           {selectedBook &&(
            <div className="modalBackdrop">
           <div className="popupWrapper">
           <BookCard
             book={selectedBook}
             onClose={() => setSelectedBook(null)}
             onMarkAsRead={markBookAsRead}
             readBooks={readBooks} />
              </div>
            </div>
           )}

          {showCongrats && (
            <div className="modalBackdrop">
               <div className="popupWrapper">
               <h2>🗡️ Quest Complete!</h2>
               <p>You did it, Lorekeeper. </p>

                <p>
                 You’ve conquered <strong>30 books</strong>, braved every world, and stayed true to the Lorekeeper’s Law. 
                </p>

               <blockquote style={{ fontStyle: "italic", margin: "1rem 0", color: "violet" }}>
              “One quest. Nine Worlds. No shortcuts.” — and you honored every word.
               </blockquote>

                <p style={{ marginTop: "1rem" }}>
                Take a breath. Bask in your glory. Or even… begin anew?
                </p>

                <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                 <button onClick={() => setShowCongrats(false)}>Close</button>
                   <button
                          onClick={() => {
                          localStorage.removeItem("readBooks");
                          setReadBooks([]);
                          setShowCongrats(false);
                        }}
                     >
                Start Again
             </button>
         </div>
        </div>
       </div>
         )}

                    <button
                          onClick={() => {
                          localStorage.removeItem("readBooks");
                          setReadBooks([]);
                          setShowCongrats(false);
                        }}
                        >
                      RESET ⚔️
                     </button>

</div>
); }