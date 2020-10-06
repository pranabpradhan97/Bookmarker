document.getElementById("myForm").addEventListener("submit", saveBookmark);

const saveBookmark = (e) =>
{
	var siteName=document.getElementById("siteName").value;
	var siteUrl=document.getElementById("siteUrl").value;


	//validate form
	if(!siteName || !siteUrl)
	{
		alert("Please fill in the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression); //regexp used to perform pattern matching

	if(!siteUrl.match(regex))
	{
		alert("Enter a valid URL");
		return false;
	}
	//end of validation

	var bookmark={
		name:siteName, url:siteUrl
	}

	/*local storage test

	localStorage.setItem('test', 'hello world');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test')); */


	// test if bookmarks is null
	if(localStorage.getItem('bookmarks')=== null)
	{
		//initialise array

		var bookmarks=[];

		//add to array
		bookmarks.push(bookmark);

		//set to localstorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)) //turns it into a string from json

	}

		// if bookmarks is not empty

	else{
			//get bookmarks from localstorage
			var bookmarks=JSON.parse(localStorage.getItem('bookmarks')); //turns it back into json from string
			
			//add bookmark toa array

			bookmarks.push(bookmark);
			// re-set back to localstorage

			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	//clear form after each entry
	document.getElementById("myForm").reset();


	fetchBookmarks();
	
	e.preventDefault(); 	// prevent form from submitting
}



const fetchBookmarks = () =>
{
	//get bookmarks from localstorage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	//get output id
	var bookmarksResults=document.getElementById("bookmarksResults");

	//build output
	bookmarksResults.innerHTML='';
	for(var i=0;i<bookmarks.length;i++)
	{
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		//target=_blank opens page in a new window

		bookmarksResults.innerHTML += '<div class="well" style="opacity:0.87">'+ '<h3>'+name+'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>  ' +
										'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="blank" href="#">Delete</a>'
										'</h3> </div>'
			}
}

function deleteBookmark(url)
{
	//get bookmarks from localstorage

	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	//loop through bookmarks to find the url
	for(i=0;i<bookmarks.length;i++)
	{
		if(bookmarks[i].url==url)
		{
			//remove from array by using splice.google it
			bookmarks.splice(i,1);

		}
	}
	//reset the localstorage after deleting
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	fetchBookmarks();
}
