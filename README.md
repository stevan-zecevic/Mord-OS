# Demo 
[MordOS - One OS to rule them all](https://mord-os.netlify.app/)

# Screenshots 
###### Desktop:  
[![Login.jpg](https://i.postimg.cc/21KKwBWF/Login.jpg)](https://postimg.cc/21KKwBWF)
[![Desktop.jpg](https://i.postimg.cc/94wNNFt3/Desktop.jpg)](https://postimg.cc/94wNNFt3)
[![Folder.jpg](https://i.postimg.cc/fkc1Ny4D/Folder.jpg)](https://postimg.cc/fkc1Ny4D)
[![Folder2.jpg](https://i.postimg.cc/bsLMZ5N5/Folder2.jpg)](https://postimg.cc/bsLMZ5N5)
[![File.jpg](https://i.postimg.cc/RJLYQs1N/File.jpg)](https://postimg.cc/RJLYQs1N)
[![Browser.jpg](https://i.postimg.cc/tsTcWzs4/Browser.jpg)](https://postimg.cc/tsTcWzs4)
[![WebCam.jpg](https://i.postimg.cc/MfS4B2QC/WebCam.jpg)](https://postimg.cc/MfS4B2QC)
[![Gallery.jpg](https://i.postimg.cc/TpTFYxGm/Gallery.jpg)](https://postimg.cc/TpTFYxGm)
[![Gallery2.jpg](https://i.postimg.cc/BLDktQX5/Gallery2.jpg)](https://postimg.cc/BLDktQX5)
[![News.jpg](https://i.postimg.cc/mcP0fS45/News.jpg)](https://postimg.cc/mcP0fS45)


# How to run
`git clone` the project locally  
`npm install` to install all the dependencies  
`npm start` to run the project in your browser


# Project overview
#### Functional requirements: 
- OS should support creating and managing plain text files and include a directory mechanic in
order to sort the files as one wishes.
- There should be a simple authentication feature so not everyone can access the OS. A simple email
and password flow will do for now. (email: borgoth@mordos.com / pass: 12bindthem)
- No visual UI libraries should be used.

Other functionalities that are not as crucial but could really help enrich the OS:
- To keep up with all the news and banter going on, the OS could include a dedicated **RSS reader app**. (data source: https://jsonplaceholder.typicode.com/comments)
- Having a **Camera app** seems like a must for any OS today.
- It would be good if the OS had a **Gallery app** to view images from different sources without having to switch. (data source: https://jsonplaceholder.typicode.com/photos , but can include others)
- The OS could also have a **dedicated web browser**. Can be simple at first.

#### Deadline: 7 days

##### Project anatomy: 
```
├── public
│   ├── images
|       ├── mordor.png
|       ├── the-one-ring.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt

├── src
│   ├── components
│   │   ├── Common
│   │   │   ├── Add.js
│   │   │   ├── BackButton.js
│   │   │   ├── Button.js
│   │   │   └── Header.js
│   │   ├── Context
│   │   │   ├── AuthProvider.js
│   │   │   ├── FilesProvider.js
│   │   │   └── FoldersProvider.js
│   │   ├── File
│   │   │   ├── File.js
│   │   │   └── FileHeader.js
│   │   ├── Folder
│   │   │   ├── Folder.js
│   │   │   ├── FolderBody.js
│   │   │   └── FolderHeader.js
│   │   ├── Input
│   │   │   ├── EditNameInput.js
│   │   │   └── Input.js
│   │   ├── Browser.js
│   │   ├── Camera.js
│   │   ├── ControlPanel.js
│   │   ├── Desktop.js
│   │   ├── Gallery.js
│   │   ├── Image.js
│   │   ├── Login.js
│   │   └── News.js
│   ├── styles
│   │   ├── css
│   │   │   ├── style.css
│   │   │   └── style.css.map
│   │   └── scss
│   │   │   ├── _basicStyles.scss
│   │   │   ├── _browser.scss
│   │   │   ├── _buttons.scss
│   │   │   ├── _camera.scss
│   │   │   ├── _classes.scss
│   │   │   ├── _controlPanel.scss
│   │   │   ├── _desktop.scss
│   │   │   ├── _file.scss
│   │   │   ├── _folder.scss
│   │   │   ├── _gallery.scss
│   │   │   ├── _header.scss
│   │   │   ├── _inputs.scss
│   │   │   ├── _login.scss
│   │   │   ├── _news.scss
│   │   │   ├── _variables.scss
│   │   │   └── style.scss
│   ├── utils
│   │   └── constants.js
│   ├── App.js
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```
##### Data models
  - Folder
     - _id - incremental identification number for folder 
     - type: "folder" - always fixed value
     - name - name of folder, first value is always "New Folder"
     - createdOn - date the folder was created
     - subFolders - arrays of all subfolders
     - subFiles - arrays of all subfiles
     - open - status which stores two possible values:
       - true - represents the file is open 
       - false - true - represents the file is closed
             
  - File 
    - _id - incremental identification number for file 
    - type: "file" - always fixed value
    - name - name of file, first value is always "New File"
    - createdOn - date the file was created
    - size - size of current folder in Bytes, in this project 1 character has size of 1 Byte
    - open - status which stores two possible values
      - true - represents the file is open 
      - false - represents the file is closed

##### Context (state at app level)
 - [AuthProvider](https://github.com/stevan-zecevic/Mord-OS/blob/master/src/components/Context/AuthProvider.js) - Authentication context which wraps whole application and checks if user is logged in or not.  
 - [FolderProvider](https://github.com/stevan-zecevic/Mord-OS/blob/master/src/components/Context/FoldersProvider.js) - Folder context which stores made folders and their current status.
 - [FilesProvider](https://github.com/stevan-zecevic/Mord-OS/blob/master/src/components/Context/FilesProvider.js) - File context which stores made files and their current status. 
  
#### Additional improvements / features suggestions:
 - **Drag & Move** - window feature that allows user to drag and move App's window across the screen. It could be built by trying to register the mouse events such as `onMouseDown`,`onMouseUp` & `onMouseMove` of the ref element while keeping track of the current's mouse position coordinates on the screen. Certain limitations on the boundaries of the area that's allowed to be used, should also be set.  
   
 - **"Priority" of windows** - a feature that allows for windows to take priority based on the `selected` status. This feature could be implemented by dynamically assigning `z-index` to a currently `selected` window.

 - **Formating of text files** - a feature that allows for user to format text files in most basic ways like bold, italic ,underline, font size etc. Idea is to save whole file as string and use DOMParser to parse that value from string to HTML.
  
 - **Camera upload** - a feature that let's a user take & save a picture and video taken with his camera (if avalible both front and back) to `Gallery`(Folder) component.

 - **News comments** - a feature that let's a user make a comment on News article or replay to an existing comment.

 etc.
  
#### Things that I would do differently: 
    
  - **Making scss files more modular** - Storing as much values as I can in variables that can later be easily changed.

  - **Making a web crawler to display websites correctly** -  idea is similar to https://www.webcrawler.com/ which has perfect solutuion for our project. 
  
  - **Make more general components** - files and folders have same header with exception of couple of buttons which is not a big of a problem to add conditionally to component.

#### Most painful point of the project:

By far the most painful part was deciding how should i save the data in localStorage. Idea was to have directory mechanic same as Windows, Linux or any other OS, but the problem was how to store it and how to later easily parse that data. In the end I ended up make two "collections" in localStorage and conecting them together with _id. 
