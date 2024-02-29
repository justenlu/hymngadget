# HymnGadget

HymnGadget is a prototype of a single page application for publishing song books in the web. It was designed specially thinking of the hymnal book of the [Evangelical Lutheran Church of Finland](https://evl.fi/en/). It was a part of a study project of a church music student in The [Sibelius Academy](https://www.uniarts.fi/en/units/sibelius-academy/) of the University of the Arts Helsinki, Finland. The study project ended in 2013. The Finnish name of HymnGadget is Veisuuvekotin. More information is available in [veisuuvekotin.net](https://veisuuvekotin.net) (in Finnish).

HymnGadget should be treated as a prototype that is not recommended for real life use. There are security holes that should be fixed and there certainly is annoying and even restricting bugs in the code. 

## Features

HymnGadget offers three ways to customize the sheet music:

- Songs can be transposed to any key.
- If alternative harmonisations are stored for a song, the user can choose from them.
- Verses shown with the sheet music can be selected.

User of HymnGadget can make "playlists" of the songs. The customisations are remembered per list, so that the same song can appear in different lists in different keys, with different harmonisations, with different verses selected.

## The format used to store the songs

The songs are stored in a text based format called HymnCode designed for HymnGadget. The documentation of the format is found in [veisuuvekotin.net](https://veisuuvekotin.net) (in Finnish). The format was influenced by abc-format and [LilyPond](https://lilypond.org/) format. HymnGadget converts HymnCode to object based structure. Customisations (transposing, selecting the harmonisation and verses) are done in that structure. The object structure is then converted to abc format and [abcjs library](https://github.com/paulrosen/abcjs) is used to draw sheet music from that.

Converter to translate songs from other formats to HymnCode was not developed in the project. To store new songs to HymnGadget, user has to use HymnCode. The code was designed to be easy to learn (for a musician that has a little knowledge about the theory of western music), fast to type and suitable to describe the sheet music in the hymnal book of the Evangelical Lutheran Church of Finland.

## Programming languages and libraries used

HymnGadget was coded with JavaScript and PHP. It includes the following libraries:

- [abcjs](https://github.com/paulrosen/abcjs)
- [jQuery](http://jquery.com/)
- [jQueryUI](http://jqueryui.com/)

## Development environment

HymnGadget was running on a server that had Debian 6 Squeeze GNU/Linux, MySQL 5.5 and PHP 5.3. On the client side the developer used Firefor browser (e.g. version 23.0.1) running on Mac OS X (e.g. version 10.6.8).

## About License

HymnGadget is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

HymnGadget is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with HymnGadget. If not, see <http://www.gnu.org/licenses/>.
