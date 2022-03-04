REMEMBER to not have shit like & in your file/folder names lol

If you look in create-post.ejs, you'll noitice that the text displayed to the user re authors is the author name, but the value is the author.id. This is because we know FOR SURE that the author id will be unique, whereas with authors you could havbe multiple John Smiths

Also remember, in taht same file, using GET or POST alone when submitting wont do anything, it depends on your server side code functionality

remember, the router.get commands are for the router to do things when the address bar/user visits the page ending with whatever it is in the parameters
router.get("/address", functionThatDoesWhateverYouWantToHappen) {}
