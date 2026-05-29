# React Fundamentals with Roitai DEV

#### Install Vite (React - Javascript)

https://vite.dev/guide/

```base
npm create vite@latest
```

#### Folder Structure

- node_modules
  โฟลเดอร์นี้เก็บไฟล์ dependencies ทั้งหมดที่แอปต้องใช้ในการทำงาน โดย dependencies หลักๆ จะถูกระบุไว้ในไฟล์ package.json

- public
  Contains static assets including index.html (page template)

  - index.html

- src
  In simplest form it's the brain of our app. This is where we will do all of our work. src/index.js is the JavaScript entry point.

- .gitignore
  Specifies which files source control (Git) should ignore

- package.json
  Every Node.js project has a package.json and it contains info about our project, for example list of dependencies and scripts

- README
  คู่มือของเรา

#### First Component

```js
function Greeting() {
  return <h2>My First Component</h2>;
}

// arrow function

const Greeting = () => {
  return <h2>My First Component</h2>;
};
```

- starts with capital letter
- must return JSX (html)
- always close tag <Greeting/>

##### Typical Component

```js
// imports or logic

const Greeting = () => {
  return <h2>My First Component</h2>;
};
export default Greeting;
```

##### Root Component (only one)

index.js

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

#### Extensions

- Auto Rename Tag
- Highlight Matching Tag
- Prettier
- ES7 Snippets
  - rafce (arrow func with export)
  - rfce (regular func with export )

#### First Component in Detail

- capital letter
- must return something
- JSX syntax (return html)

App.js

```js
function Greeting() {
  return (
    <div>
      <h2>hello world</h2>
    </div>
  );
}
```

#### JSX Rules

- return single element
- Fragment - let's us group elements

```js
return <React.Fragment>...Something Jingerbell</React.Fragment>;

// shorthand

return <>...Something Jingerbell</>;
```

- camelCase property naming convention

```js
return (
  <div className="">
    <button onClick={myFunction}>click me</button>
    <label htmlFor="name">Name</label>
  </div>
);
```

```js
return <div className="someValue">hello</div>;
```

- close every element

```js
return <img />;
// or
return <input />;
```

#### Nest Components

```js
const Person = () => <h2>john doe</h2>;
const Message = () => {
  return <p>this is my message</p>;
};

function Greeting() {
  return (
    <div>
      <Person />
      <Message />
    </div>
  );
}
```

#### Greeting List

```js
function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
      <Greeting />
      <section>
        <Book />
      </section>
    </div>
  );
}

function Greeting() {
  return <h1>My name is ...</h1>;
}
const Book = () => {
  return <h2>This is a book</h2>;
};

export default App;
```

```js
function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
      <Greeting />
      <section>
        <Book />
        <Title />
        <Author />

        <All />
      </section>
    </div>
  );
}

function Greeting() {
  return <h1>My name is ...</h1>;
}
const Book = () => {
  return <h2>This is a book</h2>;
};
const Title = () => {
  return <h1>This is Title...</h1>;
};
const Author = () => {
  return <h1>Author...</h1>;
};
const All = () => {
  return (
    <>
      <h1>This is a book</h1>
      <h1>Title...</h1>
      <h1>Author...k</h1>
    </>
  );
};

export default App;
```

- reuseable

#### CSS

- create index.css in src

```css
.title {
  font-size: 100px;
}
```

- import file and add classes

```js
import "./index.css";
const Title = () => {
  return <h1 className="title">This is Title...</h1>;
};
```

#### JSX - CSS (inline styles)

- style prop
- {} in JSX means going back to JS Land
- value is an object with key/value pairs - capitalized and with ''

```js
const Title = () => (
  <h4 style={{ color: "#617d98", fontSize: "0.75rem", marginTop: "0.5rem" }}>
    Roitai
  </h4>
);
```

```js
const Title = () => {
  const inlineTitleStyles = {
    color: "red",
  };
  return <h4 style={inlineTitleStyles}>Roitai </h4>;
};
```

#### JSX - Javascript

- refactor to App component

```js
function App() {
  return (
    <div>
      <Greeting />
    </div>
  );
}

function Greeting() {
  return <h1>My name is ...</h1>;
}

export default App;
```

- {} in JSX means going back to JS Land
- value inside must be an expression (return value)

```js
function App() {
  return (
    <div>
      <Greeting />
    </div>
  );
}

function Greeting() {
  // Javascript
  const name = "Roitai DEV";
  const address = "Korat";
  const no = 24;

  return (
    <div>
      <h1>My name is {name}</h1>
      <h1>Address {address}</h1>
      <h1>No. {no}</h1>
    </div>
  );
}

export default App;
```

#### Props - Initial Setup

- refactor/clean up

```js
// parameters
const someFunc = (param1, param2) => {
  console.log(param1, param2);
};
// arguments
someFunc("job", "developer");
```

```js
const Book = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{author} </h2>
      {console.log(props)}
    </div>
  );
};
```

```js
function BookList() {
  return (
    <div>
      <Book title="title Roitai" number={22} />
    </div>
  );
}
const Book = (props) => {
  console.log(props);
  return (
    <div>
      <h2>{title}</h2>
      <h4>{number} </h4>
    </div>
  );
};
```

```js
function BookList() {
  return (
    <div>
      <Book author={author} title={title} />
      <Book author={author} title={title} />
    </div>
  );
}
const Book = (props) => {
  console.log(props);
  return (
    <div>
      <h2>{props.title}</h2>
      <h4>{props.author} </h4>
    </div>
  );
};
```

#### Props - Dynamic Setup

```js
const firstBook = {
  author: "Roitai Book1",
  title: "Easy Javascript",
};
const secondBook = {
  author: "Roitai Book2",
  title: "Easy React",
};

function BookList() {
  return (
    <div>
      <Book author={firstBook.author} title={firstBook.title} />
      <Book author={secondBook.author} title={secondBook.title} />
    </div>
  );
}
const Book = (props) => {
  console.log(props);
  return (
    <div>
      <h2>{props.title}</h2>
      <h4>{props.author} </h4>
    </div>
  );
};
```

#### Access Props

- Destructuring (object)

```js
const someObject = {
  name: "Roitai",
  job: "dev",
  location: "korat",
};

console.log(someObject.name);
const { name, job } = someObject;
console.log(job);
```

- no need for all the props.propName
- destructure inside component

```js
const Book = (props) => {
  const { title, author } = props;
  return (
    <div>
      <h2>{title}</h2>
      <h4>{author} </h4>
    </div>
  );
};
```

- destructure in function parameters

```js
const Book = ({ title, author }) => {
  return (
    <div>
      <h2>{title}</h2>
      <h4>{author} </h4>
    </div>
  );
};
```

#### Children Prop

- everything we render between component tags
- can place anywhere in JSX

```js
function BookList() {
  return (
    <div>
      <Book>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
          repudiandae inventore eos qui animi sed iusto alias eius ea sapiente.
        </p>
        <button>click me</button>
      </Book>
      <Book author={secondBook.author} title={secondBook.title} />
    </div>
  );
}

const Book = ({ img, title, author, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <h4>{author} </h4>
      {children}
    </div>
  );
};
```

#### Simple List

- can't render objects in React

```js
const books = [
  {
    author: "Roitai Book1",
    title: "Easy Javascript",
  },
  {
    author: "Roitai Book2",
    title: "Easy React",
  },
];

function BookList() {
  return <div>{books}</div>;
}
```

- map - creates a new array.

```js
const names = ["Roitai", "dev", "Bkk"];
const newNames = names.map((name) => {
  console.log(name);
  return <h1>{name}</h1>;
});

function BookList() {
  return <div>{newNames}</div>;
}
```

#### Proper List

- remove names and newNames

```js
function BookList() {
  return (
    <div>
      {books.map((book) => {
        console.log(book);
        return (
          <div>
            <h2>{book.title}</h2>
          </div>
        );
      })}
    </div>
  );
}
```

- render component
- pass properties one by one

```js
function BookList() {
  return (
    <div>
      {books.map((book) => {
        console.log(book);
        return <Book title={book.title} author={book.author} />;
      })}
    </div>
  );
}

// or
function BookList() {
  return (
    <div>
      {books.map((book) => {
        console.log(book);
        const { title, author } = book;
        return <Book title={title} author={author} />;
      })}
    </div>
  );
}
```

#### Key Prop

- typically it's going to be id

```js
const books = [
  {
    id: 1,
    author: "Roitai Book1",
    title: "Easy Javascript",
  },
  {
    id: 2,
    author: "Roitai Book2",
    title: "Easy React",
  },
];

function BookList() {
  return (
    <div>
      {books.map((book) => {
        console.log(book);
        const { title, author, id } = book;
        return <Book book={book} key={id} />;
      })}
    </div>
  );
}
```

- you will see index

```js
function BookList() {
  return (
    <div>
      {books.map((book, index) => {
        console.log(book);
        const { title, author, id } = book;
        return <Book book={book} key={index} />;
      })}
    </div>
  );
}
```

#### Pass The Entire Object

- render component
- pass entire object
- Destructuring (object)

```js
function BookList() {
  return (
    <div>
      {books.map((book) => {
        console.log(book);
        const { title, author } = book;
        return <Book book={book} />;
      })}
    </div>
  );
}

const Book = (props) => {
  const { title, author } = props.book;

  return (
    <div>
      <h2>{title}</h2>
      <h4>{author} </h4>
    </div>
  );
};
```

- alternative

```js
const Book = ({ book: { img, title, author } }) => {
  return (
    <div>
      <h2>{title}</h2>
      <h4>{author} </h4>
    </div>
  );
};
```

#### Events

- JS

```js
const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
  // do something
});
```

```js
const EventExamples = () => {
  const handleButtonClick = () => {
    alert("handle button click");
  };
  return (
    <div>
      <button onClick={handleButtonClick}>click me</button>
    </div>
  );
};
```

- onClick (click events)
- onChange (input change )
- onSubmit (submit form )

```js
function BookList() {
  return (
    <section className="booklist">
      <EventExamples />
      {books.map((book) => {
        return <Book {...book} key={book.id} />;
      })}
    </section>
  );
}

const EventExamples = () => {
  const handleFormInput = () => {
    console.log("handle form input");
  };
  const handleButtonClick = () => {
    alert("handle button click");
  };
  return (
    <div>
      <form>
        <h2> Form</h2>
        <input type="text" name="example" onChange={handleFormInput} />
      </form>
      <button onClick={handleButtonClick}>click me</button>
    </div>
  );
};
```

#### Event Object and Form Submission

```js
const EventExamples = () => {
  const handleFormInput = (e) => {
    console.log(e);
    console.log(`Input Name : ${e.target.name}`);
    console.log(`Input Value : ${e.target.value}`);
  };
  const handleButtonClick = () => {
    alert("handle button click");
  };
  const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <h2>Form</h2>
        <input type="text" name="example" onChange={handleFormInput} />
        <button type="submit">submit form</button>
      </form>
      <button onClick={handleButtonClick}>click me</button>
    </div>
  );
};
```

- alternative approach
- pass anonymous function (in this case arrow function)
- one liner - less code

```js
const EventExamples = () => {
  return (
    <div>
      <button onClick={() => console.log("hello there")}>click me</button>
    </div>
  );
};
```

- also can access event object

```js
const EventExamples = () => {
  return (
    <div>
      <form>
        <h2> Form</h2>
        <input
          type="text"
          name="example"
          onChange={(e) => console.log(e.target.value)}
          style={{ margin: "1rem 0" }}
        />
      </form>
      <button onClick={() => console.log("you clicked me")}>click me</button>
    </div>
  );
};
```

#### Import and Export Statements

```js
function BookList() {
  return (
    <div>
      {books.map((book) => {
        return <Book {...book} key={book.id} />;
      })}
    </div>
  );
}

const Book = (props) => {
  const { img, title, author } = props;

  return (
    <article className="book">
      <img src={img} alt={title} />
      <h2>{title}</h2>

      <h4>{author} </h4>
    </article>
  );
};
```

- setup two files in src books.js and Book.js
- cut books array from index.js
- add to books.js

books.js

```js
const books = [
  {
    author: "Jordan Moore",
    title: "Interesting Facts For Curious Minds",
    img: "./images/book-1.jpg",
    id: 1,
  },
  {
    author: "James Clear",
    title: "Atomic Habits",
    img: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL._AC_UL900_SR900,600_.jpg",
    id: 2,
  },
];
```

- two named and default exports

  - with named exports names MUST match
  - with default exports,can rename but only one per file

- named export

```js
export const books = [
  {
    author: "Roitai DEV",
    title: "JAVASCRIPT",
    id: 1,
  },
  {
    author: "Roitai DEV 2 ",
    title: "React Basic",
    id: 2,
  },
];
```

App.js

```js
import { books } from "./books";
```

- default export

```js
const Book = (props) => {
  const { title, author } = props;

  return (
    <div>
      <h2>{title}</h2>

      <h4>{author} </h4>
    </div>
  );
};

export default Book;
```

App.js

```js
import Book from "./Book";
```