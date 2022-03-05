REMEMBER to not have shit like & in your file/folder names lol

If you look in create-post.ejs, you'll noitice that the text displayed to the user re authors is the author name, but the value is the author.id. This is because we know FOR SURE that the author id will be unique, whereas with authors you could havbe multiple John Smiths

Also remember, in taht same file, using GET or POST alone when submitting wont do anything, it depends on your server side code functionality

remember, the router.get commands are for the router to do things when the address bar/user visits the page ending with whatever it is in the parameters
router.get("/address", functionThatDoesWhateverYouWantToHappen) {}

SELECT posts.\*, authors.name AS author_name, authors.email AS author_email FROM posts
INNER JOIN authors ON posts.author_id = authors.id
remember a line like this will select both the posts and authors tables, pull everything from posts, change authors.name to author_name and authors.email to author_email join the authors table with the posts table, and then replace the value held by posts.author_id with authors.id
Think of this like a temporary table that only exists for this command
