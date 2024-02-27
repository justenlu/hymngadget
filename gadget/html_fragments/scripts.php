<?php
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
?>

<script src="javascript/MVC/HymnGadget.js"></script>
<script src="javascript/MVC/view/VisibilityController.js"></script>
<script src="javascript/MVC/model/Item.js"></script>
<script src="javascript/MVC/model/SongList.js"></script>
<script src="javascript/MVC/model/Song.js"></script>
<script src="javascript/MVC/model/Preferences.js"></script>
<script src="javascript/MVC/view/SongListView.js"></script>
<script src="javascript/MVC/view/NotationView.js"></script>
<script src="javascript/MVC/controller/SongSelectButtons.js"></script>
<script src="javascript/MVC/controller/StepTranspose.js"></script>
<script src="javascript/MVC/controller/VerseSelector.js"></script>
<script src="javascript/MVC/controller/CollectionSelector.js"></script>
<script src="javascript/MVC/controller/Filter.js"></script>
<script src="javascript/MVC/controller/HarmonisationSelector.js"></script>
<script src="javascript/MVC/controller/Editor.js"></script>
<script src="javascript/MVC/controller/Logger.js"></script>
<script src="javascript/MVC/controller/CacheManager.js"></script>
<script src="javascript/MVC/controller/Customiser.js"></script>
<script src="javascript/MVC/controller/ListManager.js"></script>
<script src="javascript/MVC/controller/FilterCleaner.js"></script>
<script src="javascript/MVC/Database.js"></script>
<script src="javascript/parsers/melody_parser.js"></script>
<script src="javascript/parsers/harmony_parser.js"></script>
<script src="javascript/parsers/lyrics_parser.js"></script>
<script src="javascript/notation_model/ABCContext.js"></script>
<script src="javascript/notation_model/Barline.js"></script>
<script src="javascript/notation_model/BeamGroup.js"></script>
<script src="javascript/notation_model/Breath.js"></script>
<script src="javascript/notation_model/Chord.js"></script>
<script src="javascript/notation_model/Duration.js"></script>
<script src="javascript/notation_model/Harmonisation.js"></script>
<script src="javascript/notation_model/Interval.js"></script>
<script src="javascript/notation_model/KeySignature.js"></script>
<script src="javascript/notation_model/Verse.js"></script>
<script src="javascript/notation_model/Lyrics.js"></script>
<script src="javascript/notation_model/Notation.js"></script>
<script src="javascript/notation_model/Note.js"></script>
<script src="javascript/notation_model/Pitch.js"></script>
<script src="javascript/notation_model/Rest.js"></script>
<script src="javascript/notation_model/Skip.js"></script>
<script src="javascript/notation_model/Syllable.js"></script>
<script src="javascript/notation_model/SystemBreak.js"></script>
<script src="javascript/notation_model/TimeSignature.js"></script>
<script src="javascript/notation_model/UnknownMarking.js"></script>
<script src="javascript/notation_model/utilities.js"></script>

<script src="javascript/utility_classes/Range.js"></script>
<script src="javascript/utility_classes/RangeSet.js"></script>
<script src="javascript/utility_classes/Set.js"></script>
<script src="javascript/utility_classes/utilities.js"></script>

<script src="javascript/parsers/range_parser.js"></script>

<script src="javascript/abcjs/parse/abc_common.js"></script>
<script src="javascript/abcjs/parse/abc_parse.js"></script>
<script src="javascript/abcjs/parse/abc_parse_directive.js"></script>
<script src="javascript/abcjs/parse/abc_parse_header.js"></script>
<script src="javascript/abcjs/parse/abc_parse_key_voice.js"></script>
<script src="javascript/abcjs/parse/abc_tokenizer.js"></script>

<script src="javascript/abcjs/write/abc_glyphs.js"></script>
<script src="javascript/abcjs/write/abc_graphelements.js"></script>
<script src="javascript/abcjs/write/abc_layout.js"></script>
<script src="javascript/abcjs/write/abc_write.js"></script>
<script src="javascript/abcjs/write/sprintf.js"></script>

<script src="javascript/abcjs/api/abc_tunebook.js"></script>
<script src="javascript/abcjs/data/abc_tune.js"></script>
<script src="javascript/abcjs/midi/abc_midiwriter.js"></script>
<script src="javascript/abcjs/write/raphael.js"></script>

<script src="javascript/jquery-1.8.2.min.js"></script>
<script src="javascript/jquery-ui-1.10.0.custom/js/jquery-ui-1.10.0.custom.min.js"></script>

<script>
  //var song_collection=new Array();
  //var notation;
  //var transposed_notation;
  //var harmonisation;
  //var harmonisations=new Array();
  //var lyrics;
  //var state={};
  //state.current_book_id=1;
</script>