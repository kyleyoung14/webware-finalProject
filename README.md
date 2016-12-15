Document Analysis: by Jon Van Blarcum and Kyle Young
This project was prepared for CS4241 Webware, final project
The purpose of this website it to provide the user an interactive way to analyze and compare text (.txt) documents.

Page 1: Main Page
	This page allows for the uploading of up to six text documents onto the server.

Page 2: WordCloud
	This page generates a wordcloud of which file is selected. The wordcloud provides a visual data analysis of the text document showing which words are more common throughout the text.
	The code implemented on this page was modified from https://github.com/jasondavies/d3-cloud. 

Page 3: PhraseTree
	This page takes an input string from the user and then generates a tree of all of the phrases starting with that input string which occur throughout the document. This allows the user to easily compare prominent words and their uses across multiple files.

Page 4: Document Metrics
	This page fully renders the text and provides some key metrics on it which include word count, sentence count, and the most common word.
	In addition, clicking on a word causes a box to appear that provides metrics on the inidivual word as well as synonyms for the word. 

All of the menus collapse as the pages are resized to be smaller, making the application more phone and tablet friendly. This can be seen upon resizing the browser.