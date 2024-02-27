/*
Copyright (C) 2013 Jukka Stenlund

This file is part of HymnGadget.

HymnGadget is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

HymnGadget is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with HymnGadget.  If not, see <http://www.gnu.org/licenses/>.
*/

function HymnGadget() {
	
	//addListeners(); 
	
	var list=new SongList();
	var filter=new Filter();
	var logger=new Logger();
	var filterCleaner=new FilterCleaner(filter, list);
	
	list.addObserver(filterCleaner);
		
	var visibilityController = new VisibilityController(list, logger);
	var listView=new SongListView(list, filter, visibilityController);
	list.addObserver(listView);
	list.loadBook(CollectionSelector.DEFAULT_BOOK);
	
	list.addObserver(visibilityController);
	
	var preferences=new Preferences();

	var notationView=new NotationView(list, preferences);

	list.addObserver(notationView);
	preferences.addObserver(notationView);
	
	var songSelectButtons=new SongSelectButtons(listView);
	listView.addObserver(songSelectButtons);
	
	new StepTranspose(list);
	
	var verseSelector=new VerseSelector(list);
	list.addObserver(verseSelector);
	
	var harmonisationSelector=new HarmonisationSelector(list);
	list.addObserver(harmonisationSelector);
	
	var editor=new Editor(list, logger);
	list.addObserver(editor);
	
	var collectionSelector=new CollectionSelector(list);
	
	var listManager = new ListManager(list);
	listManager.addObserver(collectionSelector);
	//listManager.addObserver(listView);
	
	filter.addObserver(listView);
	
	var cacheManager=new CacheManager(logger, list);
	
	logger.addObserver(collectionSelector);
	logger.addObserver(visibilityController);
	logger.addObserver(editor);
	logger.addObserver(listView);
	logger.addObserver(cacheManager);
	logger.addObserver(listManager);
	
	var customiser=new Customiser(list);
	list.addObserver(customiser);
	
	$( "#editor_tabs" ).tabs();
}