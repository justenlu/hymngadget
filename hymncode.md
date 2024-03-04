# HymnCode

Songs are added to HymnGadget using HymnCode, a text based notation designed for HymnGadget. HymnCode was influenced by abc format and [LilyPond](https://lilypond.org/) format. The aim was to design a coding that would be easy to learn (for a musician that has a little knowledge about the theory of western music), fast to type and suitable to describe the sheet music in the hymnal book of the Evangelical Lutheran Church of Finland. HymnCode is not a general purpose music notation language. For example there is no way to express tuplets. 

In HymnCode, melody, harmony and lyrics are written separately.

## Melody

### Clefs

HymnCode does not support defining clefs. HymnGadget draws all music using treble clef.

### Keys

In HymnGadget, only the number of sharps (e.g. `K:2#`) or flats (e.g. `K:3b`) in the key signature is defined. The key signature with two sharps is coded as `K:2#` no matter if the song is in D major or h minor. If there is no sharps or flats in the key signature (like in C major on a minor), the key signature is not written at all.

### Time signatures

Time signatures that concist of numbers are written like `4/4`. HymnCode (and HymnGadget) also support combined time signatures like `3/2-2/2` which means that each bar is in either 3/2 or 2/2 signature. Symbolic signatures for common time and alla breve are coded as `T:C` and `T:C|`.

### Pitches

German names are used for pitches: `c d e f g a h`

### Rests

Rests are coded as `r`.

### Durations

The duration of a note or a rest is coded with a number (and optional period) following the name of the note or rest, e.g. `c4.` or `r8`. The meanings of the numbers are as following:

| number   | meaning            |
|----------|--------------------|
|`1`       |whole note/rest     |
|`2`       |half note/rest      |
|`4`       |quarter note/rest   |
|`8`       |eight note/rest     |
|`6`       |sixteenth note/rest |

When there are several consecutive notes/rests with the same duration, it is sufficient to define the duration for the first of them. The default duration is quarter note/rest.

### Beams

To write eight notes joined by beams you can write e.g. `c-d-e-f` without using number 8. HymnCode does not support beaming shorter notes. In future versions sixteenth notes could be beamed like `c=d=e=f`.

### Barlines

Barlines are not drawn automatically according the time signature but must be written using `|`-marks. This makes it easy to use combined time signatures like `3/2-2/2` where the length of a bar varies.

## Harmony

## Lyrics
