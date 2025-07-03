import bookData from "../utils/index.js";

export default function BookCard({book, onClose, onMarkAsRead, readBooks}){

    const bookId=parseInt(Object.keys(bookData).find(key=>bookData[key]===book));
    
    const nextBookToRead=readBooks.length;
    const canMark=bookId===nextBookToRead;
    const alreadyRead=readBooks.includes(bookId);
    return (
       <div className="bookCardModal">
          <h2>{book.name}</h2>
          <p><strong>By </strong>{book.author}</p>

          <img
          src={book.image}
          alt={book.name}
          className="book-cover"
          style={{ width: "120px", height: "auto", margin: "0.5rem 0" }} />

          <p><strong>Rating: </strong>{book.rating}</p>

          <p><strong>About the book: </strong>{book.description}</p>

          <blockquote style={{ fontStyle: "italic", margin: "0.8rem 0" }}>
            {book.quote}
          </blockquote>

          <div id="bookcardbuttons">

          {/* mark as read button if not already read */}
          {!alreadyRead && (
            <button
             onClick={()=>{
                if(canMark){
                    onMarkAsRead(bookId);
                    onClose();
                }
             }} disabled={!canMark}
          >
        {canMark? "Mark as Read" : "Finish previous books first"}
        </button>)}

        {/* If already read */}
        {alreadyRead && (
            <p style={{ color: "green" }}>✅ Read</p>
        )}

        {/* Close Button */}
      <button onClick={onClose}>Close</button></div>

       </div>
    )
}